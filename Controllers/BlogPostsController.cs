using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogPostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BlogPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBlogPosts(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from post in _context.BlogPosts
                        select new
                        {
                            post.Id,
                            post.Title,
                            post.Content,
                            post.PostedOn,
                            Author = (from user in _context.Users
                                      where user.Id == post.AuthorId
                                      select new
                                      {
                                          user.Id,
                                          user.UserName
                                      }).FirstOrDefault(),
                            Comments = (from comment in _context.BlogPostComments
                                        where comment.BlogPostId == post.Id
                                        select new
                                        {
                                            comment.Id,
                                            comment.Content,
                                            comment.CreatedAt,
                                            User = (from user in _context.Users
                                                    where user.Id == comment.UserId
                                                    select new
                                                    {
                                                        user.Id,
                                                        user.UserName
                                                    }).FirstOrDefault()
                                        }).ToList()
                        };

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }

        // GET: api/BlogPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetBlogPost(int id)
        {
            if (_context.BlogPosts == null)
            {
                return NotFound();
            }
            var post = await _context.BlogPosts
                .Include(bp => bp.BlogPostComments)
                .ThenInclude(c => c.User)
                .Include(bp => bp.Author)
                .Where(bp => bp.Id == id)
                .Select(bp => new
                {
                    bp.Id,
                    bp.Title,
                    bp.Content,
                    bp.PostedOn,
                    Author = new
                    {
                        bp.Author.Id,
                        bp.Author.UserName
                    },
                    Comments = bp.BlogPostComments.Select(c => new
                    {
                        c.Id,
                        c.Content,
                        c.CreatedAt,
                        User = new
                        {
                            c.User.Id,
                            c.User.UserName
                        }
                    }).ToList()
                }).FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/BlogPosts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPost(int id, BlogPost post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BlogPosts
        [HttpPost]
        public async Task<ActionResult<BlogPost>> CreateBlogPost(BlogPost post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.BlogPosts.Add(post);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetBlogPost), new { id = post.Id }, post);
        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            if (_context.BlogPosts == null)
            {
                return NotFound();
            }
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogPostExists(int id)
        {
            return (_context.BlogPosts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

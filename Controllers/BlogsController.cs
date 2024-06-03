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
    public class BlogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBlogs(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from blog in _context.Blogs
                        select new
                        {
                            blog,
                            blog.Id,
                            blog.Title,
                            blog.Description,
                            Posts = (from post in _context.BlogPosts
                                     where post.BlogId == blog.Id
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

        // GET: api/Blogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetBlog(int id)
        {
            if (_context.Blogs == null)
            {
                return NotFound();
            }
            var blog = await _context.Blogs
                .Include(b => b.BlogPosts)
                .ThenInclude(bp => bp.BlogPostComments)
                .ThenInclude(c => c.User)
                .Include(b => b.BlogPosts)
                .ThenInclude(bp => bp.Author)
                .Where(b => b.Id == id)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Description,
                    Posts = b.BlogPosts.Select(bp => new
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
                    }).ToList()
                }).FirstOrDefaultAsync();

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        // PUT: api/Blogs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(int id, Blog blog)
        {
            if (id != blog.Id)
            {
                return BadRequest();
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
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

        // POST: api/Blogs
        [HttpPost]
        public async Task<ActionResult<Blog>> CreateBlog(Blog blog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Blogs.Add(blog);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            if (_context.Blogs == null)
            {
                return NotFound();
            }
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool BlogExists(int id)
        {
            return (_context.Blogs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

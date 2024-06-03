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
		// GET: api/BlogPost
		[HttpGet]
		public async Task<ActionResult<IEnumerable<object>>> GetBlogPost(int? page = 1, int? pageSize = 10)
		{
			if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
			{
				return BadRequest("Invalid page or pageSize value.");
			}

			var query = from post in _context.BlogPosts
						join blog in _context.Blogs on post.BlogId equals blog.Id
						join user in _context.Users on post.AuthorId equals user.Id
						group new { post, blog, user } by new
						{
							post.Id,
							post.Title,
							post.Content,
							post.PostedOn,
							post.AuthorId,
							UserName = user.UserName,
							BlogTypeTitle = blog.Title
						} into g
						select new
						{
							g.Key.Id,
							g.Key.Title,
							g.Key.Content,
							g.Key.PostedOn,
							g.Key.AuthorId,
							g.Key.UserName,
							g.Key.BlogTypeTitle,
							Comments = g.SelectMany(x => x.post.BlogPostComments.Select(comment => new
							{
								comment.Id,
								comment.Content,
								comment.CreatedAt,
								comment.UserId,
								UserName = comment.User.UserName
							})).ToList()
						};

			var totalCount = await query.CountAsync();
			var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

			var results = await query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToListAsync();

			return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
		}


		// GET: api/BlogPosts
		[HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPosts()
        {
          if (_context.BlogPosts == null)
          {
              return NotFound();
          }
            return await _context.BlogPosts.ToListAsync();
        }

        // GET: api/BlogPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> GetBlogPost(int id)
        {
          if (_context.BlogPosts == null)
          {
              return NotFound();
          }
            var blogPost = await _context.BlogPosts.FindAsync(id);

            if (blogPost == null)
            {
                return NotFound();
            }

            return blogPost;
        }

        // PUT: api/BlogPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPost(int id, BlogPost blogPost)
        {
            if (id != blogPost.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogPost).State = EntityState.Modified;

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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BlogPost>> PostBlogPost(BlogPost blogPost)
        {
          if (_context.BlogPosts == null)
          {
              return Problem("Entity set 'ApplicationDbContext.BlogPosts'  is null.");
          }
            _context.BlogPosts.Add(blogPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogPost", new { id = blogPost.Id }, blogPost);
        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            if (_context.BlogPosts == null)
            {
                return NotFound();
            }
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }

            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogPostExists(int id)
        {
            return (_context.BlogPosts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

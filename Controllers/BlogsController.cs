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
		// GET: api/BlogTypes
		[HttpGet]
		public async Task<ActionResult<IEnumerable<object>>> GetBlogTypes(int? page = 1, int? pageSize = 10)
		{
			if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
			{
				return BadRequest("Invalid page or pageSize value.");
			}

			var query = from blogType in _context.Blogs
						join blogPost in _context.BlogPosts on blogType.Id equals blogPost.BlogId into blogPostGroup
						from bp in blogPostGroup.DefaultIfEmpty()
						join user in _context.Users on bp.AuthorId equals user.Id into userGroup
						from u in userGroup.DefaultIfEmpty()
						group new { blogType, bp, u } by new
						{
							blogType.Id,
							blogType.Title,
							blogType.Description
						} into g
						select new
						{
							g.Key.Id,
							g.Key.Title,
							g.Key.Description,
							BlogPosts = g.Select(x => new
							{
								x.bp.Id,
								x.bp.Title,
								x.bp.Content,
								x.bp.PostedOn,
								x.bp.AuthorId,
								UserName = x.u.UserName,
								Comments = x.bp.BlogPostComments.Select(comment => new
								{
									comment.Id,
									comment.Content,
									comment.CreatedAt,
									comment.UserId,
									UserName = comment.User.UserName
								}).ToList()
							}).Where(bp => bp.Id != 0).ToList()
						};

			var totalCount = await query.CountAsync();
			var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

			var results = await query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToListAsync();

			return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
		}


		// GET: api/Blogs
		[HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
        {
          if (_context.Blogs == null)
          {
              return NotFound();
          }
            return await _context.Blogs.ToListAsync();
        }
         // GET: api/Blogs/GetBlogName/5
        [HttpGet("GetBlogName/{blogId}")]
        public async Task<ActionResult<string>> GetBlogName(int blogId)
        {
            var blog = await _context.Blogs
                                     .Where(b => b.Id == blogId)
                                     .Select(b => b.Title)
                                     .FirstOrDefaultAsync();

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        // GET: api/Blogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int id)
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

            return blog;
        }

        // PUT: api/Blogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog(Blog blog)
        {
          if (_context.Blogs == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Blogs'  is null.");
          }
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
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

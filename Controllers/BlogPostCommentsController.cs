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
    public class BlogPostCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogPostCommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BlogPostComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPostComment>>> GetBlogPostComments()
        {
            if (_context.BlogPostComments == null)
            {
                return NotFound();
            }
            return await _context.BlogPostComments.ToListAsync();
        }

        

        // GET: api/BlogPostComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostComment>> GetBlogPostComment(int id)
        {
            if (_context.BlogPostComments == null)
            {
                return NotFound();
            }
            var blogPostComment = await _context.BlogPostComments.FindAsync(id);

            if (blogPostComment == null)
            {
                return NotFound();
            }

            return blogPostComment;
        }

        // PUT: api/BlogPostComments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPostComment(int id, BlogPostComment blogPostComment)
        {
            if (id != blogPostComment.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogPostComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogPostCommentExists(id))
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

        // POST: api/BlogPostComments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BlogPostComment>> PostBlogPostComment(BlogPostComment blogPostComment)
        {
            if (_context.BlogPostComments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.BlogPostComments'  is null.");
            }
            _context.BlogPostComments.Add(blogPostComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogPostComment", new { id = blogPostComment.Id }, blogPostComment);
        }

        // DELETE: api/BlogPostComments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPostComment(int id)
        {
            if (_context.BlogPostComments == null)
            {
                return NotFound();
            }
            var blogPostComment = await _context.BlogPostComments.FindAsync(id);
            if (blogPostComment == null)
            {
                return NotFound();
            }

            _context.BlogPostComments.Remove(blogPostComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogPostCommentExists(int id)
        {
            return (_context.BlogPostComments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

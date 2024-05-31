using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;
using System.Net.NetworkInformation;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from product in _context.Products
                        join category in _context.ProductCategories on product.ProductCategoryId equals category.Id into productCategoryGroup
                        from pc in productCategoryGroup.DefaultIfEmpty()
                        join comment in _context.ProductComments on product.Id equals comment.ProductId into productCommentGroup
                        from pcmt in productCommentGroup.DefaultIfEmpty()
                        join image in _context.ProductImages on product.Id equals image.ProductId into productImageGroup
                        from pimg in productImageGroup.DefaultIfEmpty()
                        group new { product, pc, pcmt, pimg } by new
                        {
                            product.Id,
                            product.Name,
                            product.Description,
                            product.Price,
                            ProductCategoryName = pc != null ? pc.Name : null
                        } into g
                        select new
                        {
                            Id = g.Key.Id,
                            Name = g.Key.Name,
                            Description = g.Key.Description,
                            Price = g.Key.Price,
                            ProductCategoryName = g.Key.ProductCategoryName,
                            Comments = g.Where(x => x.pcmt != null).Select(x => new
                            {
                                x.pcmt.Id,
                                x.pcmt.Content,
                                x.pcmt.CreatedAt,
                                User = new { x.pcmt.User.Id, x.pcmt.User.UserName }
                            }).ToList(),
                            Images = g.Where(x => x.pimg != null).Select(x => new
                            {
                                x.pimg.Id,
                                x.pimg.ImageUrl
                            }).ToList()
                        };

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }*/

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from product in _context.Products
                        join category in _context.ProductCategories on product.ProductCategoryId equals category.Id into productCategoryGroup
                        from pc in productCategoryGroup.DefaultIfEmpty()
                        select new
                        {
                            product,
                            product.Id,
                            product.Name,
                            product.Description,
                            product.Price,
                            ProductCategoryName = pc != null ? pc.Name : null,
                            Comments = (from comment in _context.ProductComments
                                        join user in _context.Users on comment.UserId equals user.Id
                                        where comment.ProductId == product.Id
                                        select new
                                        {
                                            comment.Id,
                                            comment.Content,
                                            comment.CreatedAt,
                                            User = new { user.Id, user.UserName }
                                        }).Distinct().ToList(),
                            Images = (from image in _context.ProductImages
                                      where image.ProductId == product.Id
                                      select new
                                      {
                                          image.Id,
                                          image.ImageUrl
                                      }).Distinct().ToList()
                        };

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }



        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Thêm sản phẩm vào cơ sở dữ liệu
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }




        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateProductStatus(int id, [FromBody] bool status)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }
   

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

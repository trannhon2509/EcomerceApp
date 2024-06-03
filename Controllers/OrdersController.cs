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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOrders(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from order in _context.Orders
                        join user in _context.Users on order.UserId equals user.Id into userGroup
                        from u in userGroup.DefaultIfEmpty()
                        join coupon in _context.Coupons on order.CouponId equals coupon.Id into couponGroup
                        from c in couponGroup.DefaultIfEmpty()
                        select new
                        {
                            order.Id,
                            order.OrderDate,
                            User = u != null ? new { u.Id, u.UserName } : null,
                            Coupon = c != null ? new { c.Id, c.Code, c.DiscountAmount } : null,
                            order.note,
                            order.Status,
                            OrderDetails = (from detail in _context.OrderDetails
                                            where detail.OrderId == order.Id
                                            select new
                                            {
                                                detail.Id,
                                                detail.Quantity,
                                                detail.UnitPrice,
                                                Product = (from product in _context.Products
                                                           where product.Id == detail.ProductId
                                                           select new
                                                           {
                                                               product.Id,
                                                               product.Name,
                                                               product.Price
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

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .Include(o => o.User)
                .Include(o => o.Coupon)
                .Where(o => o.Id == id)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    User = new { o.User.Id, o.User.UserName },
                    Coupon = o.Coupon != null ? new { o.Coupon.Id, o.Coupon.Code, o.Coupon.DiscountAmount } : null,
                    o.note,
                    o.Status,
                    OrderDetails = o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.Quantity,
                        od.UnitPrice,
                        Product = new { od.Product.Id, od.Product.Name, od.Product.Price }
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

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
    public class CouponsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CouponsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Coupons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(int? page = 1, int? pageSize = 10)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var totalCount = await _context.Coupons.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await _context.Coupons
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }

        // GET: api/Coupons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCoupon(int id)
        {
            if (_context.Coupons == null)
            {
                return NotFound();
            }
            var coupon = await _context.Coupons.FindAsync(id);

            if (coupon == null)
            {
                return NotFound();
            }

            return coupon;
        }

        // PUT: api/Coupons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
        {
            if (id != coupon.Id)
            {
                return BadRequest();
            }

            _context.Entry(coupon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(id))
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

        // POST: api/Coupons
        [HttpPost]
        public async Task<ActionResult<Coupon>> CreateCoupon(Coupon coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Coupons.Add(coupon);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetCoupon), new { id = coupon.Id }, coupon);
        }

        // DELETE: api/Coupons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            if (_context.Coupons == null)
            {
                return NotFound();
            }
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Coupons/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateCouponStatus(int id, [FromBody] bool status)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            coupon.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CouponExists(int id)
        {
            return (_context.Coupons?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private const string CartSessionKey = "CartItems";

        public ShopController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToCart(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            List<CartItem> cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var existingCartItem = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity++;
            }
            else
            {
                cartItems.Add(new CartItem
                {
                    ProductId = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    ImageUrl = product.ProductImages,
                    Quantity = 1
                });
            }

            HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);

            return Ok(cartItems);
        }

        [HttpGet]
        public IActionResult GetCartItems()
        {
            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();
            return Ok(cartItems);
        }

        [HttpDelete("{productId}")]
        public IActionResult RemoveFromCart(int productId)
        {
            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var productToRemove = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (productToRemove != null)
            {
                cartItems.Remove(productToRemove);

                HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);
                return Ok(cartItems);
            }
            else
            {
                return NotFound("Product not found in the cart.");
            }
        }


        [HttpPut("{productId}")]
        public IActionResult UpdateCartItemQuantity(int productId, int quantity)
        {
            if (quantity < 1)
            {
                return BadRequest("Quantity must be at least 1.");
            }

            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var existingCartItem = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity = quantity;
                HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);
                return Ok(cartItems);
            }
            else
            {
                return NotFound("Product not found in the cart.");
            }
        }
        [HttpGet("search")]
        public IActionResult SearchProducts(string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                // Nếu không có từ khóa tìm kiếm, trả về BadRequest
                return BadRequest("Search term is required.");
            }

            // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
            var products = _context.Products.Where(p => p.Name.Contains(searchTerm)).ToList();

            return Ok(products);
        }
        [HttpGet("filter")]
        public IActionResult FilterProducts(decimal minPrice, decimal maxPrice)
        {
            // Lọc danh sách sản phẩm dựa trên giá tối thiểu và tối đa
            var products = _context.Products
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToList();

            return Ok(products);
        }



    }


    // Session extensions for storing and retrieving complex objects
    public static class SessionExtensions
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, System.Text.Json.JsonSerializer.Serialize(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : System.Text.Json.JsonSerializer.Deserialize<T>(value);
        }
    }
}

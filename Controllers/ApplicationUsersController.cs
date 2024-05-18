using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using EcomerceApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ApplicationUsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetApplicationUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return users;
        }

        // GET: api/ApplicationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/ApplicationUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // You may need to update other user properties here as per your application logic
            await _userManager.UpdateAsync(applicationUser);

            return NoContent();
        }

        // POST: api/ApplicationUsers
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
        {
            var result = await _userManager.CreateAsync(applicationUser);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/ApplicationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(user);

            return NoContent();
        }

        // PUT: api/ApplicationUsers/5/roles
        [HttpPut("{id}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string id, [FromBody] List<string> roles)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Get the current roles for the user
            var userRoles = await _userManager.GetRolesAsync(user);

            // Remove the user from current roles
            await _userManager.RemoveFromRolesAsync(user, userRoles);

            // Add the user to the new roles
            var result = await _userManager.AddToRolesAsync(user, roles);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        private async Task<bool> ApplicationUserExists(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return (user != null);
        }
    }
}

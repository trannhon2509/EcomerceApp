using Microsoft.AspNetCore.Identity;

namespace EcomerceApp.Models;

public class ApplicationUser : IdentityUser
{
    public string imgUrl { get; set; }
    // Định nghĩa quan hệ 1-n với bảng Order
    public ICollection<Order> Orders { get; set; }

    // Định nghĩa quan hệ 1-n với bảng Address
    public ICollection<Address> Addresses { get; set; }

    // Quan hệ 1-n với ProductComment
    public ICollection<ProductComment> ProductComments { get; set; }

    // Quan hệ 1-n với BlogPostComment
    public ICollection<BlogPostComment> BlogPostComments { get; set; }

    public ICollection<BlogPost> BlogPosts { get; set; }
}

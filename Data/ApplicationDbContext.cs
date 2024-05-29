using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using EcomerceApp.Models;
using System.Reflection.Emit;

namespace EcomerceApp.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<ProductComment> ProductComments { get; set; }
    public DbSet<BlogPostComment> BlogPostComments { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            if (entityType.GetTableName().StartsWith("AspNet"))
            {
                entityType.SetTableName(entityType.GetTableName().Substring(6));
            }
        }
        // Thiết lập quan hệ 1-n giữa Order và OrderDetail
        builder.Entity<Order>()
            .HasMany(o => o.OrderDetails)
            .WithOne(od => od.Order)
            .HasForeignKey(od => od.OrderId);

        // Thiết lập quan hệ n-1 giữa OrderDetail và Product
        builder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ProductId);

        // Thêm các quy tắc, ràng buộc hoặc index nếu cần
        // Ví dụ: Thiết lập độ dài tối đa cho Name trong Product là 100
        builder.Entity<Product>()
            .Property(p => p.Name)
            .HasMaxLength(100);

        // Thiết lập quan hệ n-1 giữa Order và User
        builder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);
       
        builder.Entity<Order>()
            .HasOne(o => o.Coupon)
            .WithMany() // Một coupon có thể được sử dụng cho nhiều đơn hàng
            .HasForeignKey(o => o.CouponId)
            .OnDelete(DeleteBehavior.Restrict); // Không cho phép xóa coupon khi đã được sử dụng

        builder.Entity<Order>()
       .Property(o => o.CouponId)
       .IsRequired(false); // Thiết lập để cho phép giá trị null

        // Thiết lập quan hệ n-1 giữa Product và ProductCategory
        builder.Entity<Product>()
            .HasOne(p => p.ProductCategory)
            .WithMany(pc => pc.Products)
            .HasForeignKey(p => p.ProductCategoryId);

        // Thiết lập quan hệ n-1 giữa BlogPost và Blog
        builder.Entity<BlogPost>()
            .HasOne(bp => bp.Blog)
            .WithMany(b => b.BlogPosts)
            .HasForeignKey(bp => bp.BlogId);

        // Thiết lập quan hệ n-1 giữa BlogPost và ApplicationUser
        builder.Entity<BlogPost>()
              .HasOne(bp => bp.Author)
              .WithMany(u => u.BlogPosts)
              .HasForeignKey(bp => bp.AuthorId);
        // Giữ cho các bài đăng blog tồn tại ngay cả khi tác giả bị xóa
        builder.Entity<BlogPost>()
        .HasOne(bp => bp.Author)
        .WithMany(u => u.BlogPosts)
        .HasForeignKey(bp => bp.AuthorId)
        .OnDelete(DeleteBehavior.NoAction);

        // Thiết lập quan hệ n-1 giữa ProductComment và User
        builder.Entity<ProductComment>()
            .HasOne(pc => pc.User)
            .WithMany(u => u.ProductComments)
            .HasForeignKey(pc => pc.UserId);
        // Thiết lập quan hệ n-1 giữa ProductComment và Product
        builder.Entity<ProductComment>()
            .HasOne(pc => pc.Product)
            .WithMany(p => p.ProductComments)
            .HasForeignKey(pc => pc.ProductId);

        // Thiết lập quan hệ n-1 giữa BlogPostComment và User
        builder.Entity<BlogPostComment>()
            .HasOne(bpc => bpc.User)
            .WithMany(u => u.BlogPostComments)
            .HasForeignKey(bpc => bpc.UserId);

        // Thiết lập quan hệ n-1 giữa BlogPostComment và BlogPost
        builder.Entity<BlogPostComment>()
            .HasOne(bpc => bpc.BlogPost)
            .WithMany(bp => bp.BlogPostComments)
            .HasForeignKey(bpc => bpc.BlogPostId);
    }
}

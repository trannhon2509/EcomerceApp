using EcomerceApp.Models;
using Microsoft.AspNetCore.Identity;
using System;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace EcomerceApp.Data
{
    public class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            System.Random random = new System.Random();

            // Kiểm tra xem bảng ProductCategory đã có dữ liệu chưa
            if (!context.ProductCategories.Any())
            {
                // Thêm dữ liệu ngẫu nhiên cho ProductCategory
                const int numberOfCategories = 10; // Số lượng danh mục sản phẩm muốn tạo

                for (int i = 0; i < numberOfCategories; i++)
                {
                    string categoryName = GenerateRandomString(random, 10); // Tạo tên ngẫu nhiên

                    context.ProductCategories.Add(new EcomerceApp.Models.ProductCategory
                    {
                        Name = categoryName
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Category---------"+ex.Message);
                }
            }

            if (!context.Products.Any())
            {
                // Lấy danh sách danh mục từ cơ sở dữ liệu
                List<ProductCategory> categories = context.ProductCategories.ToList();

                // Thêm các sản phẩm với danh mục và thông tin ngẫu nhiên
                const int numberOfProducts = 50; // Số lượng sản phẩm muốn tạo
                for (int i = 0; i < numberOfProducts; i++)
                {
                    string productName = "Product " + i;
                    int randomCategoryId = random.Next(0, categories.Count); // Chọn ngẫu nhiên một danh mục
                    var category = categories[randomCategoryId];

                    // Tạo giá và số lượng ngẫu nhiên
                    decimal randomPrice = GenerateRandomPrice(random);
                    int randomQuantity = GenerateRandomQuantity(random);

                    context.Products.Add(new Product
                    {
                        Name = productName,
                        Description = "Description for " + productName,
                        Price = randomPrice,
                        Quantity = randomQuantity,
                        ImageUrl = "https://example.com/image.jpg", // URL hình ảnh của sản phẩm
                        Status = true, // Mặc định sản phẩm là hoạt động
                        ProductCategoryId = category.Id // Gán ID của danh mục đã chọn
                    });
                }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Product------------"+ex.Message);
                }
            }

            if (!context.Roles.Any())
            {
                 string[] roles = {"Admin", "User", "Blogger"};
                foreach (var role in roles)
                {
                    context.Roles.Add(new IdentityRole
                    {
                        Name = role,
                        NormalizedName = role.ToUpper(),
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    });
                    
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Role----------"+ex.Message);
                }
            }

            if (!context.Users.Any())
            {
                const int numberOfUsers = 100; // Số lượng người dùng muốn tạo
                for (int i = 0; i < numberOfUsers; i++)
                {
                    string userName = "User" + i;
                    string email = "user" + i + "@example.com";
                    string password = "123456";

                    context.Users.Add(new ApplicationUser
                    {
                        UserName = userName,
                        Email = email,
                        EmailConfirmed = true,
                        NormalizedEmail = email.ToUpper(),
                        NormalizedUserName = userName.ToUpper(),
                        SecurityStamp = Guid.NewGuid().ToString("D"),
                        PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(null, password),
                        imgUrl = "https://example.com/avatar.jpg", // URL hình ảnh đại diện của người dùng
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("User-----------"+ex.Message);
                }
            }

            if (!context.ProductComments.Any())
            {
                const int numberOfComments = 100; // Số lượng bình luận muốn tạo
                for (int i = 0; i < numberOfComments; i++)
                {
                    int randomProductId = random.Next(1, context.Products.Count()); // Chọn ngẫu nhiên một sản phẩm
                    var listUser = context.Users.ToList();
                    var listId = new List<string>();
                   
                    foreach (var user in listUser)
                    {
                        listId.Add(user.Id);
                    }
                    string randomUserId = listId[random.Next(0, listId.Count)]; // Chọn ngẫu nhiên một người dùng
                    context.ProductComments.Add(new ProductComment
                    {
                        Content = "Comment " + i,
                        ProductId = randomProductId,
                        UserId = randomUserId,
                        CreatedAt = RandomDateTime(2023,2024)
                    });
                    
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("ProductCommnets-----------" + ex.Message);
                }
            }


            if (!context.Coupons.Any())
            {
                const int numberOfCoupons = 100; // Số lượng mã giảm giá muốn tạo
                for (int i = 0; i < numberOfCoupons; i++)
                {
                    context.Coupons.Add(new Coupon
                    {
                        Code = GenerateRandomString(random,8),
                        DiscountAmount = random.Next(1, 100), // Giảm giá từ 1 đến 100%
                        ExpiryDate = RandomDateTime(2023,2024),
                        Status = ((random.Next(1,2) == 1 ) ? true : false)
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Coupon-----------" + ex.Message);
                }
            }

            if (!context.Orders.Any())
            {
                const int numberOfOrders = 100; // Số lượng đơn hàng muốn tạo
                var userList = context.Users.Select(user => user.Id).ToList();
                var couponCount = context.Coupons.Count();

                for (int i = 0; i < numberOfOrders; i++)
                {
                    string randomUserId = userList[random.Next(userList.Count)]; // Chọn ngẫu nhiên một người dùng
                    bool hasNullCoupon = random.Next(0, 9) == 1; // Có sử dụng mã giảm giá hay không

                    Order newOrder = new Order
                    {
                        UserId = randomUserId,
                        OrderDate = RandomDateTime(2023, 2024),
                        Status = RandomStringFromArray(new string[] { "Pending", "Processing", "Completed", "Cancelled", "Delivering" })
                    };

                    if (!hasNullCoupon && couponCount > 0)
                    {
                        newOrder.CouponId = random.Next(1, couponCount + 1); // Chọn ngẫu nhiên một mã giảm giá
                    }

                    context.Orders.Add(newOrder);
                }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Orders-----------" + ex.Message);
                }
            }

            if (!context.OrderDetails.Any())
            {
                if (context.Orders.Any() && context.Products.Any())
                {
                    const int numberOfOrderDetails = 500; // Số lượng chi tiết đơn hàng muốn tạo
                    var orderIds = context.Orders.Select(order => order.Id).ToList();
                    var productIds = context.Products.Select(product => product.Id).ToList();

                    for (int i = 0; i < numberOfOrderDetails; i++)
                    {
                        int randomOrderId = orderIds[random.Next(orderIds.Count)]; // Chọn ngẫu nhiên một đơn hàng từ danh sách tồn tại
                        int randomProductId = productIds[random.Next(productIds.Count)]; // Chọn ngẫu nhiên một sản phẩm từ danh sách tồn tại
                        int randomQuantity = random.Next(1, 100); // Số lượng từ 1 đến 100
                        decimal randomPrice = GenerateRandomPrice(random); // Giá ngẫu nhiên

                        context.OrderDetails.Add(new OrderDetail
                        {
                            OrderId = randomOrderId,
                            ProductId = randomProductId,
                            Quantity = randomQuantity,
                            UnitPrice = randomPrice
                        });
                    }

                    try
                    {
                        context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("OrderDetails-----------" + ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Không có đơn hàng hoặc sản phẩm trong cơ sở dữ liệu.");
                }
            }



            if (!context.Addresses.Any())
            {
                const int numberOfAddresses = 250; // Số lượng địa chỉ muốn tạo

                // Lấy danh sách UserId trực tiếp từ cơ sở dữ liệu
                var userIds = context.Users.Select(u => u.Id).ToList();

                for (int i = 0; i < numberOfAddresses; i++)
                {
                    string randomUserId = userIds[random.Next(userIds.Count)]; // Chọn ngẫu nhiên một người dùng

                    bool hasDefaultAddress = context.Addresses.Any(a => a.UserId == randomUserId && a.IsDefault == true); // Kiểm tra xem người dùng đã có địa chỉ mặc định chưa
                    

                    // Tạo mới địa chỉ
                    var newAddress = new Address
                    {
                        UserId = randomUserId,
                        City = "City " + i,
                        Street = "Street " + i,
                        State = "State " + i,
                        ZipCode = "ZipCode " + i,
                        IsDefault = true
                    };

                    if (hasDefaultAddress)
                    {
                        newAddress.IsDefault = false;
                    }

                    context.Addresses.Add(newAddress);
                    try
                    {
                        context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        // Ghi log lỗi
                        Console.WriteLine("Address-----------" + ex.Message);
                    }
                }

                
            }

            if (!context.UserRoles.Any())
            {
                var userList = context.Users.ToList();
                var roleList = context.Roles.ToList();
                foreach (var user in userList)
                {
                    // Số lượng vai trò ngẫu nhiên từ 1 đến 3
                    int numberOfRoles = random.Next(1, 4);

                    // Chọn ngẫu nhiên các vai trò
                    var selectedRoles = roleList.OrderBy(r => random.Next()).Take(numberOfRoles).ToList();

                    // Thêm vai trò cho người dùng
                    foreach (var role in selectedRoles)
                    {
                        context.UserRoles.Add(new IdentityUserRole<string>
                        {
                            UserId = user.Id,
                            RoleId = role.Id
                        });
                    }
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("UserRole-----------" + ex.Message);
                }
            }

            if (!context.Blogs.Any())
            {
                const int numberOfBlogs = 5; // Số lượng bài viết muốn tạo
                for (int i = 0; i < numberOfBlogs; i++)
                {
                    string blogTitle = "Blog " + i;
                    string blogContent = "Content for " + blogTitle;
                    string randomUserId = context.Users.Select(u => u.Id).ToList()[random.Next(context.Users.Count())]; // Chọn ngẫu nhiên một người dùng

                    context.Blogs.Add(new Blog
                    {
                        Title = blogTitle,
                        Description = GenerateRandomString(random, 100),
                    });
                }
                context.SaveChanges();
            }
            if (!context.BlogPosts.Any())
            {
                const int numberOfBlogPosts = 50; // Số lượng bài viết muốn tạo
                for (int i = 0; i < numberOfBlogPosts; i++)
                {
                    string postTitle = "Post " + i;
                    string postContent = "Content for " + postTitle;
                    int randomBlogId = context.Blogs.Select(b => b.Id).ToList()[random.Next(context.Blogs.Count())]; // Chọn ngẫu nhiên một blog
                    string randomUserId = context.Users.Select(u => u.Id).ToList()[random.Next(context.Users.Count())]; // Chọn ngẫu nhiên một người dùng

                    context.BlogPosts.Add(new BlogPost
                    {
                        Title = postTitle,
                        Content = postContent,
                        BlogId = randomBlogId,
                        PostedOn = RandomDateTime(2023, 2024),
                        AuthorId = randomUserId
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("BlogPosts-----------" + ex.Message);
                }
            }
            if (!context.BlogPostComments.Any())
            {
                const int numberOfBlogPostComments = 100; // Số lượng bình luận muốn tạo
                for (int i = 0; i < numberOfBlogPostComments; i++)
                {
                    int randomBlogPostId = context.BlogPosts.Select(bp => bp.Id).ToList()[random.Next(context.BlogPosts.Count())]; // Chọn ngẫu nhiên một bài viết
                    string randomUserId = context.Users.Select(u => u.Id).ToList()[random.Next(context.Users.Count())]; // Chọn ngẫu nhiên một người dùng

                    context.BlogPostComments.Add(new BlogPostComment
                    {
                        Content = "Comment " + i + GenerateRandomString(random,200),
                        BlogPostId = randomBlogPostId,
                        UserId = randomUserId,
                        CreatedAt = RandomDateTime(2023, 2024)
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("BlogPostComments-----------" + ex.Message);
                }
            }

        }

        // Phương thức để tạo chuỗi ngẫu nhiên
        private static string GenerateRandomString(System.Random random, int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // Phương thức để tạo giá ngẫu nhiên
        private static decimal GenerateRandomPrice(System.Random random)
        {
            // Giá từ 10 đến 1000
            return Math.Round((decimal)(random.NextDouble() * (1000 - 10) + 10), 2);
        }

        // Phương thức để tạo số lượng ngẫu nhiên
        private static int GenerateRandomQuantity(System.Random random)
        {
            // Số lượng từ 1 đến 100
            return random.Next(1, 101);
        }
        private static DateTime RandomDateTime(int startYear, int endYear)
        {
            Random random = new Random();
            DateTime startDate = new DateTime(startYear, 1, 1);
            DateTime endDate = new DateTime(endYear + 1, 1, 1).AddDays(-1); // Trừ đi 1 ngày để kết thúc ở cuối năm trước đó.
            TimeSpan timeSpan = endDate - startDate;
            TimeSpan randomSpan = new TimeSpan(0, random.Next(0, (int)timeSpan.TotalMinutes), 0);
            return startDate + randomSpan;
        }
        private static string RandomStringFromArray(string[] array)
        {
            Random random = new Random();
            if (array == null || array.Length == 0)
            {
                throw new ArgumentException("Mảng chuỗi không hợp lệ.");
            }

            int randomIndex = random.Next(0, array.Length);
            return array[randomIndex];
        }
    }
}

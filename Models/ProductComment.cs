﻿namespace EcomerceApp.Models
{
    public class ProductComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } // Khóa ngoại đến bảng User
        public int ProductId { get; set; } // Khóa ngoại đến bảng Product

        // Quan hệ n-1 với User
        public ApplicationUser User { get; set; }

        // Quan hệ n-1 với Product
        public Product Product { get; set; }
    }
}

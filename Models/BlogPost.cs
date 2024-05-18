namespace EcomerceApp.Models
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public int BlogId { get; set; } // Khóa ngoại đến bảng Blog
        public string AuthorId { get; set; } // Khóa ngoại đến bảng ApplicationUser

        // Quan hệ n-1 với Blog
        public Blog Blog { get; set; }

        // Quan hệ 1-n với BlogPostComment
        public ICollection<BlogPostComment> BlogPostComments { get; set; }

        public ApplicationUser Author { get; set; }
    }
}

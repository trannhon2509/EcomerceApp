namespace EcomerceApp.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể

        // Quan hệ 1-n với BlogPost
        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}

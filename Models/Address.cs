namespace EcomerceApp.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Khóa ngoại đến bảng User
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public bool IsDefault { get; set; }
        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể

        // Định nghĩa quan hệ n-1 với bảng User
        public ApplicationUser User { get; set; }
    }
}

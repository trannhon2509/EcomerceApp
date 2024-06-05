namespace EcomerceApp.DTOs
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Information { get; set; }
        public bool Status { get; set; }
        public string ProductCategoryName { get; set; }
        public List<string> Images { get; set; }
    }
}

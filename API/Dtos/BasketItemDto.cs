using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(1,double.MaxValue)]

        public decimal Price { get; set; }
        [Required]
        [Range(1,double.MaxValue)]

        public int Quantity { get; set; }
        [Required]

        public string PictureUrl { get; set; }
        [Required]

        public string Brand { get; set; }
        [Required]

        public string Type { get; set; }

    }
}
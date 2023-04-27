using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
    }
}

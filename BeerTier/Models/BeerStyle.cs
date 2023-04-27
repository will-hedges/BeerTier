using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class BeerStyle
    {
        public int Id { get; set; }

        [Required]
        public int BeerId { get; set; }

        [Required]
        public int StyleId { get; set; }

        public Beer Beer { get; set; }
        public Style Style { get; set; }
    }
}

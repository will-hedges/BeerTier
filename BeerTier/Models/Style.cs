using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class Style
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }
    }
}

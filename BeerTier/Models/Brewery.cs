using System;
using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class Brewery
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public int ImageLocation { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}

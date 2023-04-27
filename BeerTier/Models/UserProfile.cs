using System;
using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(25)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(25)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(25)]
        public string DisplayName { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public int ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
    }
}

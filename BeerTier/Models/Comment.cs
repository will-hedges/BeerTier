using System;
using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int BeerId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public Beer Beer { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}

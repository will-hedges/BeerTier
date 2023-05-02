using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BeerTier.Models
{
    public class Beer
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }
        public string Content { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public int BreweryId { get; set; }
        public int CategoryId { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public Brewery Brewery { get; set; }
        public Category Category { get; set; }
        public List<Style> Styles { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<Comment> Comments { get; set; }
    }
}

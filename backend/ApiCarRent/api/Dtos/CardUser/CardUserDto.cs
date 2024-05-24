using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.CardUser
{
    public class CardUserDto
    {
        [Required]
        public int CardUserId { get; set; }
        [Required]
        public string? Logo { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? ShortName { get; set; }
        [Required]
        public string? Bin { get; set; }
        [Required]
        public string? CardNumber { get; set; }
        [Required]
        public string? Release { get; set; }
        [Required]
        public string? CardHolderName { get; set; }
    }
}
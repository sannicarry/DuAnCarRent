using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        public string? Address { get; set; }
        [Required]
        public string? Phone { get; set; }
        [Required(ErrorMessage = "BirthDay is required.")]
        [RegularExpression(@"^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$", ErrorMessage = "Invalid date format. Please enter DD-MM-YYYY.")]
        public string? BirthDay { get; set; }
        [Required]
        public Boolean Gender { get; set; }
    }
}
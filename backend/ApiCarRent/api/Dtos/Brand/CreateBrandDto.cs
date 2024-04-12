using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Brand
{
    public class CreateBrandDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "BrandName must be 3 characters")]
        [MaxLength(100, ErrorMessage = "BrandName cannot be over 100 characters")]
        public string BrandName { get; set; } = string.Empty;
        [Required]
        [MinLength(3, ErrorMessage = "Address must be 3 characters")]
        [MaxLength(100, ErrorMessage = "Address cannot be over 100 characters")]
        public string Address { get; set; } = string.Empty;
        [Required]
        [MinLength(3, ErrorMessage = "Phone must be 8 characters")]
        [MaxLength(100, ErrorMessage = "Phone cannot be over 15 characters")]
        public string Phone { get; set; } = string.Empty;
    }
}
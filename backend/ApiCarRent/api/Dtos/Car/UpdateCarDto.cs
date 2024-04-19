using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Car
{
    public class UpdateCarDto
    {
        [Required]
        public string Make { get; set; } = string.Empty;
        [Required]
        public string Model { get; set; } = string.Empty;
        [Required]
        public string Type { get; set; } = string.Empty;
        [Required]
        [Range(1, 200)]
        public int Gasoline { get; set; }
        [Required]
        [Range(2, 8)]
        public int Capacity { get; set; }
        [Required]
        [RegularExpression(@"^\d{4}$")]
        public string Year { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000)]
        public int CityMpg { get; set; }
        [Required]
        public string Fuel { get; set; } = string.Empty;
        [Required]
        public string Transmission { get; set; } = string.Empty;
        [Required]
        public int BrandId { get; set; }
    }
}
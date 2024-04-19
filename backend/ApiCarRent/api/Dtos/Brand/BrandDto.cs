using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Car;
using api.Models;

namespace api.Dtos.Brand
{
    public class BrandDto
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public List<CarDto>? Cars { get; set; }
    }
}
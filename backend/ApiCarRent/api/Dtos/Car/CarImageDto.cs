using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Car
{
    public class CarImageDto
    {
        public int CarImageId { get; set; }
        public int? CarId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
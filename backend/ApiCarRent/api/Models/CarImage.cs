using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CarImage
    {
        public int CarImageId { get; set; }
        public int CarId { get; set; }
        public Car? Car { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
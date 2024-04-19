using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Photo;
using api.Models;

namespace api.Dtos.Car
{
    public class CarDto
    {
        public int CarId { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Gasoline { get; set; }
        public int Capacity { get; set; }
        public string Year { get; set; } = string.Empty;
        public int CityMpg { get; set; }
        public string Fuel { get; set; } = string.Empty;
        public string Transmission { get; set; } = string.Empty;
        public List<PhotoDto>? Photos { get; set; }
        public int BrandId { get; set; }
    }
}
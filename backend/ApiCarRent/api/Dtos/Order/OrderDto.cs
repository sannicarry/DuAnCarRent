using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Car;

namespace api.Dtos.Order
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public AppUserDto? User { get; set; }
        public CarDto? Car { get; set; }
        public string LocationFrom { get; set; } = string.Empty;
        public DateTime DateFrom { get; set; } = DateTime.Now;
        public TimeSpan TimeFrom { get; set; } = DateTime.Now.TimeOfDay;
        public string LocationTo { get; set; } = string.Empty;
        public DateTime DateTo { get; set; } = DateTime.Now;
        public TimeSpan TimeTo { get; set; } = DateTime.Now.TimeOfDay;
        public decimal TotalPrice { get; set; }
        public int Status { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class CreateOrderDto
    {
        public string UserId { get; set; } = string.Empty;
        public int CarId { get; set; }
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
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public string LocationFrom { get; set; } = string.Empty;
        public DateTime DateFrom { get; set; } = DateTime.Now;
        public DateTime TimeFrom { get; set; } = DateTime.Now;
        public string LocationTo { get; set; } = string.Empty;
        public DateTime DateTo { get; set; } = DateTime.Now;
        public DateTime TimeTo { get; set; } = DateTime.Now;
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public int Status { get; set; }
    }
}
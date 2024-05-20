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
        public AppUser? User { get; set; }
        public OrderRecipient? OrderRecipient { get; set; }
        public Car? Car { get; set; }
        public virtual Payment? Payment { get; set; }
        public string LocationFrom { get; set; } = string.Empty;
        public DateTime DateFrom { get; set; } = DateTime.Now;
        public TimeSpan TimeFrom { get; set; } = DateTime.Now.TimeOfDay;
        public string LocationTo { get; set; } = string.Empty;
        public DateTime DateTo { get; set; } = DateTime.Now;
        public TimeSpan TimeTo { get; set; } = DateTime.Now.TimeOfDay;
        public int StatusOrder { get; set; }
        public int StatusPayment { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class CreateOrderDto
    {
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public int CarId { get; set; }
        [Required]
        public int PaymentId { get; set; }
        [Required]
        public int OrderRecipientId { get; set; }
        [Required]
        public string LocationFrom { get; set; } = string.Empty;
        [Required]
        public DateTime DateFrom { get; set; } = DateTime.Now;
        [Required]
        public TimeSpan TimeFrom { get; set; } = DateTime.Now.TimeOfDay;
        [Required]
        public string LocationTo { get; set; } = string.Empty;
        [Required]
        public DateTime DateTo { get; set; } = DateTime.Now;
        [Required]
        public TimeSpan TimeTo { get; set; } = DateTime.Now.TimeOfDay;
        [Required]
        public int StatusOrder { get; set; }
        [Required]
        public int StatusPayment { get; set; }
    }
}
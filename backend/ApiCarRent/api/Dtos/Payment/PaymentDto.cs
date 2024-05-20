using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Payment
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public string? PaymentReference { get; set; }
        public string? UserId { get; set; }
        public int Method { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice => Price * Quantity;
        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }
}
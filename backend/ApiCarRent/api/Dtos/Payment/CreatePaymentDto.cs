using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Payment
{
    public class CreatePaymentDto
    {
        public string? PaymentReference { get; set; }
        public string? UserId { get; set; }
        public int Method { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }
}
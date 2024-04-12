using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int? CarId { get; set; }
        public Car? Car { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
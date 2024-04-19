using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Photo
    {
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; } = string.Empty;
        public int? PhotoType { get; set; }
        public virtual Car? Car { get; set; }
        public virtual AppUser? AppUser { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CardUser
    {
        public int CardUserId { get; set; }
        public virtual AppUser? AppUser { get; set; }
        public string? Logo { get; set; }
        public string? Name { get; set; }
        public string? ShortName { get; set; }
        public string? Bin { get; set; }
        public string? CardNumber { get; set; }
        public string? Release { get; set; }
        public string? CardHolderName { get; set; }
    }
}
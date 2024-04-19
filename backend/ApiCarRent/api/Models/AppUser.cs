using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public string BirthDate { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public virtual List<Photo> Photos { get; set; } = new List<Photo>();
    }
}
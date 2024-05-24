using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public virtual List<Photo> Photos { get; set; } = new List<Photo>();
        public virtual List<CarFavorites> CarFavorites { get; set; } = new List<CarFavorites>();
        public virtual List<UserNotifications> UserNotifications { get; set; } = new List<UserNotifications>();
        public virtual List<OrderRecipient> OrderRecipient { get; set; } = new List<OrderRecipient>();
        public virtual List<CardUser> CardUser { get; set; } = new List<CardUser>();
    }
}
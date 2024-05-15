using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CarFavorites
    {
        public int CarFavoritesId { get; set; }
        public virtual AppUser? AppUser { get; set; }
        public virtual Car? Car { get; set; }

    }
}
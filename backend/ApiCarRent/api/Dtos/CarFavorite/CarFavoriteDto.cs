using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Car;

namespace api.Dtos.CarFavorite
{
    public class CarFavoriteDto
    {

        public int CarFavoritesId { get; set; }
        public CarDto? Car { get; set; }
    }
}
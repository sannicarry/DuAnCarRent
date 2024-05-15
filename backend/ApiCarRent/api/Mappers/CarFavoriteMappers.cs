using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Car;
using api.Dtos.CarFavorite;
using api.Models;

namespace api.Mappers
{
    public static class CarFavoriteMappers
    {
        public static CarFavoriteDto ToCarFavoriteDto(this CarFavorites carFavorites)
        {
            return new CarFavoriteDto
            {
                CarFavoritesId = carFavorites.CarFavoritesId,
                Car = carFavorites.Car?.ToCarDto(),
            };
        }
    }
}
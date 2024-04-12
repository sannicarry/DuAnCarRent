using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Car;
using api.Models;

namespace api.Mappers
{
    public static class CarImageMappers
    {
        public static CarImageDto ToCarImageDto(this CarImage carImage)
        {
            return new CarImageDto
            {
                CarImageId = carImage.CarImageId,
                CarId = carImage.CarId,
                ImageUrl = carImage.ImageUrl,
            };
        }
    }
}
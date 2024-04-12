using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Brand;
using api.Models;

namespace api.Mappers
{
    public static class BrandMappers
    {
        public static BrandDto ToBrandDto(this Brand brandModel)
        {
            return new BrandDto
            {
                BrandId = brandModel.BrandId,
                BrandName = brandModel.BrandName,
                Address = brandModel.Address,
                Phone = brandModel.Phone,
                Cars = brandModel.Cars.Select(c => c.ToCarDto()).ToList(),
            };
        }

        public static Brand ToBrandFromCreateDTO(this CreateBrandDto brandModel)
        {
            return new Brand
            {
                BrandName = brandModel.BrandName,
                Address = brandModel.Address,
                Phone = brandModel.Phone,
            };
        }
    }
}
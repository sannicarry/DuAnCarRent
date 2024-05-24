using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Brand;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IBrandRepository
    {
        Task<List<Brand>> GetAllAsync(QueryObject query);
        Task<Brand?> GetByIdAsync(int id);
        Task<Brand?> GetByBrandNameAsync(string name);
        Task<Brand> CreateAsync(Brand brandModel);
        Task<Brand?> UpdateAsync(int id, UpdateBrandDto brandDto);
        Task<Brand?> DeleteAsync(int id);
        Task<bool> BrandExists(int id);
        Task<int> GetCountBrandsAsync(QueryObject query);
        Task<bool> BrandExistsFromCar(int brandId);
        Task<bool> BrandNameExists(string brandName);
    }
}
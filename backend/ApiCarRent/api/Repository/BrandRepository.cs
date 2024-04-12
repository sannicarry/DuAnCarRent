using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Brand;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationDBContext _context;
        public BrandRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Brand>> GetAllAsync(QueryObject query)
        {
            var brands = await _context.Brand
                                .Include(c => c.Cars)
                                .Where(s => string.IsNullOrWhiteSpace(query.BrandName) || s.BrandName.Contains(query.BrandName))
                                .Skip((query.PageNumber - 1) * query.PageSize)
                                .Take(query.PageSize)
                                .ToListAsync();

            return brands;
        }

        public Task<Brand?> GetByBrandNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<Brand?> GetByIdAsync(int id)
        {
            return await _context.Brand.Include(c => c.Cars).FirstOrDefaultAsync(a => a.BrandId == id);
        }

        public async Task<Brand> CreateAsync(Brand brandModel)
        {
            await _context.AddAsync(brandModel);
            await _context.SaveChangesAsync();
            return brandModel;
        }

        public async Task<Brand?> UpdateAsync(int id, UpdateBrandDto brandDto)
        {
            var brandModel = await _context.Brand.FirstOrDefaultAsync(x => x.BrandId == id);
            if (brandModel == null)
            {
                return null;
            }
            brandModel.BrandName = brandDto.BrandName;
            brandModel.Address = brandDto.Address;
            brandModel.Phone = brandDto.Phone;
            await _context.SaveChangesAsync();
            return brandModel;
        }

        public async Task<Brand?> DeleteAsync(int id)
        {
            var brandModel = await _context.Brand.FirstOrDefaultAsync(x => x.BrandId == id);
            if (brandModel == null) return null;
            _context.Brand.Remove(brandModel);
            await _context.SaveChangesAsync();
            return brandModel;
        }
        public Task<bool> BrandExists(int id)
        {
            return _context.Brand.AnyAsync(s => s.BrandId == id);
        }

        public async Task<int> GetCountBrandsAsync()
        {
            var count = await _context.Brand.CountAsync();
            return count;
        }
    }
}
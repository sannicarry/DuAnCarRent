using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Azure.Core;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CarRepository : ICarRepository
    {
        private readonly ApplicationDBContext _context;
        public CarRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Car> CreateAsync(Car carModel)
        {
            await _context.Car.AddAsync(carModel);
            await _context.SaveChangesAsync();
            return carModel;
        }

        public async Task<Car?> UpdateAsync(Car carModel)
        {
            await _context.SaveChangesAsync();
            return carModel;
        }

        public async Task<Car?> DeleteAsync(int id)
        {
            var carModel = await _context.Car.FirstOrDefaultAsync(x => x.CarId == id);
            if (carModel == null)
            {
                return null;
            }
            _context.Car.Remove(carModel);
            await _context.SaveChangesAsync();
            return carModel;
        }

        public async Task<List<Car>> GetAllAsync(QueryObject query)
        {
            var cars = await _context.Car.Include(c => c.Photos)
                .Where(s => string.IsNullOrWhiteSpace(query.CarName) || (s.Make + s.Model).Replace(" ", "").Contains(query.CarName))
                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return cars;
        }


        public async Task<Car?> GetByIdAsync(int id)
        {
            return await _context.Car.Include(u => u.Photos).FirstOrDefaultAsync(x => x.CarId == id);
        }

        public async Task<int> GetCountCarsAsync()
        {
            var count = await _context.Car.CountAsync();
            return count;
        }


        public async Task<bool> CarExistsFromOrders(int carId)
        {
            return await _context.Order.AnyAsync(x => x.Car.CarId == carId);
        }

    }
}
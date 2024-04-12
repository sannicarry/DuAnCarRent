using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CarImageRepository : ICarImageRepository
    {
        private readonly ApplicationDBContext _context;
        public CarImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<string>> GetUrlByCarId(int carId)
        {
            return await _context.CarImage.Where(x => x.CarId == carId)
                               .Select(x => x.ImageUrl)
                               .ToListAsync();
        }

        public async Task<List<CarImage>> GetCarImageByCarId(int carId)
        {
            return await _context.CarImage.Where(x => x.CarId == carId).ToListAsync();
        }

        public async Task<CarImage?> UpdateImageAsync(int CarId, string url, int index)
        {
            var carImageModel = await _context.CarImage.Where(x => x.CarId == CarId)
                                                        .Skip(index)
                                                        .Take(1)
                                                        .FirstOrDefaultAsync();
            if (carImageModel != null)
            {
                carImageModel.ImageUrl = url;
                await _context.SaveChangesAsync();
            }
            return carImageModel;
        }

        public async Task<CarImage?> DeleteImageAsync(int carId, int carImageId)
        {
            var carImage = await _context.CarImage.FirstOrDefaultAsync(c => c.CarId == carId && c.CarImageId == carImageId);
            if (carImage == null) return null;
            _context.CarImage.Remove(carImage);
            await _context.SaveChangesAsync();
            return carImage;
        }

        public async Task<int> CountCarImagesByCarId(int carId)
        {
            var count = await _context.CarImage.CountAsync(c => c.CarId == carId);
            return count;
        }

        public async Task<CarImage> CreateImageAsync(int CarId, string imageUrl)
        {
            var carImageModel = new CarImage
            {
                CarId = CarId,
                ImageUrl = imageUrl
            };
            await _context.CarImage.AddAsync(carImageModel);
            await _context.SaveChangesAsync();
            return carImageModel;
        }
    }
}
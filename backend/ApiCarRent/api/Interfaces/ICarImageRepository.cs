using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICarImageRepository
    {
        Task<List<string>> GetUrlByCarId(int carId);
        Task<CarImage?> UpdateImageAsync(int carId, string url, int index);
        Task<CarImage?> DeleteImageAsync(int carId, int carImageId);
        Task<List<CarImage>> GetCarImageByCarId(int carId);
        Task<int> CountCarImagesByCarId(int carId);
        Task<CarImage> CreateImageAsync(int CarId, string imageUrl);
    }
}
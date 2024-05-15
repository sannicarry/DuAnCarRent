using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CarFavorite;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICarFavoriteRepository
    {
        Task<List<CarFavorites>> GetAllAsync(QueryObject query);
        // Task<CarFavorites?> GetByIdAsync(string userId);
        Task<CarFavorites> CreateAsync(CreateCarFavoriteDto carModel);
        Task<CarFavorites?> DeleteAsync(string userId, int carId);
        // Task<int> GetCountCarsAsync();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.CarFavorite;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CarFavoriteRepository : ICarFavoriteRepository
    {
        private readonly IAppUserRepository _userRepo;
        private readonly ICarRepository _carRepo;

        private readonly ApplicationDBContext _context;
        public CarFavoriteRepository(ApplicationDBContext context, IAppUserRepository userRepo, ICarRepository carRepo)
        {
            _context = context;
            _userRepo = userRepo;
            _carRepo = carRepo;
        }

        public async Task<CarFavorites> CreateAsync(CreateCarFavoriteDto carFavoritesModel)
        {

            var user = await _userRepo.GetUserById(carFavoritesModel.UserId);
            if (user == null) return null;
            var car = await _carRepo.GetByIdAsync(carFavoritesModel.CarId);
            if (car == null) return null;

            var carFavoriteModel = new CarFavorites
            {
                AppUser = user,
                Car = car,
            };

            await _context.CarFavorites.AddAsync(carFavoriteModel);
            await _context.SaveChangesAsync();
            return carFavoriteModel;
        }

        public async Task<CarFavorites?> DeleteAsync(string userId, int carId)
        {
            var CarFavoriteModel = await _context.CarFavorites.FirstOrDefaultAsync(x => x.AppUser.Id == userId && x.Car.CarId == carId);
            if (CarFavoriteModel == null)
            {
                return null;
            }
            _context.CarFavorites.Remove(CarFavoriteModel);
            await _context.SaveChangesAsync();
            return CarFavoriteModel;
        }

        public async Task<List<CarFavorites>> GetAllAsync(QueryObject query)
        {
            var cars = await _context.CarFavorites.Include(c => c.AppUser).Include(c => c.Car)
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return cars;
        }

        // public async Task<CarFavorites?> GetByIdAsync(string userId)
        // {
        //     return await _context.CarFavorites.Include(u => u.Car.ToCarDto()).FirstOrDefaultAsync(x => x.AppUser.Id == userId);
        // }

        // public Task<int> GetCountCarsAsync()
        // {
        //     throw new NotImplementedException();
        // }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Order;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRepository : IOrderRepository
    {

        private readonly IAppUserRepository _userRepo;
        private readonly ICarRepository _carRepo;
        private readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context, IAppUserRepository userRepo, ICarRepository carRepo)
        {
            _context = context;
            _userRepo = userRepo;
            _carRepo = carRepo;
        }

        public async Task<List<Order>> GetAllAsync(QueryObject query)
        {
            var orders = await _context.Order.Include(c => c.User).ThenInclude(c => c.Photos).Include(c => c.Car).ThenInclude(c => c.Photos)
                .Where(s => string.IsNullOrWhiteSpace(query.Search) || s.Car != null && (s.Car.Make + s.Car.Model).Replace(" ", "").Contains(query.CarName))
                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return orders;
        }



        public async Task<Order> GetByIdAsync(int id)
        {
            var orderModel = await _context.Order.Include(c => c.User).ThenInclude(c => c.Photos).Include(c => c.Car).ThenInclude(c => c.Photos)
            .FirstOrDefaultAsync(x => x.OrderId == id);
            if (orderModel == null) return null;
            return orderModel;
        }



        public async Task<Order> CreateAsync(CreateOrderDto createOrderDto)
        {
            var user = await _userRepo.GetUserById(createOrderDto.UserId);
            if (user == null) return null;
            var car = await _carRepo.GetByIdAsync(createOrderDto.CarId);
            if (car == null) return null;

            var orderModel = OrderMappers.ToOrderFromCreate(createOrderDto, user, car);

            _context.Order.Add(orderModel);
            await _context.SaveChangesAsync();

            return orderModel;
        }

        public async Task<Order?> UpdateAsync(Order order)
        {
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> DeleteAsync(int id)
        {
            var orderModel = await _context.Order.FirstOrDefaultAsync(x => x.OrderId == id);

            if (orderModel == null) return null;
            _context.Order.Remove(orderModel);
            await _context.SaveChangesAsync();
            return orderModel;
        }

        public async Task<int> GetCountOrdersAsync()
        {
            var count = await _context.Order.CountAsync();
            return count;
        }

        public async Task<Order?> UpdateStatusAsync(Order order)
        {
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> CarExists(int carId)
        {
            return await _context.Order.AnyAsync(x => x.Car.CarId == carId);
        }
    }
}
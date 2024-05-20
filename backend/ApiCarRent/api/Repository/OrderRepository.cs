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
        private readonly IPaymentRepository _paymentRepo;
        private readonly ApplicationDBContext _context;
        private readonly IOrderRecipientRepository _orderRecipientRepo;
        public OrderRepository(ApplicationDBContext context, IAppUserRepository userRepo,
        ICarRepository carRepo, IPaymentRepository paymentRepo, IOrderRecipientRepository orderRecipientRepo)
        {
            _context = context;
            _userRepo = userRepo;
            _carRepo = carRepo;
            _paymentRepo = paymentRepo;
            _orderRecipientRepo = orderRecipientRepo;
        }

        public async Task<List<Order>> GetAllAsync(QueryObject query)
        {
            var orders = await _context.Order.Include(c => c.User).ThenInclude(c => c.Photos).Include(c => c.Car).ThenInclude(c => c.Photos)
                .Include(c => c.Payment).Include(c => c.OrderRecipient)
                .Where(s => string.IsNullOrWhiteSpace(query.Search)
                || (s.Car != null && (s.Car.Make + s.Car.Model).Replace(" ", "").Contains(query.Search))
                || (s.User.UserName != null && s.User.UserName.Contains(query.Search))
                || (s.User.Email != null && s.User.Email.Contains(query.Search))
                || (s.User.PhoneNumber != null && s.User.PhoneNumber.Contains(query.Search)))

                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return orders;
        }



        public async Task<Order> GetByIdAsync(int id)
        {
            var orderModel = await _context.Order.Include(c => c.User).ThenInclude(c => c.Photos)
            .Include(c => c.Car).ThenInclude(c => c.Photos).Include(c => c.Payment).Include(c => c.OrderRecipient)
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
            var payment = await _paymentRepo.GetByIdAsync(createOrderDto.PaymentId);
            if (payment == null) return null;
            var orderRecipient = await _orderRecipientRepo.GetByIdAsync(createOrderDto.OrderRecipientId);
            if (orderRecipient == null) return null;

            var orderModel = OrderMappers.ToOrderFromCreate(createOrderDto, user, car, payment, orderRecipient);

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
            //Xóa luôn payment khi xóa order (trường hợp thanh toán tiền mặt sau đó hủy);
            await _paymentRepo.DeleteAsync(orderModel.Payment.PaymentId);
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

        public async Task<List<Order>> GetAllByUserIdAsync(QueryObject query, string userId)
        {
            var orders = await _context.Order.Include(c => c.User).ThenInclude(c => c.Photos).Include(c => c.Car).ThenInclude(c => c.Photos)
                .Include(c => c.Payment).Include(c => c.OrderRecipient)
                .Where(s => s.User.Id == userId && string.IsNullOrWhiteSpace(query.Search)
                || (s.Car != null && (s.Car.Make + s.Car.Model).Replace(" ", "").Contains(query.Search))
                || (s.User.UserName != null && s.User.UserName.Contains(query.Search))
                || (s.User.Email != null && s.User.Email.Contains(query.Search))
                || (s.User.PhoneNumber != null && s.User.PhoneNumber.Contains(query.Search)))

                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return orders;
        }
    }
}
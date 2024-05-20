using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.OrderRecipient;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRecipientRepository : IOrderRecipientRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderRecipientRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<OrderRecipient> CreateAsync(CreateOrderRecipientDto createOrderRecipientDto)
        {
            var user = await _context.AppUser.FindAsync(createOrderRecipientDto.UserId);
            var OrderRecipientModel = new OrderRecipient
            {
                AppUser = user,
                FirstName = createOrderRecipientDto.FirstName,
                LastName = createOrderRecipientDto.LastName,
                Email = createOrderRecipientDto.Email,
                PhoneNumber = createOrderRecipientDto.PhoneNumber,
            };

            _context.OrderRecipient.Add(OrderRecipientModel);
            await _context.SaveChangesAsync();

            return OrderRecipientModel;
        }

        public async Task<OrderRecipient?> DeleteAsync(int id)
        {
            var OrderRecipientModel = await _context.OrderRecipient.FirstOrDefaultAsync(x => x.OrderRecipientId == id);

            if (OrderRecipientModel == null) return null;
            _context.OrderRecipient.Remove(OrderRecipientModel);
            await _context.SaveChangesAsync();
            return OrderRecipientModel;
        }

        public async Task<List<OrderRecipient>> GetAllAsync(QueryObject query)
        {
            var OrderRecipients = await _context.OrderRecipient
                                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                                .ToListAsync();

            return OrderRecipients;
        }

        public async Task<OrderRecipient> GetByIdAsync(int id)
        {
            var OrderRecipientModel = await _context.OrderRecipient.FirstOrDefaultAsync(x => x.OrderRecipientId == id);
            if (OrderRecipientModel == null) return null;
            return OrderRecipientModel;
        }

        public async Task<OrderRecipient> UpdateAsync(int id, string firstName, string lastName, string email)
        {
            var OrderRecipientModel = await _context.OrderRecipient.FirstOrDefaultAsync(x => x.OrderRecipientId == id);
            if (OrderRecipientModel == null) return null;
            OrderRecipientModel.FirstName = firstName;
            OrderRecipientModel.LastName = lastName;
            OrderRecipientModel.Email = email;
            await _context.SaveChangesAsync();
            return OrderRecipientModel;
        }
    }
}
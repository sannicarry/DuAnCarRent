using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Payment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDBContext _context;
        public PaymentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Payment> CreateAsync(CreatePaymentDto paymentDto)
        {
            var paymentModel = new Payment
            {
                UserId = paymentDto.UserId,
                Method = paymentDto.Method,
                PaymentDate = paymentDto.PaymentDate,
                Price = paymentDto.Price,
                Quantity = paymentDto.Quantity,
                PaymentReference = paymentDto.PaymentReference,
            };

            await _context.Payment.AddAsync(paymentModel);
            await _context.SaveChangesAsync();
            return paymentModel;
        }

        public async Task<Payment> DeleteAsync(int paymentId)
        {
            var paymentModel = await _context.Payment.FirstOrDefaultAsync(x => x.PaymentId == paymentId);
            if (paymentModel == null)
            {
                return null;
            }
            _context.Payment.Remove(paymentModel);
            await _context.SaveChangesAsync();
            return paymentModel;
        }

        public async Task<List<Payment>> GetAllAsync(QueryObject query)
        {
            var payments = await _context.Payment
                        .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                        .ToListAsync();

            return payments;
        }

        public async Task<Payment> GetByIdAsync(int id)
        {
            var paymentModel = await _context.Payment.FirstOrDefaultAsync(x => x.PaymentId == id);
            if (paymentModel == null) return null;
            return paymentModel;
        }
    }
}
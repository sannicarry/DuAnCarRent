using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Payment;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllAsync(QueryObject query);
        Task<Payment> CreateAsync(CreatePaymentDto paymentDto);
        Task<Payment> GetByIdAsync(int id);
        Task<Payment> DeleteAsync(int paymentId);
    }
}
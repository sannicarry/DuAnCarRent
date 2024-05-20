using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OrderRecipient;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRecipientRepository
    {
        Task<List<OrderRecipient>> GetAllAsync(QueryObject query);
        Task<OrderRecipient> GetByIdAsync(int id);
        Task<OrderRecipient> CreateAsync(CreateOrderRecipientDto createOrderRecipientDto);
        Task<OrderRecipient> UpdateAsync(int id, string firstName, string lastName, string email);
        Task<OrderRecipient?> DeleteAsync(int id);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync(QueryObject query);
        Task<List<Order>> GetAllByUserIdAsync(QueryObject query, string userId);
        Task<Order> GetByIdAsync(int id);
        Task<Order> CreateAsync(CreateOrderDto createOrderDto);
        Task<Order?> UpdateAsync(Order order);
        Task<Order?> DeleteAsync(int id);
        Task<int> GetCountOrdersAsync();
        Task<Order?> UpdateStatusAsync(Order order);
    }
}
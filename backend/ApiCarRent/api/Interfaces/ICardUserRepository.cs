using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CardUser;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICardUserRepository
    {
        Task<List<CardUser>> GetAllAsync(QueryObject query);
        Task<CardUser> GetByIdAsync(int id);
        Task<CardUser> CreateAsync(CreateCardUserDto createCardUserDto);
        Task<CardUser?> DeleteAsync(int id);
    }
}
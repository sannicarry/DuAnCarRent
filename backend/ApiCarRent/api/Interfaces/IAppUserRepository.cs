using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Interfaces;
using api.Helpers;


namespace api.Interfaces
{
    public interface IAppUserRepository
    {
        Task<List<AppUser>> GetAllAsync(QueryObject query);
        Task<AppUser> GetUserById(string userId);
    }
}
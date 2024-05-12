using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Interfaces;
using api.Helpers;
using System.Security.Claims;


namespace api.Interfaces
{
    public interface IAppUserRepository
    {
        Task<List<AppUser>> GetAllAsync(QueryObject query);
        Task<AppUser> GetUserById(string userId);
        Task CreateRole(string roleName);
        Task CreateAdmin();
        Task CreateRoleClaims(string roleName, List<Claim> roleClaims);
        Task<bool> RoleExists(string roleName);
    }
}
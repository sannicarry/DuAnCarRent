using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;

namespace api.Interfaces
{
    public interface ITokenService
    {
        List<ClaimInfo> GetUserRole();
        Task<string> CreateTokenAsync(AppUser user);
    }
}
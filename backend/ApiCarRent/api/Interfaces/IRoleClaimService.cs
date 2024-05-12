using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;

namespace api.Interfaces
{
    public interface IRoleClaimService
    {
        public Task SeedData();
        public Task<List<ClaimInfo>> GetUserRoleClaims(AppUser user);

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IUserClaimService
    {
        public Task SetUserClaimsAsync(AppUser user, List<Claim> claims);
    }
}
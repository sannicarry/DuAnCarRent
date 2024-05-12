using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Service
{
    public class UserClaimService : IUserClaimService
    {
        private readonly UserManager<AppUser> _userManager;

        public UserClaimService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task SetUserClaimsAsync(AppUser user, List<Claim> claims)
        {
            var existingClaims = await _userManager.GetClaimsAsync(user);

            var newClaims = claims.Where(c => !existingClaims.Any(ec => ec.Type == c.Type && ec.Value == c.Value)).ToList();

            if (newClaims.Any())
            {
                await _userManager.AddClaimsAsync(user, newClaims);
            }
        }
    }
}
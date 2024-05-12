using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppUser;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class RoleClaimService : IRoleClaimService
    {
        private readonly IAppUserRepository _userRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDBContext _context;
        private readonly SignInManager<AppUser> _signInManager;

        public RoleClaimService(IAppUserRepository userRepository, UserManager<AppUser> userManager,
        ApplicationDBContext context, SignInManager<AppUser> signInManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }
        public async Task SeedData()
        {
            var adminRoleExists = await _userRepository.RoleExists("Admin");
            if (!adminRoleExists)
            {
                await _userRepository.CreateRole("Admin");

                var adminRoleClaims = new List<Claim>();

                foreach (var claim in SettingAdminRoleClaims.RoleClaims)
                {
                    adminRoleClaims.Add(new Claim(claim.Type, claim.Value));
                };

                await _userRepository.CreateRoleClaims("Admin", adminRoleClaims);
            }

            var userRoleExists = await _userRepository.RoleExists("User");
            if (!userRoleExists)
            {
                await _userRepository.CreateRole("User");

                var userRoleClaims = new List<Claim>();

                foreach (var claim in SettingUserRoleClaims.RoleClaims)
                {
                    userRoleClaims.Add(new Claim(claim.Type, claim.Value));
                };
                await _userRepository.CreateRoleClaims("User", userRoleClaims);
            }

            var admin = await _userManager.FindByNameAsync("admin");
            if (admin == null)
            {
                await _userRepository.CreateAdmin();
            }
        }

        public async Task<List<ClaimInfo>> GetUserRoleClaims(AppUser user)
        {
            //chuyển qua principal để sử dụng FindFirstValue
            var principal = await _signInManager.CreateUserPrincipalAsync(user);

            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return null;
            }

            var userRoleClaims = await (from rc in _context.RoleClaims
                                        join ur in _context.UserRoles on rc.RoleId equals ur.RoleId
                                        where ur.UserId == userId
                                        select new ClaimInfo { Type = rc.ClaimType, Value = rc.ClaimValue }).ToListAsync();

            return userRoleClaims;
        }

    }
}

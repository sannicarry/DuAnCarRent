using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;


        public AppUserRepository(ApplicationDBContext context, RoleManager<IdentityRole> roleManager,
        UserManager<AppUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task<List<AppUser>> GetAllAsync(QueryObject query)
        {
            var users = await _context.AppUser.Where(c => c.UserName != "admin").Include(c => c.Photos).Include(c => c.CarFavorites).ThenInclude(c => c.Car)
                .Include(c => c.UserNotifications).Include(c => c.OrderRecipient).Include(c => c.CardUser)
                .Where(s =>
                    string.IsNullOrWhiteSpace(query.Search) ||
                        (s.FirstName != null && s.LastName != null && (s.FirstName + s.LastName).Replace(" ", "").ToLower().Contains(query.Search.ToLower())) ||
                        (s.Email != null && s.Email.Contains(query.Search)) ||
                        (s.PhoneNumber != null && s.PhoneNumber.Contains(query.Search))
                )
                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                .ToListAsync();

            return users;
        }

        public async Task<AppUser> GetUserById(string userId)
        {
            var user = await _context.AppUser.Include(u => u.Photos).Include(c => c.CarFavorites).ThenInclude(c => c.Car)
            .Include(c => c.UserNotifications).Include(c => c.OrderRecipient).Include(c => c.CardUser).FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return null;
            return user;
        }

        public async Task CreateRole(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                var role = new IdentityRole { Name = roleName };
                await _roleManager.CreateAsync(role);
            }
        }

        public async Task CreateAdmin()
        {
            var admin = await _userManager.FindByEmailAsync("sannicarry@gmail.com");
            if (admin == null)
            {
                admin = new AppUser { UserName = "admin", Email = "sannicarry@gmail.com" };
                var result = await _userManager.CreateAsync(admin, "lenny270102@Nhan");
                Console.WriteLine("result = " + result);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(admin, "Admin");
                }
                else
                {
                    throw new Exception("Failed to create admin user.");
                }
            }
            // else
            // {
            //     var isAdmin = await _userManager.IsInRoleAsync(admin, "Admin");
            //     if (!isAdmin)
            //     {
            //         await _userManager.AddToRoleAsync(admin, "Admin");
            //     }
            // }
        }

        public async Task CreateRoleClaims(string roleName, List<Claim> roleClaims)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
            {
                foreach (var claim in roleClaims)
                {
                    await _roleManager.AddClaimAsync(role, claim);
                }
            }
        }

        public async Task<bool> RoleExists(string roleName)
        {
            return await _roleManager.RoleExistsAsync(roleName);
        }
    }
}
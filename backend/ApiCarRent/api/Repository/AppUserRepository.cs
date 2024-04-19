using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly ApplicationDBContext _context;
        public AppUserRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<AppUser>> GetAllAsync(QueryObject query)
        {
            var users = await _context.AppUser.Include(c => c.Photos)
                .Where(s =>
                    string.IsNullOrWhiteSpace(query.SearchUser) ||
                        (s.UserName != null && s.UserName.Contains(query.SearchUser)) ||
                        (s.Email != null && s.Email.Contains(query.SearchUser)) ||
                        (s.PhoneNumber != null && s.PhoneNumber.Contains(query.SearchUser))
                )
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            return users;
        }

        public async Task<AppUser> GetUserById(string userId)
        {
            var user = await _context.AppUser.Include(u => u.Photos).FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return null;
            return user;
        }






        // public async Task<AppUser?> UpdateAsync(AppUser user)
        // {
        //     var userModel = await _context.AppUser.FirstOrDefaultAsync(x => x.username == user.username);
        //     if (userModel == null)
        //     {
        //         return null;
        //     }
        //     userModel.BrandName = brandDto.BrandName;
        //     brandModel.Address = brandDto.Address;
        //     brandModel.Phone = brandDto.Phone;
        //     await _context.SaveChangesAsync();
        //     return brandModel;
        // }
    }
}
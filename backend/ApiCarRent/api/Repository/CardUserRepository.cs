using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.CardUser;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CardUserRepository : ICardUserRepository
    {
        private readonly ApplicationDBContext _context;
        public CardUserRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<CardUser> CreateAsync(CreateCardUserDto createCardUserDto)
        {
            var user = await _context.AppUser.FindAsync(createCardUserDto.UserId);
            var cardUserModel = new CardUser
            {
                AppUser = user,
                Logo = createCardUserDto.Logo,
                Name = createCardUserDto.Name,
                ShortName = createCardUserDto.ShortName,
                Bin = createCardUserDto.Bin,
                CardNumber = createCardUserDto.CardNumber,
                CardHolderName = createCardUserDto.CardHolderName,
                Release = createCardUserDto.Release,
            };

            _context.CardUser.Add(cardUserModel);
            await _context.SaveChangesAsync();

            return cardUserModel;
        }

        public async Task<CardUser?> DeleteAsync(int id)
        {
            var CardUserModel = await _context.CardUser.FirstOrDefaultAsync(x => x.CardUserId == id);

            if (CardUserModel == null) return null;
            _context.CardUser.Remove(CardUserModel);
            await _context.SaveChangesAsync();
            return CardUserModel;
        }

        public async Task<List<CardUser>> GetAllAsync(QueryObject query)
        {
            var CardUsers = await _context.CardUser
                                .Skip((query.PageSize > 0 ? (query.PageNumber - 1) * query.PageSize : 0))
                                .Take((query.PageSize > 0 ? query.PageSize : int.MaxValue))
                                .ToListAsync();

            return CardUsers;
        }

        public async Task<CardUser> GetByIdAsync(int id)
        {
            var CardUserModel = await _context.CardUser.FirstOrDefaultAsync(x => x.CardUserId == id);
            if (CardUserModel == null) return null;
            return CardUserModel;
        }
    }
}
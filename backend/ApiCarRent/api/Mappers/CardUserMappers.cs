using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CardUser;
using api.Models;

namespace api.Mappers
{
    public static class CardUserMappers
    {
        public static CardUserDto ToCardUserDto(this CardUser cardUser)
        {
            return new CardUserDto
            {
                CardUserId = cardUser.CardUserId,
                Logo = cardUser.Logo,
                Name = cardUser.Name,
                ShortName = cardUser.ShortName,
                Bin = cardUser.Bin,
                CardNumber = cardUser.CardNumber,
                Release = cardUser.Release,
                CardHolderName = cardUser.CardHolderName,
            };
        }
    }
}
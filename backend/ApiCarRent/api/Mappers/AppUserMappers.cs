using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class AppUserMappers
    {
        public static AppUserDto ToAppUserDto(this AppUser appUser, List<ClaimInfo> claim)
        {
            var localLockoutEnd = appUser.LockoutEnd?.ToLocalTime();

            return new AppUserDto
            {
                UserId = appUser.Id,
                Username = appUser.UserName,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Email = appUser.Email,
                BirthDate = appUser.BirthDate,
                Phone = appUser.PhoneNumber,
                Address = appUser.Address,
                Gender = appUser.Gender,
                Claims = claim,
                IsLocked = localLockoutEnd.HasValue && localLockoutEnd.Value > DateTimeOffset.Now,
                Photos = appUser.Photos.Where(c => c.PhotoType == 2).Select(c => c.ToPhotoDto()).ToList(),
                CarFavorites = appUser.CarFavorites?.Select(x => x.ToCarFavoriteDto()).ToList(),
                UserNotifications = appUser.UserNotifications?.Select(x => x.ToUserNotificationDto()).ToList(),
                OrderRecipient = appUser.OrderRecipient?.Select(x => x.ToOrderRecipientDto()).ToList(),
            };
        }

    }
}

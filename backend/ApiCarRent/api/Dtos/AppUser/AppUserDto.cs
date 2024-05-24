using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Car;
using api.Dtos.CardUser;
using api.Dtos.CarFavorite;
using api.Dtos.OrderRecipient;
using api.Dtos.Photo;
using api.Dtos.UserNotification;
using api.Models;

namespace api.Dtos.AppUser
{
    public class AppUserDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public List<ClaimInfo> Claims { get; set; } = new List<ClaimInfo>();
        public bool IsLocked { get; set; }
        public List<PhotoDto>? Photos { get; set; }
        public List<CarFavoriteDto>? CarFavorites { get; set; }
        public List<UserNotificationDto>? UserNotifications { get; set; }
        public List<OrderRecipientDto>? OrderRecipient { get; set; }
        public List<CardUserDto>? CardUser { get; set; }

    }
}
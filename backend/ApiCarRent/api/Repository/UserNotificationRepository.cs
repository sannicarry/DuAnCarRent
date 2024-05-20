using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.UserNotification;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserNotificationRepository : IUserNotificationRepository
    {
        private readonly IAppUserRepository _userRepo;
        private readonly ApplicationDBContext _context;
        public UserNotificationRepository(ApplicationDBContext context, IAppUserRepository userRepo)
        {
            _context = context;
            _userRepo = userRepo;
        }
        public async Task<UserNotifications> CreateAsync(CreateNotificationDto notificationModel)
        {
            var user = await _userRepo.GetUserById(notificationModel.UserId);
            if (user == null) return null;

            var userNotificationModel = new UserNotifications
            {
                UserIdCreate = notificationModel.UserIdCreate,
                CarId = notificationModel.CarId,
                User = user,
                Message = notificationModel.Message
            };

            await _context.UserNotifications.AddAsync(userNotificationModel);
            await _context.SaveChangesAsync();
            return userNotificationModel;
        }

        public async Task<UserNotifications?> DeleteAsync(int notificationId)
        {
            var notificationModel = await _context.UserNotifications.FirstOrDefaultAsync(x => x.UserNotificationsId == notificationId);
            if (notificationModel == null)
            {
                return null;
            }
            _context.UserNotifications.Remove(notificationModel);
            await _context.SaveChangesAsync();
            return notificationModel;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.UserNotification;
using api.Models;

namespace api.Interfaces
{
    public interface IUserNotificationRepository
    {
        Task<UserNotifications> CreateAsync(CreateNotificationDto notificationModel);

    }
}
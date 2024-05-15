using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.UserNotification;
using api.Models;

namespace api.Mappers
{
    public static class UserNotificationMappers
    {
        public static UserNotificationDto ToUserNotificationDto(this UserNotifications userNotifications)
        {
            return new UserNotificationDto
            {
                UserNotificationsId = userNotifications.UserNotificationsId,
                UserIdCreate = userNotifications.UserIdCreate,
                CarId = userNotifications.CarId,
                Message = userNotifications.Message,
            };
        }
    }
}
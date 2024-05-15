using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.UserNotification
{
    public class UserNotificationDto
    {
        public int UserNotificationsId { get; set; }
        public string? UserIdCreate { get; set; }
        public int? CarId { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
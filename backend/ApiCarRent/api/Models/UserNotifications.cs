using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserNotifications
    {
        public int UserNotificationsId { get; set; }
        public string? UserIdCreate { get; set; }
        public int? CarId { get; set; }
        public string Message { get; set; } = string.Empty;
        public virtual AppUser? User { get; set; }
    }
}
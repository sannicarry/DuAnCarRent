using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;

namespace api.Dtos.UserNotification
{
    public class CreateNotificationDto
    {
        [Required]
        public string? UserIdCreate { get; set; }
        [Required]
        public int CarId { get; set; }
        [Required]
        public string? UserId { get; set; }
        [Required]
        public string Message { get; set; } = string.Empty;
    }
}
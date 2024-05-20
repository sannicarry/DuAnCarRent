using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.UserNotification;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/UserNotification")]
    [ApiController]
    public class UserNotificationController : ControllerBase
    {
        private readonly IUserNotificationRepository _userNotificationRepo;

        public UserNotificationController(IUserNotificationRepository userNotificationRepo)
        {
            _userNotificationRepo = userNotificationRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateNotificationDto notificationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userNotificationRepo.CreateAsync(notificationDto);

            return Ok(notificationDto);

        }

        [HttpDelete("{notificationId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int notificationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var notification = await _userNotificationRepo.DeleteAsync(notificationId);
            if (notification == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
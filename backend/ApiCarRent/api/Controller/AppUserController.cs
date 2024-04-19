using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppUser;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
    [Route("api/user")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly IAppUserRepository _appUserRepo;
        private readonly RoleManager<IdentityRole> _roleManager;
        private static UserManager<AppUser> _userManager;

        private readonly ApplicationDBContext _context;

        public AppUserController(IAppUserRepository appUserRepo, RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager, ApplicationDBContext context)
        {
            _appUserRepo = appUserRepo;
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var users = await _appUserRepo.GetAllAsync(query);
            List<AppUserDto> listUserDtos = new List<AppUserDto>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var roleName = roles.FirstOrDefault();
                if (roleName == null)
                {
                    return null;
                }

                var userDto = user.ToAppUserDto(roleName);
                listUserDtos.Add(userDto);
            }
            return Ok(listUserDtos);
        }

        [HttpGet("currentUser")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not found." });
            }

            var user = await _appUserRepo.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            var roles = await _userManager.GetRolesAsync(user);
            var roleName = roles.FirstOrDefault();
            if (roleName == null)
            {
                return null;
            }

            var userDto = user.ToAppUserDto(roleName);

            return Ok(userDto);
        }

        [HttpPut]
        [Authorize]
        [Route("{AppUserId}")]
        public async Task<IActionResult> Update([FromRoute] string AppUserId, [FromForm] UpdateAppUserDto appUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userModel = await _userManager.FindByIdAsync(AppUserId);
            if (userModel == null)
            {
                return NotFound($"User not found {AppUserId}");
            }
            userModel.UserName = appUserDto.Username;
            userModel.Email = appUserDto.Email;
            userModel.PhoneNumber = appUserDto.Phone;
            userModel.Address = appUserDto.Address;
            userModel.BirthDate = appUserDto.BirthDate;
            userModel.Gender = appUserDto.Gender;

            await _userManager.UpdateAsync(userModel);

            var roles = await _userManager.GetRolesAsync(userModel);
            var roleName = roles.FirstOrDefault();

            return Ok(userModel.ToAppUserDto(roleName));
        }

        [HttpGet("GetCount")]
        public async Task<int> GetCountUsers()
        {
            if (!ModelState.IsValid)
                return 0;
            var countUsers = await _userManager.Users.CountAsync();
            return countUsers;
        }
    }
}
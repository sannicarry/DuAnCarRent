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
        private static UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AppUserController(IAppUserRepository appUserRepo, UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _appUserRepo = appUserRepo;
            _userManager = userManager;
            _tokenService = tokenService;
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
                List<ClaimInfo> claims = new List<ClaimInfo>();

                foreach (var claim in SettingUserRoleClaims.RoleClaims)
                {
                    claims.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
                }

                var userDto = user.ToAppUserDto(claims);
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

            List<ClaimInfo> claims = new List<ClaimInfo>();
            var userRole = _tokenService.GetUserRole();

            foreach (var claim in userRole)
            {
                claims.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
            }

            var userDto = user.ToAppUserDto(claims);

            return Ok(userDto);
        }

        [HttpGet("userId")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser(string userId)
        {
            var user = await _appUserRepo.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }

            List<ClaimInfo> claims = new List<ClaimInfo>();
            var userRole = _tokenService.GetUserRole();

            foreach (var claim in userRole)
            {
                claims.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
            }

            var userDto = user.ToAppUserDto(claims);

            return Ok(userDto);
        }

        [HttpPut]
        [Authorize]
        [Route("{AppUserId}")]
        public async Task<IActionResult> Update([FromRoute] string AppUserId, [FromBody] UpdateAppUserDto appUserDto)
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
            userModel.FirstName = appUserDto.FirstName;
            userModel.LastName = appUserDto.LastName;
            userModel.Email = appUserDto.Email;
            userModel.PhoneNumber = appUserDto.Phone;
            userModel.Address = appUserDto.Address;
            userModel.BirthDate = appUserDto.BirthDate;
            userModel.Gender = appUserDto.Gender;

            await _userManager.UpdateAsync(userModel);

            List<ClaimInfo> claims = new List<ClaimInfo>();
            foreach (var claim in SettingUserRoleClaims.RoleClaims)
            {
                claims.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
            }

            return Ok(userModel.ToAppUserDto(claims));
        }

        [HttpGet("GetCount")]
        [Authorize]
        public async Task<int> GetCountUsers()
        {
            if (!ModelState.IsValid)
                return 0;
            var countUsers = await _userManager.Users.CountAsync();
            return countUsers;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controller
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailService _emailService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var isEmail = loginDto.Username.Contains("@");

            var user = await _userManager.Users.FirstOrDefaultAsync(x => (isEmail ? x.Email : x.UserName) == loginDto.Username.ToLower());

            if (user == null) return Unauthorized(new { message = "Invalid username!" });

            if (await _userManager.IsLockedOutAsync(user))
            {
                var localLockoutEnd = user.LockoutEnd?.ToLocalTime();
                var timeRemaining = localLockoutEnd - DateTimeOffset.Now;

                if (timeRemaining.HasValue && timeRemaining.Value.TotalMinutes > 0)
                {
                    var roundedMinutes = Math.Ceiling(timeRemaining.Value.TotalMinutes);
                    return Unauthorized(new { message = $"Your account is locked. Please try again later in {roundedMinutes} minutes" });
                }
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                await _userManager.AccessFailedAsync(user);
                var accessFailedCount = await _userManager.GetAccessFailedCountAsync(user);

                user.AccessFailedCount = accessFailedCount;
                await _userManager.UpdateAsync(user);
                return Unauthorized(new { message = "Password incorrect.", accessFailedCount });
            }


            return Ok(
                new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = await _tokenService.CreateTokenAsync(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    BirthDate = registerDto.BirthDate ?? "",
                    Address = registerDto.Address ?? "",
                    PhoneNumber = registerDto.Phone ?? "",
                    Gender = registerDto.Gender,
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Username = appUser.UserName,
                                Email = appUser.Email,
                                Token = await _tokenService.CreateTokenAsync(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User ID not found." });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, changePasswordDto.OldPassword, false);

            if (!result.Succeeded) return Unauthorized(new { message = "Old Password incorrect." });

            if (changePasswordDto.NewPassword != changePasswordDto.ConfirmNewPassword)
            {
                return Unauthorized(new { message = "New password confirmation does not match." });
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if (changePasswordResult.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "An error occurred while changing the password." });
            }
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
            {
                return NotFound(new { message = "Email not found." });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);


            await _emailService.SendPasswordResetEmail(user.Email, token);
            return Ok(new { message = "Reset password email sent." });
        }

        [HttpPut("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Password reset successfully." });
                }
                else
                {
                    return BadRequest(new { message = "Unable to reset password.", errors = result.Errors });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "An error occurred while resetting the password.", error = e.Message });
            }
        }



        [HttpGet("getUserRole")]
        public IActionResult GetUserRole()
        {
            try
            {
                var userRole = _tokenService.GetUserRole();
                if (userRole == null)
                {
                    return BadRequest(new { message = "Unable to retrieve user role." });
                }
                return Ok(new { userRole });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving user role." });
            }
        }

        [HttpGet("checkusername")]
        public async Task<IActionResult> Checkusername([FromQuery] string username)
        {
            try
            {
                var existingusername = await _userManager.FindByNameAsync(username);
                return Ok(existingusername != null);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("checkEmail")]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            try
            {
                var existingEmail = await _userManager.FindByEmailAsync(email);
                return Ok(existingEmail != null);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
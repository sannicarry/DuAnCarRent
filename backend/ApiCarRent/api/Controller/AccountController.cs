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

namespace api.Controller
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var isEmail = loginDto.UserName.Contains("@");

            var user = await _userManager.Users.FirstOrDefaultAsync(x => (isEmail ? x.Email : x.UserName) == loginDto.UserName.ToLower());

            if (user == null) return Unauthorized(new { message = "Invalid Username!" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new { message = "Password incorrect." });

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
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
                var existingUsername = await _userManager.FindByNameAsync(registerDto.Username);
                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    BirthDay = registerDto.BirthDay ?? "",
                    Address = registerDto.Address ?? "",
                    Phone = registerDto.Phone ?? "",
                    Gender = registerDto.Gender,
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "Admin");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
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

        [HttpGet("checkUserName")]
        public async Task<IActionResult> CheckUsername([FromQuery] string username)
        {
            try
            {
                var existingUsername = await _userManager.FindByNameAsync(username);
                return Ok(existingUsername != null);
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
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;
        private readonly IRoleClaimService _roleClaimService;

        public TokenService(IConfiguration config, IHttpContextAccessor httpContextAccessor,
        UserManager<AppUser> userManager, IRoleClaimService roleClaimService)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _roleClaimService = roleClaimService;
        }

        public async Task<string> CreateTokenAsync(AppUser user)
        {
            var userClaims = new List<Claim>();
            // var userRoles = await _userManager.GetRolesAsync(user);

            var userRoleClaims = await _roleClaimService.GetUserRoleClaims(user);

            foreach (var role in userRoleClaims)
            {
                userClaims.Add(new Claim(role.Type, role.Value));
            }

            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
            };

            claims.AddRange(userClaims);

            //Ký mã token
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            //Mô tả các thuộc tính của mã token được tạo
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };
            //Tạo mã token
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public List<ClaimInfo> GetUserRole()
        {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                List<ClaimInfo> userRoles = new List<ClaimInfo>();

                foreach (var claim in jsonToken.Claims)
                {
                    if (claim.Type == "Permission")
                    {
                        userRoles.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
                    }
                }

                return userRoles;
            }
            return null;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;

namespace api.Mappers
{
    public static class SettingUserRoleClaims
    {
        public static ClaimInfo[] RoleClaims =
        {
            new ClaimInfo { Type = "Permission", Value = "ChangePassword" },
            new ClaimInfo { Type = "Permission", Value = "UpdateProfile" },
            new ClaimInfo { Type = "Permission", Value = "CreateOrder" },
            new ClaimInfo { Type = "Permission", Value = "ViewCarDetails" },
            new ClaimInfo { Type = "Permission", Value = "UserFeatures" },
        };
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;

namespace api.Mappers
{
    public static class SettingAdminRoleClaims
    {
        public static ClaimInfo[] RoleClaims =
        {
            new ClaimInfo { Type = "Permission", Value = "ManageDashboard" },
            new ClaimInfo { Type = "Permission", Value = "ManageBrand" },
            new ClaimInfo { Type = "Permission", Value = "ManageCar" },
            new ClaimInfo { Type = "Permission", Value = "ManageUser" },
            new ClaimInfo { Type = "Permission", Value = "ManageOrder" },
            new ClaimInfo { Type = "Permission", Value = "ChangePassword" },
        };
    }
}
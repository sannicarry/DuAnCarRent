using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.CardUser
{
    public class CreateCardUserDto
    {
        public string? UserId { get; set; }
        public string? Logo { get; set; }
        public string? Name { get; set; }
        public string? ShortName { get; set; }
        public string? Bin { get; set; }
        public string? CardNumber { get; set; }
        public string? Release { get; set; }
        public string? CardHolderName { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Photo
{
    public class PhotoDto
    {
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; } = string.Empty;
        public int PhotoType { get; set; }
    }
}
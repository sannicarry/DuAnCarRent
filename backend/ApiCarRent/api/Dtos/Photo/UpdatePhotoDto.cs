using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Photo
{
    public class UpdatePhotoDto
    {
        [Required]
        public int PhotoId { get; set; }
        [Required]
        public int PhotoType { get; set; }
        [Required]
        public string EntityId { get; set; }
    }
}
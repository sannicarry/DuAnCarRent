using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Photo
{
    public class CreatePhotoDto
    {
        [Required]
        public int PhotoType { get; set; }
        [Required]
        public string EntityId { get; set; }
    }
}
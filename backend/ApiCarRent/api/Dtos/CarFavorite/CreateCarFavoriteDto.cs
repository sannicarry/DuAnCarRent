using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Car;
using api.Models;

namespace api.Dtos.CarFavorite
{
    public class CreateCarFavoriteDto
    {
        [Required]
        public string? UserId { get; set; }
        [Required]
        public int CarId { get; set; }
    }
}
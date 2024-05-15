using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.CarFavorite;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/carFavorites")]
    [ApiController]
    public class CarFavoriteController : ControllerBase
    {
        private readonly ICarFavoriteRepository _carFavoriteRepo;

        private readonly ApplicationDBContext _context;

        public CarFavoriteController(ICarFavoriteRepository carFavoriteRepo, ApplicationDBContext context)
        {
            _carFavoriteRepo = carFavoriteRepo;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var carFavorites = await _carFavoriteRepo.GetAllAsync(query);

            List<CarFavoriteDto> listCarFavoriteDto = carFavorites.Select(x => x.ToCarFavoriteDto()).ToList();

            return Ok(listCarFavoriteDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCarFavoriteDto carFavoriteDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _carFavoriteRepo.CreateAsync(carFavoriteDto);

            return Ok(carFavoriteDto);

        }

        [HttpDelete("{userId}/{carId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(string userId, int carId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var carFavorite = await _carFavoriteRepo.DeleteAsync(userId, carId);
            if (carFavorite == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
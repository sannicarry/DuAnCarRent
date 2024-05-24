using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Brand;
using api.Dtos.Car;
using api.Dtos.Photo;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/car")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepo;
        private readonly IBrandRepository _brandRepo;
        private readonly IPhotoRepository<Car> _carPhotoRepo;
        private readonly ApplicationDBContext _context;
        private readonly string _PhotoUploadDirectory = "Uploads";
        public CarController(ICarRepository carRepo, IBrandRepository brandRepo, IPhotoRepository<Car> carPhotoRepo, ApplicationDBContext context)
        {
            _carRepo = carRepo;
            _brandRepo = brandRepo;
            _carPhotoRepo = carPhotoRepo;
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var cars = await _carRepo.GetAllAsync(query);
            var carsDto = cars.Select(c => c.ToCarDto()).ToList();
            return Ok(carsDto);
        }

        [HttpGet]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var carModel = await _carRepo.GetByIdAsync(id);
            if (carModel == null)
            {
                return NotFound();
            }
            return Ok(carModel.ToCarDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCarDto carDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _brandRepo.BrandExists(carDto.BrandId))
            {
                return BadRequest("Brand does not exist");
            }

            var carModel = carDto.ToCarFromCreateDTO();

            await _carRepo.CreateAsync(carModel);

            return CreatedAtAction(nameof(GetById), new { id = carModel.CarId }, carModel.ToCarDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{CarId:int}")]
        public async Task<IActionResult> Update([FromRoute] int CarId, [FromBody] UpdateCarDto carDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var carModel = await _carRepo.GetByIdAsync(CarId);
            if (carModel == null)
            {
                return NotFound($"Car not found {CarId}");
            }

            carModel.Make = carDto.Make;
            carModel.Model = carDto.Model;
            carModel.Type = carDto.Type;
            carModel.Gasoline = carDto.Gasoline;
            carModel.Capacity = carDto.Capacity;
            carModel.Year = carDto.Year;
            carModel.CityMpg = carDto.CityMpg;
            carModel.Fuel = carDto.Fuel;
            carModel.Transmission = carDto.Transmission;

            await _carRepo.UpdateAsync(carModel);

            return Ok(carModel.ToCarDto());
        }

        [HttpDelete]
        [Route("{CarId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int CarId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _carPhotoRepo.DeletePhotoByEntityId(CarId.ToString());

            var carModel = await _carRepo.DeleteAsync(CarId);
            if (carModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("GetCount")]

        public async Task<int> GetCountCars([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return 0;
            var countCars = await _carRepo.GetCountCarsAsync(query);
            return countCars;
        }

        [HttpGet("orderExists")]
        public async Task<IActionResult> CheckCarFromOrder([FromQuery] int carId)
        {
            try
            {
                var existingCar = await _carRepo.CarExistsFromOrders(carId);
                return Ok(existingCar != false);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
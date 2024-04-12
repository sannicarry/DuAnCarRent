using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Brand;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/brand")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepo;

        public BrandController(IBrandRepository brandRepo)
        {
            _brandRepo = brandRepo;
        }

        [HttpGet]
        // [Authorize]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var brands = await _brandRepo.GetAllAsync(query);
            var brandsDto = brands.Select(c => c.ToBrandDto()).ToList();
            return Ok(brandsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var brand = await _brandRepo.GetByIdAsync(id);
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(brand.ToBrandDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBrandDto brandDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var brandModel = brandDto.ToBrandFromCreateDTO();
            await _brandRepo.CreateAsync(brandModel);
            return CreatedAtAction(nameof(GetById), new { id = brandModel.BrandId }, brandModel.ToBrandDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBrandDto brandDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var brandModel = await _brandRepo.UpdateAsync(id, brandDto);
            if (brandModel == null)
            {
                return NotFound();
            }
            return Ok(brandModel.ToBrandDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var brandModel = await _brandRepo.DeleteAsync(id);
            if (brandModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("GetCount")]
        public async Task<int> GetCountBrands()
        {
            if (!ModelState.IsValid)
                return 0;
            var countBrands = await _brandRepo.GetCountBrandsAsync();
            return countBrands;
        }

    }
}
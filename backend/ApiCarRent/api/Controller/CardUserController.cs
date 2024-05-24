using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.CardUser;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/CardUser")]
    [ApiController]
    public class CardUserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ICardUserRepository _cardUserRepo;
        public CardUserController(ApplicationDBContext context, ICardUserRepository cardUserRepo)
        {
            _context = context;
            _cardUserRepo = cardUserRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var CardUsers = await _cardUserRepo.GetAllAsync(query);
            var CardUsersDto = CardUsers.Select(c => c.ToCardUserDto()).ToList();
            return Ok(CardUsersDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var cardUser = await _cardUserRepo.GetByIdAsync(id);
            if (cardUser == null) return NotFound();
            var cardUserDto = cardUser.ToCardUserDto();
            return Ok(cardUserDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCardUserDto createCardUserDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var cardUserModel = await _cardUserRepo.CreateAsync(createCardUserDto);

            return CreatedAtAction(nameof(GetById), new { id = cardUserModel.CardUserId }, cardUserModel.ToCardUserDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _cardUserRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.OrderRecipient;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/OrderRecipient")]
    [ApiController]
    public class OrderRecipientController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrderRecipientRepository _orderRecipientRepo;
        public OrderRecipientController(ApplicationDBContext context, IOrderRecipientRepository subUserRepo)
        {
            _context = context;
            _orderRecipientRepo = subUserRepo;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var OrderRecipients = await _orderRecipientRepo.GetAllAsync(query);
            var OrderRecipientsDto = OrderRecipients.Select(c => c.ToOrderRecipientDto()).ToList();
            return Ok(OrderRecipientsDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var OrderRecipient = await _orderRecipientRepo.GetByIdAsync(id);
            if (OrderRecipient == null) return NotFound();
            var OrderRecipientDto = OrderRecipient.ToOrderRecipientDto();
            return Ok(OrderRecipientDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateOrderRecipientDto createOrderRecipientDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var OrderRecipientModel = await _orderRecipientRepo.CreateAsync(createOrderRecipientDto);

            return CreatedAtAction(nameof(GetById), new { id = OrderRecipientModel.OrderRecipientId }, OrderRecipientModel.ToOrderRecipientDto());
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(int id, string firstName, string lastName, string email)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var OrderRecipientModel = await _orderRecipientRepo.UpdateAsync(id, firstName, lastName, email);

            return Ok(OrderRecipientModel.ToOrderRecipientDto());

        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _orderRecipientRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Payment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPaymentRepository _paymentRepo;
        public PaymentController(ApplicationDBContext context, IPaymentRepository paymentRepo)
        {
            _context = context;
            _paymentRepo = paymentRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var payments = await _paymentRepo.GetAllAsync(query);
            var paymentsDto = payments.Select(c => c.ToPaymentDto()).ToList();
            return Ok(paymentsDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var paymentModel = await _paymentRepo.GetByIdAsync(id);
            if (paymentModel == null) return NotFound();
            var paymentModelDto = paymentModel.ToPaymentDto();
            return Ok(paymentModelDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreatePaymentDto paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var paymentModel = await _paymentRepo.CreateAsync(paymentDto);
            return CreatedAtAction(nameof(GetById), new { id = paymentModel.PaymentId }, paymentModel.ToPaymentDto());
        }

        [HttpDelete("{paymentId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int paymentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _paymentRepo.DeleteAsync(paymentId);
            return NoContent();
        }
    }
}
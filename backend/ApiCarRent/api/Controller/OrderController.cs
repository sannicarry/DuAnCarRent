using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Order;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrderRepository _orderRepo;
        private readonly UserManager<AppUser> _userManager;
        public OrderController(ApplicationDBContext context, IOrderRepository orderRepo, UserManager<AppUser> userManager)
        {
            _context = context;
            _orderRepo = orderRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var orders = await _orderRepo.GetAllAsync(query);
            var ordersDto = orders.Select(c => c.ToOrderDto()).ToList();
            return Ok(ordersDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();
            var orderDto = order.ToOrderDto();
            return Ok(orderDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto createOrderDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var orderModel = await _orderRepo.CreateAsync(createOrderDto);

            return CreatedAtAction(nameof(GetById), new { id = orderModel.OrderId }, orderModel.ToOrderDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateOrderDto updateOrderDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var orderModel = await _context.Order.Include(c => c.User).Include(c => c.Car)
                                    .FirstOrDefaultAsync(x => x.OrderId == id);

            if (orderModel == null) return NotFound();

            orderModel.LocationFrom = updateOrderDto.LocationFrom;
            orderModel.LocationTo = updateOrderDto.LocationTo;
            orderModel.DateFrom = updateOrderDto.DateFrom;
            orderModel.DateTo = updateOrderDto.DateTo;
            orderModel.TimeFrom = updateOrderDto.TimeFrom;
            orderModel.TimeTo = updateOrderDto.TimeTo;

            await _orderRepo.UpdateAsync(orderModel);

            return Ok(orderModel.ToOrderDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _orderRepo.DeleteAsync(id);

            return NoContent();
        }

        [HttpGet("GetCount")]

        public async Task<int> GetCountOrders([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return 0;
            var countOrder = await _orderRepo.GetCountOrdersAsync(query);
            return countOrder;
        }

        [HttpGet("GetCountByUser")]

        public async Task<int> GetCountOrders([FromQuery] QueryObject query, string userId)
        {
            if (!ModelState.IsValid)
                return 0;
            var countOrder = await _orderRepo.GetCountOrdersByUserIdAsync(query, userId);
            return countOrder;
        }

        [HttpPut("UpdateStatus/{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id, int statusOrder, int statusPayment)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var order = await _context.Order.FirstOrDefaultAsync(x => x.OrderId == id);
            if (order == null) return NotFound();

            order.StatusOrder = statusOrder;
            order.StatusPayment = statusPayment;

            await _orderRepo.UpdateStatusAsync(order);
            return Ok();
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderByUserId([FromQuery] QueryObject query, string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var orders = await _orderRepo.GetAllByUserIdAsync(query, userId);
            var ordersDto = orders.Select(c => c.ToOrderDto()).ToList();
            return Ok(ordersDto);
        }

        [HttpGet("latest")]
        [Authorize]
        public async Task<IActionResult> GetLatestOrderId()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var latestOrder = await _context.Order.OrderByDescending(o => o.OrderId).FirstOrDefaultAsync();
            if (latestOrder == null)
            {
                return Ok(0);
            }

            return Ok(latestOrder.OrderId);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class OrderMappers
    {

        public static OrderDto ToOrderDto(this Order order)
        {
            return new OrderDto
            {
                OrderId = order.OrderId,
                User = order.User?.ToAppUserDto("User"),
                Car = order.Car?.ToCarDto(),
                LocationFrom = order.LocationFrom,
                DateFrom = order.DateFrom,
                TimeFrom = order.TimeFrom,
                LocationTo = order.LocationTo,
                DateTo = order.DateTo,
                TimeTo = order.TimeTo,
                TotalPrice = order.TotalPrice,
                Status = order.Status,
            };
        }

        public static Order ToOrderFromCreate(CreateOrderDto createOrderDto, AppUser user, Car car)
        {
            return new Order
            {
                User = user,
                Car = car,
                LocationFrom = createOrderDto.LocationFrom,
                DateFrom = createOrderDto.DateFrom,
                TimeFrom = createOrderDto.TimeFrom,
                LocationTo = createOrderDto.LocationTo,
                DateTo = createOrderDto.DateTo,
                TimeTo = createOrderDto.TimeTo,
                TotalPrice = createOrderDto.TotalPrice,
                Status = createOrderDto.Status,
            };
        }
    }
}
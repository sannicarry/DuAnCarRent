using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Order;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class OrderMappers
    {

        public static OrderDto ToOrderDto(this Order order)
        {
            List<ClaimInfo> claims = new List<ClaimInfo>();
            foreach (var claim in SettingUserRoleClaims.RoleClaims)
            {
                claims.Add(new ClaimInfo { Type = claim.Type, Value = claim.Value });
            }

            return new OrderDto
            {
                OrderId = order.OrderId,
                User = order.User?.ToAppUserDto(claims),
                Car = order.Car?.ToCarDto(),
                OrderRecipient = order.OrderRecipient?.ToOrderRecipientDto(),
                Payment = order.Payment?.ToPaymentDto(),
                LocationFrom = order.LocationFrom,
                DateFrom = order.DateFrom,
                TimeFrom = order.TimeFrom,
                LocationTo = order.LocationTo,
                DateTo = order.DateTo,
                TimeTo = order.TimeTo,
                StatusOrder = order.StatusOrder,
                StatusPayment = order.StatusPayment,
            };
        }

        public static Order ToOrderFromCreate(CreateOrderDto createOrderDto, AppUser user, Car car, Payment payment, OrderRecipient orderRecipient)
        {
            return new Order
            {
                User = user,
                Car = car,
                OrderRecipient = orderRecipient,
                Payment = payment,
                LocationFrom = createOrderDto.LocationFrom,
                DateFrom = createOrderDto.DateFrom,
                TimeFrom = createOrderDto.TimeFrom,
                LocationTo = createOrderDto.LocationTo,
                DateTo = createOrderDto.DateTo,
                TimeTo = createOrderDto.TimeTo,
                StatusOrder = createOrderDto.StatusOrder,
                StatusPayment = createOrderDto.StatusPayment,
            };
        }
    }
}
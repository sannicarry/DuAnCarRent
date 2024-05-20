using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Payment;
using api.Models;

namespace api.Mappers
{
    public static class PaymentMappers
    {
        public static PaymentDto ToPaymentDto(this Payment payment)
        {
            return new PaymentDto
            {
                PaymentId = payment.PaymentId,
                UserId = payment.UserId,
                Method = payment.Method,
                Price = payment.Price,
                Quantity = payment.Quantity,
                PaymentDate = payment.PaymentDate,
                PaymentReference = payment.PaymentReference
            };
        }
    }
}
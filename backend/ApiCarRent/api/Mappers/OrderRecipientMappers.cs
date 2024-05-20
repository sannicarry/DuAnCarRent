using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OrderRecipient;
using api.Models;

namespace api.Mappers
{
    public static class OrderRecipientMappers
    {
        public static OrderRecipientDto ToOrderRecipientDto(this OrderRecipient orderRecipient)
        {
            return new OrderRecipientDto
            {
                OrderRecipientId = orderRecipient.OrderRecipientId,
                FirstName = orderRecipient.FirstName,
                LastName = orderRecipient.LastName,
                Email = orderRecipient.Email,
                PhoneNumber = orderRecipient.PhoneNumber,
            };
        }
    }
}
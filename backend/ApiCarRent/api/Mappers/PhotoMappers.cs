using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Photo;
using api.Models;

namespace api.Mappers
{
    public static class PhotoMappers
    {
        public static PhotoDto ToPhotoDto(this Photo Photo)
        {
            return new PhotoDto
            {
                PhotoId = Photo.PhotoId,
                PhotoUrl = Photo.PhotoUrl,
                PhotoType = Photo.PhotoType ?? 0,
            };
        }
    }
}
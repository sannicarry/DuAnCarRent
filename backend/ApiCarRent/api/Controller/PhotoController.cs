using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Photo;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace api.Controller
{

    [Route("api/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoRepository<Car> _carPhotoRepo;
        private readonly IPhotoRepository<AppUser> _appUserPhotoRepo;

        private readonly string _PhotoUploadDirectory = "Uploads";
        public PhotoController(IPhotoRepository<Car> carPhotoRepo, IPhotoRepository<AppUser> appUserPhotoRepo)
        {
            _carPhotoRepo = carPhotoRepo;
            _appUserPhotoRepo = appUserPhotoRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePhoto([FromForm] CreatePhotoDto createPhotoDto, List<IFormFile> photos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (photos.Count == 0)
            {
                return StatusCode(500, "No photo found");

            }

            var createdPhotosModel = new List<Photo>();

            foreach (var photo in photos)
            {
                var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), _PhotoUploadDirectory);
                if (!Directory.Exists(uploadDirectory))
                {
                    Directory.CreateDirectory(uploadDirectory);
                }

                var photoName = $"{Guid.NewGuid()}{Path.GetExtension(photo.FileName)}";
                var photoPath = Path.Combine(uploadDirectory, photoName);

                using (var stream = new FileStream(photoPath, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);
                }

                var photoUrl = $"{_PhotoUploadDirectory}/{photoName}";
                if (int.TryParse(createPhotoDto.EntityId, out int entityIdAsInt))
                {
                    var photoModel = await _carPhotoRepo.CreatePhotoAsync(createPhotoDto.PhotoType, createPhotoDto.EntityId, photoUrl);
                    createdPhotosModel.Add(photoModel);
                }
                else
                {
                    var photoModel = await _appUserPhotoRepo.CreatePhotoAsync(createPhotoDto.PhotoType, createPhotoDto.EntityId, photoUrl);
                    createdPhotosModel.Add(photoModel);
                }
            }
            return Ok(createdPhotosModel);
        }

        [HttpPut]
        [Authorize]
        // Chỉ gọi API khi có thay đổi
        public async Task<IActionResult> UpdatePhoto([FromForm] UpdatePhotoDto updatePhotoDto, IFormFile photo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (photo == null)
            {
                return StatusCode(500, "No photo found");
            }

            var updatePhotosModel = new List<Photo>();

            if (updatePhotoDto.PhotoType == 1)
            {
                if (await _carPhotoRepo.CheckPhotoId(updatePhotoDto.PhotoType, updatePhotoDto.PhotoId))
                {
                    var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), _PhotoUploadDirectory);
                    if (!Directory.Exists(uploadDirectory))
                    {
                        Directory.CreateDirectory(uploadDirectory);
                    }

                    var photoName = $"{Guid.NewGuid()}{Path.GetExtension(photo?.FileName)}";
                    var photoPath = Path.Combine(uploadDirectory, photoName);

                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await photo.CopyToAsync(stream);
                    }

                    var photoUrl = $"{_PhotoUploadDirectory}/{photoName}";
                    var photoModel = await _carPhotoRepo.UpdatePhotoAsync(updatePhotoDto.PhotoId, photoUrl);
                    updatePhotosModel.Add(photoModel);
                }
                else
                {
                    return StatusCode(500, "Not found PhotoId");
                }
            }
            else
            {
                if (await _appUserPhotoRepo.CheckPhotoId(updatePhotoDto.PhotoType, updatePhotoDto.PhotoId))
                {
                    var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), _PhotoUploadDirectory);
                    if (!Directory.Exists(uploadDirectory))
                    {
                        Directory.CreateDirectory(uploadDirectory);
                    }

                    var photoName = $"{Guid.NewGuid()}{Path.GetExtension(photo?.FileName)}";
                    var photoPath = Path.Combine(uploadDirectory, photoName);

                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await photo.CopyToAsync(stream);
                    }

                    var photoUrl = $"{_PhotoUploadDirectory}/{photoName}";
                    var photoModel = await _appUserPhotoRepo.UpdatePhotoAsync(updatePhotoDto.PhotoId, photoUrl);
                    updatePhotosModel.Add(photoModel);
                }
                else
                {
                    return StatusCode(500, "Not found PhotoId");
                }
            }

            return Ok(updatePhotosModel);
        }

        [HttpDelete("{photoId:int}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto([FromRoute] int photoId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var photoModel = await _carPhotoRepo.DeletePhotoAsync(photoId);
            if (photoModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Photo;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AppUserPhotoRepository : IPhotoRepository<AppUser>
    {
        private readonly ApplicationDBContext _context;
        public AppUserPhotoRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Photo> CreatePhotoAsync(int photoType, string AppUserId, string PhotoUrl)
        {
            var AppUser = await _context.AppUser.FindAsync(AppUserId);
            if (AppUser == null)
            {
                return null;
            }
            var PhotoModel = new Photo
            {
                PhotoUrl = PhotoUrl,
                PhotoType = photoType,
                AppUser = AppUser,
            };
            await _context.Photo.AddAsync(PhotoModel);
            await _context.SaveChangesAsync();
            return PhotoModel;
        }

        public async Task<Photo?> UpdatePhotoAsync(int photoId, string photoUrl)
        {
            var PhotoModel = await _context.Photo.FirstOrDefaultAsync(x => x.PhotoId == photoId);
            if (PhotoModel == null)
            {
                return null;
            }
            PhotoModel.PhotoUrl = photoUrl;
            await _context.SaveChangesAsync();
            return PhotoModel;
        }

        public async Task<Photo?> DeletePhotoAsync(int PhotoId)
        {
            var Photo = await _context.Photo.FirstOrDefaultAsync(c => c.PhotoId == PhotoId);
            if (Photo == null) return null;
            _context.Photo.Remove(Photo);
            await _context.SaveChangesAsync();
            return Photo;
        }

        public async Task<List<int>> GetAllPhotoId(int photoType)
        {
            return await _context.Photo.Where(x => x.PhotoType == photoType).Select(x => x.PhotoId).ToListAsync();
        }

        public async Task<bool> CheckPhotoId(int photoType, int photoId)
        {
            List<int> AllPhotoId = await GetAllPhotoId(photoType);
            foreach (int PhotoId in AllPhotoId)
            {
                if (PhotoId == photoId) return true;
            }
            return false;
        }

        public async Task<List<string>> GetAllPhotoUrl(int photoType)
        {
            return await _context.Photo.Where(x => x.PhotoType == photoType).Select(x => x.PhotoUrl).ToListAsync();
        }

        public async Task<bool> CheckPhotoUrl(int photoType, string photoUrl)
        {
            List<string> AllPhotoUrl = await GetAllPhotoUrl(photoType);
            foreach (string PhotoUrl in AllPhotoUrl)
            {
                if (PhotoUrl == photoUrl) return true;
            }
            return false;
        }

        public async Task<bool> DeletePhotoByEntityId(string entityId)
        {
            var photos = await _context.Photo
                            .Include(x => x.AppUser)
                            .Where(x => x.AppUser != null && x.AppUser.Id == entityId)
                            .ToListAsync();

            if (photos != null && photos.Any())
            {
                _context.Photo.RemoveRange(photos);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
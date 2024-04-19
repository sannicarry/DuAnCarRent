using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Photo;
using api.Models;

namespace api.Interfaces
{
    public interface IPhotoRepository<T>
    {
        Task<Photo?> UpdatePhotoAsync(int photoId, string photoUrl);
        Task<Photo?> DeletePhotoAsync(int photoId);
        Task<Photo> CreatePhotoAsync(int photoType, string entityId, string photoUrl);
        Task<List<int>> GetAllPhotoId(int photoType);
        Task<bool> CheckPhotoId(int photoType, int photoId);
        Task<List<string>> GetAllPhotoUrl(int photoType);
        Task<bool> CheckPhotoUrl(int photoType, string photoId);
        Task<bool> DeletePhotoByEntityId(string entityId);
    }
}
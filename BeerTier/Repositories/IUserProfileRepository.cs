using BeerTier.Models;

namespace BeerTier.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);
    }
}

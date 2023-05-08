using BeerTier.Models;

namespace BeerTier.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(Comment comment);
        void Update(Comment comment);
    }
}
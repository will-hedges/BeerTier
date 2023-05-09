using BeerTier.Models;

namespace BeerTier.Repositories
{
    public interface ICommentRepository
    {
        Comment GetById(int id);
        void Add(Comment comment);
        void Delete(Comment comment);
        void Update(Comment comment);
    }
}

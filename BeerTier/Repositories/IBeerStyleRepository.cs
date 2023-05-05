using BeerTier.Models;

namespace BeerTier.Repositories
{
    public interface IBeerStyleRepository
    {
        void Add(BeerStyle beerStyle);
        void Delete(int id);
    }
}

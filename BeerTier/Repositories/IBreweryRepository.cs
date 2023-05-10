using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IBreweryRepository
    {
        List<Brewery> GetAll();
        Brewery GetById(int id);
        void Add(Brewery brewery);
        void Update(Brewery brewery);
        void Delete(Brewery brewery);
    }
}

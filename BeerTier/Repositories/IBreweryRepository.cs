using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IBreweryRepository
    {
        List<Brewery> GetAll();
    }
}
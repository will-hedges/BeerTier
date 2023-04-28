using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IBeerRepository
    {
        List<Beer> GetAll();
    }
}
using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IStyleRepository
    {
        List<Style> GetAll();
    }
}
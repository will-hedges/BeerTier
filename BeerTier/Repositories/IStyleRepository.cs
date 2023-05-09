using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IStyleRepository
    {
        List<Style> GetAll();
        Style GetById(int id);
        void Add(Style style);
        void Update(Style style);
        void Delete(Style style);
    }
}

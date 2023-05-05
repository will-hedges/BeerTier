﻿using BeerTier.Models;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public interface IBeerRepository
    {
        List<Beer> GetAll();
        Beer GetById(int id);
        void Add(Beer beer);
        void Update(Beer beer);
    }
}

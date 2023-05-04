using BeerTier.Models;
using BeerTier.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeerStyleController : ControllerBase
    {
        private readonly IBeerStyleRepository _beerStyleRepository;

        public BeerStyleController(IBeerStyleRepository beerStyleRepository)
        {
            _beerStyleRepository = beerStyleRepository;
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(BeerStyle beerStyle)
        {
            _beerStyleRepository.Add(beerStyle);
            return Ok(beerStyle);
        }
    }
}

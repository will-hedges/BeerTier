using BeerTier.Models;
using BeerTier.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeerController : ControllerBase
    {
        private readonly IBeerRepository _beerRepository;

        public BeerController(IBeerRepository beerRepository)
        {
            _beerRepository = beerRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_beerRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Beer beer = _beerRepository.GetById(id);
            if (beer == null)
            {
                return NotFound();
            }
            return Ok(beer);
        }
    }
}

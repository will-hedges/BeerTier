using BeerTier.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweryController : ControllerBase
    {
        private readonly IBreweryRepository _breweryRepository;

        public BreweryController(IBreweryRepository breweryRepository)
        {
            _breweryRepository = breweryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_breweryRepository.GetAll());
        }
    }
}

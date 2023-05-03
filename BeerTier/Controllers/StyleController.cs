using BeerTier.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StyleController : ControllerBase
    {
        private readonly IStyleRepository _styleRepository;

        public StyleController(IStyleRepository styleRepository)
        {
            _styleRepository = styleRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_styleRepository.GetAll());
        }
    }
}

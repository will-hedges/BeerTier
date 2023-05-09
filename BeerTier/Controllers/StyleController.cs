using BeerTier.Models;
using BeerTier.Repositories;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Style style = _styleRepository.GetById(id);
            if (style == null)
            {
                return NotFound();
            }
            return Ok(style);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Style style)
        {
            _styleRepository.Add(style);
            return CreatedAtAction("Get", new { id = style.Id }, style);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Style style)
        {
            if (id != style.Id)
            {
                return BadRequest();
            }
            _styleRepository.Update(style);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, Style style)
        {
            if (id != style.Id)
            {
                return BadRequest();
            }
            _styleRepository.Delete(style);
            return NoContent();
        }
    }
}

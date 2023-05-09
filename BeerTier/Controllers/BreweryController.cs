using BeerTier.Models;
using BeerTier.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweryController : ControllerBase
    {
        private readonly IBreweryRepository _breweryRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public BreweryController(
            IBreweryRepository breweryRepository,
            IUserProfileRepository userProfileRepository
        )
        {
            _breweryRepository = breweryRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_breweryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Brewery brewery = _breweryRepository.GetById(id);
            if (brewery == null)
            {
                return NotFound();
            }
            return Ok(brewery);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Brewery brewery)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            brewery.UserProfileId = userProfile.Id;
            brewery.CreateDateTime = DateTime.Now;
            if (string.IsNullOrWhiteSpace(brewery.ImageLocation))
            {
                brewery.ImageLocation = null;
            }
            _breweryRepository.Add(brewery);
            return CreatedAtAction("Get", new { id = brewery.Id }, brewery);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Brewery brewery)
        {
            if (id != brewery.Id)
            {
                return BadRequest();
            }
            _breweryRepository.Update(brewery);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, Brewery brewery)
        {
            if (id != brewery.Id)
            {
                return BadRequest();
            }
            _breweryRepository.Delete(brewery);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

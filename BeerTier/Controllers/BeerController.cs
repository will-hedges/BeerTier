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
    public class BeerController : ControllerBase
    {
        private readonly IBeerRepository _beerRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public BeerController(
            IBeerRepository beerRepository,
            IUserProfileRepository userProfileRepository
        )
        {
            _beerRepository = beerRepository;
            _userProfileRepository = userProfileRepository;
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

        [Authorize]
        [HttpPost]
        public IActionResult Post(Beer beer)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            beer.UserProfileId = userProfile.Id;
            if (string.IsNullOrWhiteSpace(beer.Content))
            {
                beer.Content = null;
            }
            if (string.IsNullOrWhiteSpace(beer.ImageLocation))
            {
                beer.ImageLocation = null;
            }
            beer.CreateDateTime = DateTime.Now;
            _beerRepository.Add(beer);
            return CreatedAtAction("Get", new { id = beer.Id }, beer);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

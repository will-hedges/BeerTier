using BeerTier.Models;
using BeerTier.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace BeerTier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CommentController(
            ICommentRepository commentRepository,
            IUserProfileRepository userProfileRepository
        )
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            Comment comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            comment.UserProfileId = userProfile.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("GetById", new { id = comment.Id }, comment);
        }

        [Authorize]
        [HttpPut]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Update(comment);
            return NoContent();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Delete(comment);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

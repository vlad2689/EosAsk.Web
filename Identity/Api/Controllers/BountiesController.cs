using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Attributes;
using Identity.Api.Controllers.Base;
using Identity.Api.DTOs;
using Identity.Api.DTOs.Get;
using Identity.Data;
using Identity.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Identity.Api.Controllers
{
    [Route("api/bounties")]
    [EnableCors("EosAskCorsPolicy")]
    public class BountiesController : EosAskBaseController
    {
        public BountiesController(ApplicationDbContext context,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager) : base(context, userManager, signInManager)
        {
        }

        // GET: Bounties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bounty>>> GetBounties()
        {
            return await DbContext.Bounties.Include(b => b.Question).Include(b => b.Owner).Include(b => b.Awarded)
                .ToListAsync();
        }

        // GET: Bounties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bounty>> GetBounty(int id)
        {
            var bounty = await DbContext.Bounties.FindAsync(id);

            if (bounty == null)
            {
                return NotFound();
            }

            return bounty;
        }

        // POST: Bounties
        // The BlockChain bounty will be created from eosjs, on the client side.
        [HttpPost]
        // [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<BountyDTO>> PostBounty([FromBody] PostBountyDTO postBountyDto)
        {
            var bounty = postBountyDto.ToBounty(DbContext, await GetCurrentUserAsync());
            DbContext.Bounties.Add(bounty);

            await DbContext.SaveChangesAsync();
            var dto = new BountyDTO(bounty, true);
            return Ok(dto);
        }


        [HttpPost("markCreatedOnBlockchain")]
        public async Task<ActionResult<BountyDTO>> MarkCreatedOnBlockchain(int bountyId)
        {
            if (!BountyExists(bountyId))
            {
                return NotFound();
            }

            var bounty = await DbContext.Bounties.Include(b => b.Question).FirstAsync(b => b.BountyId == bountyId);

            // TODO: Check that the bounty is on the blockchain before creating the bounty in the db

            bounty.IsCreatedOnBlockchain = true;
            await DbContext.SaveChangesAsync();

            return Ok(new BountyDTO(bounty, true));
        }

        [HttpPost("markAwarded")]
        // [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<BountyDTO>> MarkAwarded(int bountyId, int answerId)
        {
            var bounty = await DbContext.Bounties.Include(b => b.Awarded)
                .FirstOrDefaultAsync(b => b.BountyId == bountyId);
            if (bounty == null)
            {
                return NotFound();
            }

            if (bounty.Awarded != null)
            {
                return BadRequest();
            }

            var user = await GetCurrentUserAsync();
            if (user != bounty.Owner)
            {
                return Unauthorized();
            }

            var answer = await DbContext.Answers.Include(ans => ans.Owner)
                .FirstOrDefaultAsync(ans => ans.AnswerId == answerId);
            if (answer == null)
            {
                return NotFound();
            }

            answer.Status = 1; // awarded
            bounty.Awarded = answer.Owner;
            await DbContext.SaveChangesAsync();

            return Ok(new BountyDTO(bounty, false));
        }

        // PUT: Bounties/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBounty(int id, Bounty bounty)
        {
            // TODO: Change this
            if (id != bounty.BountyId)
            {
                return BadRequest();
            }

            DbContext.Entry(bounty).State = EntityState.Modified;

            try
            {
                await DbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BountyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: Bounties/5
        [HttpDelete("{id}")]
        // [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<Bounty>> DeleteBounty(int id)
        {
            var bounty = await DbContext.Bounties.FindAsync(id);
            if (bounty == null)
            {
                return NotFound();
            }

            if (await GetCurrentUserAsync() != bounty.Owner || bounty.Awarded != null)
            {
                return Unauthorized();
            }

            DbContext.Bounties.Remove(bounty);
            await DbContext.SaveChangesAsync();

            return bounty;
        }

        private bool BountyExists(int bountyId)
        {
            return DbContext.Bounties.Any(e => e.BountyId == bountyId);
        }
    }
}
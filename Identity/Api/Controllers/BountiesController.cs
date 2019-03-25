using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Attributes;
using Identity.Api.Controllers.Base;
using Identity.Api.DTOs;
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
        public async Task<ActionResult<Bounty>> PostBounty([FromBody] PostBountyDTO postBountyDto)
        {
            var bounty = postBountyDto.ToBounty(DbContext, await GetCurrentUserAsync());
            DbContext.Bounties.Add(bounty);

            // TODO: Check that the bounty is on the blockchain before creating the bounty in the db

//            await _bountySmartContract.InsertBounty(bounty.Question.QuestionId,
//                new Asset
//                {
//                    Amount = bounty.Amount,
//                    Symbol = bounty.AmountSym
//                },
//                bounty.Owner.EosUsername,
//                "5J5hukk7TgbMZ8AwidoSX9EsiCsZCYJkn3dhe22E8DoUWqBMSdN");

            await DbContext.SaveChangesAsync();

            return CreatedAtAction("GetBounty", new {id = bounty.BountyId}, postBountyDto);
        }

        // PUT: Bounties/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBounty(int id, Bounty bounty)
        {
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
        public async Task<ActionResult<Bounty>> DeleteBounty(int id)
        {
            var bounty = await DbContext.Bounties.FindAsync(id);
            if (bounty == null)
            {
                return NotFound();
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
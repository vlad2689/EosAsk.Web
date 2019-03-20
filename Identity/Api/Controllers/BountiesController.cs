using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Attributes;
using Identity.Api.Controllers.Base;
using Identity.Api.Models;
using Identity.Data;
using Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Identity.Api.Controllers
{
    [Route("api/bounties")]
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
            return await DbContext.Bounties.ToListAsync();
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

        // POST: Bounties
        // The BlockChain bounty will be created from eosjs, on the client side.
        [HttpPost]
        [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<Bounty>> PostBounty([FromBody] PostBountyModel postBountyModel)
        {
            var bounty = postBountyModel.ToBounty(DbContext);
            DbContext.Bounties.Add(bounty);
            
//            await _bountySmartContract.InsertBounty(bounty.Question.QuestionId,
//                new Asset
//                {
//                    Amount = bounty.Amount,
//                    Symbol = bounty.AmountSym
//                },
//                bounty.Owner.EosUsername,
//                "5J5hukk7TgbMZ8AwidoSX9EsiCsZCYJkn3dhe22E8DoUWqBMSdN");
            
            await DbContext.SaveChangesAsync();

            return CreatedAtAction("GetBounty", new { id = bounty.BountyId }, postBountyModel);
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

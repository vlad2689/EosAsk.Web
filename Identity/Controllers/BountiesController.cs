using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Identity.Data;
using Identity.Models;

namespace Identity.Controllers
{
    [Route("bounties")]
    public class BountiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BountiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Bounties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bounty>>> GetBounties()
        {
            return await _context.Bounties.ToListAsync();
        }

        // GET: Bounties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bounty>> GetBounty(int id)
        {
            var bounty = await _context.Bounties.FindAsync(id);

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

            _context.Entry(bounty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        public async Task<ActionResult<Bounty>> PostBounty(PostBountyModel postBountyModel)
        {
            var bounty = postBountyModel.ToBounty(_context);
            _context.Bounties.Add(bounty);
            
//            await _bountySmartContract.InsertBounty(bounty.Question.QuestionId,
//                new Asset
//                {
//                    Amount = bounty.Amount,
//                    Symbol = bounty.AmountSym
//                },
//                bounty.Owner.EosUsername,
//                "5J5hukk7TgbMZ8AwidoSX9EsiCsZCYJkn3dhe22E8DoUWqBMSdN");
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBounty", new { id = bounty.BountyId }, postBountyModel);
        }

        // DELETE: Bounties/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bounty>> DeleteBounty(int id)
        {
            var bounty = await _context.Bounties.FindAsync(id);
            if (bounty == null)
            {
                return NotFound();
            }

            _context.Bounties.Remove(bounty);
            await _context.SaveChangesAsync();

            return bounty;
        }

        private bool BountyExists(int bountyId)
        {
            return _context.Bounties.Any(e => e.BountyId == bountyId);
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Identity.Data;
using Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Identity.Controllers
{
    [Route("api/answers")]
    public class AnswersController : EosAskBaseController
    {
        public AnswersController(ApplicationDbContext context, 
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager) : base(context, userManager, signInManager)
        {
        }

        // GET: Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers()
        {
            return await DbContext.Answers.ToListAsync();
        }

        // GET: Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await DbContext.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        // PUT: Answers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, Answer answer)
        {
            if (id != answer.AnswerId)
            {
                return BadRequest();
            }

            DbContext.Entry(answer).State = EntityState.Modified;

            try
            {
                await DbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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

        // POST: Answers
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer([FromBody] PostAnswerModel postAnswerModel)
        {
            var answer = postAnswerModel.ToAnswer(DbContext, await GetCurrentUserAsync());
            DbContext.Answers.Add(answer);
            await DbContext.SaveChangesAsync();

            return CreatedAtAction("GetAnswer", new { id = answer.AnswerId }, answer);
        }

        // DELETE: Answers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Answer>> DeleteAnswer(int id)
        {
            var answer = await DbContext.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            DbContext.Answers.Remove(answer);
            await DbContext.SaveChangesAsync();

            return answer;
        }

        private bool AnswerExists(int answerId)
        {
            return DbContext.Answers.Any(e => e.AnswerId == answerId);
        }
    }
}

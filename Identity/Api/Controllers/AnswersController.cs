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
    [Route("api/answers")]
    [EnableCors("EosAskCorsPolicy")]
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

        [HttpPost("markCreatedOnBlockchain")]
        public async Task<ActionResult<AnswerDTO>> MarkCreatedOnBlockchain(int answerId)
        {
            if (!AnswerExists(answerId))
            {
                return NotFound();
            }
            
            var answer = await DbContext.Answers.FindAsync(answerId);
            
            // TODO: Check that the answer is on the blockchain before creating the answer in the db

            answer.IsCreatedOnBlockchain = true;
            await DbContext.SaveChangesAsync();

            return Ok(new AnswerDTO(answer, false));
        }

        // POST: Answers
        [HttpPost]
        // [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<AnswerDTO>> PostAnswer([FromBody] PostAnswerDTO postAnswerDto)
        {
            var answer = await postAnswerDto.ToAnswer(DbContext, await GetCurrentUserAsync());
            DbContext.Answers.Add(answer);
            await DbContext.SaveChangesAsync();

            return Ok(new AnswerDTO(answer, false));
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

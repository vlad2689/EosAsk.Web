using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Controllers.Base;
using Identity.Api.DTOs;
using Identity.Api.DTOs.Get;
using Identity.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace Identity.Api.Controllers
{
    [Route("api/questions")]
    [EnableCors("EosAskCorsPolicy")]
    public class QuestionsController : EosAskBaseController
    {
        public QuestionsController(ApplicationDbContext context,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager) : base(context, userManager, signInManager)
        {
        }

        // GET: Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestions()
        {
            var questions = DbContext.Questions
                .Include(q => q.Answers)
                .Include(q => q.Owner)
                .Select(q => new QuestionDTO(q, null))
                .ToDictionary(q => q.QuestionId);

            var bounties = DbContext.Bounties
                .Include(b => b.Owner)
                .ToDictionary(q => q.Question.QuestionId);

            foreach (var bountyDto in bounties)
            {
                questions[bountyDto.Key].Bounty = new BountyDTO(bountyDto.Value, false);
            }

            return questions.Values;
        }

        // GET: Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDTO>> GetQuestion(int id)
        {
            if (!QuestionExists(id))
            {
                return NotFound();
            }

            var question = await DbContext.Questions
                .Where(q => q.QuestionId == id)
                .Include(q => q.Owner)
                .Include(q => q.Answers).ThenInclude(answer => answer.Owner)
                .FirstOrDefaultAsync(q => q.QuestionId == id);

            var questionBounty = DbContext.Bounties.FirstOrDefault(b => b.Question.QuestionId == question.QuestionId);
            return new QuestionDTO(question, questionBounty != null ? new BountyDTO(questionBounty, false) : null);
        }

        // POST: Questions
        // TODO: Remove stub
        [HttpPost]
        // [ServiceFilter(typeof(RequireLoginFilter))]
        public async Task<ActionResult<QuestionDTO>> PostQuestion([FromBody] PostQuestionDTO postQuestionDto)
        {
            var question = postQuestionDto.ToQuestion(DbContext, await GetCurrentUserAsync());
            DbContext.Questions.Add(question);
            await DbContext.SaveChangesAsync();

            return Ok(new QuestionDTO(question, null));
        }

        // PUT: Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QuestionId)
            {
                return BadRequest();
            }

            DbContext.Entry(question).State = EntityState.Modified;

            try
            {
                await DbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // DELETE: Questions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(int id)
        {
            var question = await DbContext.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            DbContext.Questions.Remove(question);
            await DbContext.SaveChangesAsync();

            return question;
        }

        private bool QuestionExists(int questionId)
        {
            return DbContext.Questions.Any(e => e.QuestionId == questionId);
        }
    }
}
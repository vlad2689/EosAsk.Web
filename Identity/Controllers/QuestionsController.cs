using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Identity.Data;
using Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Identity.Controllers
{
    [Route("api/questions")]
    public class QuestionsController : EosAskBaseController
    {
        public QuestionsController(ApplicationDbContext context, 
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager) : base(context, userManager, signInManager)
        {
        }

        // GET: Questions
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var questions = await DbContext.Questions.ToListAsync();
            var model = new QuestionsIndexViewModel(questions);
            
            return View(model);
        }

        // GET: Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Question(int id)
        {
            var question = await DbContext.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            var model = new QuestionViewModel(question);
            return View(model);
        }

        [HttpGet("new")]
        public IActionResult NewQuestion()
        {
            return View(new NewQuestionModel());
        }
        
        [HttpPost("new")]
        public async Task<IActionResult> NewQuestion(NewQuestionModel newQuestionModel)
        {
            var question = new Question()
            {
                Text = newQuestionModel.Text,
                Owner = await UserManager.GetUserAsync(User),
            };

            DbContext.Questions.Add(question);
            await DbContext.SaveChangesAsync();
            
            return CreatedAtAction("Question", new {id = question.QuestionId});
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

        // POST: Questions
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion([FromBody] PostQuestionModel postQuestionModel)
        {
            var question = postQuestionModel.ToQuestion(DbContext);
            DbContext.Questions.Add(question);
            await DbContext.SaveChangesAsync();

            return CreatedAtAction("Question", new { id = question.QuestionId }, question);
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

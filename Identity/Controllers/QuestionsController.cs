using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Identity.Data;
using Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Identity.Controllers
{
    [Route("questions")]
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public QuestionsController(ApplicationDbContext context, 
            SignInManager<IdentityUser> signInManager,
            ApplicationDbContext applicationDbContext, 
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
        }

        // GET: Questions
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var questions = await _context.Questions.ToListAsync();
            var model = new QuestionsIndexViewModel(questions);
            
            return View(model);
        }

        // GET: Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Question(int id)
        {
            var question = await _context.Questions.FindAsync(id);
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
                Owner = await _userManager.GetUserAsync(User),
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            
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

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Question", new { id = question.QuestionId }, question);
        }

        // DELETE: Questions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return question;
        }

        private bool QuestionExists(int questionId)
        {
            return _context.Questions.Any(e => e.QuestionId == questionId);
        }
        
        private Task<IdentityUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}

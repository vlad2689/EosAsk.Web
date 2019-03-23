using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.Models
{
    public class PostAnswerModel
    {
        [Required]
        [MinLength(1, ErrorMessage = "Cannot post empty answer")]
        public string Text { get; set; }

        [Required]
        public int QuestionId { get; set; }

        public async Task<Answer> ToAnswer(ApplicationDbContext dbContext, IdentityUser owner)
        {
            var question = await dbContext.Questions.FindAsync(QuestionId);
            
            return new Answer
            {
                Owner = owner,
                Question = question,
                Text = Text,
            };
        }
    }
}
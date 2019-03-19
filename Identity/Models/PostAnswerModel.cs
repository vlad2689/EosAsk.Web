using System.ComponentModel.DataAnnotations;
using Identity.Data;

namespace Identity.Models
{
    public class PostAnswerModel
    {
        [Required]
        [MinLength(1, ErrorMessage = "Cannot post empty answer")]
        public string Text { get; set; }
        
        [Required]
        public int OwnerId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        public Answer ToAnswer(ApplicationDbContext dbContext)
        {
            return new Answer
            {
                Owner = dbContext.Users.Find(OwnerId),
                Question = dbContext.Questions.Find(QuestionId),
                Text = Text,
            };
        }
    }
}
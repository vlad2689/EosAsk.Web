using System.ComponentModel.DataAnnotations;
using Identity.Data;

namespace Identity.Models
{
    public class PostQuestionModel
    {
        [Required]
        [MinLength(1, ErrorMessage = "Cannot post empty question")]
        public string Text { get; set; }

        [Required]
        public int OwnerId { get; set; }

        public Question ToQuestion(ApplicationDbContext dbContext)
        {
            return new Question
            {
                Owner = dbContext.Users.Find(OwnerId),
                Text = Text,
            };
        }
    }
}
using System.ComponentModel.DataAnnotations;
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

        public Answer ToAnswer(ApplicationDbContext dbContext, IdentityUser owner)
        {
            return new Answer
            {
                Owner = owner,
                Question = dbContext.Questions.Find(QuestionId),
                Text = Text,
            };
        }
    }
}
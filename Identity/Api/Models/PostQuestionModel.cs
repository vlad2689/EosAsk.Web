using System.ComponentModel.DataAnnotations;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.Models
{
    public class PostQuestionModel
    {
        
        [Required]
        [MinLength(1, ErrorMessage = "Cannot post question with empty title")]
        public string Title { get; set; }
        
        [Required]
        [MinLength(1, ErrorMessage = "Cannot post question with empty body")]
        public string Text { get; set; }

//        [Required]
//        public int OwnerId { get; set; } = 

        public Question ToQuestion(ApplicationDbContext dbContext, IdentityUser owner)
        {
            return new Question
            {
//                Owner = dbContext.Users.Find(OwnerId),
                Owner = owner,
                Title = Title,
                Text = Text,
            };
        }
    }
}
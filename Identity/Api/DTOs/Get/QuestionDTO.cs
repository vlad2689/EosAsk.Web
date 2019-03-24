using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs.Get
{
    public class QuestionDTO
    {
        public QuestionDTO(Question question)
        {
            QuestionId = question.QuestionId;
            Title = question.Title;
            Text = question.Text;
            UpVotes = question.UpVotes;
            Owner = question.Owner;
            Answers = question.Answers.Select(answer => new AnswerDTO(answer, false));
        }
        
        public int QuestionId { get; }

        [Required]
        public string Title { get; }
        
        [Required]
        public string Text { get; }

        public int UpVotes { get; }

        [Required]
        public IdentityUser Owner { get; }

        public virtual IEnumerable<AnswerDTO> Answers { get; }
    }
}
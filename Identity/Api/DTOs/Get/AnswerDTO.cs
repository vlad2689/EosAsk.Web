using System;
using System.ComponentModel.DataAnnotations;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs.Get
{
    public class AnswerDTO
    {
        public AnswerDTO(Answer answer, bool includeQuestion = true)
        {
            AnswerId = answer.AnswerId;
            Text = answer.Text;
            if (includeQuestion)
            {
                Question = answer.Question;
            }
            Owner = answer.Owner;
            UpvoteCount = answer.UpvoteCount;
            IsCreatedOnBlockchain = answer.IsCreatedOnBlockchain;
            IsBadAnswer = answer.IsBadAnswer;
        }
        
        public int AnswerId { get; }

        [Required]
        public string Text { get; }

        [Required]
        public Question Question { get; }
        
        [Required]
        public IdentityUser Owner { get; }

        public int UpvoteCount { get; }
        
        public bool IsCreatedOnBlockchain { get; set; }

        public bool IsBadAnswer { get; }
    }
}
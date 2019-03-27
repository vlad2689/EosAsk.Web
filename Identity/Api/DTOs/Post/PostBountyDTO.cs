using System;
using System.ComponentModel.DataAnnotations;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs
{
    public class PostBountyDTO
    {
        [Required]
        public int QuestionId { get; set; }

        [Required]
        [Range(0.1, Double.MaxValue, ErrorMessage = "Can only place a bounty greater than 0.1")]
        public double Amount { get; set; }

        public string AmountSym { get; set; } = "EOS";

        public Bounty ToBounty(ApplicationDbContext dbContext, IdentityUser owner)
        {
            return new Bounty()
            {
                Question = dbContext.Questions.Find(QuestionId),
                Amount = Amount,
                AmountSym = AmountSym,
                Awarded = null,
                Owner = owner,
                IsCreatedOnBlockchain = false
            };
        }
    }
}

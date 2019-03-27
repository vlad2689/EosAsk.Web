using System.ComponentModel.DataAnnotations;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs.Get
{
    public class BountyDTO
    {
        public BountyDTO(Bounty bounty, bool includeQuestion)
        {
            BountyId = bounty.BountyId;
            Amount = bounty.Amount;
            AmountSym = bounty.AmountSym;
            Question = includeQuestion ? new QuestionDTO(bounty.Question, null) : null;
            Owner = bounty.Owner;
            Awarded = bounty.Awarded;
            IsCreatedOnBlockchain = bounty.IsCreatedOnBlockchain;
        }

        public int BountyId { get; }

        [Required] public double Amount { get; }

        [Required] public string AmountSym { get; } = "EOS";

        [Required] public QuestionDTO Question { get; }

        [Required] public IdentityUser Owner { get; }

        public IdentityUser Awarded { get; }

        // TODO: Run migrations
        public bool IsCreatedOnBlockchain { get; }
    }
}
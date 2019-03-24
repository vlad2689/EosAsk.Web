using System.ComponentModel.DataAnnotations;
using Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs.Get
{
    public class BountyDTO
    {
        public BountyDTO(Bounty bounty)
        {
            BountyId = bounty.BountyId;
            Amount = bounty.Amount;
            AmountSym = bounty.AmountSym;
            Question = bounty.Question;
            Owner = bounty.Owner;
            Awarded = bounty.Awarded;
        }
        
        public int BountyId { get; }

        [Required]
        public double Amount { get; }

        [Required]
        public string AmountSym { get; } = "EOS";
        
        [Required]
        public Question Question { get; }
        
        [Required]
        public IdentityUser Owner { get; }

        public IdentityUser Awarded { get; }
    }
}
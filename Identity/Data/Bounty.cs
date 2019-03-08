using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Identity.Data
{
    public class Bounty
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BountyId { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required] 
        public string AmountSym { get; set; } = "SYS";
        
        [Required]
        public Question Question { get; set; }
        
        [Required]
        public IdentityUser Owner { get; set; }

        public IdentityUser Awarded { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Identity.Data
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnswerId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Cannot post empty question")]
        public string Text { get; set; }

        [Required]
        public Question Question { get; set; }
        
        [Required]
        public IdentityUser Owner { get; set; }

        public double TippedEosAmount { get; set; } = default(double);

        public int UpvoteCount { get; set; } = 0;

        public bool IsCreatedOnBlockchain { get; set; }

        public int Status { get; set; } // 0 == undecided, 1 == awarded, 2 == incorrect
    }
}
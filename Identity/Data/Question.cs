using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Identity.Data
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionId { get; set; }

        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Text { get; set; }

        public int UpVotes { get; set; }

        [Required]
        public IdentityUser Owner { get; set; }
    }
}
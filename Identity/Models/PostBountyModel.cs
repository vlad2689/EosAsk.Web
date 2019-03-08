using Identity.Data;

namespace Identity.Models
{
    public class PostBountyModel
    {
        public int UserId { get; set; }
        
        public int QuestionId { get; set; }

        public double Amount { get; set; }

        public string AmountSym { get; set; }

        public Bounty ToBounty(ApplicationDbContext dbContext)
        {
            return new Bounty()
            {
                Question = dbContext.Questions.Find(QuestionId),
                Amount = Amount,
                AmountSym = AmountSym,
                Awarded = null,
                Owner = dbContext.Users.Find(UserId)
            };
        }
    }
}

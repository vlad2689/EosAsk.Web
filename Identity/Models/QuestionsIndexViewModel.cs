using System.Collections.Generic;
using System.Linq;
using Identity.Data;

namespace Identity.Models
{
    public class QuestionsIndexViewModel
    {
        public QuestionsIndexViewModel(IEnumerable<Question> questions)
        {
            Questions = questions.Select(q => new QuestionViewModel(q));
        }
        
        public IEnumerable<QuestionViewModel> Questions { get; set; }
    }
}
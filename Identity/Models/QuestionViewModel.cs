using Identity.Data;

namespace Identity.Models
{
    public class QuestionViewModel
    {
        public QuestionViewModel(Question question)
        {
            Text = question.Text;
        }
        
        public string Text { get; set; }
    }
}
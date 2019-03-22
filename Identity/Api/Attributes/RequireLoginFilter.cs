using Identity.Api.CustomResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Identity.Api.Attributes
{
    public class RequireLoginFilter : IActionFilter
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        
        public RequireLoginFilter(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }
        
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!_signInManager.IsSignedIn(context.HttpContext.User))
            {
                context.Result = new CustomUnauthorizedResult("Login is required before this action can be performed.");
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}

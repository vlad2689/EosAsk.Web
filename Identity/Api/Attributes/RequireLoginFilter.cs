using System;
using Microsoft.AspNetCore.Identity;
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
                context.HttpContext.Response.Redirect("/Identity/Account/Login");
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}
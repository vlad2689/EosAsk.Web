using System.Threading.Tasks;
using Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers.Base
{
    public class EosAskBaseController : Controller
    {
        protected readonly UserManager<IdentityUser> UserManager;
        protected readonly SignInManager<IdentityUser> SignInManager;
        protected readonly ApplicationDbContext DbContext;

        public EosAskBaseController(ApplicationDbContext context, 
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            DbContext = context;
            
        }
        
        protected Task<IdentityUser> GetCurrentUserAsync() => UserManager.GetUserAsync(HttpContext.User);
        
        protected bool IsSignedInUser() => SignInManager.IsSignedIn(HttpContext.User);
    }
}
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
        
        protected async Task<IdentityUser> GetCurrentUserAsync()
        {
            return await UserManager.FindByEmailAsync("test@test.test");
            
            // return await UserManager.GetUserAsync(HttpContext.User);
        }
        
        protected bool IsSignedInUser()
        {
            return true;
            
            // return SignInManager.IsSignedIn(HttpContext.User);
        }
    }
}
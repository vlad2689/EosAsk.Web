using System.Threading.Tasks;
using Identity.Api.Controllers.Base;
using Identity.Api.DTOs.Get;
using Identity.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers
{
    [Route("api/checklogin")]
    [EnableCors("EosAskCorsPolicy")]
    public class CheckLoginController : EosAskBaseController
    {
        public CheckLoginController(ApplicationDbContext context, UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager) : base(context, userManager, signInManager)
        {
        }

        // GET
        public async Task<ActionResult<UserDTO>> GetLoginStatus()
        {
            UserDTO model = null;

            if (IsSignedInUser())
            {
                model = new UserDTO()
                {
                    User = await GetCurrentUserAsync()
                };
            }

            return model;
        }
    }
}
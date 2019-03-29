using System.Threading.Tasks;
using Identity.Api.Controllers.Base;
using Identity.Api.DTOs.Get;
using Identity.Data;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
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
        [HttpGet("getLoginStatus")]
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

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Response.Cookies.Delete(".AspNetCore.Identity.Application");
            return Ok();
        }
    }
}
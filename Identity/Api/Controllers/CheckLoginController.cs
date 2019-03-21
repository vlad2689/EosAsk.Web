//using System.Threading.Tasks;
//using Identity.Api.Controllers.Base;
//using Identity.Api.Models;
//using Identity.Data;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//
//namespace Identity.Api.Controllers
//{
//    [Route("api/checklogin")]
//    public class CheckLoginController : EosAskBaseController
//    {
//        public CheckLoginController(ApplicationDbContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager) : base(context, userManager, signInManager)
//        {
//        }
//        
//        // GET
//        public async Task<JsonResult> GetLoginStatus()
//        {
//            var model = new CheckLoginModel
//            {
//            };
//            
//            if (IsSignedInUser())
//            {
//                var user = await GetCurrentUserAsync();
//                model.LoggedInUsername = user.UserName;
//                model.IsUserLoggedIn = true;
//            }
//
//            return Json(model);
//        }
//    }
//}
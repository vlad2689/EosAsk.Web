using Microsoft.AspNetCore.Identity;

namespace Identity.Api.DTOs.Get
{
    public class UserDTO
    {
        public IdentityUser User { get; set; }
    }
}
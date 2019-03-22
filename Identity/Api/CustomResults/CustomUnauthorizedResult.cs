using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.CustomResults
{
    // The code below is taken from https://ignas.me/tech/custom-unauthorized-response-body/
    public class CustomUnauthorizedResult : JsonResult
    {
        public CustomUnauthorizedResult(string message) : base(new CustomError(message))
        {
            StatusCode = StatusCodes.Status401Unauthorized;
        }
    }

    public class CustomError
    {
        public string Error { get; }

        public CustomError(string message)
        {
            Error = message;
        }
    }
}
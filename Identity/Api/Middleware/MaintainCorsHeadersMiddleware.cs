using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

// credits: https://stackoverflow.com/questions/49900141/asp-net-core-cors-request-blocked-why-doesnt-my-api-apply-the-right-headers
namespace Identity.Api.Middleware
{
    /// <summary>
    /// Reinstates CORS headers whenever an error occurs.
    /// </summary>
    /// <remarks>ASP.NET strips off CORS on errors; this overcomes this issue,
    ///  explained and worked around at https://github.com/aspnet/Home/issues/2378 </remarks>
    public class MaintainCorsHeadersMiddleware
    {
        public MaintainCorsHeadersMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        private readonly RequestDelegate _next;

        public async Task Invoke(HttpContext httpContext)
        {
            // Find and hold onto any CORS related headers ...
            var corsHeaders = new HeaderDictionary();
            foreach (var pair in httpContext.Response.Headers)
            {
                if (!pair.Key.ToLower().StartsWith("access-control-")) { continue; } // Not CORS related
                corsHeaders[pair.Key] = pair.Value;
            }

            // Bind to the OnStarting event so that we can make sure these CORS headers are still included going to the client
            httpContext.Response.OnStarting(o => {
                var ctx = (HttpContext)o;
                var headers = ctx.Response.Headers;
                // Ensure all CORS headers remain or else add them back in ...
                foreach (var pair in corsHeaders)
                {
                    if (headers.ContainsKey(pair.Key)) { continue; } // Still there!
                    headers.Add(pair.Key, pair.Value);
                }
                return Task.CompletedTask;
            }, httpContext);

            // Call the pipeline ...
            await _next(httpContext);
        }
    }
}
using Microsoft.AspNetCore.Antiforgery;
using sage.poc_001.Controllers;

namespace sage.poc_001.Web.Host.Controllers
{
    public class AntiForgeryController : poc_001ControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}

using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace sage.poc_001.Controllers
{
    public abstract class poc_001ControllerBase: AbpController
    {
        protected poc_001ControllerBase()
        {
            LocalizationSourceName = poc_001Consts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

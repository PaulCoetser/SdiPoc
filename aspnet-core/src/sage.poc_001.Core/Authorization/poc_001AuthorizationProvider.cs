using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace sage.poc_001.Authorization
{
    public class poc_001AuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            context.CreatePermission(PermissionNames.Pages_Onboarding, L("Onboarding"));
            context.CreatePermission(PermissionNames.Pages_SDIApplication, L("SDIApplication"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, poc_001Consts.LocalizationSourceName);
        }
    }
}

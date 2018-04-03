using Abp.Authorization;
using sage.poc_001.Authorization.Roles;
using sage.poc_001.Authorization.Users;

namespace sage.poc_001.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

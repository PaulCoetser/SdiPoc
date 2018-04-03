using Abp.Domain.Repositories;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace sage.poc_001.Onboarding
{
    public class OnboardingManager : DomainService
    {

        public OnboardingManager()
        { }


        //private async Task<> GetActiveTenantAsync()
        //{
        //    IRepository repo = new IRepository<SDI_Developer>();
        //}



        //private async Task<Tenant> GetActiveTenantAsync()
        //{
        //    if (!AbpSession.TenantId.HasValue)
        //    {
        //        return null;
        //    }

        //    return await GetActiveTenantAsync(AbpSession.TenantId.Value);
        //}

        //private async Task<Tenant> GetActiveTenantAsync(int tenantId)
        //{
        //    var tenant = await _tenantManager.FindByIdAsync(tenantId);
        //    if (tenant == null)
        //    {
        //        throw new UserFriendlyException(L("UnknownTenantId{0}", tenantId));
        //    }

        //    if (!tenant.IsActive)
        //    {
        //        throw new UserFriendlyException(L("TenantIdIsNotActive{0}", tenantId));
        //    }

        //    return tenant;
        //}

        //protected virtual void CheckErrors(IdentityResult identityResult)
        //{
        //    identityResult.CheckErrors(LocalizationManager);
        //}

    }
}

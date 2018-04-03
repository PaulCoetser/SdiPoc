using Abp.Application.Services;
using Abp.Application.Services.Dto;
using sage.poc_001.MultiTenancy.Dto;

namespace sage.poc_001.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

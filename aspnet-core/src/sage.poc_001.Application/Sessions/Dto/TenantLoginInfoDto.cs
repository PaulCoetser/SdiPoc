using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using sage.poc_001.MultiTenancy;

namespace sage.poc_001.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}

using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using sage.poc_001.Roles.Dto;

namespace sage.poc_001.Roles
{
    public interface IRoleAppService : IAsyncCrudAppService<RoleDto, int, PagedResultRequestDto, CreateRoleDto, RoleDto>
    {
        Task<ListResultDto<PermissionDto>> GetAllPermissions();
    }
}

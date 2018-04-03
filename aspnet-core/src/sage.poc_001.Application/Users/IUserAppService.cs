using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using sage.poc_001.Roles.Dto;
using sage.poc_001.Users.Dto;

namespace sage.poc_001.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

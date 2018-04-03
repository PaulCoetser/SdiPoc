using System.Threading.Tasks;
using Abp.Application.Services;
using sage.poc_001.Authorization.Accounts.Dto;

namespace sage.poc_001.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

using System.Threading.Tasks;
using Abp.Application.Services;
using sage.poc_001.Sessions.Dto;

namespace sage.poc_001.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

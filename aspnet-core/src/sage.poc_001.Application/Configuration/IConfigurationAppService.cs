using System.Threading.Tasks;
using sage.poc_001.Configuration.Dto;

namespace sage.poc_001.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

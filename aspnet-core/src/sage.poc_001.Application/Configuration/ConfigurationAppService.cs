using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using sage.poc_001.Configuration.Dto;

namespace sage.poc_001.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : poc_001AppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

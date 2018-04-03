using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using sage.poc_001.Configuration;

namespace sage.poc_001.Web.Host.Startup
{
    [DependsOn(
       typeof(poc_001WebCoreModule))]
    public class poc_001WebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public poc_001WebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(poc_001WebHostModule).GetAssembly());
        }
    }
}

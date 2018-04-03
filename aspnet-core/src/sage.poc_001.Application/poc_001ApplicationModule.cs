using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using sage.poc_001.Authorization;

namespace sage.poc_001
{
    [DependsOn(
        typeof(poc_001CoreModule), 
        typeof(AbpAutoMapperModule))]
    public class poc_001ApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<poc_001AuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(poc_001ApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );

            //Configuration.Navigation.Providers.Add<POCNavigationProvider>();
        }
    }
}

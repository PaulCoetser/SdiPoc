using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace sage.poc_001.Localization
{
    public static class poc_001LocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(poc_001Consts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(poc_001LocalizationConfigurer).GetAssembly(),
                        "sage.poc_001.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}

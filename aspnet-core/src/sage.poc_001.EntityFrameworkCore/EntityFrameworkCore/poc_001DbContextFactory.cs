using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using sage.poc_001.Configuration;
using sage.poc_001.Web;

namespace sage.poc_001.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class poc_001DbContextFactory : IDesignTimeDbContextFactory<poc_001DbContext>
    {
        public poc_001DbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<poc_001DbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            poc_001DbContextConfigurer.Configure(builder, configuration.GetConnectionString(poc_001Consts.ConnectionStringName));

            return new poc_001DbContext(builder.Options);
        }
    }
}

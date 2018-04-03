using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace sage.poc_001.EntityFrameworkCore
{
    public static class poc_001DbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<poc_001DbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<poc_001DbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

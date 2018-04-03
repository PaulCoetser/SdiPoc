using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using sage.poc_001.Authorization.Roles;
using sage.poc_001.Authorization.Users;
using sage.poc_001.MultiTenancy;

namespace sage.poc_001.EntityFrameworkCore
{
    public class poc_001DbContext : AbpZeroDbContext<Tenant, Role, User, poc_001DbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public virtual DbSet<Onboarding.SDI_Application> SDIApplications { get; set; }
        public virtual DbSet<Onboarding.SDI_Developer> SDIDevelopers { get; set; }

        public poc_001DbContext(DbContextOptions<poc_001DbContext> options)
            : base(options)
        {
        }
    }
}

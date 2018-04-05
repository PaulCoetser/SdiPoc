using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using sage.poc_001.Authorization.Roles;
using sage.poc_001.Authorization.Users;
using sage.poc_001.MultiTenancy;
using sage.poc_001.SDI.Application;
using sage.poc_001.SDI.Onboarding;

namespace sage.poc_001.EntityFrameworkCore
{
    public class poc_001DbContext : AbpZeroDbContext<Tenant, Role, User, poc_001DbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<SDI_User> SDIUsers { get; set; }
        public virtual DbSet<SDI_Application> SDIApplications { get; set; }
        public virtual DbSet<SDI_Developer> SDIDevelopers { get; set; }

        public poc_001DbContext(DbContextOptions<poc_001DbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SDI_Application>()
                .HasIndex(p => new { p.ApplicationIdFromSdiPlatform })
                .IsUnique();

            modelBuilder.Entity<SDI_User>()
                .HasIndex(p => new { p.ApplicationIdFromSdiPlatform, p.UserId })
                .IsUnique();
        }
    }
}

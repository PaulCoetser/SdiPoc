using Abp.Domain.Entities.Auditing;
using sage.poc_001.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;

namespace sage.poc_001.SDI.Application
{
    [Table("SDIUser")]
    public class SDI_User : Entity<long>
    {
        //the PK of this object is the same as the abpUser

        public SDI_User() { }

        public const int MaxPasscodeLength = 10;
        public const int MaxApplicationIdFromSdiPlatformLength = 32;

        [Required]
        [StringLength(MaxPasscodeLength)]
        public string Passcode { get; set; }

        [Required]
        [StringLength(MaxApplicationIdFromSdiPlatformLength)]
        public string ApplicationIdFromSdiPlatform { get; set; }

        [Required]
        public DateTimeOffset Expires { get; set; }

        [Required]
        public int SDI_ApplicationId { get; set; }

        [ForeignKey("SDI_ApplicationId")]
        public virtual Onboarding.SDI_Application SDIApplication { get; set; }

        [Required]
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User SystemUser { get; set; }
    }
}

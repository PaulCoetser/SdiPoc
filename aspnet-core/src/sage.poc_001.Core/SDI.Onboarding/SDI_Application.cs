using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace sage.poc_001.SDI.Onboarding
{
    [Table("SDIApplications")]
    public class SDI_Application : FullAuditedEntity<int>
    {
        public SDI_Application() { }

        public const int MaxNameLength = 32;
        public const int MaxDescriptionLength = 128;
        public const int MaxDomainLength = 32;
        public const int MaxApprovalUrlLength = 256;
        public const int MaxUploadUrlLength = 256;
        public const int MaxWebsiteLength = 256;
        public const int MaxRegistrationLength = 256;

        [Required]
        [StringLength(MaxNameLength)]
        public string Name { get; set; }
        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }
        [Required]
        [StringLength(MaxDomainLength)]
        public string Domain { get; set; }
        [StringLength(MaxApprovalUrlLength)]
        public string ApprovalUrl { get; set; }
        [StringLength(MaxUploadUrlLength)]
        public string UploadUrl { get; set; }
        [StringLength(MaxWebsiteLength)]
        public string Website { get; set; }
        //This is the return value from the regisration process!
        [StringLength(MaxRegistrationLength)]
        public string RegistrationUrl { get; set; }

        public string ApplicationIdFromSdiPlatform { get; set; }
        public int SDI_DeveloperId { get; set; }
    }
}

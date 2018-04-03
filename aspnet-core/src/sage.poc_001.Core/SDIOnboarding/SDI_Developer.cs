using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sage.poc_001.Onboarding
{
    [Table("SDIDevelopers")]
    public class SDI_Developer : FullAuditedEntity<int>
    {

        public SDI_Developer() { }

        public const int MaxNameLength = 64;
        public const int MaxCompanyLength = 64;
        public const int MaxEmailLength = 64;
        public const int MaxPhoneLength = 16;
        public const int MaxCountryLength = 32;

        [Required]
        [StringLength(MaxNameLength)]
        public string Name { get; set; }
        [Required]
        [StringLength(MaxCompanyLength)]
        public string Company { get; set; }
        [Required]
        [StringLength(MaxEmailLength)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(MaxPhoneLength)]
        public string Phone { get; set; }
        [Required]
        [StringLength(MaxCountryLength)]
        public string Country { get; set; }

        public string DeveloperIdFromSdiPlatform { get; set; }
        
        [ForeignKey("SDI_DeveloperId")]
        public virtual ICollection<SDI_Application> Applications { get; set; }
    }
}

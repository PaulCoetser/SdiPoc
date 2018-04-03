using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace sage.poc_001.Onboarding.Dto
{
    [AutoMapTo(typeof(SDI_Developer))]
    public class SDI_DeveloperDto : EntityDto<int>
    {
        public SDI_DeveloperDto() { }

        [Required]
        [StringLength(SDI_Developer.MaxNameLength)]
        public string Name { get; set; }
        [Required]
        [StringLength(SDI_Developer.MaxCompanyLength)]
        public string Company { get; set; }
        [Required]
        [StringLength(SDI_Developer.MaxEmailLength)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(SDI_Developer.MaxPhoneLength)]
        public string Phone { get; set; }
        [Required]
        [StringLength(SDI_Developer.MaxCountryLength)]
        public string Country { get; set; }

        public string DeveloperIdFromSdiPlatform { get; set; }

        public ICollection<SDI_ApplicationDto> Applications { get; set; }
    }
}

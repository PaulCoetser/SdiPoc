using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace sage.poc_001.Onboarding.Dto
{
    [AutoMapTo(typeof(SDI_Application))]
    public class SDI_ApplicationDto : EntityDto<int>
    {
        public SDI_ApplicationDto() { }

        [Required]
        [StringLength(SDI_Application.MaxNameLength)]
        public string Name { get; set; }
        [StringLength(SDI_Application.MaxDescriptionLength)]
        public string Description { get; set; }
        [Required]
        [StringLength(SDI_Application.MaxDomainLength)]
        public string Domain { get; set; }
        [StringLength(SDI_Application.MaxApprovalUrlLength)]
        public string ApprovalUrl { get; set; }
        [StringLength(SDI_Application.MaxUploadUrlLength)]
        public string UploadUrl { get; set; }
        [StringLength(SDI_Application.MaxWebsiteLength)]
        public string Website { get; set; }
        //This is the return value from the regisration process!
        [StringLength(SDI_Application.MaxRegistrationLength)]
        public string RegistrationUrl { get; set; }

        public int SDI_DeveloperId { get; set; }

        public string ApplicationIdFromSdiPlatform { get; set; }
    }
}
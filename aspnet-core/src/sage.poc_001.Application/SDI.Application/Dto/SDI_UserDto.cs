using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace sage.poc_001.SDI.Application.Dto
{
    [AutoMapTo(typeof(SDI_User))]
    public class SDI_UserDto : EntityDto<int>
    {
        public SDI_UserDto() { }

        [Required]
        [StringLength(SDI_User.MaxSecretLength)]
        public string Secret { get; set; }

        [Required]
        [StringLength(SDI_User.MaxPasscodeLength)]
        public string Passcode { get; set; }

        [Required]
        public DateTimeOffset Expires { get; set; }

        [Required]
        public int SDI_ApplicationId { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        [StringLength(SDI_User.MaxApplicationIdFromSdiPlatformLength)]
        public string ApplicationIdFromSdiPlatform { get; set; }

        [StringLength(SDI_User.MaxApiKeyLength)]
        public string ApiKeySdi { get; set; }
    }
}

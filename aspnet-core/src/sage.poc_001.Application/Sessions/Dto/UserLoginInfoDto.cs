using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using sage.poc_001.Authorization.Users;

namespace sage.poc_001.Sessions.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }
    }
}

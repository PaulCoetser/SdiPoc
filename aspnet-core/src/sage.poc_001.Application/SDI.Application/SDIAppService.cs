using Abp.Authorization;
using Abp.Domain.Repositories;
using sage.poc_001.Authorization;
using sage.poc_001.SDI.Application.Dto;
using System.Threading.Tasks;

namespace sage.poc_001.SDI.Application
{
    [AbpAuthorize(PermissionNames.Pages_SDIApplication)]
    public class SDIAppService : poc_001AppServiceBase, ISDIAppService 
    {

        private readonly IRepository<SDI_User, long> _sdiUserRepository;

        public SDIAppService(IRepository<SDI_User, long> sdiUserRepository) 
        {
            _sdiUserRepository = sdiUserRepository;
        }

        public async Task<SDI_UserDto> GetLatestPasscodeByUserId(int userId, int sdi_ApplicationId)
        {
            var user = await _sdiUserRepository.FirstOrDefaultAsync( t => t.UserId == userId && t.SDI_ApplicationId == sdi_ApplicationId); //there should only be one.  if not a passcode needs to be created by calling program, but we return null if it does not exist
            if (user == null)
                return null;

            return ObjectMapper.Map<SDI_UserDto>(user);
        }

        private async Task<SDI_UserDto> CreatePasscodeForUser(SDI_UserDto input)
        {
            var user = ObjectMapper.Map<SDI_User>(input);

            var resultUser = await _sdiUserRepository.InsertAsync(user);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SDI_UserDto>(resultUser);
        }

        public async Task<SDI_UserDto> UpdatePasscode(SDI_UserDto input)
        {
            var user = await _sdiUserRepository.FirstOrDefaultAsync(t => t.Id == input.Id && t.SDI_ApplicationId == input.SDI_ApplicationId); //there should only be one.  if not a passcode needs to be created by calling program, but we return null if it does not exist

            //cant find the user so we Create it and return it.
            if (user == null)
                return await CreatePasscodeForUser(input);

            ObjectMapper.Map(input, user);

            await _sdiUserRepository.UpdateAsync(user);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SDI_UserDto>(user);
        }

        public async Task<SDI_UserDto> UpdateApiKey(SDI_UserDto input)
        {
            var user = await _sdiUserRepository.FirstOrDefaultAsync(t => t.Id == input.Id && t.SDI_ApplicationId == input.SDI_ApplicationId); //there should only be one.  if not a passcode needs to be created by calling program, but we return null if it does not exist

            //cant find the user so we Create it and return it.
            if (user == null)
                throw new System.Exception("User should exists");

            ObjectMapper.Map(input, user);

            await _sdiUserRepository.UpdateAsync(user);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SDI_UserDto>(user);
        }
    }
}
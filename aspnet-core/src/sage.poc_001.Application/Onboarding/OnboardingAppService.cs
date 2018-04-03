using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using sage.poc_001.Authorization;
using sage.poc_001.Onboarding.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.IdentityFramework;

namespace sage.poc_001.Onboarding
{
    [AbpAuthorize(PermissionNames.Pages_Onboarding)]
    public class OnboardingAppService : AsyncCrudAppService<SDI_Developer, SDI_DeveloperDto, int, PagedResultRequestDto, SDI_DeveloperDto, SDI_DeveloperDto>, IOnboardingAppService //poc_001AppServiceBase, IOnboardingAppService 
    {
        private readonly IRepository<SDI_Developer> _sdiDeveloperRepository;
        private readonly IRepository<SDI_Application> _sdiApplicationRepository;

        public OnboardingAppService(IRepository<SDI_Developer> sdiDeveloperRepository,
                                    IRepository<SDI_Application> sdiApplicationRepository) : base(sdiDeveloperRepository)
        {
            _sdiDeveloperRepository = sdiDeveloperRepository;
            _sdiApplicationRepository = sdiApplicationRepository;
        }

        public override async Task<SDI_DeveloperDto> Create(SDI_DeveloperDto input)
        {
            CheckCreatePermission();

            var developer = ObjectMapper.Map<SDI_Developer>(input);
            var resultDeveloper = await _sdiDeveloperRepository.InsertAsync(developer);

            foreach (var application in developer.Applications)
            {
                await _sdiApplicationRepository.InsertAsync(application);
            }

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(resultDeveloper);
        }

        public override async Task<SDI_DeveloperDto> Update(SDI_DeveloperDto input)
        {
            CheckUpdatePermission();

            var developer = await _sdiDeveloperRepository.GetAsync(input.Id);

            ObjectMapper.Map(input, developer);

            await _sdiDeveloperRepository.UpdateAsync(developer);

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(developer);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            CheckDeletePermission();

            var developer = await _sdiDeveloperRepository.GetAsync(input.Id);

            await _sdiDeveloperRepository.DeleteAsync(developer);

            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task<ListResultDto<SDI_ApplicationDto>> GetAllApplications(int developerId)
        {
            var applicationList = await _sdiApplicationRepository.GetAllListAsync( t=> t.SDI_DeveloperId == developerId);

            return new ListResultDto<SDI_ApplicationDto>(
                ObjectMapper.Map<List<SDI_ApplicationDto>>(applicationList)
            );
        }

        public async Task<SDI_ApplicationDto> GetApplication(int applicationId)
        {
            var application = await _sdiApplicationRepository.GetAsync(applicationId);

            return ObjectMapper.Map<SDI_ApplicationDto>(application);
        }

        public async Task<SDI_ApplicationDto> CreateApplication(SDI_ApplicationDto input)
        {
            CheckCreatePermission();

            var application = ObjectMapper.Map<SDI_Application>(input);
            var resultApplication = await _sdiApplicationRepository.InsertAsync(application);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SDI_ApplicationDto>(resultApplication);
        }

        public async Task<SDI_ApplicationDto> UpdateApplication(SDI_ApplicationDto input)
        {
            CheckUpdatePermission();

            var application = await _sdiApplicationRepository.GetAsync(input.Id);

            ObjectMapper.Map(input, application);

            await _sdiApplicationRepository.UpdateAsync(application);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SDI_ApplicationDto>(application);
        }

        public async Task DeleteApplication(EntityDto<int> input)
        {
            CheckDeletePermission();

            var application = await _sdiApplicationRepository.GetAsync(input.Id);

            await _sdiApplicationRepository.DeleteAsync(application);

            await CurrentUnitOfWork.SaveChangesAsync();
        }
        
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

    }
}
using Abp.Application.Services;
using sage.poc_001.Notifications.Dto;

namespace sage.poc_001.Notifications
{
    public interface INotificationAppService : IApplicationService
    {
        void PassCodeConsented(ConsentModel input); //approval URL
        void FileUploaded(FileModel input); //upload URL
    }
}
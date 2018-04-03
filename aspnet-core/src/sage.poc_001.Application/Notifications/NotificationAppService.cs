using sage.poc_001.Notifications.Dto;

namespace sage.poc_001.Notifications
{
    public class NotificationAppService : poc_001AppServiceBase, INotificationAppService
    {
        public void FileUploaded(FileModel input)
        {
            //do some File Uploaded magic
            //throw new NotImplementedException();
        }

        public void PassCodeConsented(ConsentModel input)
        {
            //do some Passcode consented magic
            //throw new NotImplementedException();
        }
    }
}

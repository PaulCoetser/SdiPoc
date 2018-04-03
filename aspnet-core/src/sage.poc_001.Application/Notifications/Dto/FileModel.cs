using System.ComponentModel.DataAnnotations;

namespace sage.poc_001.Notifications.Dto
{
    public class FileModel
    {
        [Required]
        public string FileName { get; set; }
        public byte[] FileBlob { get; set; }
    }
}

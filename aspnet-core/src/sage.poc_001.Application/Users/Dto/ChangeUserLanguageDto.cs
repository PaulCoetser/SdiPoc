using System.ComponentModel.DataAnnotations;

namespace sage.poc_001.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
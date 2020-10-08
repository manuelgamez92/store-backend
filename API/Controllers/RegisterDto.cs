using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    public class RegisterDto
    {
        [Required]

        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]

        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage="Password not strong enough")]
        public string Password { get; set; }
    }
}
// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace PeerLandingFE.Models
{
    public class User
    {
        public int Id { get; set; } 
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; } 
        [Required]
        public string Role { get; set; }
        public decimal Balance { get; set; } = 0; 
    }
}

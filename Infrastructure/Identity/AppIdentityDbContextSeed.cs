using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager){
            if(!userManager.Users.Any()){
                var user = new AppUser {
                    DisplayName= "Bob",
                    Email= "bob@text.com",
                    UserName= "bob@test.com",
                    Address = new Core.Entities.Identity.Address{
                        FirstName = "Bob",
                        LastName = "Pataki",
                        Street = "10 the street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
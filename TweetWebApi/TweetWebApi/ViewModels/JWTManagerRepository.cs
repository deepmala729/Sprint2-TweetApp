using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TweetWebApi.Interfaces;
using TweetWebApi.Models;
using TweetWebApi.ViewModels;

namespace TweetWebApi.ViewModels
{
    public class JWTManagerRepository : IJWTMangerRepository
    {
        Dictionary<string, string> UserRecords;
        private bool _isAdmin;
        private readonly IConfiguration configuration;
        private readonly TweetDBContext db;

        public bool IsRegister { get; private set; }

        public JWTManagerRepository(IConfiguration _configuration, TweetDBContext _db)
        {
            db = _db;
            configuration = _configuration;
        }
        public Tokens Authenicate(LoginViewModel registerViewModel, bool IsRegister)
        {
            if (IsRegister)
            {
                if (db.TblLogins.Any(x => x.Email == registerViewModel.Email))
                {
                    return null;
                }
                TblLogin tblLogin = new TblLogin();
                tblLogin.FirstName = registerViewModel.FirstName;
                tblLogin.LastName = registerViewModel.LastName;
                tblLogin.Email = registerViewModel.Email;
                tblLogin.LoginId = registerViewModel.LoginId;
                tblLogin.Password = registerViewModel.Password;
                tblLogin.ConfirmPassword = registerViewModel.ConfirmPassword;
                tblLogin.ContactNumber = registerViewModel.ContactNumber;
                db.TblLogins.Add(tblLogin);
                db.SaveChanges();
            }
            else
            {
                _isAdmin = db.TblLogins.Any(x => x.Email == registerViewModel.Email && x.Password == registerViewModel.Password);
            }

            UserRecords = db.TblLogins.ToList().ToDictionary(x => x.Email, x => x.Password);
            if (!UserRecords.Any(x => x.Key == registerViewModel.Email && x.Value == registerViewModel.Password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Name,registerViewModel.Email)
                }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };
        }

        public object Authenicate(RegisterViewModel register, bool v)
        {
            throw new NotImplementedException();
        }
    }
}

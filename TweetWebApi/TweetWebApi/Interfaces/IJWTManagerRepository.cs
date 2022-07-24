using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetWebApi.ViewModels;

namespace TweetWebApi.Interfaces
{
    public interface IJWTMangerRepository
    {
        Tokens Authenicate(LoginViewModel users, bool IsRegister);
        object Authenicate(RegisterViewModel register, bool v);
    
    }
}

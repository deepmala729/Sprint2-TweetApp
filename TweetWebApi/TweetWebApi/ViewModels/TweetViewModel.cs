using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TweetWebApi.ViewModels
{
    public class TweetViewModel
    {
        public string AuthorName { get; set; }
        public string AuthorLogo { get; set; }
        public string AuthorSlug { get; set; }
        public string TweetTime { get; set; }
        public string TweetDescription { get; set; }
        public string TweetImage { get; set; }
    }
}

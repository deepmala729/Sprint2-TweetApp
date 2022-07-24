using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetWebApi.Models;


namespace TweetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetController : Controller
    {
        TweetDBContext db;
        public TweetController(TweetDBContext _db)
        {
            db = _db;
        }
        [HttpGet]
        public IEnumerable<TblTweet> GetProducts()
        {
            return db.TblTweets;
        }
        [HttpGet]
        [Route("GetTweetsByUserName")]
        public IEnumerable<TblTweet> GetTweetByEmal(string username)
        {
            return db.TblTweets.Where(x=>x.AuthorEmail==username);
        }
        [HttpGet]
        [Route("SeachTweet")]
        public IEnumerable<TblTweet> GetTweetSeach(string search)
        {
            return db.TblTweets.Where(x => x.AuthorEmail.Contains(search) || x.TweetDescription.Contains(search));
        }

        [HttpPost]
        public IActionResult Post([FromBody] TblTweet user)
        {
            user.AuthorSlug = "@" + user.AuthorSlug;
            user.TweetTime = DateTime.Now.ToString();
            db.TblTweets.Add(user);
            db.SaveChanges();
            return Ok();
        }
        /*public string Post([FromBody] TblTweet user)
        {
          TblTweet product = new TblTweet();
            product.Id = user.Id;
            product.AuthorName = user.AuthorName;
            product.AuthorLogo = user.AuthorLogo;
            product.AuthorSlug = user.AuthorSlug;
            product.TweetTime = user.TweetTime;
            product.TweetDescription = user.TweetDescription;
            product.TweetImage = user.TweetImage;
            
            db.TblTweets.Add(user);
            db.SaveChanges();
            return "success";
        }*/

        [HttpPut]
        public string Put([FromBody] TblTweet tblsample)
        {
            var tbltweetObj = db.TblTweets.Where(x => x.Id == tblsample.Id);
            if (tbltweetObj != null)
            {
                db.TblTweets.Update(tblsample);
                db.SaveChanges();
                return "Success";
            }
            return "Fail";
        }

        [HttpDelete]
        public string Delete([FromBody] int Id)
        {
            var tbltweetObj = db.TblTweets.Where(x => x.Id == Id).FirstOrDefault();
            if(tbltweetObj !=null)
            {
                db.TblTweets.Remove(tbltweetObj);
                db.SaveChanges();
                return "Success";
            }
            return "Fail";
        }
    }
}

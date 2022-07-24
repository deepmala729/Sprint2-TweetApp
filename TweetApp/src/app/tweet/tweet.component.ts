import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tweet } from '../models/Tweet';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor(private jwt: JwtHelperService, private _auth: AuthService, public httpc: HttpClient, private _tweetservice: TweetService, private _router: Router) { }
  isEdit = false;
  files = [];
  username: string = '';
  ngOnInit(): void {
    this.username = this.jwt.decodeToken(this._auth.getToken()?.toString())?.unique_name;
    this.getData(this.username);

  }
  user: Tweet = new Tweet();
  users: Array<Tweet> = new Array<Tweet>();
  img:any;

  AddTweet() {
    //console.log(this.CustomerModel);


    console.log(this.user)
    var admindto = {
      id: Number(this.user.id),
      authorEmail: this.username,
      authorLogo: this.user.authorLogo,
      authorSlug: this.user.authorSlug,
      tweetTime: this.user.tweetTime,
      tweetImage: this.user.tweetImage,
      tweetDescription: this.user.tweetDescription,

    }
    if (this.isEdit) {
      this.httpc.put("https://localhost:44343/api/Tweet", admindto).subscribe(res => this.PostSuccess(res), res => this.PostError(res));
    }
    else {
    let filetoUpload=<File>this.files[0];
    const formData=new FormData();
    formData.append('file',filetoUpload,filetoUpload.name)
    this.httpc.post("https://localhost:44343/api/Upload",formData).subscribe(res=>{console.log(res); this.img=res;admindto.tweetImage=this.img.imageUrl;this.AddTweetData(admindto);},res=>console.log(res));
   
    }

    this.user = new Tweet();

  }
  AddTweetData(admindto:any){
    this.httpc.post("https://localhost:44343/api/Tweet", admindto).subscribe(res => this.PostSuccess(res), res => this.PostError(res));
  }
  PostSuccess(res: any) {
    console.log(res);

  }
  PostError(res: any) {
    console.log(res);
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
  }
  getData(email: any) {
    console.log("Hi");
    this.httpc.get("https://localhost:44343/api/Tweet/GetTweetsByUserName?username=" + email).subscribe(res => this.GetSuccess(res), res => this.GetError(res));
  }
  GetSuccess(input: any) {
    this.users = (input);
  }
  GetError(input: any) {
    console.log(input);
  }
  EditTweet(input: Tweet) {
    this.user = input;
  }
  DeleteTweet(input: Tweet) {
    var index = this.users.indexOf(input);
    this.users.splice(index, 1);
  }
  UpdateTweet() {
    console.log(this.EditTweet);
    this.user.updateTweet(this.EditTweet)

  }

}

function UpdateTweet() {
  throw new Error('Function not implemented.');
}

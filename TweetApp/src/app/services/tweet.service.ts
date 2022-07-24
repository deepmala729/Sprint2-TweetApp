import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {


  private _tweetUrl = "https://localhost:44343/api/Tweet";
  search: any;
  constructor(private http: HttpClient,private _router:Router) { }

  
  getProducts() {
    return this.http.get<any>(this._tweetUrl);
  }
  
  /*updateTweet(id:any, data:any){
    return this.http.put('$(this.url)/$(id)');
  }
  deleteTweet(id:any){
    return this.http.delete('$(this.url)/$(id)');
  }*/
}

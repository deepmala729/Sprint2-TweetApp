import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserData } from '../models/UserData';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
 
  constructor(private _auth: AuthService, private accountService :AccountService) { }

  users: Array<UserData> = new Array<UserData>();
  ngOnInit(): void {

    this._auth.getUser().subscribe(res => this.users = res, err => console.log(err))
  }
  
  clickMe(){
    this.accountService.sendClickEvent();
  }
  
  quantity:number=0;
  i=0;
  plus(){
    if(this.i !=50){
      this.i++;
      this.quantity=this.i;
    }
  }

}
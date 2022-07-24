import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/UserData';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: UserData = new UserData();
  modelText:string="";
  modelHeader:string="";
  showSpinner:boolean=false;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  DisplayModalPopup(modelHeader:string,modelText:string){
    this.modelHeader=modelHeader;
    this.modelText=modelText;
    document.getElementById("btnLaunchModel")?.click();
  }
  ShowSpinner(){
    this.showSpinner=true;
  }
  HideSpinner(){
    this.showSpinner=false;
  }

  LoginUser() {
    this.ShowSpinner();
    var userDataObject={
    email:this.loginUserData.email,
    password:this.loginUserData.password
  }
    this._auth.loginUser(userDataObject).subscribe((res: { token: string; isAdmin: any; }) => {
      this.HideSpinner();localStorage.setItem('token', res.token);
      this._router.navigate(['/home']);
    }, err => console.log(err));
  }

  hasError(typeofvalidator:string,controlname:string):Boolean{
    return this.loginUserData.formLoginGroup.controls[controlname].hasError(typeofvalidator);
  }
}
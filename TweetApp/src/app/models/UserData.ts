import {NgForm,FormGroup,Validators,FormBuilder,FormControl} from '@angular/forms';

export class UserData{
    userId:number=0;
    firstName:any;
    lastName:any;
    email:any;
    loginId:any;
    password:any;
    confirmPassword:any;
    contactNumber:number=0;
    formLoginGroup:FormGroup;
    constructor(){
        var _builder=new FormBuilder();
        this.formLoginGroup=_builder.group({});
        this.formLoginGroup.addControl("UserNameControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("PasswordControl",new FormControl('',Validators.required));
    }
}
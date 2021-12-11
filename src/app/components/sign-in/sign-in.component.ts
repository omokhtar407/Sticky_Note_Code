import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService) {
    if(this._AuthService.isLoggedin()){
      this._Router.navigate(['profile']);
    }
  }

  SignIn:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required ,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  });

  signinFormData(SignIn:FormGroup){

    this._AuthService.signIn(SignIn.value).subscribe((response)=>{
      if(SignIn.valid){
        if(response.message == 'success'){
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['profile']);
          this.toastr.success('Login Successed', "",{positionClass:'toast-top-right',timeOut: 1500});
        }
        else{
          this.error =response.message;
          this.toastr.error(`${this.error}`, "",{positionClass:'toast-top-right',timeOut: 1500});
        }
      }
    })
  }

  ngOnInit(): void {
    $('.inner').particleground();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}

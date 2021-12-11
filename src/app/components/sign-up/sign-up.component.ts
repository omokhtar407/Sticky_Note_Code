import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isClicked:boolean= false;
  error:string = '';

  constructor(private _AuthService:AuthService , private _Router:Router,private toastr:ToastrService) { }
  SignUp:FormGroup = new FormGroup({
      first_name:new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(8)]),
      last_name:new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(8)]),
      age:new FormControl(null,[Validators.required ,Validators.min(16),Validators.max(80)]),
      email:new FormControl(null,[Validators.required ,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  });

  signupFormData(SignUp:FormGroup){
    this.isClicked= true;
    this._AuthService.signUp(SignUp.value).subscribe((response)=>{
      if(SignUp.valid){
        if(response.message == 'success'){
          this.isClicked= false;
          this.SignUp.reset();
          this._Router.navigate(['signin']);
          this.toastr.success('Registeration Success', "",{positionClass:'toast-top-right',timeOut: 1500});
        }
        else{
          this.error = response.errors.email.message;
          this.isClicked= false;
          this.toastr.error(`${this.error}!`, "",{positionClass:'toast-top-right',timeOut: 1500});
        }
      }
    })
  }


  ngOnInit(): void {
    $('.inner').particleground();
  }

}

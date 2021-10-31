import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registrationForm')
  registrationForm!:NgForm
  user!:User;
  err!:string;
  constructor(private gamesDataService:GamesDataService, private _router: Router) { }

  ngOnInit(): void {    
    this.user ={
      name:"",
      username:"",
      password:"",
      passwordRepeat!:""

    }
    
    setTimeout(() => {this.registrationForm.setValue(this.user);});

  }
  onSubmit(registrationForm:NgForm):void{
    console.log("vals", registrationForm.value);
    if(this.registrationForm.dirty && this.registrationForm.valid){
      if (this.registrationForm.value.password !== this.registrationForm.value.passwordRepeat) {
          this.err = "Please make sure the passwords match.";
          return;
      }
    }
    this.gamesDataService.addUser(registrationForm.value).then(function (response:any) {
      console.log("User Added", response); 
  
    });
    this._router.navigate(['games']);
  }
  onClear(form:NgForm):void{
    form.resetForm();
  }
}
export class User{
  name!:string;
  username!:string
  password!:string;
  passwordRepeat!:string
  
}
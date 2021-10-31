import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!:NgForm;

  userLoggedIn:boolean =false;
  nameOfUser!:string;
  credentials!:Credentials;
  errorMessage!:string; //add it inc atch, reset in login sucess
  constructor(private _jwt:JwtHelperService, private _router:Router, private _httpClient:HttpClient ) { }

  ngOnInit(): void {
    this.credentials ={
      username:"",
      password:"",

    }
    setTimeout(() => {this.loginForm.setValue(this.credentials);});

    // let credentials:Credentials = new Credentials();
    // credentials.username=this.LoginForm.value.username
    // credentials.username=this.LoginForm.value.password
    // return this.httpClient.post("/api/users/login", credentials).then(function (response) {
    //   console.log("Login processing");
    //   if (response.data.success) {
    //     localStorage.setItem("gamesToken", response.token)
      
     
    //     console.log("Login Success");
    //   }
    // }).catch(function (err) {
    //   console.log(err);
    // });
   

    // this.userLoggedIn=true
    // this.LoginForm.reset();
  }

    onLogin(loginForm:NgForm): void {
    let credentials:Credentials = new Credentials();
    console.log("hey", loginForm.value);
    
      credentials.username = this.loginForm.value.username,
      credentials.password = this.loginForm.value.password
    
    this._httpClient.post<any> ("http://localhost:3000/users/login" , credentials).toPromise()
    .then(response => {
      console.log("response ", response);
      localStorage.setItem("gamesToken ", response.token)  // stores the token locally
      const token:string = localStorage.getItem("gamesToken") as string;
     this.nameOfUser =  this._jwt.decodeToken(token).name;


      this.userLoggedIn = true;
      this.loginForm.reset();
      this.errorMessage ="";
      this._router.navigate(['']);
    })
    .catch(response => {

      console.log(response);
      this.errorMessage = "Login Failed!";
    });
  }
  onLogout(){

  //  localStorage.setitem("gamesToken":response.token)
   localStorage.clear();
    this.userLoggedIn=false 
    this.nameOfUser="unknown"
    this._router.navigate(['']);

  }
  onClear(form:NgForm):void{
    form.resetForm();
  }
}
export class Credentials{
username!:string;
password!:string
}

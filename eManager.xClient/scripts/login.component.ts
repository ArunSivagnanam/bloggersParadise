import {Component} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
import {BlogService} from './blog.service';
import {Router} from 'angular2/router';

@Component({
    template: `
     
        <div class="container">
           
            <div class="span12" [ngSwitch]="switchViewValue">  
                
                <div role="form" *ngSwitchWhen="'login'">
                      <h1>Login</h1>
                      <div class="form-group">
                        <label for="userName">User Name:</label> 
                        <input [(ngModel)]="username" type="text" class="form-control" id="userName">
                      </div>

                      <div class="form-group">
                        <label for="pwd">Password:</label> 
                        <input  [(ngModel)]="password" type="password" class="form-control" id="pwd">
                      </div>
                      <div>{{errorMessage}}</div>
                      <button (click)="login('register');" class="btn btn-default">Submit</button>
                      <br>
                      <a (click)="onSelect('register');">Not a user? Register here</a>
                      
                </div>


                <div role="form" *ngSwitchWhen="'register'">
                    <h1>Register</h1>
                    <div class="form-group">
                        <label for="userName">Choose User Name:</label> 
                        <input [(ngModel)]="username" type="text" class="form-control" id="userName">
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label> 
                        <input [(ngModel)]="password" type="password" class="form-control" id="pwd">
                    </div>

                    <div class="form-group">
                        <label for="RetypePwd">Retype Password:</label> 
                        <input [(ngModel)]="retypePassword" type="password" class="form-control" id="RetypePwd">
                    </div>
                    <div>{{errorMessage}}</div>
                    <button (click)="register('register');" class="btn btn-default">Submit</button>
                    <br>
                    <a (click)="onSelect('login');">Already a user? Login here</a>
                   
               </div>

            </div>
        </div>

        `,
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault]
})
export class LoginComponent {

    switchViewValue: any;

    username: string;
    password: string;
    retypePassword: string;
    errorMessage: string;
    router: Router;


    

    constructor(private blogService: BlogService, router: Router) {
        this.switchViewValue = "login";
        this.errorMessage = "";
        this.username = "";
        this.password = "";
        this.retypePassword = "";
        this.router = router;
    }

    onSelect(view: string) {
        this.switchViewValue = view;
       
    }

    login() {


        if (this.password.length === 0) {

            this.errorMessage = "Password not defined";
        } else if (this.username.length === 0) {

            this.errorMessage = "Username not defined";
        } else {

            var observable = this.blogService.login(this.username, this.password);

            var mee = this;

            observable.subscribe(function (data) {

                console.log("data");
                console.log(data);

                if (data.access_token) {
                    // redirect til serch component

                    mee.setErrorMessage("");

                    // gem token i coocie eller app cashe
                    localStorage.setItem('token', data.access_token);
                    mee.router.navigate(['Search']);

                }

            }, function (err) {
                
             
                mee.setErrorMessage(err._body);

            }

            );



        }


       
    }

    register() {

      

        if (this.password !== this.retypePassword) {

            this.errorMessage = "Passwords does not match";

        } else if (this.password.length < 8) {

            this.errorMessage = "Passwords must be atleast 8 charecters";
        } else if (this.username.length === 0) {

            this.errorMessage = "Username not defined";
        } else {

            var observable = this.blogService.register(this.username, this.password, this.retypePassword);

            var mee = this;

            observable.subscribe(function (data) {


                if (data.message && data.message === "REGISTERED" ) {
                    // redirect til serch component
                    
                    mee.setErrorMessage("");
                    mee.onSelect("login");

                }

            }, function (err) {

                console.log(err);
                mee.setErrorMessage(err._body);
               
            }

            );


        }
       
    }
   

    setErrorMessage(msg: string) {

        this.errorMessage = msg;

    }



// ng-switch to switch forms

// state machine to set

}
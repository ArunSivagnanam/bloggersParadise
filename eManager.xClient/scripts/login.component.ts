import {Component} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
@Component({
    template: `
        <h1>hej</h1>
        <div class="container">
           
            <div class="span12" [ngSwitch]="switchViewValue">  
                
                <div role="form" *ngSwitchWhen="'login'">

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

                    <div class="form-group">
                        <label for="name">Full Name:</label> 
                        <input [(ngModel)]="fullName" type="text" class="form-control" id="name">
                    </div>

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

    fullName: string;
    username: string;
    password: string;
    retypePassword: string;
    errorMessage: string;

    constructor() {
        this.switchViewValue = "login";
        this.errorMessage = "";
    }

    onSelect(view: string) {
        this.switchViewValue = view;
        console.log("hej");
    }

    login() {

        console.log(this.username + " " + this.password);

        
        this.errorMessage = "hej";
    }

    register() {

        console.log(this.fullName + " " + this.username + " " + this.password + " " + this.retypePassword);
        this.errorMessage = "hej";
    }
   




// ng-switch to switch forms

// state machine to set

}
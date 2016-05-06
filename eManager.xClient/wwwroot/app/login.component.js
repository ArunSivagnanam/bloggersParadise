"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var blog_service_1 = require('./blog.service');
var router_1 = require('angular2/router');
var LoginComponent = (function () {
    function LoginComponent(blogService, router) {
        this.blogService = blogService;
        this.switchViewValue = "login";
        this.errorMessage = "";
        this.username = "";
        this.password = "";
        this.retypePassword = "";
        this.router = router;
    }
    LoginComponent.prototype.onSelect = function (view) {
        this.switchViewValue = view;
    };
    LoginComponent.prototype.login = function () {
        if (this.password.length === 0) {
            this.errorMessage = "Password not defined";
        }
        else if (this.username.length === 0) {
            this.errorMessage = "Username not defined";
        }
        else {
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
            });
        }
    };
    LoginComponent.prototype.register = function () {
        if (this.password !== this.retypePassword) {
            this.errorMessage = "Passwords does not match";
        }
        else if (this.password.length < 8) {
            this.errorMessage = "Passwords must be atleast 8 charecters";
        }
        else if (this.username.length === 0) {
            this.errorMessage = "Username not defined";
        }
        else {
            var observable = this.blogService.register(this.username, this.password, this.retypePassword);
            var mee = this;
            observable.subscribe(function (data) {
                if (data.message && data.message === "REGISTERED") {
                    // redirect til serch component
                    mee.setErrorMessage("");
                    mee.onSelect("login");
                }
            }, function (err) {
                console.log(err);
                mee.setErrorMessage(err._body);
            });
        }
    };
    LoginComponent.prototype.setErrorMessage = function (msg) {
        this.errorMessage = msg;
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n     \n        <div class=\"container\">\n           \n            <div class=\"span12\" [ngSwitch]=\"switchViewValue\">  \n                \n                <div role=\"form\" *ngSwitchWhen=\"'login'\">\n                      <h1>Login</h1>\n                      <div class=\"form-group\">\n                        <label for=\"userName\">User Name:</label> \n                        <input [(ngModel)]=\"username\" type=\"text\" class=\"form-control\" id=\"userName\">\n                      </div>\n\n                      <div class=\"form-group\">\n                        <label for=\"pwd\">Password:</label> \n                        <input  [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" id=\"pwd\">\n                      </div>\n                      <div>{{errorMessage}}</div>\n                      <button (click)=\"login('register');\" class=\"btn btn-default\">Submit</button>\n                      <br>\n                      <a (click)=\"onSelect('register');\">Not a user? Register here</a>\n                      \n                </div>\n\n\n                <div role=\"form\" *ngSwitchWhen=\"'register'\">\n                    <h1>Register</h1>\n                    <div class=\"form-group\">\n                        <label for=\"userName\">Choose User Name:</label> \n                        <input [(ngModel)]=\"username\" type=\"text\" class=\"form-control\" id=\"userName\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"pwd\">Password:</label> \n                        <input [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" id=\"pwd\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"RetypePwd\">Retype Password:</label> \n                        <input [(ngModel)]=\"retypePassword\" type=\"password\" class=\"form-control\" id=\"RetypePwd\">\n                    </div>\n                    <div>{{errorMessage}}</div>\n                    <button (click)=\"register('register');\" class=\"btn btn-default\">Submit</button>\n                    <br>\n                    <a (click)=\"onSelect('login');\">Already a user? Login here</a>\n                   \n               </div>\n\n            </div>\n        </div>\n\n        ",
            directives: [common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault]
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

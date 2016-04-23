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
var LoginComponent = (function () {
    function LoginComponent() {
        this.switchViewValue = "login";
        this.errorMessage = "";
    }
    LoginComponent.prototype.onSelect = function (view) {
        this.switchViewValue = view;
        console.log("hej");
    };
    LoginComponent.prototype.login = function () {
        console.log(this.username + " " + this.password);
        this.errorMessage = "hej";
    };
    LoginComponent.prototype.register = function () {
        console.log(this.fullName + " " + this.username + " " + this.password + " " + this.retypePassword);
        this.errorMessage = "hej";
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>hej</h1>\n        <div class=\"container\">\n           \n            <div class=\"span12\" [ngSwitch]=\"switchViewValue\">  \n                \n                <div role=\"form\" *ngSwitchWhen=\"'login'\">\n\n                      <div class=\"form-group\">\n                        <label for=\"userName\">User Name:</label> \n                        <input [(ngModel)]=\"username\" type=\"text\" class=\"form-control\" id=\"userName\">\n                      </div>\n\n                      <div class=\"form-group\">\n                        <label for=\"pwd\">Password:</label> \n                        <input  [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" id=\"pwd\">\n                      </div>\n                      <div>{{errorMessage}}</div>\n                      <button (click)=\"login('register');\" class=\"btn btn-default\">Submit</button>\n                      <br>\n                      <a (click)=\"onSelect('register');\">Not a user? Register here</a>\n                      \n                </div>\n\n\n                <div role=\"form\" *ngSwitchWhen=\"'register'\">\n\n                    <div class=\"form-group\">\n                        <label for=\"name\">Full Name:</label> \n                        <input [(ngModel)]=\"fullName\" type=\"text\" class=\"form-control\" id=\"name\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"userName\">Choose User Name:</label> \n                        <input [(ngModel)]=\"username\" type=\"text\" class=\"form-control\" id=\"userName\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"pwd\">Password:</label> \n                        <input [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" id=\"pwd\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"RetypePwd\">Retype Password:</label> \n                        <input [(ngModel)]=\"retypePassword\" type=\"password\" class=\"form-control\" id=\"RetypePwd\">\n                    </div>\n                    <div>{{errorMessage}}</div>\n                    <button (click)=\"register('register');\" class=\"btn btn-default\">Submit</button>\n                    <br>\n                    <a (click)=\"onSelect('login');\">Already a user? Login here</a>\n                   \n               </div>\n\n            </div>\n        </div>\n\n        ",
            directives: [common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
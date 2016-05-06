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
var router_1 = require('angular2/router');
var blog_service_1 = require('./blog.service');
var ProfileComponent = (function () {
    function ProfileComponent(blogService, router) {
        this.blogService = blogService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        if (this.blogService.isUserLoggedIn === false) {
            this.router.navigate(['Login']);
        }
        else {
            var obs = this.blogService.getMyNameBitch();
            var mee = this;
            obs.subscribe(function (data) {
                mee.myName = data.userName;
                var observable = mee.blogService.getOwnBlogs();
                observable.subscribe(function (data) {
                    mee.blogs = data;
                }, function (err) {
                    if (err.status === 401) {
                        mee.router.navigate(['Login']);
                    }
                });
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
    };
    ProfileComponent.prototype.convertToMoment = function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    };
    ProfileComponent.prototype.navigateToPost = function (postId) {
        //console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            template: "\n    \n<div class=\"container\">\n <h2>{{myName}}</h2>\n   <div class=\"row\">\n      <div class=\"col-xs-6 col-md-3\">\n        <a href=\"#\" class=\"thumbnail\">\n          <img src=\"http://pic.1fotonin.com/data/wallpapers/59/WDF_1048511.png\" alt=\"...\">\n        </a>\n      </div>\n        <div class=\"col-xs-12 col-md-12\">\n             <h4>Description</h4>\n             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \n       </div>\n    </div>\n    <div class=\"row\">\n            <h3>Blog posts</h3>\n            <div class=\"list-group\">\n              <div *ngFor=\"#blog of blogs\" class=\"list-group-item\">\n                <h4 class=\"list-group-item-heading\">{{blog.title}}</h4>\n                <p>{{blog.description}}</p>\n                <p><a class=\"btn btn-primary btn-lg\" (click)=\"navigateToPost(blog.postId)\" role=\"button\">Read post</a></p>\n                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <span>{{blog.userName}}</span> </p>\n              </div>\n           </div>\n    \n    </div>\n</div>\n\n\n\n"
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;

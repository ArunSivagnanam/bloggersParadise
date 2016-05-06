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
var blog_service_1 = require('./blog.service');
var router_1 = require('angular2/router');
var SearchComponent = (function () {
    function SearchComponent(blogService, router) {
        this.blogService = blogService;
        this.blogs = [];
        this.toggleMenu = false;
        this.SearchMethod = "Search latest posts";
        this.inputDisabled = true;
        this.inputPlaceHolder = "";
        this.router = router;
    }
    SearchComponent.prototype.navigateToPostComponent = function (postId) {
        console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);
    };
    SearchComponent.prototype.ngOnInit = function () {
        var observable = this.blogService.getLatestTenBlogs();
        var mee = this;
        observable.subscribe(function (data) {
            mee.blogs = data;
        }, function (err) {
            console.log(err);
        });
    };
    SearchComponent.prototype.toggleSearchMenu = function () {
        if (!this.toggleMenu) {
            $('#search-option-menu').addClass("open");
        }
        else {
            $('#search-option-menu').removeClass("open");
        }
        this.toggleMenu = !this.toggleMenu;
    };
    SearchComponent.prototype.setSearchMethod = function (value) {
        this.SearchMethod = value;
        if (value === "Search latest posts") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        }
        else if (value === "Search by content") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "Search in content";
        }
        else if (value === "Search before date") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "dd-mm-yyyy";
        }
        else if (value === "Search after date") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "dd-mm-yyyy";
        }
        else if (value === "Search by most likes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        }
        else if (value === "Search by most comments") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        }
        else if (value === "Search by most dislikes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        }
    };
    SearchComponent.prototype.convertToMoment = function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    };
    SearchComponent = __decorate([
        core_1.Component({
            template: "\n\n<div class=\"container\">\n\n\n        <h2>{{SearchMethod}}</h2>\n            <div class=\"col-lg-12\"> \n              <div class=\"input-group\"> \n                <input type=\"text\" [disabled]=\"inputDisabled\" [placeholder]=\"inputPlaceHolder\" class=\"form-control\" aria-label=\"Text input with segmented button dropdown\"> \n                <div id=\"search-option-menu\" class=\"input-group-btn\"> \n                  <button type=\"button\" class=\"btn btn-default\">Search</button> \n                  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> \n                    <span class=\"caret\"></span> <span class=\"sr-only\">Toggle Dropdown</span> \n                  </button> \n                  <ul class=\"dropdown-menu dropdown-menu-right\"> \n                        <li><a (click)=\"setSearchMethod('Search latest posts');\">Search latest posts</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search by content');\">Search by content</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search before date');\">Search before date</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search after date');\">Search after date</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>\n                        <li><a (click)=\"setSearchMethod('Search by most likes');\">Search by most likes</a></li> \n                       <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search by most comments');\">Search by most comments</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>\n                        <li><a (click)=\"setSearchMethod('Search by most dislikes');\">Search by most dislikes</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>     \n                    </ul> \n                </div> \n              </div> \n            </div>\n            <br><br><br>\n\n           <div class=\"list-group\">\n              <div *ngFor=\"#blog of blogs\" class=\"list-group-item\">\n                <h4 class=\"list-group-item-heading\">{{blog.title}}</h4>\n                <p>{{blog.description}}</p>\n                <p><a class=\"btn btn-primary btn-lg\" (click)=\"navigateToPostComponent(blog.postId)\" role=\"button\">Read post</a></p>\n                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <a href = \"\">{{blog.userName}}</a> </p>\n              </div>\n           </div>\n\n</div>\n\n    "
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;

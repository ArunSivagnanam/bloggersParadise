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
        this.inputText = "";
        this.inputBlogErrorText = "";
        this.isLoading = true;
    }
    SearchComponent.prototype.navigateToPostComponent = function (postId) {
        //console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);
    };
    SearchComponent.prototype.ngOnInit = function () {
        if (this.blogService.isUserLoggedIn === false) {
            this.router.navigate(['Login']);
        }
        else {
            var observable = this.blogService.getLatestTenBlogs();
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                mee.isLoading = false;
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
    };
    SearchComponent.prototype.viewUser = function (userid, userName) {
        this.router.navigate(['ViewProfile', { ID: userid, userName: userName }]);
    };
    SearchComponent.prototype.blogsToShow = function () {
        if (this.blogs.length === 0 && this.isLoading === false) {
            return true;
        }
        else {
            return false;
        }
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
            this.inputBlogErrorText = "";
            this.inputText = "";
        }
        else if (value === "Search by content") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "Search in content";
            this.inputText = "";
            this.inputBlogErrorText = "";
        }
        else if (value === "Search before date") {
            this.inputDisabled = false;
            this.inputText = "";
            this.inputPlaceHolder = "MM-DD-YYYY,HH:MM";
            this.inputBlogErrorText = "";
        }
        else if (value === "Search after date") {
            this.inputDisabled = false;
            this.inputText = "";
            this.inputPlaceHolder = "MM-DD-YYYY,HH:MM";
            this.inputBlogErrorText = "";
        }
        else if (value === "Search by most likes") {
            this.inputDisabled = true;
            this.inputText = "";
            this.inputPlaceHolder = "";
            this.inputBlogErrorText = "";
        }
        else if (value === "Search by most comments") {
            this.inputDisabled = true;
            this.inputText = "";
            this.inputPlaceHolder = "";
            this.inputBlogErrorText = "";
        }
        else if (value === "Search by most dislikes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
            this.inputText = "";
            this.inputBlogErrorText = "";
        }
    };
    SearchComponent.prototype.convertToMoment = function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    };
    SearchComponent.prototype.search = function () {
        this.isLoading = true;
        if (this.SearchMethod === "Search by content") {
            var observable = this.blogService.searchBlogByContent(this.inputText);
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
        else if (this.SearchMethod === "Search by most comments") {
            var observable = this.blogService.searchByNumberOfComments();
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
        else if (this.SearchMethod === "Search by most likes") {
            var observable = this.blogService.searchByNumberOfLikes();
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
        else if (this.SearchMethod === "Search by most dislikes") {
            var observable = this.blogService.searchByNumberOfDisLikes();
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
        else if (this.SearchMethod === "Search before date") {
            // time=05-05-2016,20:00
            var formatedDate = moment(this.inputText).format('MM-DD-YYYY,HH:MM');
            if (formatedDate === "Invalid date" || formatedDate === "Invalid%20date") {
                this.inputBlogErrorText = "fuck af";
            }
            else {
                var observable = this.blogService.searchBeforeDate(formatedDate);
                var mee = this;
                observable.subscribe(function (data) {
                    mee.blogs = data;
                    setTimeout(function () {
                        mee.isLoading = false;
                    }, 1000);
                    this.inputBlogErrorText = "";
                }, function (err) {
                    if (err.status === 401) {
                        mee.router.navigate(['Login']);
                    }
                });
            }
        }
        else if (this.SearchMethod === "Search after date") {
            // time=05-05-2016,20:00
            var formatedDate = moment(this.inputText).format('MM-DD-YYYY,HH:MM');
            console.log(formatedDate);
            console.log("Invalid%20date");
            if (formatedDate === "Invalid date" || formatedDate === "Invalid%20date") {
                this.inputBlogErrorText = "fuck af";
            }
            else {
                var observable = this.blogService.searchAfterDate(formatedDate);
                var mee = this;
                observable.subscribe(function (data) {
                    mee.blogs = data;
                    setTimeout(function () {
                        mee.isLoading = false;
                    }, 1000);
                    this.inputBlogErrorText = "";
                }, function (err) {
                    if (err.status === 401) {
                        mee.router.navigate(['Login']);
                    }
                });
            }
        }
        else if (this.SearchMethod === "Search latest posts") {
            var observable = this.blogService.getLatestTenBlogs();
            var mee = this;
            observable.subscribe(function (data) {
                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);
                this.inputBlogErrorText = "";
            }, function (err) {
                if (err.status === 401) {
                    mee.router.navigate(['Login']);
                }
            });
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            template: "\n\n<div class=\"container\">\n\n\n        <h2>{{SearchMethod}}</h2>\n            <div class=\"col-lg-12\"> \n              <div class=\"input-group\"> \n                <input type=\"text\" [(ngModel)]=\"inputText\" [disabled]=\"inputDisabled\" [placeholder]=\"inputPlaceHolder\" class=\"form-control\" aria-label=\"Text input with segmented button dropdown\"> \n                <div id=\"search-option-menu\" class=\"input-group-btn\"> \n                  <button type=\"button\" (click) =\"search();\" class=\"btn btn-default\">Search</button> \n                  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> \n                    <span class=\"caret\"></span> <span class=\"sr-only\">Toggle Dropdown</span> \n                  </button> \n                  <ul class=\"dropdown-menu dropdown-menu-right\"> \n                        <li><a (click)=\"setSearchMethod('Search latest posts');\">Search latest posts</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search by content');\">Search by content</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search before date');\">Search before date</a></li> \n                      <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search after date');\">Search after date</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>\n                        <li><a (click)=\"setSearchMethod('Search by most likes');\">Search by most likes</a></li> \n                       <li role=\"separator\" class=\"divider\"></li> \n                        <li><a (click)=\"setSearchMethod('Search by most comments');\">Search by most comments</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>\n                        <li><a (click)=\"setSearchMethod('Search by most dislikes');\">Search by most dislikes</a></li> \n                       <li role=\"separator\" class=\"divider\"></li>     \n                    </ul> \n                </div>\n              </div> \n              <p>{{inputBlogErrorText}}</p> \n            </div>\n            <br><br><br>\n\n            <div *ngIf=\"isLoading || blogsToShow();\">\n\n                <img src=\"http://localhost:4202/libs/pictures/giphy.gif\" alt=\"Loading\" width=\"500\" height=\"500\">\n            </div>\n\n            <h3 *ngIf=\"blogsToShow();\">Nothing to show for you my friend :( </h3>\n            \n\n\n           <div *ngIf=\"!isLoading\" class=\"list-group\">\n              <div *ngFor=\"#blog of blogs\" class=\"list-group-item\">\n                <h4 class=\"list-group-item-heading\">{{blog.title}}</h4>\n                <p>{{blog.description}}</p>\n                <p><a class=\"btn btn-primary btn-lg\" (click)=\"navigateToPostComponent(blog.postId)\" role=\"button\">Read post</a></p>\n                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <a (click)=\"viewUser(blog.userId, blog.userName);\">{{blog.userName}}</a> </p>\n              </div>\n           </div>\n\n</div>\n\n    "
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;

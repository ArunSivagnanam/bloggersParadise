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
var BlogPostComponent = (function () {
    function BlogPostComponent(blogService, data) {
        this.blogService = blogService;
        this.comments = [];
        this.likes = [];
        this.likeCount = 0;
        this.disLikeCount = 0;
        this.blogToShow = data.get("ID");
        this.commentText = "";
    }
    BlogPostComponent.prototype.ngOnInit = function () {
        var observable = this.blogService.getPostById(this.blogToShow);
        var mee = this;
        // GET POST
        observable.subscribe(function (data) {
            mee.html = data.text;
            mee.title = data.title;
            mee.description = data.description;
            $('.post-description').html(data.description);
            $('.fr-view').html(mee.html);
            // GET POST COMMENTS
            var observable = mee.blogService.getComments(mee.blogToShow);
            observable.subscribe(function (data) {
                mee.comments = data;
                // GET POST LIKES
                var observable = mee.blogService.getPostLikes(mee.blogToShow);
                observable.subscribe(function (data) {
                    mee.likes = data;
                    for (var i = 0; i < mee.likes.length; i++) {
                        var currentLike = mee.likes[i];
                        if (currentLike.like === true) {
                            mee.likeCount++;
                        }
                        else if (currentLike.dislike) {
                            mee.disLikeCount++;
                        }
                    }
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    };
    BlogPostComponent.prototype.addPostLike = function (likeValue, disLikeValue) {
        var postLike = {
            "PostId": this.blogToShow,
            "Like": likeValue,
            "Dislike": disLikeValue
        };
        var observable = this.blogService.addPostLike(postLike);
        var mee = this;
        observable.subscribe(function (data) {
            mee.likes.push(data);
            if (data.like === true) {
                mee.likeCount++;
            }
            else if (data.dislike) {
                mee.disLikeCount++;
            }
        }, function (err) {
            console.log(err);
        });
    };
    BlogPostComponent.prototype.addBlogComment = function () {
        var comment = {
            Text: this.commentText,
            PostId: this.blogToShow
        };
        var observable = this.blogService.addBlogComment(comment);
        var mee = this;
        observable.subscribe(function (data) {
            mee.comments.push(data);
            mee.commentText = "";
        }, function (err) {
            console.log(err);
        });
    };
    BlogPostComponent.prototype.convertToMoment = function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    };
    BlogPostComponent = __decorate([
        core_1.Component({
            template: "\n   <div class=\"container\">\n    <div class=\"col-lg-12\"> \n        <h4>{{title}}</h4>\n        <p class = \"post-description\"></p>\n        <div class=\"fr-view\">\n\n        </div>\n    </div>\n\n\n            <div class=\"row\">\n                <h3>You like?</h3>\n                <button (click)=\"addPostLike(true,false);\" class=\"btn btn-default\">Like</button> \n                <button (click)=\"addPostLike(false,true);\" class=\"btn btn-default\">Dislike</button> \n                <br>\n                <h4>Likes : {{likeCount}} </h4><h4> Dislikes : {{disLikeCount}}</h4>\n                \n            </div>\n\n\n        <div class=\"row\">\n                    <h3>Comments</h3>\n                    \n                    <div class=\"list-group\">\n                      <div *ngFor=\"#comment of comments\" class=\"list-group-item\">\n                        <p>{{comment.text}}</p>\n                        <p> <b>Date created : </b> {{convertToMoment(comment.insertionDate)}} <b> Last modified :</b> {{convertToMoment(comment.modificationDate)}} <br> <b> User : </b> <a href = \"\">{{comment.userName}}</a> </p>\n                      </div>\n                   </div>\n\n\n                    <form class=\"form-inline col-lg-12\" role=\"form\">\n                        <div class=\"form-group\">\n                            <input [(ngModel)]=\"commentText\" class=\"form-control\" type=\"text\" placeholder=\"Your comments\" />\n                        </div>\n                        <div class=\"form-group\">\n                            <button (click)=\"addBlogComment();\" class=\"btn btn-default\">Add</button>\n                        </div>\n                    </form>\n    \n            </div>\n\n   </div>\n\n"
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.RouteParams])
    ], BlogPostComponent);
    return BlogPostComponent;
}());
exports.BlogPostComponent = BlogPostComponent;

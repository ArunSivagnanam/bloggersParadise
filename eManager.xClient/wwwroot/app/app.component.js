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
var login_component_1 = require('./login.component');
var search_component_1 = require('./search.component');
var profile_component_1 = require('./profile.component');
var blogpost_component_1 = require('./blogpost.component');
var editBlogPost_component_1 = require('./editBlogPost.component');
var viewProfile_component_1 = require('./viewProfile.component');
var blog_service_1 = require('./blog.service');
var mock_blog_service_1 = require('./mock.blog.service');
var http_1 = require('angular2/http');
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent(router) {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n              <nav>\n                <a [routerLink]=\"['Login']\">Login</a>\n                <a [routerLink]=\"['Search']\">Serach</a>\n                <a [routerLink]=\"['Profile']\">Profile</a>\n                <a [routerLink]=\"['Blogpost']\">Blogpost</a>\n                <a [routerLink]=\"['EditPost']\">Edit post</a>,\n                <a [routerLink]=\"['ViewProfile']\">View profile</a>\n              </nav>\n              <router-outlet></router-outlet>\n              ",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [blog_service_1.BlogService, mock_blog_service_1.MockBlogService, http_1.HTTP_PROVIDERS]
        }),
        router_1.RouteConfig([
            { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
            { path: '/search', name: 'Search', component: search_component_1.SearchComponent },
            { path: '/profile', name: 'Profile', component: profile_component_1.ProfileComponent },
            { path: '/blogpost', name: 'Blogpost', component: blogpost_component_1.BlogPostComponent },
            { path: '/editPost', name: 'EditPost', component: editBlogPost_component_1.EditBlogPostComponent },
            { path: '/viewProfile', name: 'ViewProfile', component: viewProfile_component_1.ViewProfileComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

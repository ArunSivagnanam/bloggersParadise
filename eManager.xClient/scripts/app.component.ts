import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent}   from './login.component';
import {SearchComponent}     from './search.component';
import {ProfileComponent}     from './profile.component';
import {BlogPostComponent}     from './blogpost.component';
import {EditBlogPostComponent} from './editBlogPost.component';
import {ViewProfileComponent} from './viewProfile.component';
import {BlogService} from './blog.service';
import {MockBlogService} from './mock.blog.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
              <nav *ngIf="isUserLoggedIn">
                <a [routerLink]="['Search']">Search</a>
                <a [routerLink]="['Profile']">My Profile</a>
                <a [routerLink]="['EditPost']">Create Post</a>
                <a (click)="logOut();"> Log out</a>
              </nav>
              <router-outlet></router-outlet>
              `,
    directives: [ROUTER_DIRECTIVES],
    providers: [BlogService, MockBlogService, HTTP_PROVIDERS]
})
@RouteConfig([
        { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true},
        { path: '/search', name: 'Search', component: SearchComponent },
        { path: '/profile', name: 'Profile', component: ProfileComponent },
        { path: '/blogpost', name: 'Blogpost', component: BlogPostComponent },
        { path: '/editPost', name: 'EditPost', component: EditBlogPostComponent },
        { path: '/viewProfile', name: 'ViewProfile', component: ViewProfileComponent }
])
export class AppComponent {

    isUserLoggedIn: Boolean;


    constructor(private router: Router, private blogService: BlogService) {

        this.isUserLoggedIn = false;
        
    }


    ngOnInit() {

        var mee = this;
        var callBack = function (eventType) {

            if (eventType === "USER_LOGGED_IN") {
                mee.isUserLoggedIn = mee.blogService.isUserLoggedIn;
            }
            if (eventType === "USER_LOGGED_OUT") {
                mee.isUserLoggedIn = mee.blogService.isUserLoggedIn;
            }
        
        }

        this.blogService.registerListener(callBack);

    }

    logOut() {

        localStorage.removeItem("token");

        this.blogService.isUserLoggedIn = false;
        this.blogService.emit("USER_LOGGED_OUT");
        
        this.router.navigate(['Login']);


    }


  

}
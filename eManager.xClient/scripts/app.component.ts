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
              <nav>
                <a [routerLink]="['Login']">Login</a>
                <a [routerLink]="['Search']">Serach</a>
                <a [routerLink]="['Profile']">Profile</a>
                <a [routerLink]="['Blogpost']">Blogpost</a>
                <a [routerLink]="['EditPost']">Edit post</a>,
                <a [routerLink]="['ViewProfile']">View profile</a>
              </nav>
              <router-outlet></router-outlet>
              `,
    directives: [ROUTER_DIRECTIVES],
    providers: [BlogService, MockBlogService, HTTP_PROVIDERS]
})
@RouteConfig([
        { path: '/login', name: 'Login', component: LoginComponent },
        { path: '/search', name: 'Search', component: SearchComponent },
        { path: '/profile', name: 'Profile', component: ProfileComponent },
        { path: '/blogpost', name: 'Blogpost', component: BlogPostComponent },
        { path: '/editPost', name: 'EditPost', component: EditBlogPostComponent },
        { path: '/viewProfile', name: 'ViewProfile', component: ViewProfileComponent }
])
export class AppComponent {

    constructor(router: Router) {


    }

}
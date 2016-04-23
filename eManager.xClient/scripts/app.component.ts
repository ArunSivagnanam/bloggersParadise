import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent}   from './login.component';
import {SearchComponent}     from './search.component';
import {ProfileComponent}     from './profile.component';
import {BlogPostComponent}     from './blogpost.component';

@Component({
    selector: 'my-app',
    template: `
              <h1>Component Router</h1>
              <nav>
                <a [routerLink]="['Login']">Login</a>
                <a [routerLink]="['Search']">Serach</a>
                <a [routerLink]="['Profile']">Profile</a>
                <a [routerLink]="['Blogpost']">Profile</a>
              </nav>
              <router-outlet></router-outlet>
              `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        { path: '/login', name: 'Login', component: LoginComponent },
        { path: '/search', name: 'Search', component: SearchComponent },
        { path: '/profile', name: 'Profile', component: ProfileComponent },
        { path: '/blogpost', name: 'Blogpost', component: BlogPostComponent }
])
export class AppComponent {

}
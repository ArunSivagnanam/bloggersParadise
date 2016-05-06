import {Component, OnInit} from 'angular2/core';
import {BlogService} from './blog.service';
import {Router} from 'angular2/router';

declare var moment: any;

@Component({
    template: `

<div class="container">


        <h2>{{SearchMethod}}</h2>
            <div class="col-lg-12"> 
              <div class="input-group"> 
                <input type="text" [(ngModel)]="inputText" [disabled]="inputDisabled" [placeholder]="inputPlaceHolder" class="form-control" aria-label="Text input with segmented button dropdown"> 
                <div id="search-option-menu" class="input-group-btn"> 
                  <button type="button" (click) ="search();" class="btn btn-default">Search</button> 
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                    <span class="caret"></span> <span class="sr-only">Toggle Dropdown</span> 
                  </button> 
                  <ul class="dropdown-menu dropdown-menu-right"> 
                        <li><a (click)="setSearchMethod('Search latest posts');">Search latest posts</a></li> 
                      <li role="separator" class="divider"></li> 
                        <li><a (click)="setSearchMethod('Search by content');">Search by content</a></li> 
                      <li role="separator" class="divider"></li> 
                        <li><a (click)="setSearchMethod('Search before date');">Search before date</a></li> 
                      <li role="separator" class="divider"></li> 
                        <li><a (click)="setSearchMethod('Search after date');">Search after date</a></li> 
                       <li role="separator" class="divider"></li>
                        <li><a (click)="setSearchMethod('Search by most likes');">Search by most likes</a></li> 
                       <li role="separator" class="divider"></li> 
                        <li><a (click)="setSearchMethod('Search by most comments');">Search by most comments</a></li> 
                       <li role="separator" class="divider"></li>
                        <li><a (click)="setSearchMethod('Search by most dislikes');">Search by most dislikes</a></li> 
                       <li role="separator" class="divider"></li>     
                    </ul> 
                </div>
              </div> 
              <p>{{inputBlogErrorText}}</p> 
            </div>
            <br><br><br>

            <div *ngIf="isLoading || blogsToShow();">

                <img src="http://localhost:4202/libs/pictures/giphy.gif" alt="Loading" width="500" height="500">
            </div>

            <h3 *ngIf="blogsToShow();">Nothing to show for you my friend :( </h3>
            


           <div *ngIf="!isLoading" class="list-group">
              <div *ngFor="#blog of blogs" class="list-group-item">
                <h4 class="list-group-item-heading">{{blog.title}}</h4>
                <p>{{blog.description}}</p>
                <p><a class="btn btn-primary btn-lg" (click)="navigateToPostComponent(blog.postId)" role="button">Read post</a></p>
                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <a (click)="viewUser(blog.userId, blog.userName);">{{blog.userName}}</a> </p>
              </div>
           </div>

</div>

    `
})
export class SearchComponent implements OnInit {


    blogs = [];
    toggleMenu: Boolean;
    SearchMethod: string;
    inputDisabled: Boolean;
    inputPlaceHolder: string;
    router: Router;
    inputText: string;
    inputBlogErrorText: string;

    isLoading: Boolean;

    constructor(private blogService: BlogService, router: Router) {
        this.toggleMenu = false;
        this.SearchMethod = "Search latest posts";
        this.inputDisabled = true;
        this.inputPlaceHolder = "";
        this.router = router;
        this.inputText = "";
        this.inputBlogErrorText = "";
        this.isLoading = true;
    }


    navigateToPostComponent(postId) {

        //console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);

    }

    ngOnInit() {

        if (this.blogService.isUserLoggedIn === false) {

            this.router.navigate(['Login']);

        } else {

            var observable = this.blogService.getLatestTenBlogs();

            var mee = this;

            observable.subscribe(function (data) {

                mee.blogs = data;
                mee.isLoading = false;

            }, function (err) {

                if (err.status === 401) { mee.router.navigate(['Login']); }
              
            }

            );
        }
    }

    viewUser(userid, userName) {
        this.router.navigate(['ViewProfile', { ID: userid, userName: userName }]);
    }

    blogsToShow() {
        if (this.blogs.length === 0 && this.isLoading === false) {
            return true;
        } else {
            return false;
        }

    }

    toggleSearchMenu() {

        if (!this.toggleMenu) {
            $('#search-option-menu').addClass("open");
        } else {
            $('#search-option-menu').removeClass("open");
        }
        this.toggleMenu = !this.toggleMenu;
    }

    setSearchMethod(value: string) {
        this.SearchMethod = value;

        if (value === "Search latest posts") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
            this.inputBlogErrorText = "";
            this.inputText = "";
        } else if (value === "Search by content"){
            this.inputDisabled = false;
            this.inputPlaceHolder = "Search in content";
            this.inputText = "";
            this.inputBlogErrorText = "";
        } else if (value === "Search before date") {
            this.inputDisabled = false;
            this.inputText = "";
            this.inputPlaceHolder = "MM-DD-YYYY,HH:MM";
            this.inputBlogErrorText = "";
        } else if (value === "Search after date") {
            this.inputDisabled = false;
            this.inputText = "";
            this.inputPlaceHolder = "MM-DD-YYYY,HH:MM";
            this.inputBlogErrorText = "";
        } else if (value === "Search by most likes") {
            this.inputDisabled = true;
            this.inputText = "";
            this.inputPlaceHolder = "";
            this.inputBlogErrorText = "";
        } else if (value === "Search by most comments") {
            this.inputDisabled = true;
            this.inputText = "";
            this.inputPlaceHolder = "";
            this.inputBlogErrorText = "";
        } else if (value === "Search by most dislikes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
            this.inputText = "";
            this.inputBlogErrorText = "";
        }
    }

    convertToMoment(date: Date) : string {

        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }


    search() {

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
                if (err.status === 401) { mee.router.navigate(['Login']); }
               
            });

        } else if (this.SearchMethod === "Search by most comments") {

            var observable = this.blogService.searchByNumberOfComments();
            var mee = this;
            observable.subscribe(function (data) {

                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);

            }, function (err) {
                if (err.status === 401) { mee.router.navigate(['Login']); }
              
            });

        } else if (this.SearchMethod === "Search by most likes") {

            var observable = this.blogService.searchByNumberOfLikes();
            var mee = this;
            observable.subscribe(function (data) {

                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);

            }, function (err) {
                if (err.status === 401) { mee.router.navigate(['Login']); }
               
            });

        } else if (this.SearchMethod === "Search by most dislikes") {

            var observable = this.blogService.searchByNumberOfDisLikes();
            var mee = this;
            observable.subscribe(function (data) {

                mee.blogs = data;
                setTimeout(function () {
                    mee.isLoading = false;
                }, 1000);

            }, function (err) {
                if (err.status === 401) { mee.router.navigate(['Login']); }
                
            });

        } else if (this.SearchMethod === "Search before date") {

        // time=05-05-2016,20:00
            var formatedDate = moment(this.inputText).format('MM-DD-YYYY,HH:MM');

            if (formatedDate === "Invalid date" || formatedDate === "Invalid%20date" ) {

                this.inputBlogErrorText = "fuck af";

                // print error
            } else {
                var observable = this.blogService.searchBeforeDate(formatedDate);
                var mee = this;
                observable.subscribe(function (data) {

                    mee.blogs = data;
                    setTimeout(function () {
                        mee.isLoading = false;
                    }, 1000);
                    this.inputBlogErrorText = "";

                }, function (err) {
                    if (err.status === 401) { mee.router.navigate(['Login']); }
                   
                });


            }

        } else if (this.SearchMethod === "Search after date") {

            // time=05-05-2016,20:00
            var formatedDate = moment(this.inputText).format('MM-DD-YYYY,HH:MM');

            console.log(formatedDate);
            console.log("Invalid%20date");

            if (formatedDate === "Invalid date" || formatedDate === "Invalid%20date" ) {

                this.inputBlogErrorText = "fuck af";
               
            } else {

                var observable = this.blogService.searchAfterDate(formatedDate);
                var mee = this;
                observable.subscribe(function (data) {

                    mee.blogs = data;
                    setTimeout(function () {
                        mee.isLoading = false;
                    }, 1000);
                    this.inputBlogErrorText = "";

                }, function (err) {
                    if (err.status === 401) { mee.router.navigate(['Login']); }
                   
                });
            }
        } else if (this.SearchMethod === "Search latest posts") {

            var observable = this.blogService.getLatestTenBlogs();
                var mee = this;
                observable.subscribe(function (data) {

                    mee.blogs = data;
                    setTimeout(function () {
                        mee.isLoading = false;
                    }, 1000);
                    this.inputBlogErrorText = "";

                }, function (err) {
                    if (err.status === 401) { mee.router.navigate(['Login']); }
                   
                });
        }

    }
}
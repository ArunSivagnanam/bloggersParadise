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
                <input type="text" [disabled]="inputDisabled" [placeholder]="inputPlaceHolder" class="form-control" aria-label="Text input with segmented button dropdown"> 
                <div id="search-option-menu" class="input-group-btn"> 
                  <button type="button" class="btn btn-default">Search</button> 
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
            </div>
            <br><br><br>

           <div class="list-group">
              <div *ngFor="#blog of blogs" class="list-group-item">
                <h4 class="list-group-item-heading">{{blog.title}}</h4>
                <p>{{blog.description}}</p>
                <p><a class="btn btn-primary btn-lg" (click)="navigateToPostComponent(blog.postId)" role="button">Read post</a></p>
                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <a href = "">{{blog.userName}}</a> </p>
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

    constructor(private blogService: BlogService, router: Router) {
        this.toggleMenu = false;
        this.SearchMethod = "Search latest posts";
        this.inputDisabled = true;
        this.inputPlaceHolder = "";
        this.router = router;
    }


    navigateToPostComponent(postId) {

        console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);

    }

    ngOnInit() {

        
        var observable = this.blogService.getLatestTenBlogs();

        var mee = this;

        observable.subscribe(function (data) {

            mee.blogs = data;

        }, function (err) {

            console.log(err);
        }

        );
        

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
        } else if (value === "Search by content"){
            this.inputDisabled = false;
            this.inputPlaceHolder = "Search in content";
        } else if (value === "Search before date") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "dd-mm-yyyy";
        } else if (value === "Search after date") {
            this.inputDisabled = false;
            this.inputPlaceHolder = "dd-mm-yyyy";
        } else if (value === "Search by most likes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        } else if (value === "Search by most comments") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        } else if (value === "Search by most dislikes") {
            this.inputDisabled = true;
            this.inputPlaceHolder = "";
        }
    }

    convertToMoment(date: Date) : string {

        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }


    seach() {




    }
}
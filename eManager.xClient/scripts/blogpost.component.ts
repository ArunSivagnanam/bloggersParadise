import {Component} from 'angular2/core';
import {BlogService} from './blog.service';
import {RouteParams} from 'angular2/router';
declare var $: any;
declare var moment: any;

@Component({
    template: `
   <div class="container">
    <div class="col-lg-12"> 
        <h4>{{title}}</h4>
        <p class = "post-description"></p>
        <div class="fr-view">

        </div>
    </div>


            <div class="row">
                <h3>You like?</h3>
                <button (click)="addPostLike(true,false);" class="btn btn-default">Like</button> 
                <button (click)="addPostLike(false,true);" class="btn btn-default">Dislike</button> 
                <br>
                <h4>Likes : {{likeCount}} </h4><h4> Dislikes : {{disLikeCount}}</h4>
                
            </div>


        <div class="row">
                    <h3>Comments</h3>
                    
                    <div class="list-group">
                      <div *ngFor="#comment of comments" class="list-group-item">
                        <p>{{comment.text}}</p>
                        <p> <b>Date created : </b> {{convertToMoment(comment.insertionDate)}} <b> Last modified :</b> {{convertToMoment(comment.modificationDate)}} <br> <b> User : </b> <a href = "">{{comment.userName}}</a> </p>
                      </div>
                   </div>


                    <form class="form-inline col-lg-12" role="form">
                        <div class="form-group">
                            <input [(ngModel)]="commentText" class="form-control" type="text" placeholder="Your comments" />
                        </div>
                        <div class="form-group">
                            <button (click)="addBlogComment();" class="btn btn-default">Add</button>
                        </div>
                    </form>
    
            </div>

   </div>

`
})
export class BlogPostComponent {


    blogToShow: any;
    html: any;
    title: string;
    description: string;
    commentText: string;
    comments = [];

    likes = [];

    likeCount = 0;
    disLikeCount = 0;


    constructor(private blogService: BlogService, data: RouteParams) {

        this.blogToShow = data.get("ID");
        this.commentText = "";
    }

    ngOnInit() {

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
                        } else if (currentLike.dislike) {
                            mee.disLikeCount++;
                        }
                    }
                }, function (err) {

                    console.log(err);
                }

                );

            }, function (err) {

                console.log(err);
            }

            );

        }, function (err) {

            console.log(err);
        }

        );
    }

    addPostLike(likeValue,disLikeValue) {

        var postLike = {
            "PostId": this.blogToShow,
            "Like": likeValue,
            "Dislike": disLikeValue
        }

        var observable = this.blogService.addPostLike(postLike);

        var mee = this;

        observable.subscribe(function (data) {

            mee.likes.push(data);

            if (data.like === true) {
                mee.likeCount++;
            } else if (data.dislike) {
                mee.disLikeCount++;
            }


        }, function (err) {

            console.log(err);
        }

        );


    }

    


    addBlogComment() {

        var comment = {
            Text: this.commentText,
            PostId: this.blogToShow
        }

        var observable = this.blogService.addBlogComment(comment);

        var mee = this;

        observable.subscribe(function (data) {

            mee.comments.push(data);
            mee.commentText = "";


        }, function (err) {

            console.log(err);
        }

        );


    }

    convertToMoment(date: Date): string {

        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }

}
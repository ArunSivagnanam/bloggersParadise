import {Component} from 'angular2/core';
import {BlogService} from './blog.service';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
declare var $: any;
declare var moment: any;

@Component({
    template: `
   <div class="container">
    <div class="col-lg-12"> 
        <h2>{{title}}</h2>
        <p class = "post-description"></p>
        <div class="fr-view">

        </div>
    </div>


            <div class="row col-lg-12">
                <div class="col-lg-12"> 
                <button (click)="addPostLike(true,false);" class="btn btn-default">Like</button> 
                <button (click)="addPostLike(false,true);" class="btn btn-default">Dislike</button> 
                <br>
                <h4>Likes : {{likeCount}} </h4><h4> Dislikes : {{disLikeCount}}</h4>
                </div>
            </div>


        <div class="row col-lg-12">
                   <div class="col-lg-12">
                        <h5>Comments</h5>
                    
                        <div class="list-group">
                          <div *ngFor="#comment of comments" class="list-group-item">
                            <p>{{comment.text}}</p>
                            <p> <b>Date created : </b> {{convertToMoment(comment.insertionDate)}} <b> Last modified :</b> {{convertToMoment(comment.modificationDate)}} <br> <b> User : </b> <a (click)="viewUser(comment.userId, comment.userName);">{{comment.userName}}</a> </p>
                          </div>
                       </div>


                        <form class="form-inline col-lg-12" role="form">
                            <div class="form-group">
                                <input id="commentInput" [(ngModel)]="commentText" class="form-control" type="text" placeholder="Your comments" />
                            </div>
                            <div class="form-group">
                                <button id="addButton" (click)="addBlogComment();" class="btn btn-default">Add</button>
                            </div>
                        </form>
                    </div>
                  
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


    constructor(private blogService: BlogService, data: RouteParams, private router: Router) {

        this.blogToShow = data.get("ID");
        this.commentText = "";
    }

    /**
     * </script>

        <script>


        setInterval(function() {


        document.getElementById('commentInput').value = document.getElementById('commentInput').value + "Hej med dig";
        document.getElementById("addButton").click();


        }, 1000);

        </script>

     */



    ngOnInit() {

        if (this.blogService.isUserLoggedIn === false) {

            this.router.navigate(['Login']);

        } else {

            var observable = this.blogService.getPostById(this.blogToShow);

            var mee = this;

            // GET POST

            observable.subscribe(function (data) {

                mee.html = data.text;
                mee.title = data.title;
                mee.description = data.description;

                $('.post-description').html(data.description); // SHIEET XSS!
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

                        if (err.status === 401) {mee.router.navigate(['Login']);}
                    }

                    );

                }, function (err) {
                    if (err.status === 401) { mee.router.navigate(['Login']); }}

                );

            }, function (err) {
                if (err.status === 401) { mee.router.navigate(['Login']); }
               
            }

            );
        }
       
    }

    viewUser(userid, userName) {
        this.router.navigate(['ViewProfile', { ID: userid, userName: userName }]);
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
            if (err.status === 401) { mee.router.navigate(['Login']); }
           
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
            if (err.status === 401) { mee.router.navigate(['Login']); }
            
        }

        );


    }

    convertToMoment(date: Date): string {

        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }

}
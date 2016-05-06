import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {BlogService} from './blog.service';

declare var moment: any;

@Component({
    template: `
    
<div class="container">
 <h2>{{myName}}</h2>
   <div class="row">
      <div class="col-xs-6 col-md-3">
        <a href="#" class="thumbnail">
          <img src="http://pic.1fotonin.com/data/wallpapers/59/WDF_1048511.png" alt="...">
        </a>
      </div>
        <div class="col-xs-12 col-md-12">
             <h4>Description</h4>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
       </div>
    </div>
    <div class="row">
            <h3>Blog posts</h3>
            <div class="list-group">
              <div *ngFor="#blog of blogs" class="list-group-item">
                <h4 class="list-group-item-heading">{{blog.title}}</h4>
                <p>{{blog.description}}</p>
                <p><a class="btn btn-primary btn-lg" (click)="navigateToPost(blog.postId)" role="button">Read post</a></p>
                <p> <b>Date created : </b> {{convertToMoment(blog.creationDate)}} <b> Last modified :</b>  {{convertToMoment(blog.modificationDate)}} <br> <b> Author : </b> <span>{{blog.userName}}</span> </p>
              </div>
           </div>
    
    </div>
</div>



`
})
export class ProfileComponent {

    blogs: any;
    myName: any;
   
    constructor(private blogService: BlogService, private router: Router) {

    }



    ngOnInit() {

        if (this.blogService.isUserLoggedIn === false) {

            this.router.navigate(['Login']);

        } else {


            var obs = this.blogService.getMyNameBitch();

            var mee = this;

            obs.subscribe(function (data) {

                mee.myName = data.userName;

                var observable = mee.blogService.getOwnBlogs();

                observable.subscribe(function (data) {

                    mee.blogs = data;

                }, function (err) {
                    if (err.status === 401) { mee.router.navigate(['Login']); }
                    
                });

            }, function (err) {
                if (err.status === 401) { mee.router.navigate(['Login']); }
               
            });


        }
    }

    convertToMoment(date: Date): string {

        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }

    navigateToPost(postId) {

        //console.log("first " + postId);
        this.router.navigate(['Blogpost', { ID: postId }]);

    }

}
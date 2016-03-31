using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eManager.Domain;

namespace eManager.Web.Controllers_API
{
    public class PostController : ApiController
    {

        [HttpGet]
        public List<Post> getPosts()
        {
            using (var context = new DbModelContext())
            {
                return context.Posts.ToList();
            }
        }


        [HttpGet]
        public Post getPost(int postId)
        {
            using (var context = new DbModelContext())
            {
                Post result = context.Posts.FirstOrDefault(p => p.PostId == postId);

                return result;
            }
        }


        [HttpPost]
        public Post addPost(Post postData)
        {
            using (var context = new DbModelContext())
            {
                postData.CreationDate = DateTime.Now;
                context.Posts.Add(postData);
                context.SaveChanges();

            }
            return postData;

        }

        [HttpPut]
        public Post updatePost(Post postData)
        {
            using (var context = new DbModelContext())
            {
                var original = context.Posts.FirstOrDefault(p => p.PostId == postData.PostId);

                if (original != null)
                {
                    original.Text = postData.Text;
                    original.ModificationDate = DateTime.Now;

                    context.SaveChanges();
                    return original;

                }
                else
                {
                    return null;
                }

            }
        }
    }
}
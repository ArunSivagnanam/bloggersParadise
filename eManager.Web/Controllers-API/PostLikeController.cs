using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eManager.Domain;

namespace eManager.Web.Controllers_API
{
    public class PostLikeController : ApiController
    {

        [HttpGet]
        public List<Postlike> getPostLikes()
        {
            using (var context = new DbModelContext())
            {
                return context.Postlikes.ToList();
            }
        }


        [HttpGet]
        public Postlike getPostLike(int postLikeId)
        {
            using (var context = new DbModelContext())
            {
                Postlike result = context.Postlikes.FirstOrDefault(p => p.PostLikeId == postLikeId);

                return result;
            }
        }

        [HttpPost]
        public Postlike addPostLike(Postlike postLikeData)
        {
            using (var context = new DbModelContext())
            {
                
                context.Postlikes.Add(postLikeData);
                context.SaveChanges();

            }
            return postLikeData;

        }


        [HttpPut]
        public Postlike updatePost(Postlike postData)
        {
            using (var context = new DbModelContext())
            {
                var original = context.Postlikes.FirstOrDefault(p => p.PostLikeId == postData.PostLikeId);

                if (original != null)
                {
                    original.Dislike = postData.Dislike;
                    original.Like = postData.Like;

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
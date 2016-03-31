using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eManager.Domain;


namespace eManager.Web.Controllers_API
{

    public class CommentsController : ApiController
    {
        
        [HttpGet]
        public List<Comment> getComments()
        {
            using (var context = new DbModelContext())
            {
                return context.Comments.ToList();
            }
        }


        [HttpGet]
        public Comment getComment(int commentId)
        {
            using (var context = new DbModelContext())
            {
                Comment result = context.Comments.FirstOrDefault(c => c.CommentId == commentId);

                return result;
            }
        }

        [HttpPost]
        public Comment addComment(Comment CommentData)
        {
            using (var context = new DbModelContext())
            {
                CommentData.InsertionDate = DateTime.Now;
                context.Comments.Add(CommentData);
                context.SaveChanges();

            }
            return CommentData;

        }

        [HttpPut]
        public Comment updateComment(Comment CommentData)
        {
            using (var context = new DbModelContext())
            {
                var original = context.Comments.FirstOrDefault(c => c.CommentId == CommentData.CommentId);

                if (original != null)
                {
                    original.Text = CommentData.Text;
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
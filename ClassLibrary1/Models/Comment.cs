using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Design;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace eManager.Domain
{

    [Table("Comments")]
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime InsertionDate { get; set; }

        [ForeignKey("User")]
        public virtual int? UserId { get; set; }

        [ForeignKey("Post")]
        public virtual int? PostId { get; set; }
        public virtual User User { get; set; }
        public virtual Post Post { get; set; }

    }
}

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
    [Table("Posts")]
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [ForeignKey("User")]
        public virtual int? UserId { get; set; }
        public string Title { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
        public string Text { get; set; }
        public virtual ICollection<Postlike> Postlikes { get; set; }
        public virtual User User { get; set; }

    }
}

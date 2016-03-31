using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data.Entity.Design;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eManager.Domain
{
    [Table("Postlikes")]
    public class Postlike
    {
        [Key]
        public int PostLikeId { get; set; }

        [ForeignKey("Post")]
        public virtual int? PostId { get; set; }

        [ForeignKey("User")]
        public virtual int? UserId { get; set; }
        public Boolean Dislike { get; set; }
        public Boolean Like { get; set; }
        public virtual User User { get; set; }
        public virtual Post Post { get; set; }

    }
}

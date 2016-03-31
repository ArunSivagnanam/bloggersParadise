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
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
        public string ProfileText { get; set; }
        public Boolean Availability { get; set; }

        [ForeignKey("UserGroup")]
        public int? UserGroupId { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Postlike> Postlikes { get; set; }

        public virtual UserGroup UserGroup { get; set; }


    }
}

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
    [Table("UserGroups")]
    public class UserGroup
    {
        [Key]
        public  int UserGroupId { get; set; }
        public  string Name { get; set; }
        public  string Type { get; set; }
        public virtual ICollection<User> Users { get; set; }

     
    }
}

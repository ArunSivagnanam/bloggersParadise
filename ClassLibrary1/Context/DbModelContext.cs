using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;


namespace eManager.Domain
{
    public class DbModelContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Postlike> Postlikes { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }


    }
}

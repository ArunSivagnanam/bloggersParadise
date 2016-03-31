using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eManager.Domain;

namespace eManager.Web.Controllers
{
    public class HomeController : Controller
    {


        DbModelContext context = new DbModelContext();

       /** --- localhost:xx/home/SayHello
        * 
        *  public string SayHello(){
            return "Hello World";
        }**/

        public ActionResult Index()
        {
           /** User u = new User()
            {
                UserName = "bob2",
                Password = "hdgh2",
                UserType = "Admin2",
                ProfileText = "hva saa der2",
                Availability = true
            };

            context.Users.Add(u);
            context.SaveChanges();
            */
            

            return View("Index");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
         
    }
}

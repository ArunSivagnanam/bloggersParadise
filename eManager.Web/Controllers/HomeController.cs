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
            /*

            Comment u = new Comment()
            {
                Text = "hej",
                InsertionDate = DateTime.Now
            };

            context.Comments.Add(u);
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

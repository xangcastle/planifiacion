using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Authentication;
using PlanificacionLocal.Models;


namespace PlanificacionLocal.Controllers
{    
    public class HomeController : Controller
    {

        private ControlDeUsuarioContext db = new ControlDeUsuarioContext();
        private AccesoController ac = new AccesoController();
        [Authorize]
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            return View();
        }

    }
}
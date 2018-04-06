using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlanificacionLocal.Models;
using PlanificacionLocal.ModelView;

namespace PlanificacionLocal.Controllers
{
    public class UnidadesController : Controller
    {
        private PLocalContext db = new PLocalContext();
        // GET: /Unidades/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLLTRA"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            else
            {
                RedirectToAction("~/Account/Login");
            }
            ListaUnidad LU = new ListaUnidad();
            LU.ResultUnid = db.ListaUnidad("%").OrderBy(U => U.DescripcionUnidad).ToList();
            
            return View(LU);
        }
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpPost]
        public ActionResult Index(ListaUnidad LU)
        {
            if(LU.PDescripcion !=null && LU.PDescripcion.Trim().Length > 0)
            {
                LU.ResultUnid = db.ListaUnidad("%" + LU.PDescripcion.Trim() + "%").OrderBy(U => U.DescripcionUnidad).ToList();
            }
            else
            {
                LU.ResultUnid = db.ListaUnidad("%").OrderBy(U => U.DescripcionUnidad).ToList();
            }
            return View(LU);
        }
       
        // GET: /Unidades/Details/5
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        public ActionResult Details(int? _id)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLLTRA"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }

            }
            else
            {
                RedirectToAction("~/Account/Login");
            }
            if (_id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Unidad unidad = db.Unidades.Find(_id);
            if (unidad == null)
            {
                return HttpNotFound();
            }
            return View("Details", unidad);
        }

        // GET: /Unidades/Create
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        public ActionResult Create()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLECRA"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }

            }
            else
            {
                RedirectToAction("~/Account/Login");
            }
            return View();
        }

        // POST: /Unidades/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,DescripcionUnidad")] Unidad unidad)
        {
            if(db.Unidades.Where(u => u.DescripcionUnidad == unidad.DescripcionUnidad).Any())
            {
                ModelState.AddModelError("DescripcionUnidad", "La descripcion de la unidad ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Unidades.Add(unidad);
                db.SaveChanges();
                return Json(new { HayError = false }, JsonRequestBehavior.AllowGet);
            }
            var Errores = ModelState.ToDictionary
                   (
                       e => e.Key,
                       e => e.Value.Errors.Select(x => x.ErrorMessage).ToArray()
                   );
            return Json(new { HayError = true, Errores = Errores }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Unidades/Edit/5
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public ActionResult Edit(int? _id)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLMDFI"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            else
            {
                RedirectToAction("~/Account/Login");
            }
            if (_id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Unidad unidad = db.Unidades.Find(_id);
            if (unidad == null)
            {
                return HttpNotFound();
            }
            return View(unidad);
        }

        // POST: /Unidades/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,DescripcionUnidad")] Unidad unidad)
        {
            if (db.Unidades.Where(u => u.Id != unidad.Id && u.DescripcionUnidad == unidad.DescripcionUnidad).Any())
            {
                ModelState.AddModelError("DescripcionUnidad", "La descripcion de la unidad ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Entry(unidad).State = EntityState.Modified;
                db.SaveChanges();
                   return Json(new { HayError = false }, JsonRequestBehavior.AllowGet);
            }
            var Errores = ModelState.ToDictionary
                   (
                       e => e.Key,
                       e => e.Value.Errors.Select(x => x.ErrorMessage).ToArray()
                   );
            return Json(new { HayError = true, Errores = Errores }, JsonRequestBehavior.AllowGet);        
           
        }

        [Authorize]
        [Authorize(Roles = "ROLELMI")]
        [HttpPost]
        public JsonResult DeleteUnidad(int? id)
        {
            string result = string.Empty;
            try
            {
                Unidad unidad = db.Unidades.Find(id);
                db.Set<Unidad>().Remove(unidad);
                db.SaveChanges();

                result = "success";
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && ex.InnerException.InnerException != null && ex.InnerException.InnerException.Message.Contains("REFERENCE"))
                {
                    result = "La Unidad no puede ser eliminada ya que está asociada a otros registros";
                }
                else
                {
                    if (ex.InnerException != null)
                        result = ex.InnerException.Message;
                    else
                        result = ex.Message;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

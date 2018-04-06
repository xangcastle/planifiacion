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
    public class LocalesController : Controller
    {
        private PLocalContext db = new PLocalContext();

        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        // GET: /Local/
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
            ListaLocal LL = new ListaLocal();
            LL.ResultLocal = db.ListaLocal("%").OrderBy(L => L.Descripcion).ToList();

            return View(LL);
        }
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpPost]
        public ActionResult Index(ListaLocal LL)
        { 
            if(LL.NumLocal !=null && LL.NumLocal.Trim().Length >0)
            {
                LL.ResultLocal = db.ListaLocal("%" + LL.NumLocal.Trim() + "%").OrderBy(L => L.Descripcion).ToList();
            }
            else
            {
                LL.ResultLocal = db.ListaLocal("%").OrderBy(L => L.Descripcion).ToList();
            }
            return View(LL);
        }

        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        // GET: /Local/Details/5
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
            Local local = db.Locales.Find(_id);
            if (local == null)
            {
                return HttpNotFound();
            }
            return View(local);
        }
               
        // GET: /Local/Create
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
            ViewBag.UnidadId = new SelectList(db.Unidades.OrderBy(U => U.DescripcionUnidad), "Id", "DescripcionUnidad");
            ViewBag.TipoLocalId = new SelectList(db.TiposLocal.OrderBy(T => T.DescripcionTipoLocal), "Id", "DescripcionTipoLocal");

            return View();
        }

        // POST: /Local/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,NumLocal,UnidadId,TipoLocalId,Descripcion,Capacidad")] Local local)
        {
            if(db.Locales.Where(l => l.NumLocal == local.NumLocal).Any())
            {
                ModelState.AddModelError("NumLocal", "El numero local ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Locales.Add(local);
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

        // GET: /Local/Edit/5
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
            Local local = db.Locales.Find(_id);
            if (local == null)
            {
                return HttpNotFound();
            }

            ViewBag.UnidadId = new SelectList(db.Unidades, "Id", "DescripcionUnidad", local.UnidadId);
            ViewBag.TipoLocalId = new SelectList(db.TiposLocal, "Id", "DescripcionTipoLocal", local.TipoLocalId);
            return View(local);
        }

        // POST: /Local/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,NumLocal,UnidadId,TipoLocalId,Descripcion,Capacidad")] Local local)
        {
            if (db.Locales.Where(l => l.Id != local.Id && l.NumLocal == local.NumLocal).Any())
            {
                ModelState.AddModelError("NumLocal", "El numero local ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Entry(local).State = EntityState.Modified;
                db.SaveChanges();
                 return Json(new { HayError = false }, JsonRequestBehavior.AllowGet);
            }
            var Errores = ModelState.ToDictionary
                   (
                       e => e.Key,
                       e => e.Value.Errors.Select(x => x.ErrorMessage).ToArray()
                   );

            ViewBag.UnidadId = new SelectList(db.Unidades, "Id", "DescripcionUnidad", local.UnidadId);
            ViewBag.TipoLocalId = new SelectList(db.TiposLocal, "Id", "DescripcionTipoLocal", local.TipoLocalId);

            return Json(new { HayError = true, Errores = Errores }, JsonRequestBehavior.AllowGet);

                       
        }

        [Authorize]
        [Authorize(Roles = "ROLELMI")]
        [HttpPost]
        public JsonResult DeleteLocal(int? id)
        {
            string result = string.Empty;
            try
            {
                Local local = db.Locales.Find(id);
                db.Set<Local>().Remove(local);
                db.SaveChanges();

                result = "success";
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && ex.InnerException.InnerException != null && ex.InnerException.InnerException.Message.Contains("REFERENCE"))
                {
                    result = "El local no pude ser eliminado ya que está asociado a otros registros";
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


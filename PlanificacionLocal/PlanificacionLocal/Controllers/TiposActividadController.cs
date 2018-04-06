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
    public class TiposActividadController : Controller
    {
        private PLocalContext db = new PLocalContext();
        // GET: /TiposActividad/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        public ActionResult Index( )
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
            ListaTipoActividad LTA = new ListaTipoActividad();
            LTA.ResultTipoAct = db.ListaTipoActividad("%").OrderBy(T => T.Descripcion).ToList();

            return View(LTA);
        }
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpPost]
        public ActionResult Index(ListaTipoActividad LTA)
        {
           if(LTA.PDescripcion !=null && LTA.PDescripcion.Length > 0)
           {
               LTA.ResultTipoAct = db.ListaTipoActividad("%" + LTA.PDescripcion.Trim() + "%").OrderBy(T => T.Descripcion).ToList();
           }
           else
           {
               LTA.ResultTipoAct = db.ListaTipoActividad("%").OrderBy(T => T.Descripcion).ToList();
           }
           return View(LTA);
        }

        // GET: /TiposActividad/Details/5
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
            TipoActividad tipoactividad = db.TiposActividad.Find(_id);
            if (tipoactividad == null)
            {
                return HttpNotFound();
            }
            return View(tipoactividad);
        }

        // GET: /TiposActividad/Create
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

        // POST: /TiposActividad/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Descripcion")] TipoActividad tipoactividad)
        {
            if(db.TiposActividad.Where(t => t.Descripcion == tipoactividad.Descripcion).Any())
            {
                ModelState.AddModelError("Descripcion","La descripción del tipo actividad ya existe");
            }  
            if(ModelState.IsValid)
            {
                db.TiposActividad.Add(tipoactividad);
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

        // GET: /TiposActividad/Edit/5
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public ActionResult Edit(int?  _id)
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
            TipoActividad tipoactividad = db.TiposActividad.Find(_id);
            if (tipoactividad == null)
            {
                return HttpNotFound();
            }
            return View(tipoactividad);
        }

        // POST: /TiposActividad/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Descripcion")] TipoActividad tipoactividad)
        {
            if (db.TiposActividad.Where(t => t.Id != tipoactividad.Id &&t.Descripcion == tipoactividad.Descripcion).Any())
            {
                ModelState.AddModelError("Descripcion", "La descripción del tipo actividad ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Entry(tipoactividad).State = EntityState.Modified;
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
        public JsonResult EliminarTipoActividad(int? id)
        {
            string result = string.Empty;
            try
            {
                TipoActividad tipoactividad = db.TiposActividad.Find(id);
                db.Set<TipoActividad>().Remove(tipoactividad);
                db.SaveChanges();

                result = "success";
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && ex.InnerException.InnerException != null && ex.InnerException.InnerException.Message.Contains("REFERENCE"))
                {
                    result = "El Tipo Actividad no puede ser eliminado ya que está asociado a otros registros";
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

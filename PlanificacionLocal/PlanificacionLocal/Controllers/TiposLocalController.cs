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
    public class TiposLocalController : Controller
    {
        private PLocalContext db = new PLocalContext();
        // GET: /TiposLocal/
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
            ListaTipoLocal LTL = new ListaTipoLocal();
            LTL.ResultTipoLocal = db.ListaTipoLocal("%").OrderBy(T => T.DescripcionTipoLocal).ToList();
            
            return View(LTL);
        }

        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpPost]
        public ActionResult Index(ListaTipoLocal LTL)
        {
            if(LTL.PDescripcion != null && LTL.PDescripcion.Length >0)
            {
                LTL.ResultTipoLocal = db.ListaTipoLocal("%" + LTL.PDescripcion + "%").OrderBy(T => T.DescripcionTipoLocal).ToList();
            }
            else {
                LTL.ResultTipoLocal = db.ListaTipoLocal("%").OrderBy(T => T.DescripcionTipoLocal).ToList();
            }
            return View(LTL);
        }

        // GET: /TiposLocal/Details/5
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
            TipoLocal tipolocal = db.TiposLocal.Find(_id);
            if (tipolocal == null)
            {
                return HttpNotFound();
            }
            return View(tipolocal);
        }

        // GET: /TiposLocal/Create
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

        // POST: /TiposLocal/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,DescripcionTipoLocal")] TipoLocal tipolocal)
        {
            if(db.TiposLocal.Where(tl => tl.DescripcionTipoLocal == tipolocal.DescripcionTipoLocal).Any())
            {
                ModelState.AddModelError("DescripcionTipoLocal", "La descripcion del tipo local ya existe");
            }
            if (ModelState.IsValid)
            {
                db.TiposLocal.Add(tipolocal);
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

        // GET: /TiposLocal/Edit/5
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
            TipoLocal tipolocal = db.TiposLocal.Find(_id);
            if (tipolocal == null)
            {
                return HttpNotFound();
            }
            return View(tipolocal);
        }

        // POST: /TiposLocal/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,DescripcionTipoLocal")] TipoLocal tipolocal)
        {
            if (db.TiposLocal.Where(tl => tl.Id != tipolocal.Id && tl.DescripcionTipoLocal == tipolocal.DescripcionTipoLocal).Any())
            {
                ModelState.AddModelError("DescripcionTipoLocal", "La descripcion del tipo local ya existe");
            }
            if (ModelState.IsValid)
            {
                db.Entry(tipolocal).State = EntityState.Modified;
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
        public JsonResult DeleteTipoLocal(int? id)
        {
            string result = string.Empty;
            try
            {
                TipoLocal tipolocal = db.TiposLocal.Find(id);
                db.Set<TipoLocal>().Remove(tipolocal);
                db.SaveChanges();

                result = "success";
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && ex.InnerException.InnerException != null && ex.InnerException.InnerException.Message.Contains("REFERENCE"))
                {
                    result = "El Tipo Local no puede ser eliminado ya que está asociado a otros registros";
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

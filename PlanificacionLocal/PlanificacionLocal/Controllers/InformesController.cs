using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlanificacionLocal.Models;
using PlanificacionLocal.ModelView.ReportesView;

namespace PlanificacionLocal.Controllers
{
    public class InformesController : Controller
    {
        private PLocalContext db = new PLocalContext();
        //
        // GET: /FrecuenciaPretamo/
        [Authorize]
        [Authorize(Roles = "ROLRPTRO")]
        public ActionResult FrecuenciaPretamo()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLRPTRO"))
                {
                    Response.Redirect("~/Home/Index");
                }
            }
            else
            {
                Response.Redirect("~/Account/Login");
            }
          
            FrecuenciaPrestamoRangueada RPTCatalogo = new FrecuenciaPrestamoRangueada();
            RPTCatalogo.Desde = Convert.ToString(DateTime.Today.ToShortDateString());
            RPTCatalogo.Hasta = Convert.ToString(DateTime.Today.ToShortDateString());
            return View(RPTCatalogo);
        }

        //
        // GET: /ActividadesPorTipo/
        [Authorize]
        [Authorize(Roles = "ROLRPTRO")]
        public ActionResult ActividadesPorTipo()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLRPTRO"))
                {
                    Response.Redirect("~/Home/Index");
                }
            }
            else
            {
                Response.Redirect("~/Account/Login");
            }
            ActividadXTipoRangueada RPTCatalogo = new ActividadXTipoRangueada();
            RPTCatalogo.Desde = Convert.ToString(DateTime.Today.ToShortDateString());
            RPTCatalogo.Hasta = Convert.ToString(DateTime.Today.ToShortDateString());
            return View(RPTCatalogo);
        }

        //
        // GET: /HorasConsumoDeLocal/
        [Authorize]
        [Authorize(Roles = "ROLRPTRO")]
        public ActionResult HorasConsumoDeLocal()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!User.IsInRole("ROLRPTRO"))
                {
                    Response.Redirect("~/Home/Index");
                }
            }
            else
            {
                Response.Redirect("~/Account/Login");
            }
            HorasConsumoLocalRangueada RPTCatalogo = new HorasConsumoLocalRangueada();
            RPTCatalogo.Desde = Convert.ToString(DateTime.Today.Date.ToShortDateString());
            RPTCatalogo.Hasta = Convert.ToString(DateTime.Today.Date.ToShortDateString());
            return View(RPTCatalogo);
        }
        [HttpGet]
        public JsonResult ObtenerLocal()
        {
            List<Local> oLocal = (from l in db.Locales.ToList()
                                      select new Local
                                      {
                                        Id= l.Id,
                                        Descripcion = l.Descripcion
                                      }).OrderBy(l => l.Descripcion).ToList();
            return Json(oLocal.ToList(),JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ObtenerTipoActividad()
        {
            List<TipoActividad> oTipo = (from t in db.TiposActividad.ToList()
                                         select new TipoActividad { 
                                            Id = t.Id,
                                            Descripcion = t.Descripcion
                                         }).OrderBy(t => t.Descripcion).ToList();

            return Json(oTipo.ToList(), JsonRequestBehavior.AllowGet);
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
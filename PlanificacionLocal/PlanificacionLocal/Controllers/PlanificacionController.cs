using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using PlanificacionLocal.Models;
using PlanificacionLocal.Models.Consultas;
using PlanificacionLocal.ModelView;
using PlanificacionLocal.ModelView.Busquedas;
using System.Globalization;
using Newtonsoft.Json;

namespace PlanificacionLocal.Controllers
{
    public class PlanificacionController : Controller
    {
        private PLocalContext db = new PLocalContext();
        //
        // GET: /PlanificarActividad/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        public ActionResult PlanificarActividad()
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
            return View();
        }
        //
        // GET: /RegistroActividad/
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        public PartialViewResult RegistroActividad()
        {
            if (!User.Identity.IsAuthenticated)            
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLECRA"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            ActView oActividad = TempData["oActividad"] as ActView;
            if (oActividad == null)
            {
                oActividad = new ActView();
                oActividad.Detalles = new List<DetalleView>();
                oActividad.Descripcion = "";
            }
            ViewBag.TipoActividadId = new SelectList(db.TiposActividad.OrderBy(ta => ta.Descripcion), "Id", "Descripcion");
            TempData["oActividad"] = oActividad;
            return PartialView(oActividad);
        }
        //
        // GET: /ModificacionActividadView/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public PartialViewResult ModificacionActividadView()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLMDFI"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            return PartialView();
        }
        //
        // GET: /ModificacionActividadActualView/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public PartialViewResult ModificacionActividadActualView()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLMDFI"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            return PartialView();
        }
        //
        // GET: /ModificacionActividad/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public PartialViewResult ModificacionActividad()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLMDFI"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            ActView oActividad = TempData["oActividad"] as ActView;
            if (oActividad == null)
            {
                oActividad = new ActView();
                oActividad.Detalles = new List<DetalleView>();
                oActividad.Descripcion = "";
            }
            ViewBag.TipoActividadId = new SelectList(db.TiposActividad.OrderBy(ta => ta.Descripcion), "Id", "Descripcion");
            TempData["oActividad"] = oActividad;
            return PartialView(oActividad);
        }
        //
        // GET: /ModificacionActividadActual/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        public PartialViewResult ModificacionActividadActual()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLMDFI"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            return PartialView();
        }
        //
        // GET: /DetalleActividad/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        public PartialViewResult DetalleActividad()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            else
            {
                if (!User.IsInRole("ROLLTRA"))
                {
                    RedirectToAction("AccesoDenegado", "Acceso");
                }
            }
            return PartialView();
        }       
        //
        // GET: /BusquedaUnidad/
        [Authorize]
        public PartialViewResult BusquedaUnidad()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            return PartialView();
        }
        //
        // GET: /BusquedaLocal/
        [Authorize]
        public PartialViewResult BusquedaLocal()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            return PartialView();
        }
        //
        // GET: /BusquedaActividad/
        [Authorize]
        public PartialViewResult BusquedaActividad()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            return PartialView();
        }
        //
        // GET: /BusquedaLocalPrincipal/
        [Authorize]
        public PartialViewResult BusquedaLocalPrincipal()
        {
            if (!User.Identity.IsAuthenticated)
            {
                RedirectToAction("~/Account/Login");
            }
            return PartialView();
        }
        //
        // GET: /BuscarLocalesPlugin/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpGet]
        public JsonResult BuscarLocalesPlugin(string valor = "")
        {
            List<ListadoLocales> Locales = (from l in db.ListaDeLocal(valor).ToList()
                                            select new ListadoLocales
                                            {
                                                Id = l.Id,
                                                NoLocal = l.NumLocal,
                                                Descripcion = l.Descripcion,
                                                Capacidad = l.Capacidad
                                            }).ToList();
            return Json(Locales, JsonRequestBehavior.AllowGet);
                       
        }
        //
        // GET: /BuscarActividadPlugin/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpGet]
        public JsonResult BuscarActividadPlugin(string valor = "")
        {
            List<ListaActividades> Actividades = (from a in db.ListaActividad(valor).ToList()
                                                  select new ListaActividades
                                                  {
                                                      Id = a.Id,
                                                      Tipo = a.TipoActividad,
                                                      Solicitante = a.DescripcionUnidad,
                                                      Descripcion = a.DescricionDeLaActividad
                                                  }).ToList();

            return Json(Actividades, JsonRequestBehavior.AllowGet);
                        
        }
        //
        // GET: /BuscarLocalPlugin/
        [Authorize]
        [HttpGet]
        public JsonResult BuscarLocalPlugin(string valor = "")
        {
            List<ListadoLocales> Locales = (from l in db.ListaDeLocal(valor).ToList()
                                            select new ListadoLocales
                                            {
                                                Id = l.Id,
                                                NoLocal = l.NumLocal,
                                                Descripcion = l.Descripcion,
                                                Capacidad = l.Capacidad
                                            }).ToList();
            return Json(Locales, JsonRequestBehavior.AllowGet);

        }
        //
        // GET: /BuscarLocalPlugin/
        [Authorize]
        [HttpGet]
        public JsonResult BuscarUnidadPlugin(string valor = "")
        {
            List<ListadoUnidades> Unidades = (from u in db.ListaUnidad(valor.Trim()).ToList()
                           select new ListadoUnidades
                           {
                               Id = u.Id,
                               Descripcion = u.DescripcionUnidad
                           }).ToList();

            return Json(Unidades,JsonRequestBehavior.AllowGet);
                       
        }
        //
        // GET: /GetEvent/
        [Authorize]
        [Authorize(Roles = "ROLLTRA")]
        [HttpGet]
        public JsonResult GetEvent(int LocalId)
        {
            List<ActTempView> events = (from a in db.Actividades
                                        join da in db.DetallesActividad on a.Id equals da.ActividadId
                                        where (da.LocalId == LocalId)
                                        select new ActTempView
                                        {
                                            ActividadId = a.Id,
                                            Descripcion = a.DescricionDeLaActividad.Trim(),
                                            TipoActividad = a.TipoActividad.Descripcion.Trim(),
                                            TipoId = a.TipoActividadId,
                                            FechaRealizacion = da.FechaRealizacion,
                                            FechaInicio = da.FechaInicio,
                                            FechaFin = da.FechaFin,
                                            DescripcionUnidad = da.Unidad.DescripcionUnidad.Trim(),
                                            UnidadId = da.UnidadId,
                                            DescripcionLocal = da.Local.Descripcion.Trim(),
                                            LocalId = da.LocalId,
                                            idDetalle = da.Id

                                        }).ToList();



            return Json(events.ToArray(), JsonRequestBehavior.AllowGet);

        }
        //
        // GET: /ObtenerAct/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpGet]
        public JsonResult ObtenerAct(int actId)
        {
            ActView pActividad = new ActView();
            List<ActividadView> Actividades = (from a in db.Actividades
                                               join d in db.DetallesActividad on a.Id equals d.ActividadId
                                               where (a.Id == actId)
                                               select new ActividadView
                                               {
                                                   Id = a.Id,
                                                   DescripcionAct = a.DescricionDeLaActividad,
                                                   DescripcionTipo = a.TipoActividad.Descripcion,
                                                   TipoActividadId = a.TipoActividadId,
                                                   DescripcionUnidad = d.Unidad.DescripcionUnidad,
                                                   UnidadId = d.UnidadId
                                               }).Distinct().ToList();

            ViewBag.TipoActividadId = new SelectList(db.TiposActividad.OrderBy(ta => ta.Descripcion), "Id", "Descripcion", pActividad.TipoActividadId);
            
            return Json(Actividades.ToList(), JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /ObtenerDetalleAll/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpGet]
        public JsonResult ObtenerDetalleAll(int idAct = 0)
        {
            ActView pActividad = new ActView();
            List<TempDetaView> LstDeta = (from d in db.DetallesActividad.Where(x => x.ActividadId == idAct).ToList()
                                          select new TempDetaView
                                          {
                                              idDeta = d.Id,
                                              idAct = d.ActividadId,
                                              IdLoc = d.LocalId,
                                              DescripcionLocal = d.Local.Descripcion.Trim(),
                                              FechaRealizacion = d.FechaRealizacion,
                                              Inicia = d.FechaInicio,
                                              Termina = d.FechaFin
                                          }
                                        ).OrderBy(x => x.FechaRealizacion).ToList();

            ViewBag.TipoActividadId = new SelectList(db.TiposActividad.OrderBy(ta => ta.Descripcion), "Id", "Descripcion", pActividad.TipoActividadId);

            return Json(new { Result = LstDeta }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /ObtenerDetalle/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpGet]
        public JsonResult ObtenerDetalle(int idDetaAct = 0)
        {
            ActView pActividad = new ActView();
            List<TempDetaView> LstDeta = (from d in db.DetallesActividad.Where(x => x.Id == idDetaAct).ToList()
                                          select new TempDetaView
                                          {
                                              idDeta = d.Id,
                                              idAct = d.ActividadId,
                                              IdLoc = d.LocalId,
                                              DescripcionLocal = d.Local.Descripcion.Trim(),
                                              FechaRealizacion = d.FechaRealizacion,
                                              Inicia = d.FechaInicio,
                                              Termina = d.FechaFin
                                          }).OrderBy(x => x.FechaRealizacion).ToList();

            ViewBag.TipoActividadId = new SelectList(db.TiposActividad.OrderBy(ta => ta.Descripcion), "Id", "Descripcion", pActividad.TipoActividadId);

            return Json(new { Result = LstDeta }, JsonRequestBehavior.AllowGet);

        }
        //
        // GET: /GetDeta/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpGet]
        public JsonResult GetDeta(int idAct, int IdLoc)
        {
            List<DetalleView> LstDeta = (from d in db.DetallesActividad.Where(d => d.ActividadId == idAct && d.LocalId == IdLoc).ToList()
                                         select new DetalleView
                                         {
                                             FechaRealizacion = Convert.ToString(d.FechaRealizacion),
                                             Inicia = Convert.ToString(d.FechaInicio),
                                             Termina = Convert.ToString(d.FechaFin)
                                         }).ToList();
            return Json(LstDeta.ToList(), JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /oDetaVer/
        [Authorize]
        [HttpPost]
        public JsonResult oDetaVer(vDetaView oVerDeta, string fReal, string hIni, string hFi, string ids, string IdsLoc)
        {
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();

             if (fReal != null && hIni != null && hFi != null && ids != null)
             {
                 string[] ListaLocalId = Newtonsoft.Json.JsonConvert.DeserializeObject(IdsLoc, typeof(string[])) as string[];
                 string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                 string[] ListaHoraI = Newtonsoft.Json.JsonConvert.DeserializeObject(hIni, typeof(string[])) as string[];
                 string[] ListaHoraF = Newtonsoft.Json.JsonConvert.DeserializeObject(hFi, typeof(string[])) as string[];
                 string[] ListaIds = Newtonsoft.Json.JsonConvert.DeserializeObject(ids, typeof(string[])) as string[];

                 for (var i = 0; i < ListaHoraI.Count(); i++)
                 {
                     DetalleView DetalleAct = new DetalleView();
                     DetalleAct.FechaRealizacion = ListaFechas[i];
                     DetalleAct.Inicia = ListaFechas[i]+" "+ListaHoraI[i];
                     DetalleAct.Termina = ListaFechas[i] + " " + ListaHoraF[i];
                     DetalleAct.Id = ListaIds[i];
                     DetalleAct.idLoc = Convert.ToInt32(ListaLocalId[i]);

                     LstDetaAct.Add(DetalleAct);
                 }
             }

            if( LstDetaAct.Count() > 0)
            {
                List<DetalleActividad> oDetaAct = new List<DetalleActividad>();
                foreach(var item in LstDetaAct)
                {
                    DetalleActividad oDeta = new DetalleActividad();;
                    oDeta.FechaRealizacion = Convert.ToDateTime(item.FechaRealizacion);
                    oDeta.FechaInicio = Convert.ToDateTime(item.Inicia);
                    oDeta.FechaFin = Convert.ToDateTime(item.Termina);
                    oDeta.Id = Convert.ToInt32(item.Id);
                    oDeta.LocalId = item.idLoc;
                    oDetaAct.Add(oDeta);
                }

                var Fecha = Convert.ToDateTime(oVerDeta.FRealizacion);
                var Inicial = Convert.ToDateTime(oVerDeta.FInicia);
                var Final = Convert.ToDateTime(oVerDeta.FTermina);
                var idsDeta = oVerDeta.idDetaAct;

                List<DetalleActividad> objVer = (from c in oDetaAct.Where(p => p.FechaRealizacion == Fecha).ToList() select c).ToList();
                                
                
                var ListaVerificar = (from c in objVer

                                      where ((c.LocalId == oVerDeta.IdLoc) && (c.Id != idsDeta))
                                          /****************************************************************************1mer Validación*******************************************************************************/
                                                 && ((

                                                  (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                  || ((((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  )

                                                  /***************************************************************************2da Validación*******************************************************************************/

                                                  || (


                                                  (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                  || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  /**************************************************************************3cer Validación*****************************************************************************/
                                                  || (


                                                  ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute)
                                                  || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))
                                                  )

                                                  /*************************************************************************4ta Validación**************************************************************************************/
                                                  || (
                                                  ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                  ||
                                                  ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                  )

                                                  /*************************************************************************5ta Validación**************************************************************************************/
                                                  || (


                                                  ((((c.FechaFin.Hour == (Inicial.Hour))

                                                  || ((((((c.FechaFin.Hour) - (Inicial.Hour)) <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  || (((((Inicial.Hour) - (c.FechaFin.Hour)) <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))))))

                                                  && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                  || ((c.FechaInicio.Hour == (Final.Hour))

                                                  || (((((((c.FechaInicio.Hour) - (Final.Hour))) <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))))

                                                  || (((((Final.Hour) - (c.FechaInicio.Hour)) <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour))))))

                                                  && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))))
                                                  )
                                      select c).OrderBy(v => v.FechaInicio).ToList();

                if (ListaVerificar.Any())
                {
                    foreach (var item in ListaVerificar)
                    {
                        ListaVerificacionView oVer = new ListaVerificacionView();
                        oVer.idDetaView = item.Id;
                        LstVerificacion.Add(oVer);
                    }
                    result = "error";
                    band = false;
                }

            }

            if (band)
            {               
                
                result = "success";
            }

            return Json(new { result = result ,results = LstVerificacion.ToList(), ResultDeta = LstDetaAct.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /GeneraCodIdAgr/
        [Authorize]
        [HttpGet]
        public JsonResult GeneraCodIdAgr(int IdLoc, string fReal, string hIni, string hFi, int ids)
        {
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();


            List<DetalleView> LstDetaActId = new List<DetalleView>();

            if (fReal != null )
            {
                string[] ListaFecha1 = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                for (var i = 0; i < ListaFecha1.Count(); i++)
                {

                    var k = Convert.ToDateTime(ListaFecha1[i]);
                    var d1 = Convert.ToString(k.Day);
                    var d2 = Convert.ToString(k.Month);
                    var d3 = Convert.ToString(k.Year);

                    var NId = ids + d1 + d2 + d3;
                    DetalleView DetalleActId = new DetalleView();

                    DetalleActId.FechaRealizacion = ListaFecha1[i];
                    DetalleActId.idLoc = IdLoc;
                    DetalleActId.Id = NId;
                    LstDetaActId.Add(DetalleActId);
                }

                if ( fReal != null )
                {
                    string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];

                    for (var i = 0; i < ListaFechas.Count(); i++)
                    {
                        var j = Convert.ToDateTime(ListaFecha1[i]);
                        var od1 = Convert.ToString(j.Day);
                        var od2 = Convert.ToString(j.Month);
                        var od3 = Convert.ToString(j.Year);

                        var oNId = ids + od1 + od2 + od3;

                        DetalleView DetalleAct = new DetalleView();
                        DetalleAct.FechaRealizacion = ListaFechas[i];
                        DetalleAct.Inicia = ListaFechas[i] + " " + hIni;
                        DetalleAct.Termina = ListaFechas[i] + " " + hFi;
                        DetalleAct.Id = oNId;
                        DetalleAct.idLoc = IdLoc;

                        var Fecha = Convert.ToDateTime(DetalleAct.FechaRealizacion);
                        var Inicial = Convert.ToDateTime(DetalleAct.Inicia);
                        var Final = Convert.ToDateTime(DetalleAct.Termina);
                        var LocalId = DetalleAct.idLoc;

                        /***********************Provando validacion nueva1*********************************************/
                        var ListaVerificar = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == LocalId).ToList()

                                              where (c.LocalId == LocalId) && (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                                     || ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute)

                                                     || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))

                                                     || (
                                                            ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                            ||
                                                            ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                        )

                                                     || ((((c.FechaFin.Hour == (Inicial.Hour))

                                                     || ((

                                                     (

                                                     (((c.FechaFin.Hour) - (Inicial.Hour))

                                                     <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                     && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))


                                                     ))


                                                     || ((

                                                     (((Inicial.Hour) - (c.FechaFin.Hour))

                                                     <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                     && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour))))

                                                     ))


                                                     ) && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                     || ((c.FechaInicio.Hour == (Final.Hour))

                                                     || (

                                                     ((((((c.FechaInicio.Hour) - (Final.Hour)))

                                                     <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                     && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))


                                                     ))

                                                     || (((((Final.Hour) - (c.FechaInicio.Hour))

                                                     <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                     && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))
                                                     ))

                                                     ) && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))
                                                    )
                                              select c).OrderBy(v => v.FechaInicio).ToList();
                        /***************************************************************************************************************************/

                        if (ListaVerificar.Any())
                        {
                            foreach (var item in ListaVerificar)
                            {
                                ListaVerificacionView oVer = new ListaVerificacionView();
                                oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                                oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                                oVer.FechaR = item.FechaRealizacion;
                                oVer.Inicia = item.FechaInicio;
                                oVer.Termina = item.FechaFin;

                                LstVerificacion.Add(oVer);
                            }
                            result = "error";
                            band = false;
                        }
                        LstDetaAct.Add(DetalleAct);
                    }
                }

            }

           

            if (band)
            {
                result = "success";
            }

            return Json(new { result = result, AgrList = LstDetaActId.OrderBy(k => k.FechaRealizacion).ToList(), results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /GeneraCodIdMod/
        [Authorize]
        [HttpGet]
        public JsonResult GeneraCodIdMod(int IdLoc, string fReal, string hIni, string hFi, int ids)
        {
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();


            List<DetalleView> LstDetaActId = new List<DetalleView>();

            if (fReal != null)
            {
                string[] ListaFecha1 = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                for (var i = 0; i < ListaFecha1.Count(); i++)
                {

                    var k = Convert.ToDateTime(ListaFecha1[i]);
                    var d1 = Convert.ToString(k.Day);
                    var d2 = Convert.ToString(k.Month);
                    var d3 = Convert.ToString(k.Year);

                    var NId = ids + d1 + d2 + d3;
                    DetalleView DetalleActId = new DetalleView();

                    DetalleActId.FechaRealizacion = ListaFecha1[i];
                    DetalleActId.idLoc = IdLoc;
                    DetalleActId.Id = NId;
                    LstDetaActId.Add(DetalleActId);
                }

                if (fReal != null)
                {
                    string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];

                    for (var i = 0; i < ListaFechas.Count(); i++)
                    {
                        var j = Convert.ToDateTime(ListaFecha1[i]);
                        var od1 = Convert.ToString(j.Day);
                        var od2 = Convert.ToString(j.Month);
                        var od3 = Convert.ToString(j.Year);

                        var oNId = ids + od1 + od2 + od3;

                        DetalleView DetalleAct = new DetalleView();
                        DetalleAct.FechaRealizacion = ListaFechas[i];
                        DetalleAct.Inicia = ListaFechas[i] + " " + hIni;
                        DetalleAct.Termina = ListaFechas[i] + " " + hFi;
                        DetalleAct.Id = oNId;
                        DetalleAct.idLoc = IdLoc;

                        var Fecha = Convert.ToDateTime(DetalleAct.FechaRealizacion);
                        var LocalId = DetalleAct.idLoc;
                        var Inicial = Convert.ToDateTime(DetalleAct.Inicia);
                        var Final = Convert.ToDateTime(DetalleAct.Termina);
                        var idsDeta = Convert.ToInt32(DetalleAct.Id);

                        /******************Cadena vien formada para validar los registros nuevos y existentes modificados con horarios distontos a exectuando si el registro existente continene los mismos datos***********/

                        var ListaVerificarMod = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == LocalId).ToList()
                                                 where ((c.LocalId == LocalId) && (c.Id != idsDeta))
                                                     /****************************************************************************1mer Validación*******************************************************************************/
                                                 && ((

                                                  (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                  || ((((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  )

                                                  /***************************************************************************2da Validación*******************************************************************************/

                                                  || (


                                                  (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                  || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  /**************************************************************************3cer Validación*****************************************************************************/
                                                  || (


                                                  ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute)
                                                  || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))
                                                  )

                                                  /*************************************************************************4ta Validación**************************************************************************************/
                                                  || (
                                                  ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                  ||
                                                  ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                  )

                                                  /*************************************************************************5ta Validación**************************************************************************************/
                                                  || (


                                                  ((((c.FechaFin.Hour == (Inicial.Hour))

                                                  || ((((((c.FechaFin.Hour) - (Inicial.Hour)) <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  || (((((Inicial.Hour) - (c.FechaFin.Hour)) <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))))))

                                                  && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                  || ((c.FechaInicio.Hour == (Final.Hour))

                                                  || (((((((c.FechaInicio.Hour) - (Final.Hour))) <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))))

                                                  || (((((Final.Hour) - (c.FechaInicio.Hour)) <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour))))))

                                                  && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))))
                                                  )
                                                 select c).OrderBy(v => v.FechaInicio).ToList();


                        if (ListaVerificarMod.Any())
                        {

                            foreach (var item in ListaVerificarMod)
                            {
                                ListaVerificacionView oVer = new ListaVerificacionView();
                                oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                                oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                                oVer.FechaR = item.FechaRealizacion;
                                oVer.Inicia = item.FechaInicio;
                                oVer.Termina = item.FechaFin;

                                LstVerificacion.Add(oVer);
                            }
                            result = "error";
                            band = false;
                        }

                        LstDetaAct.Add(DetalleAct);
                    }
                }
            }

           
            if (band)
            {
                result = "success";
            }

            return Json(new { result = result, AgrList = LstDetaActId.OrderBy(k => k.FechaRealizacion).ToList(), results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /GrabarActividad/
        [Authorize]
        [Authorize(Roles = "ROLECRA")]
        [HttpPost]
        public JsonResult GrabarActividad(ActView Act, string fReal, string hIni, string hFi, string IdLoc)
        {
            ActView oActividad = TempData["oActividad"] as ActView;
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();
            if (fReal != null && hIni != null && hFi != null && IdLoc != null)
            {
                if (db.Actividades.Where(a => a.DescricionDeLaActividad == Act.Descripcion).Any())
                {

                    band = false;
                    result = "errorDsc";
                }
                else
                {
                    string[] ListaLocalId = Newtonsoft.Json.JsonConvert.DeserializeObject(IdLoc, typeof(string[])) as string[];
                    string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                    string[] ListaHoraI = Newtonsoft.Json.JsonConvert.DeserializeObject(hIni, typeof(string[])) as string[];
                    string[] ListaHoraF = Newtonsoft.Json.JsonConvert.DeserializeObject(hFi, typeof(string[])) as string[];

                    for (var i = 0; i < ListaHoraI.Count(); i++)
                    {
                        DetalleView DetalleAct = new DetalleView();
                        DetalleAct.FechaRealizacion = ListaFechas[i];
                        DetalleAct.Inicia = ListaHoraI[i];
                        DetalleAct.Termina = ListaHoraF[i];
                        DetalleAct.idLoc = Convert.ToInt32(ListaLocalId[i]);

                        var Fecha = Convert.ToDateTime(DetalleAct.FechaRealizacion);
                        var Inicial = Convert.ToDateTime(DetalleAct.Inicia);
                        var Final = Convert.ToDateTime(DetalleAct.Termina);
                        var LocalId = DetalleAct.idLoc;
                        /***********************Provando validacion nueva1*********************************************/
                        var ListaVerificar = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == LocalId).ToList()

                                              where (c.LocalId == LocalId) && (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                     || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                                     || ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute) 
                                                     
                                                     || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))

                                                     || (
                                                            ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                            ||
                                                            ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                        )
                                                     
                                                     || ((((c.FechaFin.Hour == (Inicial.Hour))

                                                     || ((

                                                     (

                                                     (((c.FechaFin.Hour) - (Inicial.Hour))

                                                     <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                     && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                     || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))


                                                     ))


                                                     || ((

                                                     (((Inicial.Hour) - (c.FechaFin.Hour))

                                                     <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                     && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                     || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour))))

                                                     ))


                                                     ) && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                     || ((c.FechaInicio.Hour == (Final.Hour))

                                                     || (

                                                     ((((((c.FechaInicio.Hour) - (Final.Hour)))

                                                     <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                     && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                     || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))


                                                     ))

                                                     || (((((Final.Hour) - (c.FechaInicio.Hour))

                                                     <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                     && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                     || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))
                                                     ))

                                                     ) && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))
                                                    )
                                              select c).OrderBy(v => v.FechaInicio).ToList();
                        /***************************************************************************************************************************/

                        if (ListaVerificar.Any())
                        {
                            foreach (var item in ListaVerificar)
                            {
                                ListaVerificacionView oVer = new ListaVerificacionView();
                                oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                                oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                                oVer.FechaR = item.FechaRealizacion;
                                oVer.Inicia = item.FechaInicio;
                                oVer.Termina = item.FechaFin;

                                LstVerificacion.Add(oVer);
                            }
                            result = "error";
                            band = false;
                        }
                        LstDetaAct.Add(DetalleAct);
                    }
                }

            }

            if (band)
            {
                GrabarActividades(Act, LstDetaAct);
                TempData.Remove("oActividad");
                result = "success";
            }

            return Json(new { result = result, results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);

        }
        //
        // GET: /BuscarLocalPlugin/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        public JsonResult ModificarActividad(ActView Act, string fReal, string hIni, string hFi, string idAct,string IdLoc, string ids)
        {
            ActView oActividad = TempData["oActividad"] as ActView;
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();
            if (fReal != null && hIni != null && hFi != null && idAct != null && IdLoc != null && ids != null)
            {
                if (db.Actividades.Where(a => a.Id != Act.Id && a.DescricionDeLaActividad == Act.Descripcion).Any())
                {

                    band = false;
                    result = "errorDsc";
                }
                else
                {
                    string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                    string[] ListaHoraI = Newtonsoft.Json.JsonConvert.DeserializeObject(hIni, typeof(string[])) as string[];
                    string[] ListaHoraF = Newtonsoft.Json.JsonConvert.DeserializeObject(hFi, typeof(string[])) as string[];
                    string[] ListaIdActs = Newtonsoft.Json.JsonConvert.DeserializeObject(idAct, typeof(string[])) as string[];
                    string[] ListaLocalId = Newtonsoft.Json.JsonConvert.DeserializeObject(IdLoc, typeof(string[])) as string[];
                    string[] ListaIds = Newtonsoft.Json.JsonConvert.DeserializeObject(ids, typeof(string[])) as string[];

                    for (var i = 0; i < ListaFechas.Count(); i++)
                    {
                        DetalleView DetalleAct = new DetalleView();
                        DetalleAct.FechaRealizacion = ListaFechas[i];
                        DetalleAct.Inicia = ListaHoraI[i];
                        DetalleAct.Termina = ListaHoraF[i];
                        DetalleAct.idAct = Convert.ToInt32(ListaIdActs[i]);
                        DetalleAct.Id = ListaIds[i];
                        DetalleAct.idLoc = Convert.ToInt32(ListaLocalId[i]);

                        var Fecha = Convert.ToDateTime(DetalleAct.FechaRealizacion);
                        var Inicial = Convert.ToDateTime(DetalleAct.Inicia);
                        var Final = Convert.ToDateTime(DetalleAct.Termina);
                        var idsDeta = Convert.ToInt32(DetalleAct.Id);
                        var idsAct = Convert.ToInt32(DetalleAct.idAct);
                        var LocalId = DetalleAct.idLoc;
                         
                        /******************Cadena vien formada para validar los registros nuevos y existentes modificados con horarios distontos a exectuando si el registro existente continene los mismos datos***********/

                        var ListaVerificarMod = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == LocalId).ToList()
                                                
                                                 where ((c.LocalId == LocalId ) && (c.Id != idsDeta))
                                                     /****************************************************************************1mer Validación*******************************************************************************/
                                                 && ((
                                                                                                   
                                                  (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                  || ((((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))
                                                  
                                                  )

                                                  /***************************************************************************2da Validación*******************************************************************************/

                                                  || (
                                                                                                 
                                                  
                                                  (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                  || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  /**************************************************************************3cer Validación*****************************************************************************/
                                                  || (
                                                  
                                                  
                                                  ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute)
                                                  || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))
                                                  )

                                                  /*************************************************************************4ta Validación**************************************************************************************/
                                                  || (
                                                  ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                  ||
                                                  ((c.FechaFin.Hour == (Final.Hour)) &&( ((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                  )
                                                  
                                                  /*************************************************************************5ta Validación**************************************************************************************/
                                                  || (
                                                                                                  
                                                  
                                                  ((((c.FechaFin.Hour == (Inicial.Hour))

                                                  || ((((((c.FechaFin.Hour) - (Inicial.Hour)) <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  || (((((Inicial.Hour) - (c.FechaFin.Hour)) <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))))))

                                                  && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                  || ((c.FechaInicio.Hour == (Final.Hour))

                                                  || (((((((c.FechaInicio.Hour) - (Final.Hour))) <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))))

                                                  || (((((Final.Hour) - (c.FechaInicio.Hour)) <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour))))))

                                                  && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))))
                                                  )
                                                 select c).OrderBy(v => v.FechaInicio).ToList();


                        if (ListaVerificarMod.Any())
                        {

                            foreach (var item in ListaVerificarMod)
                            {
                                ListaVerificacionView oVer = new ListaVerificacionView();
                                oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                                oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                                oVer.FechaR = item.FechaRealizacion;
                                oVer.Inicia = item.FechaInicio;
                                oVer.Termina = item.FechaFin;

                                LstVerificacion.Add(oVer);
                            }
                            result = "error";
                            band = false;
                        }

                        LstDetaAct.Add(DetalleAct);
                    }
                }

            }
            if (band)
            {
                GrabarModificacionActividad(Act, LstDetaAct);
                TempData.Remove("oActividad");
                result = "success";
            }

            return Json(new { result = result, results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /ModificarSeleccionada/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        public JsonResult ModificarSeleccionada(ActView Act, string fReal, string hIni, string hFi, string idAct, string IdLoc, string ids)
        {
            ActView oActividad = TempData["oActividad"] as ActView;
            string result = string.Empty;
            bool band = true;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            List<DetalleView> LstDetaAct = new List<DetalleView>();
            if (fReal != null && hIni != null && hFi != null && idAct != null && IdLoc != null && ids != null)
            {
              
                    string[] ListaFechas = Newtonsoft.Json.JsonConvert.DeserializeObject(fReal, typeof(string[])) as string[];
                    string[] ListaHoraI = Newtonsoft.Json.JsonConvert.DeserializeObject(hIni, typeof(string[])) as string[];
                    string[] ListaHoraF = Newtonsoft.Json.JsonConvert.DeserializeObject(hFi, typeof(string[])) as string[];
                    string[] ListaIdActs = Newtonsoft.Json.JsonConvert.DeserializeObject(idAct, typeof(string[])) as string[];
                    string[] ListaLocalId = Newtonsoft.Json.JsonConvert.DeserializeObject(IdLoc, typeof(string[])) as string[];
                    string[] ListaIds = Newtonsoft.Json.JsonConvert.DeserializeObject(ids, typeof(string[])) as string[];

                    for (var i = 0; i < ListaFechas.Count(); i++)
                    {
                        DetalleView DetalleAct = new DetalleView();
                        DetalleAct.FechaRealizacion = ListaFechas[i];
                        DetalleAct.Inicia = ListaHoraI[i];
                        DetalleAct.Termina = ListaHoraF[i];
                        DetalleAct.idAct = Convert.ToInt32(ListaIdActs[i]);
                        DetalleAct.Id = ListaIds[i];
                        DetalleAct.idLoc = Convert.ToInt32(ListaLocalId[i]);
                        DetalleAct.idUni = Act.UnidadId;

                        var Fecha = Convert.ToDateTime(DetalleAct.FechaRealizacion);
                        var Inicial = Convert.ToDateTime(DetalleAct.Inicia);
                        var Final = Convert.ToDateTime(DetalleAct.Termina);
                        var idsDeta = Convert.ToInt32(DetalleAct.Id);
                        var idsAct = Convert.ToInt32(DetalleAct.idAct);
                        var LocalId = DetalleAct.idLoc;

                        /******************Cadena vien formada para validar los registros nuevos y existentes modificados con horarios distontos a exectuando si el registro existente continene los mismos datos***********/

                        var ListaVerificarMod = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == LocalId).ToList()

                                                 where ((c.LocalId == LocalId) && (c.Id != idsDeta))
                                                     /****************************************************************************1mer Validación*******************************************************************************/
                                                 && ((

                                                  (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                                  || ((((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  )

                                                  /***************************************************************************2da Validación*******************************************************************************/

                                                  || (


                                                  (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                                  || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  /**************************************************************************3cer Validación*****************************************************************************/
                                                  || (


                                                  ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute)
                                                  || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))
                                                  )

                                                  /*************************************************************************4ta Validación**************************************************************************************/
                                                  || (
                                                  ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                  ||
                                                  ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                                  )

                                                  /*************************************************************************5ta Validación**************************************************************************************/
                                                  || (


                                                  ((((c.FechaFin.Hour == (Inicial.Hour))

                                                  || ((((((c.FechaFin.Hour) - (Inicial.Hour)) <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                                  || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))))

                                                  || (((((Inicial.Hour) - (c.FechaFin.Hour)) <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0)

                                                  && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30))

                                                  && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                                  || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))))))

                                                  && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                                  || ((c.FechaInicio.Hour == (Final.Hour))

                                                  || (((((((c.FechaInicio.Hour) - (Final.Hour))) <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                                  || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))))

                                                  || (((((Final.Hour) - (c.FechaInicio.Hour)) <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30)

                                                  && (((c.FechaInicio.Minute) + (Final.Minute)) == 30))

                                                  && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                                  || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour))))))

                                                  && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))))
                                                  )
                                                 select c).OrderBy(v => v.FechaInicio).ToList();


                        if (ListaVerificarMod.Any())
                        {

                            foreach (var item in ListaVerificarMod)
                            {
                                ListaVerificacionView oVer = new ListaVerificacionView();
                                oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                                oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                                oVer.FechaR = item.FechaRealizacion;
                                oVer.Inicia = item.FechaInicio;
                                oVer.Termina = item.FechaFin;

                                LstVerificacion.Add(oVer);
                            }
                            result = "error";
                            band = false;
                        }

                        LstDetaAct.Add(DetalleAct);
                    }

            }
            if (band)
            {
                GrabarActualMod(LstDetaAct);
                TempData.Remove("oActividad");
                result = "success";
            }

            return Json(new { result = result, results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /ModificarActual/
        [Authorize]
        [Authorize(Roles = "ROLMDFI")]
        [HttpPost]
        public JsonResult ModificarActual(int idAct, int idDeta, int idLoc, DateTime Freal, DateTime Inicia, DateTime Termina)  
        {

            string result = string.Empty;
            List<ListaVerificacionView> LstVerificacion = new List<ListaVerificacionView>();
            bool band = true;
            var Fecha = Freal;
            var Inicial = Inicia;
            var Final = Termina;
            var minutos = Inicial.Minute;
           
            /***********************Provando validacion nueva1*********************************************/
            var ListaVerificar = (from c in db.DetallesActividad.Where(x => x.FechaRealizacion == Fecha && x.LocalId == idLoc).ToList()

                                  where ((c.LocalId == idLoc) && (c.Id != idDeta)) && (((c.FechaInicio.Hour) < (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))

                                  || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                         || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) > (Final.Hour))

                                         || (((c.FechaInicio.Hour) < (Final.Hour) && (c.FechaFin.Hour) < (Final.Hour)) && ((c.FechaInicio.Hour) > (Inicial.Hour) && (c.FechaFin.Hour) > (Inicial.Hour))))

                                         || ((c.FechaInicio.Hour == Inicial.Hour && c.FechaInicio.Minute == Inicial.Minute) || (c.FechaInicio.Hour == Final.Hour && c.FechaInicio.Minute == Final.Minute) || (c.FechaFin.Hour == Inicial.Hour && c.FechaFin.Minute == Inicial.Minute) || (c.FechaFin.Hour == Final.Hour && c.FechaFin.Minute == Final.Minute))

                                         || (
                                                  ((c.FechaInicio.Hour == (Inicial.Hour)) && (((c.FechaInicio.Minute == 30) && (Inicial.Minute == 0)) || ((Inicial.Minute == 30) && (c.FechaInicio.Minute == 0))))
                                                  ||
                                                  ((c.FechaFin.Hour == (Final.Hour)) && (((c.FechaFin.Minute == 30) && (Final.Minute == 0)) || ((Final.Minute == 30) && (c.FechaFin.Minute == 0))))
                                             )
                                         
                                        /***************************************************************************************************************************************************************/
                                         || ((((c.FechaFin.Hour == (Inicial.Hour)) 

                                         ||((

                                         (

                                         (((c.FechaFin.Hour) - (Inicial.Hour))

                                         <= 1 && (c.FechaFin.Minute) != 0 && (Inicial.Minute) != 30) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30)) 
                                         
                                         && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                         || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                         || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))

                                         || ((((c.FechaFin.Hour) > 12) && ((Inicial.Hour) <= 12)) && ((c.FechaFin.Hour) > (Inicial.Hour)))


                                         ))


                                         || ((
                                         
                                         (((Inicial.Hour) - (c.FechaFin.Hour)) <= 1 && (Inicial.Minute) != 30 && (c.FechaFin.Minute) != 0) && (((c.FechaFin.Minute) + (Inicial.Minute)) == 30)) 
                                         
                                         && (((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                         || ((((Inicial.Hour) <= 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                         || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) > 12)) && ((Inicial.Hour) > (c.FechaFin.Hour)))

                                         || ((((Inicial.Hour) > 12) && ((c.FechaFin.Hour) <= 12)) && ((Inicial.Hour) > (c.FechaFin.Hour))))

                                         ))


                                         ) && ((c.FechaFin.Minute == 30) && (Inicial.Minute == 0) || (c.FechaFin.Minute == 0) && (Inicial.Minute == 30)))

                                         /************************************************************************************************************************/

                                         || ((c.FechaInicio.Hour == (Final.Hour))

                                         || (

                                         ((((((c.FechaInicio.Hour) - (Final.Hour)))

                                         <= 1 && (c.FechaInicio.Minute) != 30 && (Final.Minute) != 0) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30)) 
                                         
                                         && (((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                         || ((((c.FechaInicio.Hour) <= 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                         || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) > 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))

                                         || ((((c.FechaInicio.Hour) > 12) && ((Final.Hour) <= 12)) && ((c.FechaInicio.Hour) > (Final.Hour)))


                                         ))

                                         || (((((Final.Hour) - (c.FechaInicio.Hour))

                                         <= 1 && (Final.Minute) != 0 && (c.FechaInicio.Minute) != 30) && (((c.FechaInicio.Minute) + (Final.Minute)) == 30)) 
                                         
                                         && (((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                         || ((((Final.Hour) <= 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                         || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) > 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))

                                         || ((((Final.Hour) > 12) && ((c.FechaInicio.Hour) <= 12)) && ((Final.Hour) > (c.FechaInicio.Hour)))
                                         ))

                                         ) && ((c.FechaInicio.Minute == 30) && (Final.Minute == 0) || (c.FechaInicio.Minute == 0) && (Final.Minute == 30)))
                                        )
                                  select c).OrderBy(v => v.FechaInicio).ToList();
            /***************************************************************************************************************************/

            if (ListaVerificar.Any())
            {
                foreach (var item in ListaVerificar)
                {
                    ListaVerificacionView oVer = new ListaVerificacionView();
                    oVer.DescripcionAct = item.Actividad.DescricionDeLaActividad.Trim();
                    oVer.DescipcionLocal = item.Local.Descripcion.Trim();
                    oVer.FechaR = item.FechaRealizacion;
                    oVer.Inicia = item.FechaInicio;
                    oVer.Termina = item.FechaFin;

                    LstVerificacion.Add(oVer);
                }
                band = false;
            }

            if (band)
            {
                GrabarModificacion(idAct, idDeta, Freal, Inicia, Termina);
                result = "success";
            }
            else { result = "error"; }

            return Json(new { result = result, results = LstVerificacion.ToList() }, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /EliminarActal/
        [Authorize]
        [Authorize(Roles = "ROLELMI")]
        [HttpPost]
        public JsonResult EliminarActal(int idDetaAct)
        {
            ActividadView Actual = new ActividadView();
            try
            {

                DetalleActividad DetaAct = db.DetallesActividad.DefaultIfEmpty(null).FirstOrDefault(da => da.Id == idDetaAct);

                if (DetaAct != null)
                {
                    db.DetallesActividad.Remove(DetaAct);
                }
                if (User.IsInRole("ROLELMI"))
                {
                    db.SaveChanges();
                }

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /EliminarAllActual/
        [Authorize]
        [Authorize(Roles = "ROLELMI")]
        [HttpPost]
        public JsonResult EliminarAllActual(int idAct)
        {
            try
            {
                Actividad Act = db.Actividades.Find(idAct);

                foreach (var item in Act.DetallesDeActividad.ToList())
                {
                    db.DetallesActividad.Remove(item);
                }
                db.Set<Actividad>().Remove(Act);

                if (User.IsInRole("ROLELMI"))
                {
                    db.SaveChanges();
                }
            }
            catch 
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /GrabarActividades/
        [Authorize]
        private void GrabarActividades(ActView Act, List<DetalleView> pDeta)
        {
            Actividad ActL = new Actividad();
            ActL.DescricionDeLaActividad = Act.Descripcion.ToString().Trim();
            ActL.TipoActividadId = Act.TipoActividadId;
            db.Actividades.Add(ActL);

            if (User.IsInRole("ROLECRA"))
            {
                db.SaveChanges();
            }

            foreach (var item in pDeta)
            {

                DetalleActividad DetaAct = new DetalleActividad();
                DetaAct.FechaRealizacion = Convert.ToDateTime(item.FechaRealizacion);
                DetaAct.FechaInicio = Convert.ToDateTime(item.Inicia);
                DetaAct.FechaFin = Convert.ToDateTime(item.Termina);
                DetaAct.UnidadId = Act.UnidadId;
                DetaAct.LocalId = Convert.ToInt32(item.idLoc);
                DetaAct.ActividadId = ActL.Id;
                db.DetallesActividad.Add(DetaAct);
                
            }
            if (User.IsInRole("ROLECRA"))
            {
                db.SaveChanges();
            }

        }
        //
        // GET: /GrabarModificacionActividad/  
        [Authorize]
        private void GrabarModificacionActividad(ActView Act, List<DetalleView> pDeta)
        {
            DetalleView oDetaAct = new DetalleView();
            Actividad oActividad = BuscarActividad(Act.Id);

            if (oActividad != null)
            {
                oActividad.DescricionDeLaActividad = Act.Descripcion.ToString().Trim();
                oActividad.TipoActividadId = Act.TipoActividadId;
                db.Entry(oActividad).State = EntityState.Modified;

                if (User.IsInRole("ROLMDFI"))
                {
                    db.SaveChanges();
                }

                Actividad oAct = BuscarActividad(Act.Id);
                int pId;
                DetalleActividad oDeta = new DetalleActividad();
                if (oAct != null)
                {
                    pId = oAct.Id;
                    foreach (var item in pDeta)
                    {
                        oDeta = BuscarDetalle(pId, Convert.ToInt32(item.Id));
                        if (oDeta == null)
                        {
                            oDeta = new DetalleActividad();
                            oDeta.FechaRealizacion = Convert.ToDateTime(item.FechaRealizacion);
                            oDeta.FechaInicio = Convert.ToDateTime(item.Inicia);
                            oDeta.FechaFin = Convert.ToDateTime(item.Termina);
                            oDeta.LocalId = Convert.ToInt32(item.idLoc);
                            oDeta.UnidadId = Act.UnidadId;
                            oDeta.ActividadId = pId;
                            db.DetallesActividad.Add(oDeta);
                        }
                        else
                        {
                            oDeta.FechaRealizacion = Convert.ToDateTime(item.FechaRealizacion);
                            oDeta.FechaInicio = Convert.ToDateTime(item.Inicia);
                            oDeta.FechaFin = Convert.ToDateTime(item.Termina);
                            oDeta.LocalId = Convert.ToInt32(item.idLoc);
                            oDeta.UnidadId = Act.UnidadId;
                            oDeta.ActividadId = pId;
                            db.Entry(oDeta).State = EntityState.Modified;
                        }
                        if (User.IsInRole("ROLMDFI"))
                        {
                            db.SaveChanges();
                        }
                                   
                    }
                }
            }

        }
        //
        // GET: /GrabarModificacion/
        [Authorize]
        private void GrabarModificacion(int idAct, int idDeta, DateTime Freal, DateTime Inicia, DateTime Termina)
        {
            DetalleActividad oDeta = new DetalleActividad();
            oDeta = BuscarDetalle(idAct, idDeta);

            int aId;
            if (oDeta != null)
            {
                aId = idAct;
                oDeta.FechaRealizacion = Freal;
                oDeta.FechaInicio = Inicia;
                oDeta.FechaFin = Termina;
                oDeta.ActividadId = aId;
                db.Entry(oDeta).State = EntityState.Modified;
                
            }

            if (User.IsInRole("ROLMDFI"))
            {
                db.SaveChanges();
            }

        }
        // GET: /GrabarModificacion/
        [Authorize]
        private void GrabarActualMod(List<DetalleView> pDeta)
        {
            DetalleActividad oDeta = new DetalleActividad();
            foreach (var item in pDeta)
            {
                oDeta = BuscarDetalle(item.idAct, Convert.ToInt32(item.Id));
                if (oDeta != null)
                {
                    oDeta.FechaRealizacion = Convert.ToDateTime(item.FechaRealizacion);
                    oDeta.FechaInicio = Convert.ToDateTime(item.Inicia);
                    oDeta.FechaFin = Convert.ToDateTime(item.Termina);
                    oDeta.LocalId = Convert.ToInt32(item.idLoc);
                    oDeta.UnidadId = item.idUni;
                    oDeta.ActividadId = item.idAct;
                    db.Entry(oDeta).State = EntityState.Modified;
                }
                db.SaveChanges();
            }

        }
        private Actividad BuscarActividad(int pIdAct)
        {
            return (db.Actividades.DefaultIfEmpty(null).FirstOrDefault(a => a.Id == pIdAct));
        }
        private DetalleActividad BuscarDetalle(int pIdAct, int pIdDeta)
        {
            return (db.DetallesActividad.DefaultIfEmpty(null).FirstOrDefault(d => d.Id == pIdDeta && d.ActividadId == pIdAct));
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

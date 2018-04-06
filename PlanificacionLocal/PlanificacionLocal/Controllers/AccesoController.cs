using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PlanificacionLocal.Models;

namespace PlanificacionLocal.Controllers
{
    public class AccesoController : Controller
    {
        private ControlDeUsuarioContext db = new ControlDeUsuarioContext();
        //
        // GET: /AccesoDenegado/
        public ActionResult AccesoDenegado()
        {
            return View();
        }
        
        public List<OpcionMenu> ListarPadres(int idUsuario)
        {
            var q = from opc in db.OpcionesMenu
                    join ou in db.OpcionesUsuario on opc.Id equals ou.MenuId //.OpcionMenu.Id
                    where opc.PadreId == 1 && opc.Id != 1 && ou.UsuarioId == idUsuario
                    orderby opc.Orden
                    select opc;

            return (q.ToList());
        }
        public List<OpcionMenu> ListarHijos(int idPadre, int idUsuario)
        {
            var q = from opc in db.OpcionesMenu
                    join ou in db.OpcionesUsuario on opc.Id equals ou.MenuId //.OpcionMenu.Id
                    where opc.PadreId == idPadre && ou.UsuarioId == idUsuario
                    orderby opc.Orden
                    select opc;

            return (q.ToList());
        }

	}
}
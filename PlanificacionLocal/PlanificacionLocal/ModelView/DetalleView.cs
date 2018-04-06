using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView
{
    public class DetalleView
    {
        public string Id { get; set; }
        public int idAct { get; set; }
        public string DscLoc { get; set; }
        public int idLoc { get; set; }
        public int idUni { get; set; }
        public string FechaRealizacion { get; set; }
        public string Inicia { get; set; }
        public string Termina { get; set; }
    }
}
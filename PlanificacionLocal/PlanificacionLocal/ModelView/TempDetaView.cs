using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView
{
    public class TempDetaView
    {
        public int idAct { get; set; }
        public int idDeta { get; set; }
        public string DescripcionLocal { get; set; }
        public int IdLoc { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public DateTime Inicia { get; set; }
        public DateTime Termina { get; set; }
    }
}
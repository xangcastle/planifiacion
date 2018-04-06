using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView
{
    public class vDetaView
    {
        public int IdLoc { get; set; }
        public int idAct { get; set; }
        public int idDetaAct { get; set; }
        public string FRealizacion { get; set; }
        public string FInicia { get; set; }
        public string FTermina { get; set; }
    }
}
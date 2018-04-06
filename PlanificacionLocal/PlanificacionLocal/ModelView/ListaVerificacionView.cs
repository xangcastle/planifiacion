using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView
{
    public class ListaVerificacionView
    {
        public int idDetaView { get; set; }
        public string DescripcionAct { get; set; }
        public string DescipcionLocal { get; set; }
        public DateTime FechaR { get; set; }
        public DateTime Inicia { get; set; }
        public DateTime Termina { get; set; }
    }
}
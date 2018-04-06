using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PlanificacionLocal.Models.Consultas;

namespace PlanificacionLocal.ModelView
{
    public class ListaLocal
    {
        public string NumLocal { get; set; }
        public List<ResultadoLocal> ResultLocal = new List<ResultadoLocal>();
    }
}
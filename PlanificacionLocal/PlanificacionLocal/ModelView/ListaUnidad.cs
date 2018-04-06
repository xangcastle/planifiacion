using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PlanificacionLocal.Models.Consultas;

namespace PlanificacionLocal.ModelView
{
    public class ListaUnidad
    {
        public string PDescripcion { get; set; }
        public List<ResultadoUnidad> ResultUnid = new List<ResultadoUnidad>();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PlanificacionLocal.Models.Consultas;

namespace PlanificacionLocal.ModelView
{
    public class ListaTipoLocal
    {
        public string PDescripcion { get; set; }
        public List<ResultadoTipoLocal> ResultTipoLocal = new List<ResultadoTipoLocal>();
    }
}
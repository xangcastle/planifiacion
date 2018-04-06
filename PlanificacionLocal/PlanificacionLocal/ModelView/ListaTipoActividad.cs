using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PlanificacionLocal.Models.Consultas;

namespace PlanificacionLocal.ModelView
{
    public class ListaTipoActividad
    {
        public string PDescripcion { get; set; }
        public List<ResultadoTipoActividad> ResultTipoAct = new List<ResultadoTipoActividad>();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.Models.Consultas
{
    public class ResultadoActividad
    {
        public int Id { get; set; }
        public string TipoActividad { get; set; }
        public string DescripcionUnidad { get; set; }
        public string DescricionDeLaActividad { get; set; }
    }
}
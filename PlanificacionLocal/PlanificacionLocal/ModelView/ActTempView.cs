using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView
{
    public class ActTempView
    {
        public int ActividadId { get; set; }
        public string Descripcion { get; set; }
        public string TipoActividad { get; set; }
        public int TipoId { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int idDetalle { get; set; }
        public string DescripcionUnidad { get; set; }
        public int UnidadId { get;set;}
        public string DescripcionLocal { get; set; }
        public int LocalId { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanificacionLocal.ModelView
{
    public class ActividadView
    {
        public int Id { get; set; }
        public string DescripcionAct { get; set; }
        public string DescripcionTipo { get; set; }
        public int TipoActividadId { get; set; }
        public string DescripcionUnidad { get; set; }
        public int UnidadId { get; set; }

       
    }
}
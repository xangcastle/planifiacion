using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.Models.Consultas
{
    public class ResultadoLocal
    {
        public int Id { get; set; }
        public string NumLocal { get; set; }
        public string DescripcionUnidad { get; set; }
        public string DescripcionTipoLocal { get; set; }
        public string Descripcion { get; set; }
        public int Capacidad { get; set; }
    }
}
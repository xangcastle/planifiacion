using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView.Busquedas
{
    public class ListadoLocales
    {
        public int Id { get; set; }
        public string NoLocal { get; set; }
        public string Descripcion { get; set; }
        public int Capacidad {get;set;}
    }
}
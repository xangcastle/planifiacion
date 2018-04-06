using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanificacionLocal.ModelView.Busquedas
{
    public class ListaActividades
    {
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Solicitante { get; set; }
        public string Descripcion { get; set; }
    }
}
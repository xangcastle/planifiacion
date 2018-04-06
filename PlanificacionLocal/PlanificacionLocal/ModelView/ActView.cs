using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanificacionLocal.ModelView
{
    /// <summary>
    /// Esta clase es orientada a la vista
    /// </summary>
    public class ActView
    {
        public int Id { get; set; }
       
        [Required(ErrorMessage = "El campo {0} es Obligatorio")]
        [StringLength(80, MinimumLength = 10, ErrorMessage = "La longitud de {0} Debe Estar entre 10 y 80 caracteres")]
        public string Descripcion { get; set; }
       
        [Required(ErrorMessage = "El campo {0} es Necesario")]
        public int TipoActividadId { get; set; }
        
        [Required(ErrorMessage = "El campo {0} es Necesario")]
        public int UnidadId { get; set; }
        
        [Required(ErrorMessage = "El campo {0} es Necesario")]
        public int LocalId { get; set; }
        public string DescLocal { get; set; }
        public int OrigUniId { get; set; }
        public int OrigLocId { get; set; }
        public string HInicio { get; set; }
        public string HFin { get; set; }
        public string oValFRealizacionId { get; set; }
        public string tempHInicio { get; set; }
        public string tempHFin { get; set; }
        public string InfoHini { get; set; }
        public string InfoHFin { get; set; }
        public List<DetalleView> Detalles { get; set; }
        public DetalleView DetaAct { get; set; }
    }
}
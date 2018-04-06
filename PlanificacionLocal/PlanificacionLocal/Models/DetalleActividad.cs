namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("DetalleActividad", Schema = "PDL")]
    public partial class DetalleActividad
    {
        [Key]
        public int Id { get; set; }
        [Display(Name="Fecha realizacion")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:hh/mm/ss}", ApplyFormatInEditMode = false)]
        public DateTime FechaRealizacion { get; set; }
        [Display(Name = "Fecha inicio")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:hh/mm/ss}", ApplyFormatInEditMode = false)]
        public DateTime FechaInicio { get; set; }
        [Display(Name = "Fecha fin")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:hh/mm/ss}", ApplyFormatInEditMode = false)]
        public DateTime FechaFin { get; set; }
        [Display(Name="Unidad")]
        [Required(ErrorMessage = "El campo {0} es Necesario")]
        public int UnidadId { get; set; }
        [Display(Name="Local")]
        [Required(ErrorMessage="El campo {0} es Necesario")]
        public int LocalId { get; set; }
        public int ActividadId { get; set; }
    
        public virtual Local Local { get; set; }
        public virtual Unidad Unidad { get; set; }
        public virtual Actividad Actividad { get; set; }
    }
}

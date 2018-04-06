namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Actividad", Schema = "PDL")]
    public partial class Actividad
    {
        public Actividad()
        {
            this.DetallesDeActividad = new HashSet<DetalleActividad>();
        }
        [Key]
        public int Id { get; set; }
        [Display(Name="Descripcion actividad")]
        [Required(ErrorMessage="El campo {0} es Obligatorio")]
        [StringLength(80,MinimumLength=5,ErrorMessage="La longitud de {0} Debe Estar entre 10 y 80 caracteres")]
        public string DescricionDeLaActividad { get; set; }
        [Display(Name="Tipo actividad")]
        [Required(ErrorMessage="El campo {0} es Necesario")]
        public int TipoActividadId { get; set; }
    
        public virtual ICollection<DetalleActividad> DetallesDeActividad { get; set; }
        public virtual TipoActividad TipoActividad { get; set; }
    }
}

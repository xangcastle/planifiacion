namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("TipoActividad", Schema = "PDL")]
    public partial class TipoActividad
    {
        public TipoActividad()
        {
            this.Actividades = new HashSet<Actividad>();
        }
        [Key]
        public int Id { get; set; }
        [Display(Name="Descripcion")]
        [Required(ErrorMessage = "El campo {0} es Obligatorio")]
        [StringLength(60,MinimumLength=3,ErrorMessage="La longitud de {0} Debe Estar entre 3 y 60 caracteres")]
        public string Descripcion { get; set; }
    
        public virtual ICollection<Actividad> Actividades { get; set; }
    }
}

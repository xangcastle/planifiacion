namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Unidad", Schema="PDL")]
    public partial class Unidad
    {
        public Unidad()
        {
            this.Locales = new HashSet<Local>();
            this.DetallesDeActividad = new HashSet<DetalleActividad>();
        }
        [Key]
        public int Id { get; set; }
        [Display(Name="Descripcion")]
        [Required(ErrorMessage = "El campo {0} es Obligatorio")]
        [StringLength(255,MinimumLength=5,ErrorMessage="La longitud de {0} Debe Estar entre 10 y 255 caracteres")]
        public string DescripcionUnidad { get; set; }
    
        public virtual ICollection<Local> Locales { get; set; }
        public virtual ICollection<DetalleActividad> DetallesDeActividad { get; set; }
    }
}

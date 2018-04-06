namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Local", Schema = "PDL")]
    public partial class Local
    {
        public Local()
        {
            this.DetallesDeActividad = new HashSet<DetalleActividad>();
        }
        [Key]
        public int Id { get; set; }
        [Display(Name="No Local")]
        [Required(ErrorMessage = "El campo {0} es Obligatorio")]
        [StringLength(10,MinimumLength=1,ErrorMessage="La longitud de {0} Debe Estar entre 1 y 10 digitos ")]
        public string NumLocal { get; set; }
        [Display(Name="Descripcion")]
        [Required(ErrorMessage="El campo {0} es Oblgatorio")]
        [StringLength(255,MinimumLength=5,ErrorMessage="La longitud de la {0} Debe Estar entre 10 y 255 caracteres")]
        public string Descripcion { get; set; }
        [Display(Name="Capacidad")]
        [Required(ErrorMessage="El campo {0} es Obligatorio")]
        [Range(0,maximum: int.MaxValue,ErrorMessage="El valor de la {0} Debe ser mayor que 0 ")]
        public int Capacidad { get; set; }
        [Display(Name="Unidad")]
        [Required(ErrorMessage = "El campo {0} es Necesario")]
        public int UnidadId { get; set; }
        [Display(Name="Tipo local")]
        [Required(ErrorMessage="El campo {0} es Necesario")]
        public int TipoLocalId { get; set; }
    
        public virtual Unidad Unidad { get; set; }
        public virtual TipoLocal TipoLocal { get; set; }
        public virtual ICollection<DetalleActividad> DetallesDeActividad { get; set; }
    }
}

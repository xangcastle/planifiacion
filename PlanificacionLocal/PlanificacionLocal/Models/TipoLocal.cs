namespace PlanificacionLocal.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("TipoLocal", Schema = "PDL")]
    public partial class TipoLocal
    {
        public TipoLocal()
        {
            this.Locales = new HashSet<Local>();
        }
        [Key]
        public int Id { get; set; }
        [Display(Name="Descripcion")]
        [Required(ErrorMessage = "El campo {0} es Obligatorio")]
        [StringLength(60,MinimumLength=3,ErrorMessage="La longitud de {0} Debe Estar entre 5 y 60 caracteres")]
        public string DescripcionTipoLocal { get; set; }
    
        public virtual ICollection<Local> Locales { get; set; }
    }
}

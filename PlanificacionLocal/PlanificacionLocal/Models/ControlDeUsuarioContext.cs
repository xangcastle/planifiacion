using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration.Conventions; 

namespace PlanificacionLocal.Models
{
    public class ControlDeUsuarioContext:DbContext
    {
        public DbSet<OpcionMenu> OpcionesMenu { get; set; }
        public DbSet<OpcionUsuario> OpcionesUsuario { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<PluralizingEntitySetNameConvention>();
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    [Table("OpcionMenu")]
    public partial class OpcionMenu
    {
        public OpcionMenu()
        {
            this.HijoDe = new HashSet<OpcionMenu>();
            this.OpcionesUsuario = new HashSet<OpcionUsuario>();
        }
        [Key]
        public int Id { get; set; }
        [StringLength(300)]
        public string Descripcion { get; set; }
        [StringLength(300)]
        public string DescripcionVista { get; set; }
        [StringLength(300)]
        public string DescripcionControlador { get; set; }
        public int Orden { get; set; }
        public int PadreId { get; set; }
        public virtual ICollection<OpcionMenu> HijoDe { get; set; }
        public virtual OpcionMenu Padre { get; set; }
        public virtual ICollection<OpcionUsuario> OpcionesUsuario { get; set; }
    }
    [Table("OpcionUsuario")]
    public partial class OpcionUsuario
    {
        [Key]
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int UsuarioId { get; set; }
        public virtual OpcionMenu Menu { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
    [Table("Usuario")]
    public partial class Usuario
    {
        public Usuario()
        {
            this.OpcionesUsuario = new HashSet<OpcionUsuario>();
        }
        [Key]
        public int Id { get; set; }
        [StringLength(300)]
        public string NombreDeUsuario { get; set; }
        [StringLength(300)]
        public string ClaveDeUsuario { get; set; }

        public virtual ICollection<OpcionUsuario> OpcionesUsuario { get; set; }
    }
}
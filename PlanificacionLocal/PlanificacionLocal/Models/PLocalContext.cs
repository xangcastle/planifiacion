using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using PlanificacionLocal.Models.Consultas;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PlanificacionLocal.Models
{
    public partial class PLocalContext : DbContext
    {

        // tablas de la base de datos
        public virtual DbSet<Unidad> Unidades { get; set; }
        public virtual DbSet<Local> Locales { get; set; }
        public virtual DbSet<TipoLocal> TiposLocal { get; set; }
        public virtual DbSet<TipoActividad> TiposActividad { get; set; }
        public virtual DbSet<Actividad> Actividades { get; set; }
        public virtual DbSet<DetalleActividad> DetallesActividad { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //quitamos la configuracion q hace q elimine en cascada
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            //quitamos la plurarizacion 
            modelBuilder.Conventions.Remove<PluralizingEntitySetNameConvention>();
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            //throw new UnintentionalCodeFirstException();
        }
        //Llamadas a los procedimientos para busquedas
        public IEnumerable<ResultadoTipoActividad> ListaTipoActividad(string PDescripcion)
        {
            return (this.Database.SqlQuery<ResultadoTipoActividad>("ListaTipoActividad @PDescripcion",
                new SqlParameter("@PDescripcion", PDescripcion)));
        }
        public IEnumerable<ResultadoUnidad> ListaUnidad(string PDescripcion)
        {
            return (this.Database.SqlQuery<ResultadoUnidad>("ListaUnidad @PDescripcion",
                new SqlParameter("@PDescripcion", PDescripcion)));
        }
        public IEnumerable<ResultadoTipoLocal> ListaTipoLocal(string PDescripcion)
        {
            return (this.Database.SqlQuery<ResultadoTipoLocal>("ListaTipoLocal @PDescripcion",
                new SqlParameter("@PDescripcion", PDescripcion)));
        }
        public IEnumerable<ResultadoLocal> ListaLocal(string pCadena)
        {
            return (this.Database.SqlQuery<ResultadoLocal>("ListaLocal @pCadena",
                new SqlParameter("@pCadena", pCadena)));
        }
        public IEnumerable<ResultadoLocal> ListaDeLocal(string PDescripcion)
        {
            return (this.Database.SqlQuery<ResultadoLocal>("ListaDeLocal @PDescripcion",
                new SqlParameter("@PDescripcion", PDescripcion)));
        }
        public IEnumerable<ResultadoActividad> ListaActividad(string PDescripcion)
        {
            return (this.Database.SqlQuery<ResultadoActividad>("ListaActividad @PDescripcion",
                new SqlParameter("@PDescripcion", PDescripcion)));
        }
    }
}
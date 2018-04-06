using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PlanificacionLocal.Startup))]
namespace PlanificacionLocal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

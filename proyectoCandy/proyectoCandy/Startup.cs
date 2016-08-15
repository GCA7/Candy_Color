using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(proyectoCandy.Startup))]
namespace proyectoCandy
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

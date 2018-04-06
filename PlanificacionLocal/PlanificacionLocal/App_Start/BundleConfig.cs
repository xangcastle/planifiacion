using System.Web;
using System.Web.Optimization;

namespace PlanificacionLocal
{
    public class BundleConfig
    {

        // Para obtener más información sobre las uniones, consulte http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // preparado para la producción y podrá utilizar la herramienta de compilación disponible en http://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap-datepicker.js",
                      "~/Scripts/js/jquery-dlmenu.js",
                      "~/Scripts/respond.js"
                      ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/menu.css",
                      //"~/Content/Utileria/IconStyle.css",
                      //"~/Content/Utileria/IconStyle1.css",
                      "~/Content/Utileria/recuadros.css",
                      "~/Content/css.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            /******************************Estilos de los catalogos************************************/

            bundles.Add(new StyleBundle("~/Content/EstiloDetail").Include(
                     "~/Content/Utileria/EstiloDetalle.css"));

            bundles.Add(new StyleBundle("~/Content/PanelLocal").Include(
                      "~/Content/Utileria/Local.css",
                      "~/Content/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Content/PanelPrincipal").Include(
                    "~/Content/Utileria/TituloCatalogo.css",
                    "~/Content/Utileria/Local.css",
                       "~/Content/Utileria/recuadros.css",
                    "~/Content/Utileria/webgrid.css"
                ));

            bundles.Add(new StyleBundle("~/Content/EstiloLoc").Include(
                       "~/Content/Utileria/TituloCatalogo.css",
                       "~/Content/Utileria/Local.css",
                       "~/Content/Utileria/recuadros.css",
                       "~/Content/Utileria/estilo_webgrid.css"));

        }
    }
}

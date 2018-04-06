using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PlanificacionLocal.Reportes
{
    public partial class ReporteCatalogo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                String Reporte = "/PlanifLocal/"+ Request.QueryString["Reporte"];
                RVCatalogo.ServerReport.ReportPath= Reporte;
                RVCatalogo.ServerReport.ReportServerUrl = new Uri(WebConfigurationManager.AppSettings["ReportServerUrl"]);
                EstablecerParametros();
                
                RVCatalogo.ServerReport.Refresh();               

            }
            RenderizarReportePDF();
        }
        public void RenderizarReportePDF()
        {
            Response.ContentType = "Application/pdf; charset=UTF-8";
            Response.BinaryWrite(RVCatalogo.ServerReport.Render("PDF"));
            Response.End();

        }

        public void DisableUnwantedExportFormat(ReportViewer ReportViewerID, List<string> strFormatName)
        {
            FieldInfo info;
            foreach (RenderingExtension extension in ReportViewerID.ServerReport.ListRenderingExtensions())
            {
                if (!strFormatName.Contains(extension.Name.Trim().ToUpper()) && extension.Visible == true)
                {
                    info = extension.GetType().GetField("m_isVisible", BindingFlags.Instance | BindingFlags.NonPublic);
                    info.SetValue(extension, false);
                }
            }

        }

        public void EstablecerParametros()
        {
            try
            {
                List<ReportParameter> Parametros = new List<ReportParameter>();

                switch (Request.QueryString["Reporte"])
                {
                    case "ActividadXTpo": 
                        Parametros.Add(new ReportParameter("Desde", Request.QueryString["Desde"]));
                        Parametros.Add(new ReportParameter("Hasta", Request.QueryString["Hasta"]));
                        Parametros.Add(new ReportParameter("Tipo", Request.QueryString["Tipo"]));
                        RVCatalogo.ServerReport.SetParameters(Parametros);
                        break;
                    case "FrecuenciaPrestamo":  
                        Parametros.Add(new ReportParameter("Desde", Request.QueryString["Desde"]));
                        Parametros.Add(new ReportParameter("Hasta", Request.QueryString["Hasta"]));
                        Parametros.Add(new ReportParameter("IdLoc", Request.QueryString["Cod"]));
                        RVCatalogo.ServerReport.SetParameters(Parametros);
                        break;
                    case "HoraConsumoLocal":
                        Parametros.Add(new ReportParameter("Desde", Request.QueryString["Desde"]));
                        Parametros.Add(new ReportParameter("Hasta", Request.QueryString["Hasta"]));
                        Parametros.Add(new ReportParameter("IDLocal", Request.QueryString["Cod"]));
                        RVCatalogo.ServerReport.SetParameters(Parametros);
                        break;
                    case "ListaDeTiposLoca":
                        break;
                    case "ListaDeUnidades":
                        break;
                    case "ListaLocales":
                        break;
                    case "ListaTiposActividad":
                        break;
                }

            }
            catch (Exception)
            {
                 Response.Close();
            }

        }

        protected void RVCatalogo_PreRender(object sender, EventArgs e)
        {
            List<string> ExportacionPermitida = new List<string>();
            switch (Request.QueryString["Reporte"])
            {
                case "HoraConsumoLocal":
                case "FrecuenciaPrestamo":
                case "ActividadXTpo":
                case "ListaDeTiposLoca":
                case "ListaDeUnidades":
                case "ListaLocales":
                case "ListaTiposActividad":
                    ExportacionPermitida.Add("PDF");
                    break;
            }
            if (ExportacionPermitida.Count > 0) { DisableUnwantedExportFormat((ReportViewer)sender, ExportacionPermitida); }
        }

    }
}
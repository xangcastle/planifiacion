<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteCatalogo.aspx.cs" Inherits="PlanificacionLocal.Reportes.ReporteCatalogo" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
     <title>Informe</title>
    <script src="../Scripts/jquery-1.8.2.js"></script>
    <script src="../Scripts/BotonImpresionReportes.js"></script>
    <link href="../Content/Utileria/ModalImprimirReporte.css" rel="stylesheet" />
    <style>
        .TituloGeneralAspx {
            margin-top: 5px;
            text-align: center;
            /*color: rgb(255, 255, 255); */
            color: rgb(89, 146, 160);
            text-decoration: underline;
        }

        .btnClass {
            width: 100px;
            padding-left: 25px;
            background-repeat: no-repeat;
            background-position: 2px 2px;
            height: 30px;
            font-weight: bold;
            border-radius: 5px;
            font-size: 13px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            border: 1px solid gray;
            cursor: pointer;
        }

        a.back_portal {
            display:block;
            background-color: #558FC0;
            background-image: url('home1.png');
            background-repeat: no-repeat;
            background-position: 5px 2px;
            border: 1px solid #808080;
            color: #EDEDED;
            font: 600 17px Arial;
            padding: 10px 15px;
            margin: 20px auto 0px auto;
            text-decoration: none;
            text-align: right;
            width: 185px;
        }
        .back_portal:hover {
            background-color: #5D9ACF;
        }
        a.back_portal:active {
            background-color: #417DB0;
        }
    </style>
</head>
<body>
    <h1 class="TituloGeneralAspx">VISOR DE REPORTES 
        <br/>
        <input type="button" value="Cerrar" style="background-image: url('../Content/Images/cerrar.png');" class="btnClass" onclick="window.close()"/>
    </h1> 
    <form id="frmReportViewer" target="IframeReporte" runat="server">
        <script type="text/javascript">
            $(document).ready(function () {
                $("#RVCatalogo table").css("margin", " 0 auto");
                $("RVCatalogo_fixedTable").css("margin", "0 auto");
            });
        </script>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
    <div id="reportContent">        
        <rsweb:ReportViewer ID="RVCatalogo" runat="server" Width="706px" ProcessingMode="Remote" ZoomMode="PageWidth" SizeToReportContent="True" PageCountMode="Actual" ExportContentDisposition="AlwaysInline" OnPreRender="RVCatalogo_PreRender">
        </rsweb:ReportViewer>
    
    </div>
    </form>
</body>
</html>

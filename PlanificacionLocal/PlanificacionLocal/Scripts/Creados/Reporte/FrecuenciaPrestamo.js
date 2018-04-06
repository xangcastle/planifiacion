function ImprimirFrecuenciaPrestamo() {
    if ($("#DesdeId").val() != "" && $("#HastaId").val() != "" && $("#LocalId").val() != null) {
        var n = ObtenerRaiz() + "~/Reportes/ReporteCatalogo.aspx?Reporte=FrecuenciaPrestamo&Desde='" + $("#DesdeId").val() + "'&Hasta='" + $("#HastaId").val() + "'&IdLoc='" + $("#LocalId").val() + "'";
        $("#frmFrecuenciaPrestamo").attr("action", n),
		$("#frmFrecuenciaPrestamo").submit
    } else {

    }
    //} else setTimeout("escribMsj('Por favor complete toda la información solicitada.','',4,'" + $("#url").val() + "')", 0)
}

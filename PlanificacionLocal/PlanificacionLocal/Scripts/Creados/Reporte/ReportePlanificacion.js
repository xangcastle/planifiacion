var glob_root;

$(function () { cargaInicial(); });

function cargaInicial()
{
    var Path = location.host;
    if (Path.indexOf("localhost") >= 0 && Path.indexOf(":") >= 0) { glob_root = ''; }
    else { var pathname = window.location.pathname; var VirtualDir = pathname.split('/'); glob_root = VirtualDir[1]; glob_root = '/' + glob_root; }
    $('input').keypress(function (e) { if (e.which == 13) { return false; } });
    $(document).on("keydown", function (e) { if (e.which === 8 && !$(e.target).is("input")) { e.preventDefault(); } });
};

$(document).ready(function () {
    $("#Desde").datepicker();
    $("#Hasta").datepicker();
    $("#Desde").attr('readonly', 'readonly');
    $("#Hasta").attr('readonly', 'readonly');
    $("#ContenedorBloqueo").fadeIn('slow');
    ObtenerLocales();
    ObtenerTipo();
});

function ObtenerLocales() {    
    var url = glob_root + '/Informes/ObtenerLocal';
    $.get(url, {},function (data) {
        $('#LocalId').empty();
        var html = "";
        html += "<option value='0' >-Seleccione-</option>";
        for (var i = 0; i < data.length; i++) {
            html += "<option value='" + data[i].Id + "' >" + data[i].Descripcion + "</option>";
        }
        $("#ContenedorBloqueo").fadeOut('slow');
        $('#LocalId').html(html);
    });
}

function ObtenerTipo() {
    var url = glob_root +'/Informes/ObtenerTipoActividad';
    $.get(url, {}, function (data) {
        $('#TipoActividadId').empty();
        var html = "";
        html += "<option value='0' >-Seleccione-</option>";
        for (var i = 0; i < data.length; i++) {
            html += "<option value='" + data[i].Id + "' >" + data[i].Descripcion + "</option>";
        }
        $("#ContenedorBloqueo").fadeOut('slow');
        $('#TipoActividadId').html(html);
    });
}

function ImprimirConsumoHrsLocal() {
    LoadPage();
    if ($("#Desde").val() == "" || $("#Hasta").val() == "" || ($("#LocalId").val() == "" || $("#LocalId").val() == "0")) {
        $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Por favor complete toda la información solicitada.!' });
    }
    else {
        var n = ObtenerRaiz() + "/Reportes/ReporteCatalogo.aspx?Reporte=HoraConsumoLocal&Desde=" + $("#Desde").val() + "&Hasta=" + $("#Hasta").val() + "&Cod=" + $("#LocalId").val() + "";
        $("#frmHorasConsumo").attr("action", n),
		$("#frmHorasConsumo").submit()        
    }
}

function ImprimirFrecuenciaPrestamo() {
    LoadPage();
    if ($("#Desde").val() == "" || $("#Hasta").val() == "" || ($("#LocalId").val() ==  "" || $("#LocalId").val() == "0")) {

        $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Por favor complete toda la información solicitada.!' });

    }
    else {
        var n = ObtenerRaiz() + "/Reportes/ReporteCatalogo.aspx?Reporte=FrecuenciaPrestamo&Desde=" + $("#Desde").val() + "&Hasta=" + $("#Hasta").val() + "&Cod=" + $("#LocalId").val() + "";
        $("#frmFrecuenciaPrestamo").attr("action", n),
		$("#frmFrecuenciaPrestamo").submit()
    }
}

function ImprimirActXTipo() {
    LoadPage();
    if ($("#Desde").val() == "" || $("#Hasta").val() == "" || ($("#TipoActividadId").val() == "" || $("#TipoActividadId").val() == "0")) {
        $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Por favor complete toda la información solicitada.!' });
    }
    else {       
        var n = ObtenerRaiz() + "/Reportes/ReporteCatalogo.aspx?Reporte=ActividadXTpo&Desde=" + $("#Desde").val() + "&Hasta=" + $("#Hasta").val() + "&Tipo=" + $("#TipoActividadId").val() + "";
        $("#frmActividadxTipo").attr("action", n),
		$("#frmActividadxTipo").submit()
    }
}

function LoadPage() {
    $('.mensaje_esperar').frm();
    $('.mensajes_anunciar').frm({
        titulo: 'Información',
        tipoModal: 'mensaje',
        onOk: function () { $('.mensajes_anunciar').frm('ocultar'); },
        onClose: function () { $('.mensajes_anunciar').frm('ocultar'); }
    });
    $('.mensajes_confirmar').frm({
        titulo: 'Información',
        tipoModal: 'confirmar',
        onOk: function (accion) {
            $('.mensajes_confirmar').frm('ocultar');
        },
        onClose: function () { $('.mensajes_confirmar').frm('ocultar'); },

    });
    setTimeout(function () { $(".frm_ok"); }, 500);
    $(document).on('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 27) { e.preventDefault(); }
    });
}
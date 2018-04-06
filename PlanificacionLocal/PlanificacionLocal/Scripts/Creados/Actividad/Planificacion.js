$(document).ready(function () {

    $("#HInicio").attr('readonly', 'readonly');

    $("#HFin").attr('readonly', 'readonly');    
    
    $("#ModAct").on('click', function (e) {
        e.preventDefault();
        $("#myModalLabelId").empty();
        LoadPage1();
        var hI = new Date("01/01/1990" + " " + $("#HInicio").val());
        var hF = new Date("01/01/1990" + " " + $("#HFin").val());
               

        if ($("input[id=All]:checked").is(":checked")) {

            if ($("#CapLocId").val() == 0) {
                return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Para agregar la actividad la capacidad del local debe ser mayor que 0!.' });
            }
            if (hI.getHours() == hF.getHours() && hI.getMinutes() == hF.getMinutes()) {
                return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La hora inicio no deben ser  igual a la hora fin!.' });
            }
            if ((hI.getHours() > hF.getHours()) || (hI.getHours() == hF.getHours() && hI.getMinutes() > hF.getMinutes())) {
                return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe comenzar despues que la hora fin, favor verifique e intente nuevamente.' });
            } else {
                if ((((((($("#HInicio").val()) == "11:30 PM")))

                || ((($("#HInicio").val()) == "12:00 AM") || ((($("#HInicio").val()) == "12:30 AM")))

                || ((($("#HInicio").val()) == "01:00 AM" || $("#HInicio").val()) == "1:00 AM") || ((($("#HInicio").val()) == "01:30 AM" || ($("#HInicio").val()) == "1:30 AM")))

                || ((($("#HInicio").val()) == "02:00 AM" || ($("#HInicio").val()) == "2:00 AM") || ((($("#HInicio").val()) == "02:30 AM" || ($("#HInicio").val()) == "2:30 AM")))

                || ((($("#HInicio").val()) == "03:00 AM" || ($("#HInicio").val()) == "3:00 AM") || ((($("#HInicio").val()) == "03:30 AM" || ($("#HInicio").val()) == "3:30 AM")))

                || ((($("#HInicio").val()) == "04:00 AM" || ($("#HInicio").val()) == "4:00 AM") || ((($("#HInicio").val()) == "04:30 AM" || ($("#HInicio").val()) == "4:30 AM")))

                || ((($("#HInicio").val()) == "05:00 AM" || ($("#HInicio").val()) == "5:00 AM") || ((($("#HInicio").val()) == "05:30 AM" || ($("#HInicio").val()) == "5:30 AM"))))

                && ((((($("#HFin").val()) == "11:30 PM")))

                || ((($("#HFin").val()) == "12:00 AM") || ((($("#HFin").val()) == "12:30 AM")))

                || ((($("#HFin").val()) == "01:00 AM" || ($("#HFin").val()) == "1:00 AM") || ((($("#HFin").val()) == "01:30 AM" || ($("#HFin").val()) == "01:30 AM")))

                || ((($("#HFin").val()) == "02:00 AM" || ($("#HFin").val()) == "2:00 AM") || ((($("#HFin").val()) == "02:30 AM" || ($("#HFin").val()) == "2:30 AM")))

                || ((($("#HFin").val()) == "03:00 AM" || ($("#HFin").val()) == "3:00 AM") || ((($("#HFin").val()) == "03:30 AM" || ($("#HFin").val()) == "3:30 AM")))

                || ((($("#HFin").val()) == "04:00 AM" || ($("#HFin").val()) == "4:00 AM") || ((($("#HFin").val()) == "04:30 AM" || ($("#HFin").val()) == "4:30 AM")))

                || ((($("#HFin").val()) == "05:00 AM" || ($("#HFin").val()) == "5:00 AM") || ((($("#HFin").val()) == "05:30 AM" || ($("#HFin").val()) == "5:30 AM"))))) {
                    return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Inicio:' + $("#HInicio").val() + ' y la Hora Fin: ' + $("#HFin").val() + ' espesificadas,<br/> no es laboral favor verifique e intente nuevamente!.' });
                }
                else {

                    if (((((($("#HInicio").val()) == "11:30 PM")))

                        || ((($("#HInicio").val()) == "12:00 AM") || ((($("#HInicio").val()) == "12:30 AM")))

                        || ((($("#HInicio").val()) == "01:00 AM" || ($("#HInicio").val()) == "1:00 AM") || ((($("#HInicio").val()) == "01:30 AM" || ($("#HInicio").val()) == "1:30 AM")))

                        || ((($("#HInicio").val()) == "02:00 AM" || ($("#HInicio").val()) == "2:00 AM") || ((($("#HInicio").val()) == "02:30 AM" || ($("#HInicio").val()) == "2:30 AM")))

                        || ((($("#HInicio").val()) == "03:00 AM" || ($("#HInicio").val()) == "3:00 AM") || ((($("#HInicio").val()) == "03:30 AM" || ($("#HInicio").val()) == "3:30 AM")))

                        || ((($("#HInicio").val()) == "04:00 AM" || ($("#HInicio").val()) == "4:00 AM") || ((($("#HInicio").val()) == "04:30 AM" || ($("#HInicio").val()) == "4:30 AM")))

                        || ((($("#HInicio").val()) == "05:00 AM" || ($("#HInicio").val()) == "5:00 AM") || ((($("#HInicio").val()) == "05:30 AM" || ($("#HInicio").val()) == "5:30 AM"))))) {
                        return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Inicio:' + $("#HInicio").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                    }
                    else {
                        if (((((($("#HFin").val()) == "11:30 PM")))

                                    || ((($("#HFin").val()) == "12:00 AM") || ((($("#HFin").val()) == "12:30 AM")))

                                    || ((($("#HFin").val()) == "01:00 AM" || ($("#HFin").val()) == "1:00 AM") || ((($("#HFin").val()) == "01:30 AM" || ($("#HFin").val()) == "1:30 AM")))

                                    || ((($("#HFin").val()) == "02:00 AM" || ($("#HFin").val()) == "2:00 AM") || ((($("#HFin").val()) == "02:30 AM" || ($("#HFin").val()) == "2:30 AM")))

                                    || ((($("#HFin").val()) == "03:00 AM" || ($("#HFin").val()) == "3:00 AM") || ((($("#HFin").val()) == "03:30 AM" || ($("#HFin").val()) == "3:30 AM")))

                                    || ((($("#HFin").val()) == "04:00 AM" || ($("#HFin").val()) == "4:00 AM") || ((($("#HFin").val()) == "04:30 AM" || ($("#HFin").val()) == "4:30 AM")))

                                    || ((($("#HFin").val()) == "05:00 AM" || ($("#HFin").val()) == "5:00 AM") || ((($("#HFin").val()) == "05:30 AM" || ($("#HFin").val()) == "5:30 AM"))))) {
                            return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Fin:' + $("#HFin").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                        } else {
                            if ($("#CapLocId").val() > 0) {
                                $.ajax({
                                    type: "GET",
                                    dataType: "html",
                                    url: "ModificacionActividadView",
                                    success: function (n) {
                                        $("#CuerpoModalView").html(n),
                                        $("#AddAct").modal('show')
                                    },
                                    error: function (n) {
                                        n.status == 401 ? MensajePermisos() : MensajeErrorAjax()
                                    }
                                })
                            }
                        }
                    }
                }
            }
            
        } else {
            $('#HInicio').val('8:00 AM');
            $('#HFin').val('12:00 PM');
            $.ajax({
                type: "GET",
                dataType: "html",
                url: "ModificacionActividadView",
                success: function (n) {
                    $("#CuerpoModalView").html(n),
                    $("#AddAct").modal('show')
                },
                error: function (n) {
                    n.status == 401 ? MensajePermisos() : MensajeErrorAjax()
                }
            })
        }

    });          

    $("#Descripcion,#TipoActividadId,#UnidadId,#LocalId").change(function () {
        limpiar($(this).attr("id"));
    });

});

function RegistroNuevo() {
    $("#oHorarios").addClass('ocultar');
    LoadPage1();
    var hI = new Date("01/01/1990" + " " + $("#HInicio").val());
    var hF = new Date("01/01/1990" + " " + $("#HFin").val());

    if ($("#CapLocId").val() == 0) {
        return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Para agregar la actividad la capacidad del local debe ser mayor que 0!.' });
    }

    if (hI.getHours() == hF.getHours() && hI.getMinutes() == hF.getMinutes()) {
        return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La hora inicio no deben ser  igual a la hora fin!.' });
    }

    if (!$("input[id=All]:checked").is(":checked")) {
        return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Debe seleccionar almenos una fecha para agregar a la actividad!.' });
    }

    if ((hI.getHours() > hF.getHours()) || (hI.getHours() == hF.getHours() && hI.getMinutes() > hF.getMinutes())) {
        return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe comenzar despues que la hora fin, favor verifique e intente nuevamente.' });
    } else {
        if ((((((($("#HInicio").val()) == "11:30 PM")))

        || ((($("#HInicio").val()) == "12:00 AM") || ((($("#HInicio").val()) == "12:30 AM")))

        || ((($("#HInicio").val()) == "01:00 AM" || $("#HInicio").val()) == "1:00 AM") || ((($("#HInicio").val()) == "01:30 AM" || ($("#HInicio").val()) == "1:30 AM")))

        || ((($("#HInicio").val()) == "02:00 AM" || ($("#HInicio").val()) == "2:00 AM") || ((($("#HInicio").val()) == "02:30 AM" || ($("#HInicio").val()) == "2:30 AM")))

        || ((($("#HInicio").val()) == "03:00 AM" || ($("#HInicio").val()) == "3:00 AM") || ((($("#HInicio").val()) == "03:30 AM" || ($("#HInicio").val()) == "3:30 AM")))

        || ((($("#HInicio").val()) == "04:00 AM" || ($("#HInicio").val()) == "4:00 AM") || ((($("#HInicio").val()) == "04:30 AM" || ($("#HInicio").val()) == "4:30 AM")))

        || ((($("#HInicio").val()) == "05:00 AM" || ($("#HInicio").val()) == "5:00 AM") || ((($("#HInicio").val()) == "05:30 AM" || ($("#HInicio").val()) == "5:30 AM"))))

        && ((((($("#HFin").val()) == "11:30 PM")))

        || ((($("#HFin").val()) == "12:00 AM") || ((($("#HFin").val()) == "12:30 AM")))

        || ((($("#HFin").val()) == "01:00 AM" || ($("#HFin").val()) == "1:00 AM") || ((($("#HFin").val()) == "01:30 AM" || ($("#HFin").val()) == "01:30 AM")))

        || ((($("#HFin").val()) == "02:00 AM" || ($("#HFin").val()) == "2:00 AM") || ((($("#HFin").val()) == "02:30 AM" || ($("#HFin").val()) == "2:30 AM")))

        || ((($("#HFin").val()) == "03:00 AM" || ($("#HFin").val()) == "3:00 AM") || ((($("#HFin").val()) == "03:30 AM" || ($("#HFin").val()) == "3:30 AM")))

        || ((($("#HFin").val()) == "04:00 AM" || ($("#HFin").val()) == "4:00 AM") || ((($("#HFin").val()) == "04:30 AM" || ($("#HFin").val()) == "4:30 AM")))

        || ((($("#HFin").val()) == "05:00 AM" || ($("#HFin").val()) == "5:00 AM") || ((($("#HFin").val()) == "05:30 AM" || ($("#HFin").val()) == "5:30 AM"))))) {
            return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Inicio:' + $("#HInicio").val() + ' y la Hora Fin: ' + $("#HFin").val() + ' espesificadas,<br/> no es laboral favor verifique e intente nuevamente!.' });
        }
        else {

            if (((((($("#HInicio").val()) == "11:30 PM")))

                || ((($("#HInicio").val()) == "12:00 AM") || ((($("#HInicio").val()) == "12:30 AM")))

                || ((($("#HInicio").val()) == "01:00 AM" || ($("#HInicio").val()) == "1:00 AM") || ((($("#HInicio").val()) == "01:30 AM" || ($("#HInicio").val()) == "1:30 AM")))

                || ((($("#HInicio").val()) == "02:00 AM" || ($("#HInicio").val()) == "2:00 AM") || ((($("#HInicio").val()) == "02:30 AM" || ($("#HInicio").val()) == "2:30 AM")))

                || ((($("#HInicio").val()) == "03:00 AM" || ($("#HInicio").val()) == "3:00 AM") || ((($("#HInicio").val()) == "03:30 AM" || ($("#HInicio").val()) == "3:30 AM")))

                || ((($("#HInicio").val()) == "04:00 AM" || ($("#HInicio").val()) == "4:00 AM") || ((($("#HInicio").val()) == "04:30 AM" || ($("#HInicio").val()) == "4:30 AM")))

                || ((($("#HInicio").val()) == "05:00 AM" || ($("#HInicio").val()) == "5:00 AM") || ((($("#HInicio").val()) == "05:30 AM" || ($("#HInicio").val()) == "5:30 AM"))))) {
                return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Inicio:' + $("#HInicio").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
            }
            else {
                if (((((($("#HFin").val()) == "11:30 PM")))

                            || ((($("#HFin").val()) == "12:00 AM") || ((($("#HFin").val()) == "12:30 AM")))

                            || ((($("#HFin").val()) == "01:00 AM" || ($("#HFin").val()) == "1:00 AM") || ((($("#HFin").val()) == "01:30 AM" || ($("#HFin").val()) == "1:30 AM")))

                            || ((($("#HFin").val()) == "02:00 AM" || ($("#HFin").val()) == "2:00 AM") || ((($("#HFin").val()) == "02:30 AM" || ($("#HFin").val()) == "2:30 AM")))

                            || ((($("#HFin").val()) == "03:00 AM" || ($("#HFin").val()) == "3:00 AM") || ((($("#HFin").val()) == "03:30 AM" || ($("#HFin").val()) == "3:30 AM")))

                            || ((($("#HFin").val()) == "04:00 AM" || ($("#HFin").val()) == "4:00 AM") || ((($("#HFin").val()) == "04:30 AM" || ($("#HFin").val()) == "4:30 AM")))

                            || ((($("#HFin").val()) == "05:00 AM" || ($("#HFin").val()) == "5:00 AM") || ((($("#HFin").val()) == "05:30 AM" || ($("#HFin").val()) == "5:30 AM"))))) {
                    return $('.mensajes_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'La Hora Fin:' + $("#HFin").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                } else {
                    if ($("#CapLocId").val() > 0) {
                        $("#myModalLabelId").empty();
                        $.ajax({
                            type: "GET",
                            dataType: "html",
                            url: "RegistroActividad",
                            success: function (n) {
                                $("#CuerpoModal").html(n),
                                AddNewAct(),
                                addAllCheckedDateAgr(),
                                InicializaControles(),
                                $("#myModal").modal('show')
                            },
                            error: function (n) {
                                n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
                            }
                        })
                    }
                }
            }
        }
    }
}

function MensajeErrorAjax() {
    MSJInfo();
    InicializaCalendario(),
    $(".loading_body").fadeOut(300),
	$(".contenedor_cargando").fadeOut(300),
	setTimeout($('.mensajep_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'No se pudo completar su operación, por favor inténtelo más tarde.' }), 200)
}

function MensajePermisos() {
    MSJInfo();
    InicializaCalendario(),
    $(".loading_body").fadeOut(300),
	$(".contenedor_cargando").fadeOut(300),
	setTimeout($('.mensajep_anunciar').frm('mostrar', { ancho: '500px', mensaje_html: 'No cuenta con los permisos necesarios para realizar la operación.' }), 200)
}

function MsjPermisos() {
    MSJInfoLoad();
    $('.mensajesp_anunciarVal').frm('mostrar', { ancho: '500px', mensaje_html: 'No cuenta con los permisos necesarios para realizar esta operación.' });
}

function MsjErrorDePeticion() {
    MSJInfoLoad();
    $('.mensajesp_anunciarVal').frm('mostrar', { ancho: '500px', mensaje_html: 'No se pudo completar su operación, por favor inténtelo más tarde.' });
}

function MSJInfoLoad() {
    $('.mensajesp_anunciarVal').frm({
        titulo: 'Error',
        tipoModal: 'mensaje',
        onOk: function () { $('.mensajesp_anunciarVal').frm('ocultar'); },
        onClose: function () { $('.mensajesp_anunciarVal').frm('ocultar'); }
    });
}

function GrabarActividad() {

    var IDLOC = "";
    var FREAL = "";
    var HINI = "";
    var HFIN = "";

    var IDLOCS = new Array();
    var FREALS = new Array();
    var HINIS = new Array();
    var HFINS = new Array();
    var i = 0;

    $('.info-detalle').each(function () {
        IDLOC = $(this).attr('data-idloc');
        FREAL = $(this).attr('data-frealizacion');
        HINI = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hinicio');
        HFIN = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hfin');

        if (FREAL != undefined) {
            IDLOCS[i] = IDLOC;
            FREALS[i] = FREAL;
            HINIS[i] = HINI;
            HFINS[i] = HFIN;
        }
        i++;
    });

    var data = {
        Descripcion: $('#Descripcion').val(),
        TipoActividadId: $('#TipoActividadId').val(),
        UnidadId: $('#UnidadId').val()
    };

    $.ajax({
        type: "POST",
        url: 'GrabarActividad',
        dataType: 'json',
        data: { Act: data, fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS), IdLoc: JSON.stringify(IDLOCS) },
        beforeSend: function () {
            $('.mensaje_esperar1').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando Actividad ...' });
        },
        success: function (e) {
            if (e.result == 'errorDsc') {
                $('.mensaje_esperar1').frm('ocultar');
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error el titulo de la actividad ya existe, favor verifique e intente nuevamente!.' });
                $("#modal-HorariosChocantes").addClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').addClass('loading');
                $("span[data-valmsg-for=Descripcion]").each(function () {

                    $(this).removeClass("field-validation-valid");
                    $(this).addClass("field-validation-error");
                    $(this).html("El titulo de la actividad ya existe");
                });

            } else {
                if (e.result == 'success') {
                    $('#calendar').fullCalendar('destroy');
                    $('.mensaje_esperar1').frm('ocultar');
                    $("#ContenedorBloqueo").fadeIn('slow');
                    var LocalActual = $("#LocActualId").val();
                    ObtenerActividad(LocalActual);
                    $('#myModal').modal('hide');

                } else {
                    $('.mensaje_esperar1').frm('ocultar');
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error no se puede(n) registrar la(s) actividad(es) devido a los siguientes horaio(s) que se listar&aacute;n para su verificaci&oacute;n<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                    $("#modal-HorariosChocantes").removeClass('ocultar');
                    $("#ListaActividadExistentes > tbody").empty();
                    $('#HorariosVerificaicon').addClass('loading');

                    for (var i = 0, len = e.results.length; i < len; i++) {
                        var dato = e.results[i];
                        var html = "";

                        html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                        $('#HorariosVerificaicon').removeClass('loading');
                        $("#ListaActividadExistentes > tbody").append(html);
                    }
                }
            }
        },
        error: function (e) {
            $('.mensaje_esperar1').frm('ocultar');
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function GrabarModificacionActividad() {

    var IDLOC = "";
    var IDACT = "";
    var IDDETAACT = "";
    var FREAL = "";
    var HINI = "";
    var HFIN = "";

    var IDLOCS = new Array();
    var IDACTS = new Array();
    var IDDETAACTS = new Array();
    var FREALS = new Array();
    var HINIS = new Array();
    var HFINS = new Array();
    var i = 0;

    $(".info-detalle").each(function () {
        IDLOC = $(this).attr('data-idloc');
        IDACT = $(this).attr('data-idact');
        IDDETAACT = $(this).attr('data-iddeta');
        FREAL = $(this).attr('data-frealizacion');
        HINI = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hinicio');
        HFIN = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hfin');

        if (FREAL != undefined) {
            IDLOCS[i] = IDLOC;
            IDACTS[i] = IDACT;
            IDDETAACTS[i] = IDDETAACT;
            FREALS[i] = FREAL;
            HINIS[i] = HINI;
            HFINS[i] = HFIN;
        }
        i++;
    });
    var data = {
        Id: $("#AId").val(),
        Descripcion: $('#Descripcion').val(),
        TipoActividadId: $('#TipoActividadId').val(),
        UnidadId: $('#UnidadId').val()
    };

    $.ajax({
        type: "POST",
        url: 'ModificarActividad',
        dataType: 'json',
        data: {
            Act: data, fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS),
            idAct: JSON.stringify(IDACTS), IdLoc: JSON.stringify(IDLOCS), ids: JSON.stringify(IDDETAACTS)
        },
        beforeSend: function () {
            $('.mensaje_esperar1').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando modificación ...' });
        },
        success: function (e) {
            if (e.result == 'errorDsc') {
                $('.mensaje_esperar1').frm('ocultar');
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error el titulo de la actividad ya existe, favor verifique e intente nuevamente!.' });
                $("#modal-HorariosChocantes").addClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').addClass('loading');
                $("span[data-valmsg-for=Descripcion]").each(function () {

                    $(this).removeClass("field-validation-valid");
                    $(this).addClass("field-validation-error");
                    $(this).html("El titulo de la actividad ya existe");
                });
            } else {
                if (e.result == 'success') {

                    $('#calendar').fullCalendar('destroy');
                    $('.mensaje_esperar1').frm('ocultar');
                    $("#ContenedorBloqueo").fadeIn('slow');
                    var LocalActual = $("#LocActualId").val();
                    ObtenerActividad(LocalActual);
                    $('#myModal').modal('hide');

                } else {
                    $('.mensaje_esperar1').frm('ocultar');
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error no se puede(n) registrar la(s) actividad(es) devido a los siguientes horaio(s) que se listar&aacute;n para su verificaci&oacute;n<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                    $("#modal-HorariosChocantes").removeClass('ocultar');
                    $("#ListaActividadExistentes > tbody").empty();
                    $('#HorariosVerificaicon').addClass('loading');

                    for (var i = 0, len = e.results.length; i < len; i++) {
                        var dato = e.results[i];
                        var html = "";

                        html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                        $('#HorariosVerificaicon').removeClass('loading');
                        $("#ListaActividadExistentes > tbody").append(html);
                    }
                }
            }
        },
        error: function (n) {
            $('.mensaje_esperar1').frm('ocultar');
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function GrabarModificacion() {

    var IDLOC = "";
    var IDACT = "";
    var IDDETAACT = "";
    var FREAL = "";
    var HINI = "";
    var HFIN = "";

    var IDLOCS = new Array();
    var IDACTS = new Array();
    var IDDETAACTS = new Array();
    var FREALS = new Array();
    var HINIS = new Array();
    var HFINS = new Array();
    var i = 0;

    $(".info-detalle").each(function () {
        IDLOC = $(this).attr('data-idloc');
        IDACT = $(this).attr('data-idact');
        IDDETAACT = $(this).attr('data-iddeta');
        FREAL = $(this).attr('data-frealizacion');
        HINI = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hinicio');
        HFIN = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hfin');

        if (FREAL != undefined) {
            IDLOCS[i] = IDLOC;
            IDACTS[i] = IDACT;
            IDDETAACTS[i] = IDDETAACT;
            FREALS[i] = FREAL;
            HINIS[i] = HINI;
            HFINS[i] = HFIN;
        }
        i++;
    });
    var data = {
        Id: $("#AId").val(),
        Descripcion: $('#DescripcionAct').text().trim(),
        TipoActividadId: $('#TipoActividadId').val(),
        UnidadId: $('#UnidadId').val()
    };

    $.ajax({
        type: "POST",
        url: 'ModificarActividad',
        dataType: 'json',
        data: {
            Act: data, fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS),
            idAct: JSON.stringify(IDACTS), IdLoc: JSON.stringify(IDLOCS), ids: JSON.stringify(IDDETAACTS)
        },
        beforeSend: function () {
            $('.mensaje_esperar1').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando modificación ...' });
        },
        success: function (e) {
            if (e.result == 'errorDsc') {
                $('.mensaje_esperar1').frm('ocultar');
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error el titulo de la actividad ya existe, favor verifique e intente nuevamente!.' });
                $("#modal-HorariosChocantes").addClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').addClass('loading');
                $("span[data-valmsg-for=Descripcion]").each(function () {

                    $(this).removeClass("field-validation-valid");
                    $(this).addClass("field-validation-error");
                    $(this).html("El titulo de la actividad ya existe");
                });
            } else {
                if (e.result == 'success') {

                    $('#calendar').fullCalendar('destroy');
                    $('.mensaje_esperar1').frm('ocultar');
                    $("#ContenedorBloqueo").fadeIn('slow');
                    var LocalActual = $("#LocActualId").val();
                    ObtenerActividad(LocalActual);
                    $('#myModal').modal('hide');

                } else {
                    $('.mensaje_esperar1').frm('ocultar');
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error no se puede(n) registrar la(s) actividad(es) devido a los siguientes horaio(s) que se listar&aacute;n para su verificaci&oacute;n<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                    $("#modal-HorariosChocantes").removeClass('ocultar');
                    $("#ListaActividadExistentes > tbody").empty();
                    $('#HorariosVerificaicon').addClass('loading');

                    for (var i = 0, len = e.results.length; i < len; i++) {
                        var dato = e.results[i];
                        var html = "";

                        html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                        $('#HorariosVerificaicon').removeClass('loading');
                        $("#ListaActividadExistentes > tbody").append(html);
                    }
                }
            }
        },
        error: function (n) {
            $('.mensaje_esperar1').frm('ocultar');
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function GrabarModSeleccionadad() {
    
    var IDLOC = "";
    var IDACT = "";
    var IDDETAACT = "";
    var FREAL = "";
    var HINI = "";
    var HFIN = "";

    var IDLOCS = new Array();
    var IDACTS = new Array();
    var IDDETAACTS = new Array();
    var FREALS = new Array();
    var HINIS = new Array();
    var HFINS = new Array();
    var i = 0;

    $(".info-detalle").each(function () {

        IDLOC = $(this).attr('data-idloc');
        IDACT = $(this).attr('data-idact');
        IDDETAACT = $(this).attr('data-iddeta');
        FREAL = $(this).attr('data-frealizacion');
        HINI = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hinicio');
        HFIN = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hfin');

        if (FREAL != undefined) {
            IDLOCS[i] = IDLOC;
            IDACTS[i] = IDACT;
            IDDETAACTS[i] = IDDETAACT;
            FREALS[i] = FREAL;
            HINIS[i] = HINI;
            HFINS[i] = HFIN;
        }
        i++;
    });
    var data = {
        UnidadId: $('#UnidadId').val()
    };


    $.ajax({
        type: "POST",
        url: 'ModificarSeleccionada',
        dataType: 'json',
        data: {
            Act: data ,fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS),
            idAct: JSON.stringify(IDACTS), IdLoc: JSON.stringify(IDLOCS), ids: JSON.stringify(IDDETAACTS)
        },
        beforeSend: function () {
            $('.mensaje_esperar1').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando modificación ...' });
        },
        success: function (e) {
           
                if (e.result == 'success') {

                    $('#calendar').fullCalendar('destroy');
                    $('.mensaje_esperar1').frm('ocultar');
                    $("#ContenedorBloqueo").fadeIn('slow');
                    var LocalActual = $("#LocActualId").val();
                    ObtenerActividad(LocalActual);
                    $('#myModal').modal('hide');

                } else {
                    $('.mensaje_esperar1').frm('ocultar');
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error no se puede(n) registrar la(s) actividad(es) devido a los siguientes horaio(s) que se listar&aacute;n para su verificaci&oacute;n<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                    $("#modal-HorariosChocantes").removeClass('ocultar');
                    $("#ListaActividadExistentes > tbody").empty();
                    $('#HorariosVerificaicon').addClass('loading');

                    for (var i = 0, len = e.results.length; i < len; i++) {
                        var dato = e.results[i];
                        var html = "";

                        html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                        $('#HorariosVerificaicon').removeClass('loading');
                        $("#ListaActividadExistentes > tbody").append(html);
                    }
                }
        },
        error: function (n) {
            $('.mensaje_esperar1').frm('ocultar');
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function HorarioValor() {
       
    $('#HInicio').daterangepicker({
        singleDatePicker: true,
        showWeekNumbers:false,
        alwaysShowCalendars:false,
        showDropdowns: false,
        timePicker: true,
        autoApply: true,
        timePickerIncrement: 30,
        locale: {
            format: 'h:mm A'
        },
        minDate: new Date($('#HInicio').val())
    });
    $('#HFin').daterangepicker({
        singleDatePicker: true,
        showWeekNumbers: false,
        alwaysShowCalendars: false,
        showDropdowns: false,
        timePicker: true,
        autoApply: true,
        timePickerIncrement: 30,
        locale: {
            format: 'h:mm A'
        },
        minDate: new Date($('#HFin').val())
    });
}

function CancelarInfoAllId() {
    $("#gridSystemModalLocal").modal('hide');
    $("#myModal").modal('hide');
    $("#gridSystemModalLocalesid").modal('hide');
    $("#gridSystemModalUnidades").modal('hide');
    $("#gridSystemModalActividad").modal('hide');
    $("#AddAct").modal('hide');
    $("#myModalDetaValInfo").modal('hide');
    $("#myModalDeta").modal('hide');

    $('#calendar').fullCalendar('destroy');
    $("#descriplocalid").val("");
    $("#LocActualId").val("");
    $("#HInicio").val("");
    $("#HFin").val("");
    $("#idCap").empty();
    $("#CapLocId").val("");
    $("#AgrAct").attr('disabled', 'disabled');
    $("#ModAct").attr('disabled', 'disabled');
    $("#HInicio").attr('disabled', 'disabled');
    $("#HFin").attr('disabled', 'disabled');
    $('.formulario input[type=checkbox]').prop('checked', false);
    inicializacampos();
    InicializaControles();
    inicializacamposView();
    InicializaCaposDelDEtalle();
}

var idLista = 0;
var idsLst = 0;

InicializaControles();

function InicializaControles() {
    
    idLista = 0;
    idsLst = 0;
    $("#oValFRealizacionId").val("");
    $("#tempHInicio").val("");
    $("#tempHFin").val("");
}

function inicializacampos() {
    $("#modal-HorariosChocantes").addClass('ocultar');    
    $('.formulario input[type=checkbox]').prop('checked', false);
    $("#myModalLabelId").empty();
    $("#DscActLocId").empty();
    $("#TIdAct").val("");
    $("#AId").val("");
    $("#ADId").val("");
    $('#Descripcion').val("");
    $("#DescripActdid").val("");
    $("#ActividadId").val("");
    $('#DescripUnidadid').val("");
    $('#DescripLocalid').val("");
    $('#TipoActividadId').val("");
    $('#UnidadId').val("");
    $('#LocalId').val("");
    $("#modal-HorariosChocantes").addClass('ocultar');
    $("#oValFRealizacionId").addClass('ocultar');
    $("#oHorarios").addClass('ocultar');
    $('#Descripcion').removeAttr('disabled', 'disabled');
    $('#TipoActividadId').removeAttr('disabled', 'disabled');
    $("#myModalLabelId").empty();
    $("#DescripcionTemp").val("");
    $("#TipoTemp").val("");
    $("#UniIdTemp").val("");
    $("#LocIdTemp").val("");
    $("#myModalLabelId").empty();
    $("#Descripcion,#TipoActividadId,#UnidadId,#LocalId").each(function () {
        limpiar($(this).attr("id"));
    });

}

function InicializaCaposDelDEtalle()
{
    $("#DescActInfoId").empty();
    $("#TipoDesctActId").empty();
    $("#FRealDesctActId").empty();
    $("#TempDescDetaActInfoId").empty();
    $("#TempDescActInfoId").empty();
    $("#TempDescLocId").empty();
    $("#TempDescLoc").empty();
}

function MSJInfo() {
    $('.mensajep_anunciar').frm({
        titulo: 'Error',
        tipoModal: 'mensaje',
        onOk: function () { $('.mensajep_anunciar').frm('ocultar'); },
        onClose: function () { $('.mensajep_anunciar').frm('ocultar'); }
    });
}

function LoadPage1() {
    $('.mensaje_esperar1').frm();
    $('.mensajes_anunciar1').frm({
        titulo: 'Información',
        tipoModal: 'mensaje',
        onOk: function () { $('.mensajes_anunciar1').frm('ocultar'); },
        onClose: function () { $('.mensajes_anunciar1').frm('ocultar'); }
    });
    $('.mensajes_confirmar1').frm({
        titulo: 'Información',
        tipoModal: 'confirmar',
        onOk: function (accion) {
            $('.mensajes_confirmar1').frm('ocultar');
        },
        onClose: function () { $('.mensajes_confirmar1').frm('ocultar'); },

    });
    setTimeout(function () { $(".frm_ok"); }, 500);
    $(document).on('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 27) { e.preventDefault(); }
    });
}

function ActAtual(actId) {
    $.ajax({
        type: "GET",
        url: 'ObtenerAct',
        dataType: 'json',
        data: { actId: actId },
        success: function (e) {
            for (var i = 0, len = e.length; i < len; i++) {
                var data = e[i];
                $("#AId").val(data.Id),
                $('#Descripcion').val(data.DescripcionAct),
                $("#TipoActividadId").val(data.TipoActividadId),
                $("#DescripUnidadid").val(data.DescripcionUnidad),
                $("#UnidadId").val(data.UnidadId)              
            }            
        }
    });
}

function VerificaHorarioAgr() {

    LoadPage1();
    var IDLOC = "";
    var IDDETAACT = "";
    var FREAL = "";
    var HINI = "";
    var HFIN = "";

    var FREALS = new Array();
    var HINIS = new Array();
    var HFINS = new Array();
    var IDDETAACTS = new Array();
    var IDLOCS = new Array();
    var i = 0;

    $('.info-detalle').each(function () {
        IDLOC = $(this).attr('data-idloc');
        IDDETAACT = $(this).attr('data-iddeta');
        FREAL = $(this).attr('data-frealizacion');
        HINI = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hinicio');
        HFIN = $(this).attr('data-frealizacion') + " " + $(this).attr('data-hfin');

        if (FREAL != undefined) {
            IDLOCS[i] = IDLOC;
            IDDETAACTS[i] = IDDETAACT;
            FREALS[i] = FREAL;
            HINIS[i] = HINI;
            HFINS[i] = HFIN;
        }
        i++;
    });

    $.ajax({
        type: "GET",
        url: "oVerDetalleArg",
        dataType: 'json',
        data: {
            IdLoc: JSON.stringify(IDLOCS),
            fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS), ids: JSON.stringify(IDDETAACTS)
        },
        success: function (e) {
            if (e.result == 'error') {
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error se encontraron registros en conflicto(s) con el/los horario(s) de la(s) nueva(s) fecha(s) seleccionada(s).<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                $("#modal-HorariosChocantes").removeClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').addClass('loading');

                for (var i = 0, len = e.results.length; i < len; i++) {
                    var dato = e.results[i];
                    var html = "";

                    html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                    $('#HorariosVerificaicon').removeClass('loading');
                    $("#ListaActividadExistentes > tbody").append(html);
                    $('.mensaje_esperar1').frm('ocultar');
                }
            }
        },
        error: function (n) {
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function AddNewAct() {

    $("#myModalLabelId").prepend('Insertar Datos');
    $("#DscActLocId").prepend('Agregar actividad para el local seleccionado');
    $("#btn-Guardar").attr('disabled', 'disabled')

}

function addAllCheckedDateAgr() {
   
    jQuery.fn.getCheckboxValues = function () {
        var values = [];
        var i = 0;
        this.each(function () {
            values[i++] = $(this).val();

        });
        return values;
    }    
       
    $("#ListaActividad > tbody").empty();
    $('#Horario').addClass('loading');
    var HoraI = $("#HInicio").val();
    var HoraFn = $("#HFin").val();
    var cod_id = "-" + Math.floor((Math.random() * 100) + 1);
    $.ajax({
        type: "GET",
        url: "GeneraCodIdAgr",
        dataType: 'json',
        data: {
            IdLoc: $("#LocActualId").val(),
            fReal: JSON.stringify($("input[id=All]:checked").getCheckboxValues()), hIni: $("#HInicio").val(), hFi: $("#HFin").val(), ids: cod_id
        },
        success: function (e) {
            
            if (e.result == 'success') {
                $.each(e.AgrList, function (i, item) {
                   
                    $("#ListaActividad > tbody").append("<tr id='" + item.Id + "' class='Nuevo webgrid-row-style' " +
                                "title='Doble click para seleccionar el horario para modificar'>" +
                                "<td style='padding: 0px;text-align: center;'>" + $("#descriplocalid").val() + "</td>" +
                                "<td style='padding: 0px;text-align: center;'>" + item.FechaRealizacion + "</td>" +
                                "<td style='padding: 0px;text-align: center;'>" + HoraI + "</td>" +
                                "<td style='padding: 0px;text-align: center;'>" + HoraFn + "</td>" +
                                "<td><span style='display:none'>" + "*" + item.Id + "*" + -1 + "*" + item.idLoc + "</span>" +
                                "<span class='info-detalle ocultar' data-idDeta=" + item.Id + " data-idAct='-1' data-idLoc='" +
                                item.idLoc + "' data-FRealizacion='" + item.FechaRealizacion + "' data-Hinicio='" + HoraI +
                                "' data-Hfin='" + HoraFn + "'></span></td></tr>"),

                    $('#Horario').removeClass('loading'),
                     $("#btn-Guardar").removeAttr('disabled', 'disabled')
                });
            } else {
                if (e.result == 'error') {

                    $.each(e.AgrList, function (i, item) {
                      
                        $("#ListaActividad > tbody").append("<tr id='" + item.Id + "' class='Nuevo webgrid-row-style' " +
                                 "title='Doble click para seleccionar el horario para modificar'>" +
                                 "<td style='padding: 0px;text-align: center;'>" + $("#descriplocalid").val() + "</td>" +
                                 "<td style='padding: 0px;text-align: center;'>" + item.FechaRealizacion + "</td>" +
                                 "<td style='padding: 0px;text-align: center;'>" + HoraI + "</td>" +
                                 "<td style='padding: 0px;text-align: center;'>" + HoraFn + "</td>" +
                                 "<td><span style='display:none'>" + "*" + item.Id + "*" + -1 + "*" + item.idLoc + "</span>" +
                                 "<span class='info-detalle ocultar' data-idDeta=" + item.Id + " data-idAct='-1' data-idLoc='" +
                                 item.idLoc + "' data-FRealizacion='" + item.FechaRealizacion + "' data-Hinicio='" + HoraI +
                                 "' data-Hfin='" + HoraFn + "'></span></td></tr>"),

                        $('#Horario').removeClass('loading'),
                        $("#btn-Guardar").removeAttr('disabled', 'disabled')

                    });

                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error se encontraron registros en conflicto(s) con el/los horario(s) de la(s) nueva(s) fecha(s) seleccionada(s).<br/>Nota: Para poder registar la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
                    $("#modal-HorariosChocantes").removeClass('ocultar');
                    $("#ListaActividadExistentes > tbody").empty();
                    $('#HorariosVerificaicon').addClass('loading');

                    for (var i = 0, len = e.results.length; i < len; i++) {
                        var dato = e.results[i];
                        var html = "";

                        html = "<tr class='webgrid-verificacion'><td style='padding: 0px;text-align: center;'><label>" + dato.DescripcionAct + "</label></td><td style='padding: 0px;text-align: center;'><label>" + dato.DescipcionLocal + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.FechaR).format('DD/MM/YYYY') + "</label></td><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Inicia).format('h:mm A') + "</label><td style='padding: 0px;text-align: center;'><label>" + moment(dato.Termina).format('h:mm A') + "</label></td></tr>";
                        $('#HorariosVerificaicon').removeClass('loading');
                        $("#ListaActividadExistentes > tbody").append(html);
                        $('.mensaje_esperar1').frm('ocultar');
                    }
                }
            }
        },
        error: function (n) {
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    });
}

function checkedItem() {

    $('input[name=ActualId]').on('change', function () {
        $('input[name=ActualAllId]').prop('checked', false);
    });
    $('input[name=ActualAllId]').on('change', function () {
        $('input[name=ActualId]').prop('checked', false);
    });

}

function ObtenerActividad(LocalId) {

    $.ajax({
        type: "GET",
        url: 'GetEvent',
        dataType: 'json',
        data: { LocalId: LocalId },
        success: function (e) {
            var eventItems = [];

            for (var i = 0, len = e.length; i < len; i++) {
                var data = e[i];

                var fechaInicio = new Date(moment(data.FechaInicio).format('YYYY/MM/DD, h:mm A'));
                var fechaFin = new Date(moment(data.FechaFin).format('YYYY/MM/DD, h:mm A'));

                eventItems.push({
                    eventId: data.ActividadId,
                    title: data.TipoActividad,
                    oTipoId: data.TipoId,
                    description: data.Descripcion,
                    realizacion: data.FechaRealizacion,
                    idDetaAct: data.idDetalle,
                    DescUnid: data.DescripcionUnidad,
                    oUnidId: data.UnidadId,
                    DescLoc: data.DescripcionLocal,
                    oLocId: data.LocalId,
                    start: fechaInicio,
                    startDate: data.fechaInicio,
                    end: fechaFin,
                    endDate: fechaFin,
                    allDay: false
                });

            }
            InicializaControles();
            inicializacamposView();
            InicializaCaposDelDEtalle();
           
            $('#HInicio').val('8:00 AM');
            $('#HFin').val('12:00 PM');
            $("#ContenedorBloqueo").fadeOut('slow');
            initCalendar(eventItems, 'month');
        }
    });
}

function InicializaCalendario() {
    $('#calendar').fullCalendar('destroy');
    $("#ContenedorBloqueo").fadeIn('slow');
    $.ajax({
        type: "GET",
        url: 'GetEvent',
        dataType: 'json',
        data: { LocalId: $("#LocActualId").val() },
        success: function (e) {
            var eventItems = [];

            for (var i = 0, len = e.length; i < len; i++) {
                var data = e[i];

                var fechaInicio = new Date(moment(data.FechaInicio).format('YYYY/MM/DD, h:mm A'));
                var fechaFin = new Date(moment(data.FechaFin).format('YYYY/MM/DD, h:mm A'));

                eventItems.push({
                    eventId: data.ActividadId,
                    title: data.TipoActividad,
                    oTipoId: data.TipoId,
                    description: data.Descripcion,
                    realizacion: data.FechaRealizacion,
                    idDetaAct: data.idDetalle,
                    DescUnid: data.DescripcionUnidad,
                    oUnidId: data.UnidadId,
                    DescLoc: data.DescripcionLocal,
                    oLocId: data.LocalId,
                    start: fechaInicio,
                    startDate: data.fechaInicio,
                    end: fechaFin,
                    endDate: fechaFin,
                    allDay: false
                });

            }
            InicializaControles();
            inicializacamposView();
            InicializaCaposDelDEtalle();

            $('#HInicio').val('8:00 AM');
            $('#HFin').val('12:00 PM');
            $("#ContenedorBloqueo").fadeOut('slow');
            initCalendar(eventItems, 'month');
        }
    });
}

function DeleteSelectAct(DetaId) {
    $.ajax({
        type: "POST",
        url: "EliminarActal",
        dataType: 'json',
        data: { idDetaAct: DetaId },
        success: function (a) {
            a != false;
            $('#calendar').fullCalendar('destroy');
            $("#ContenedorBloqueo").fadeIn('slow');
            $('.mensaje_esperarD').frm('ocultar');
            var LocalActual = $("#LocActualId").val();
            ObtenerActividad(LocalActual);
            $('#myModalDeta').modal('hide');
        },
        error: function (n) {
            $('.mensaje_esperarD').frm('ocultar'),
            $('#myModalDeta').modal('hide'),
            n.status == 401 ? MensajePermisos() : MensajeErrorAjax()
        }
    });
}

function DeleteSelectAllAct(ActId) {
    $.ajax({
        type: 'POST',
        url: 'EliminarAllActual',
        dataType: 'json',
        data: { idAct: ActId },
        success: function (a) {
            a != false;
            $('#calendar').fullCalendar('destroy');
            $("#ContenedorBloqueo").fadeIn('slow');
            $('.mensaje_esperarD').frm('ocultar');
            var LocalActual = $("#LocActualId").val();
            ObtenerActividad(LocalActual);
            $('#myModalDeta').modal('hide');
        },
        error: function (n) {
            $('.mensaje_esperarD').frm('ocultar'),
           $('#myModalDeta').modal('hide'),
           n.status == 401 ? MensajePermisos() : MensajeErrorAjax()
        }
    });
}

function inicializacamposView() {

    $("#modal-HorariosChocantes").addClass('ocultar');
    $("#myModalLabelId").empty();
    $("#DscActLocId").empty();
    $("#AId").val("");
    $("#ADId").val("");
    $('#Descripcion').val("");
    $("#DescripActdid").val("");
    $("#ActividadId").val("");
    $('#DescripUnidadid').val("");
    $('#DescripLocalid').val("");
    $('#TipoActividadId').val("");
    $('#UnidadId').val("");
    $('#LocalId').val("");
    $("#modal-HorariosChocantes").addClass('ocultar');
    $("#oValFRealizacionId").addClass('ocultar');
    $("#oHorarios").addClass('ocultar');
    $("#btn-ModificarAll").addClass('ocultar');
    $("#btn-Guardar").removeClass('ocultar');
    $("#btn-Guardar").attr('disabled', 'disabled');
    $("#btn-ModificarAll").attr('disabled', 'disabled');
    $("#LclsId").attr('disabled', 'disabled');
    $('#Descripcion').removeAttr('disabled', 'disabled');
    $('#TipoActividadId').removeAttr('disabled', 'disabled');
    $("#myModalLabelId").empty();
    $("#DescripcionTemp").val("");
    $("#TipoTemp").val("");
    $("#UniIdTemp").val("");
    $("#LocIdTemp").val("");
    $("#myModalLabelId").empty();
    $("#Descripcion,#TipoActividadId,#UnidadId,#LocalId").each(function () {
        limpiar($(this).attr("id"));
    });

    aId = 0;
    Descripcion = "";
    Tipo = 0;
    UniId = 0;
    LocId = 0;
    id = "";
}

function initCalendar(eventItems, view)
{
    msjloadPage();

    inicializacampos();
    
    var calendar = $('#calendar').fullCalendar({
        theme: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month'
        },
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNameShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Juéves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vié', 'Sab'],
        eventLimitText: ['Actividades'],
        eventColor: '#378006',
        editable: true,// allow move event in other cell
        selectable: true,// allow select event in the cell
        eventLimit: true, // allow "more" link when too many events
        navLinks: true,
        lang:'es',       
        events: eventItems,

        eventRender: function (event, element, icon) {

            var date = new Date(moment(event.endDate).format('YYYY/MM/DD, h:mm A'));

            var hour = date.getHours();
            var minutes = date.getMinutes();
            var strMin = minutes > 0 ? " : " + minutes : "";

            var strHour = 'am';
            if (hour > 11) {
                strHour = "pm";
                hour = ((hour + 11) % 12) + 1;
            }

            if ($('#calendar').fullCalendar('getView').name == 'month') {
                element.find('.fc-time').append("m - " + hour + strMin + strHour + "<br/>");
            }

            if (!event.description == "") {
                element.find('.fc-title').html('<span><b>Actividad:</b> ' + event.title + '</span>');
                element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
            }
        },

        eventDrop: function (event) {
            $('input[type=checkbox]').prop('checked', false);
            $('#HInicio').val('8:00 AM');
            $('#HFin').val('12:00 PM');
            InicializaCaposDelDEtalle();

            $.ajax({
                type: "POST",
                url: "ModificarActual",
                dataType: 'json',
                data: {
                    idAct: event.eventId, idLoc: event.oLocId , idDeta: event.idDetaAct,
                    Freal: event.start.format('DD/MM/YYYY'), Inicia: event.start.format('DD/MM/YYYY h:mm A'),
                    Termina: event.end.format('DD/MM/YYYY h:mm A')
                },
                beforeSend: function () {
                    $("#DescActInfoId").val("");
                    $("#TipoDesctActId").val("");
                    $("#InfoHini").val("");
                    $("#InfoHFin").val("");
                    $('.mensaje_esperar').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando modificación ...' });
                },
                success: function (msj) {

                    if (msj.result == 'success') {
                        inicializacampos();
                        InicializaControles();
                        inicializacamposView();
                        InicializaCaposDelDEtalle();
                        $('.mensaje_esperar').frm('ocultar');
                        $('#calendar').fullCalendar('destroy');
                        $("#ContenedorBloqueo").fadeIn('slow');
                        var LocalActual = $("#LocActualId").val();
                        ObtenerActividad(LocalActual);

                    } else {
                        $.ajax({
                            type: "GET",
                            dataType: "html",
                            url: "ModificacionActividadActual",
                            success: function (n) {
                                $("#CuerpoModalInfoDeta").html(n),
                                $("#ListaVerMov > tbody").empty(),
                                $("#InfoHini").val(event.start.format('h:mm A')),
                                $("#InfoHFin").val(event.end.format('h:mm A')),
                                $("#DescActInfoId").prepend(event.description),
                                $("#TipoDesctActId").prepend(event.title),
                                $("#FRealDesctActId").append(event.start.format('DD/MM/YYYY')),
                                $("#TempDescDetaActInfoId").val(event.idDetaAct),
                                $("#TempDescActInfoId").val(event.eventId),
                                $("#TempDescLocId").val(event.oLocId),
                                $("#TempDescLoc").val(event.DescLoc);
                                var html = "";
                                for (var i = 0, len = msj.results.length; i < len; i++) {
                                    var item = msj.results[i];
                                    $('.mensaje_esperar').frm('ocultar');
                                    
                                    html = "<tr class='webgrid-verificacion'><td>" + item.DescripcionAct + "</td><td>" + item.DescipcionLocal + "</td><td>" + moment(item.FechaR).format('DD/MM/YYYY') + "</td><td>" + moment(item.Inicia).format('h:mm A') + "</td><td>" + moment(item.Termina).format('h:mm A') + "</td></tr>";
                                    $('#ListaVerMov > tbody').append(html);
                                }

                                $("#myModalDetaValInfo").modal('show');

                            },
                            error: function (n) {
                                n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
                            }
                        })
                     }
                },
                error: function (n) {
                    $('.mensaje_esperar').frm('ocultar');
                    n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
                }
            });
        },
           
        eventClick: function (calEvent, jsEvent, view) {
            loadPage();

            $.ajax({
                type: "GET",
                dataType: "html",
                url: "DetalleActividad",
                success: function (n) {
                    $("#CuerpoModalDeta").html(n),
                    $('input[type=checkbox]').prop('checked', false),
                    $('#HInicio').val('8:00 AM'),
                    $('#HFin').val('12:00 PM'),
                    selectedEvent = $('#myModalDeta #TipoAct').text(calEvent.title),

                    $("#IAId").val(calEvent.eventId),
                    $("#IACTDId").val(calEvent.idDetaAct),

                    $("#TempUnid").val(calEvent.oUnidId),
                    $("#TempLoc").val(calEvent.oLocId),

                    $("#FechIni").val(moment(calEvent.start).format("DD-MM-YYYY h:mm A")),
                    $("#FechFin").val(moment(calEvent.end).format("DD-MM-YYYY h:mm A"));

                    var $description = $('<div/>');
                    $description.append($('<p/>').html('<b>Fecha Realización:<b/>' + moment(calEvent.realizacion).format("DD-MM-YYYY")));
                    $description.append($('<p/>').html('<b>Hora Inicio:</b>' + calEvent.start.format(" h:mm A") + ' ' + '<b>Hora Fin:</b>' + calEvent.end.format("h:mm A")));

                    $description.append($('<p/>').html('<b>Actividad:</b>' + calEvent.description));
                    $description.append($('<p/>').html('<b>Tipo:</b>' + calEvent.title));
                    $description.append($('<p/>').html('<b>Solicitante:</b>' + calEvent.DescUnid));
                    $description.append($('<p/>').html('<b>Local:</b>' + calEvent.DescLoc));

                    $('#myModalDeta #pDetalles').empty().html($description);
                    $('#myModalDeta').modal();
                },
                error: function (n) {
                    n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
                }
            })

           
        }

    });    

    function msjloadPage() {
        $('.mensaje_esperar').frm();
        $('.mensajes_anunciar').frm({
            titulo: 'Información',
            tipoModal: 'mensaje',
            onOk: function () {
                $('.mensajes_anunciar').frm('ocultar');
            },
            onClose: function () {
                $('.mensajes_anunciar').frm('ocultar');
                $('.mensajes_anunciar').frm('ocultar');
            }
        });
    }
    
    function loadPage() {
        
        $('.mensaje_esperarD').frm();
        $('.mensajes_anunciarD').frm({
            titulo: 'Información',
            tipoModal: 'mensaje',
            onOk: function () { $('.mensajes_anunciarD').frm('ocultar'); },
            onClose: function () { $('.mensajes_anunciarD').frm('ocultar'); }
        });
        $('.mensajes_confirmarD').frm({
            titulo: 'Información',
            tipoModal: 'confirmar',
            onOk: function (accion) {
                $('.mensajes_confirmarD').frm('ocultar');
                $('.mensaje_esperarD').frm('mostrar', { ancho: '420px', mensaje_html: 'Eliminando Actividad ...' });
                $('.mensajes_confirmarD').frm('ocultar');
                checkedItem();
                if (!$("#ActualId").is(":checked") && !$("#ActualAllId").is(":checked")) {
                    $('.mensaje_esperarD').frm('ocultar');
                    $('.mensajes_anunciarD').frm('mostrar', { ancho: '500px', mensaje_html: 'Favor seleccione una de las opciones para eliminar la actividad!' });

                } else {
                    if ($("#ActualId").is(":checked") && $("#ActualAllId").is(":checked")) {
                        $('.mensaje_esperarD').frm('ocultar');
                        $('.mensajes_anunciarD').frm('mostrar', { ancho: '500px', mensaje_html: 'Favor seleccione una de las opciones para eliminar la actividad!' });

                    } else {
                        if ($("#ActualId").is(":checked")) {
                                 DeleteSelectAct($("#IACTDId").val());

                        } else {
                            if ($("#ActualAllId").is(":checked")) {

                                DeleteSelectAllAct($("#IAId").val());

                            }
                        }
                    }

                }

            },
            onClose: function () { $('.mensajes_confirmarD').frm('ocultar'); },

        });

        setTimeout(function () { $(".frm_ok"); }, 500);
        $(document).on('keydown', function (e) {
            var key = e.keyCode || e.which;
            if (key === 27) { e.preventDefault(); }
        });
    }
    
}
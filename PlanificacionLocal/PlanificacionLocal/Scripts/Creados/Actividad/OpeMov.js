$(document).ready(function () {
       
    $('#btn-ModificarAll').on('click', function (e) {
        e.preventDefault();

        $("#modal-HorariosChocantes").addClass('ocultar');
        $("#ListaActividadExistentes tbody").empty();

        LoadPage1();
        var Contador = 0;

        $('.info-detalle').each(function () {
            Contador++;
        });

        if (Contador == 0) {
            $('.mensaje_esperar1').frm('ocultar');
            $("#modal-HorariosChocantes").addClass('ocultar');
            $("#ListaActividadExistentes > tbody").empty();
            $('#HorariosVerificaicon').removeClass('loading');
            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error para guardar los cambios del registro de la actividad, debe tener almenos una fecha  y los horarios especificados!.' });

        } else {
            if ($("#oValFRealizacionId").val() == "" && $("#tempHInicio").val() == "" && $("#tempHFin").val() == "") {
                if (Validaciones() == true) {
                    if (($("#Descripcion").val() != "") || ($("#TipoActividadId").val() != "") || ($("#DescripUnidadid").val() != "" && $("#UnidadId").val() != "")) {
                        if ($("#Descripcion").val().toString().length > 10) {
                            if (($("#TipoActividadId").val() == "")) {
                                Validaciones();
                                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos, para guardar los cambios de la actividad!.' });
                            } else {
                                GrabarModificacionActividad();
                            }
                        } else {
                            Validaciones();
                            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la descripcion debe ser mayor o igual a 10 caracteres, para guardar los cambios de la actividad!.' });
                        }
                    } else {
                        Validaciones();
                        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos para guardar los cambios de la actividad!.' });
                    }
                } else {
                    Validaciones();
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos para guardar  los cambios de la actividad!.' });
                }
            } else {
                $('.mensaje_esperar1').frm('ocultar');
                $("#modal-HorariosChocantes").addClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').removeClass('loading');
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Para guardar los cambios del registro de la actividad, debe terminar de relizar  una de las operaciones mostradas de la fila seleccionada en el detalle!.' });
            }
        }

    });

    $("#btn-ModificarActual").on('click', function (e) {
        e.preventDefault();

        $("#modal-HorariosChocantes").addClass('ocultar');
        $("#ListaActividadExistentes tbody").empty();

        LoadPage1();
        var Contador = 0;

        $('.info-detalle').each(function () {
            Contador++;
        });

        if (Contador == 0) {
            $('.mensaje_esperar1').frm('ocultar');
            $("#modal-HorariosChocantes").addClass('ocultar');
            $("#ListaActividadExistentes > tbody").empty();
            $('#HorariosVerificaicon').removeClass('loading');
            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error para guardar los cambios del registro de la actividad, debe tener almenos una fecha  y los horarios especificados!.' });

        } else {
            if ($("#oValFRealizacionId").val() == "" && $("#tempHInicio").val() == "" && $("#tempHFin").val() == "") {
                GrabarModSeleccionadad();
            } else {
                $('.mensaje_esperar1').frm('ocultar');
                $("#modal-HorariosChocantes").addClass('ocultar');
                $("#ListaActividadExistentes > tbody").empty();
                $('#HorariosVerificaicon').removeClass('loading');
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Para guardar los cambios del registro de la actividad, debe terminar de relizar  una de las operaciones mostradas de la fila seleccionada en el detalle!.' });
            }
        }
    });

    $('#btn-Eliminar').on('click', function (e) {
        e.preventDefault();
        $('.mensajes_confirmarD').frm('mostrar', { ancho: '550px', mensaje_html: 'Desea eliminar la actividad?<br/>Seleccione uno de los campos  para su eliminación<br/>Solo actividad seleccionada<input type="checkbox"  id="ActualId" name="ActualId" /><br/>Toda la actividad con los dias correspondiente a la actividad seleccionada<input type="checkbox" id="ActualAllId" name="ActualAllId" /><br/>NOTA: <br/>Una vez eliminado el registro, no podr&aacute; recuperar los datos!', accion: 1 });
    });

    $("#btn-CancelarId").on('click', function (e) {
        e.preventDefault();
        $("#myModal").modal('hide');
        $('#calendar').fullCalendar('destroy');
        $("#ContenedorBloqueo").fadeIn('slow');
        var LocalActual = $("#LocActualId").val();
        ObtenerActividad(LocalActual);
        InicializaControles();
        inicializacampos();
    });

    $("#modal-resultlista").on("dblclick", "table tbody tr", function () {
        var i = $(this).find("td:nth-child(1)").text(), t = i.split("*"), n;

        $(this).find("td").length > 0 ? $("#descriplocalid").val($(this).find("td:nth-child(2)").text()) :
        $("#descriplocalid").val($(this).find("td:nth-child(2)").text());
        n = t[1];
        n = isNaN(n) ? parseFloat(n.replace(/[^\.\d]/g, "")) : parseFloat(n);
        $("#LocActualId").val(isNaN(n) ? 0 : parseInt(n));
        $('#idCap').text('Capacidad local:' + $(this).find("td:nth-child(3)").text());
        $("#CapLocId").val($(this).find("td:nth-child(3)").text());
        $("#gridSystemModalLocal").modal('hide');
        $('#HInicio').val('8:00 AM');
        $('#HFin').val('12:00 PM');
        $("#AgrAct").removeAttr('disabled', 'disabled');
        $("#ModAct").removeAttr('disabled', 'disabled');
        $("#oValFRealizacionId").attr('readonly', 'readonly');
        $("#tempHInicio").attr('readonly', 'readonly');
        $("#tempHFin").attr('readonly', 'readonly');
        $("#HInicio").removeAttr('disabled', 'disabled');
        $("#HFin").removeAttr('disabled', 'disabled');
        $('input[name="' + $("#NameMonthId").val() + '"]').removeAttr('disabled', 'disabled');
        var LocalId = $("#LocActualId").val();
        $('#calendar').fullCalendar('destroy');
        $("#ContenedorBloqueo").fadeIn('slow');
        ObtenerActividad(LocalId);
        HorarioValor();
        setTimeout(function () {
            CancelarInfoAllId();
        }, 6000000);

    });

    $("#modal-resultlistaAct").on("dblclick", "table tbody tr", function () {
        var i = $(this).find("td:nth-child(1)").text(), t = i.split("*"), n;

        $(this).find("td").length > 0 ? $("#DescripActdid").val($(this).find("td:nth-child(3)").text()) :
        $("#DescripActdid").val($(this).find("td:nth-child(3)").text());
        n = t[1];
        n = isNaN(n) ? parseFloat(n.replace(/[^\.\d]/g, "")) : parseFloat(n);
        $("#ActividadId").val(isNaN(n) ? 0 : parseInt(n));
        $("#TIdAct").val(isNaN(n) ? 0 : parseInt(n));
        $("#gridSystemModalActividad").modal('hide');
    });

    $("#modal-resultlistaLocalid").on("dblclick", "table tbody tr", function () {
        var i = $(this).find("td:nth-child(1)").text(), t = i.split("*"), n;
        var oVerif = $(this).find("td:nth-child(3)").text();
        n = t[1];
        n = isNaN(n) ? parseFloat(n.replace(/[^\.\d]/g, "")) : parseFloat(n);
        if (oVerif == "0") {
            $("span[data-valmsg-for=oVerLocalId]").each(function () {

                $(this).removeClass("field-validation-valid");
                $(this).addClass("field-validation-error");
                $(this).html("Para agregar el local la capacidad debe ser mayor que cero ");
            });
        } else {
            $("span[data-valmsg-for=oVerLocalId]").each(function () {

                $(this).addClass("field-validation-valid");
                $(this).removeClass("field-validation-error");
            });
            $(this).find("td").length > 0 ? $("#DescripLocalid").val($(this).find("td:nth-child(2)").text()) :
            $("#DescripLocalid").val($(this).find("td:nth-child(2)").text());            
            $("#LocalId").val(isNaN(n) ? 0 : parseInt(n));
            $("#gridSystemModalLocalesid").modal('hide');
        }
    });

    $("#modal-resultlistaUnidad").on("dblclick", "table tbody tr", function () {
        var i = $(this).find("td:nth-child(2)").text(), t = i.split("*"), n;

        $(this).find("td").length > 0 ? $("#DescripUnidadid").val($(this).find("td:nth-child(1)").text()) :
        $("#DescripUnidadid").val($(this).find("td:nth-child(1)").text());
        n = t[1];
        n = isNaN(n) ? parseFloat(n.replace(/[^\.\d]/g, "")) : parseFloat(n);
        $("#UnidadId").val(isNaN(n) ? 0 : parseInt(n));
        if ($("#DescripUnidadid").val() == "" && $("#UnidadId").val() == "") {
            $("span[data-valmsg-for=UnidadId]").each(function () {

                $(this).removeClass("field-validation-valid");
                $(this).addClass("field-validation-error");
                $(this).html("El solicitante es Obligatorio");
            });
            $('.mensaje_esperar1').frm('ocultar');
            $('.mensaje_esperar').frm('ocultar');
        } else {
            $("span[data-valmsg-for=UnidadId]").each(function () {

                $(this).addClass("field-validation-valid");
                $(this).removeClass("field-validation-error");
            });
            band = true;
        }
        $("#gridSystemModalUnidades").modal('hide');

    });

    $("#modal-ListaHorarios").on('dblclick', "table  tbody  tr", function () {

        InicializaControles();
        HabilitaCamposDeta();
        idLista = $(this).attr('id');

        var i = $(this).find("td:nth-child(5)").text(), t = i.split("*"), n, n1, n2;

        $(this).find("td").length > 0 ? $("#oValFRealizacionId").val($(this).find("td:nth-child(2)").text()) :
        $("#oValFRealizacionId").val($(this).find("td:nth-child(2)").text());

        n = t[1]; n1 = t[2]; n2 = t[3];

        n = isNaN(n) ? parseFloat(n.replace(/[^\.\d]/g, "")) : parseFloat(n);
        $("#TempIdDeta").val(isNaN(n) ? 0 : parseInt(n));
        idsLst = isNaN(n) ? 0 : parseInt(n);

        n1 = isNaN(n1) ? parseFloat(n1.replace(/[^\.\d]/g, "")) : parseFloat(n1);
        $("#TempIdAct").val(isNaN(n1) ? 0 : parseInt(n1));

        n2 = isNaN(n2) ? parseFloat(n2.replace(/[^\.\d]/g, "")) : parseFloat(n2);
        $("#LocalId").val(isNaN(n2) ? 0 : parseInt(n2));

        $("#DescripLocalid").val($(this).find("td:nth-child(1)").text());
        $("#tempHInicio").val($(this).find("td:nth-child(3)").text());
        $("#tempHFin").val($(this).find("td:nth-child(4)").text());
        $("#oValFRealizacionId").removeClass('ocultar');
        $("#modal-OperaccionDetalle").removeClass('ocultar');
        $("#ODHorarios").removeClass('ocultar');
        $("#" + idLista).addClass('SelectedItem');
        $("#" + idLista).removeClass('webgrid-row-style');
                        
        $('.info-detalle').each(function () {

            var idremover = $(this).attr('data-idDeta');

            if (idremover != idsLst) {
                $("#" + idremover).removeClass('SelectedItem');
            }
            
            $("#" + idremover).addClass('webgrid-row-style');
            $("#" + idremover).removeClass('webgrid-verificacion-Reg');
        });

    });

    $('#btnModDet').on('click', function (e) {
        e.preventDefault();
        LoadPage1();

        var hIniVer = new Date("01/01/1990" + " " + $("#tempHInicio").val());
        var hFinVer = new Date("01/01/1990" + " " + $("#tempHFin").val());

        if(!valHora($("#tempHInicio").val(),this)){
            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Inicio" contiene formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
        } else {
            if (!valHora($("#tempHFin").val(), this)) {
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Termina" contiene formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
            } else {
                if (!valHora($("#tempHInicio").val(), this) && !valHora($("#tempHFin").val(), this)) {
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Inicio" y "H.Termina" son incorrectos favor vuelva a seleccionar la hora correcta.' });
                } else {
                    if ($("#tempHInicio").val().toString().length < 7) {
                        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Inicio" no pueden ser vacios o con formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
                    } else {
                        if ($("#tempHFin").val().toString().length < 7) {
                            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Termina" no pueden ser vacios o con formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
                        } else {
                            if ($("#tempHInicio").val().toString().length < 7 && $("#tempHFin").val().toString().length < 7) {
                                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "H.Inicio" y "H.Termina" son incorrectos favor vuelva a seleccionar la hora correcta.' });
                            } else {
                                if ((hIniVer.getHours() > hFinVer.getHours()) || (hIniVer.getHours() == hFinVer.getHours() && hIniVer.getMinutes() > hFinVer.getMinutes())) {
                                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe comenzar despues que la hora fin, favor verifique e intente nuevamente.' });
                                } else {
                                    if (hIniVer.getHours() == hFinVer.getHours() && hIniVer.getMinutes() == hFinVer.getMinutes()) {
                                        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe ser igual que la hora fin, favor verifique e intente nuevamente.' });
                                    } else {
                                        if (((((($("#tempHInicio").val()) == "11:30 PM")))

                                                      || ((($("#tempHInicio").val()) == "12:00 AM") || ((($("#tempHInicio").val()) == "12:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "01:00 AM" || ($("#tempHInicio").val()) == "1:00 AM") || ((($("#tempHInicio").val()) == "01:30 AM" || ($("#tempHInicio").val()) == "1:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "02:00 AM" || ($("#tempHInicio").val()) == "2:00 AM") || ((($("#tempHInicio").val()) == "02:30 AM" || ($("#tempHInicio").val()) == "2:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "03:00 AM" || ($("#tempHInicio").val()) == "3:00 AM") || ((($("#tempHInicio").val()) == "03:30 AM" || ($("#tempHInicio").val()) == "3:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "04:00 AM" || ($("#tempHInicio").val()) == "4:00 AM") || ((($("#tempHInicio").val()) == "04:30 AM" || ($("#tempHInicio").val()) == "4:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "05:00 AM" || ($("#tempHInicio").val()) == "5:00 AM") || ((($("#tempHInicio").val()) == "05:30 AM" || ($("#tempHInicio").val()) == "5:30 AM"))))


                                                      &&

                                                      ((((($("#tempHFin").val()) == "11:30 PM")))

                                                      || ((($("#tempHFin").val()) == "12:00 AM") || ((($("#tempHFin").val()) == "12:30 AM")))

                                                      || ((($("#tempHFin").val()) == "01:00 AM" || ($("#tempHFin").val()) == "1:00 AM") || ((($("#tempHFin").val()) == "01:30 AM" || ($("#tempHFin").val()) == "1:30 AM")))

                                                      || ((($("#tempHFin").val()) == "02:00 AM" || ($("#tempHFin").val()) == "2:00 AM") || ((($("#tempHFin").val()) == "02:30 AM" || ($("#tempHFin").val()) == "2:30 AM")))

                                                      || ((($("#tempHFin").val()) == "03:00 AM" || ($("#tempHFin").val()) == "3:00 AM") || ((($("#tempHFin").val()) == "03:30 AM" || ($("#tempHFin").val()) == "3:30 AM")))

                                                      || ((($("#tempHFin").val()) == "04:00 AM" || ($("#tempHFin").val()) == "4:00 AM") || ((($("#tempHFin").val()) == "04:30 AM" || ($("#tempHFin").val()) == "4:30 AM")))

                                                      || ((($("#tempHFin").val()) == "05:00 AM" || ($("#tempHFin").val()) == "5:00 AM") || ((($("#tempHFin").val()) == "05:30 AM" || ($("#tempHFin").val()) == "5:30 AM"))))) {
                                            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la Hora Inicio:' + $("#tempHInicio").val() + ' y la Hora Fin: ' + $("#tempHFin").val() + ' espesificadas,<br/> no son laborales favor verifique e intente nuevamente!.' });
                                        } else {

                                            if ((((($("#tempHInicio").val()) == "11:30 PM")))

                                                      || ((($("#tempHInicio").val()) == "12:00 AM") || ((($("#tempHInicio").val()) == "12:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "01:00 AM" || ($("#tempHInicio").val()) == "1:00 AM") || ((($("#tempHInicio").val()) == "01:30 AM" || ($("#tempHInicio").val()) == "1:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "02:00 AM" || ($("#tempHInicio").val()) == "2:00 AM") || ((($("#tempHInicio").val()) == "02:30 AM" || ($("#tempHInicio").val()) == "2:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "03:00 AM" || ($("#tempHInicio").val()) == "3:00 AM") || ((($("#tempHInicio").val()) == "03:30 AM" || ($("#tempHInicio").val()) == "3:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "04:00 AM" || ($("#tempHInicio").val()) == "4:00 AM") || ((($("#tempHInicio").val()) == "04:30 AM" || ($("#tempHInicio").val()) == "4:30 AM")))

                                                      || ((($("#tempHInicio").val()) == "05:00 AM" || ($("#tempHInicio").val()) == "5:00 AM") || ((($("#tempHInicio").val()) == "05:30 AM" || ($("#tempHInicio").val()) == "5:30 AM")))) {
                                                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la Hora Inicio:' + $("#tempHInicio").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                                            } else {
                                                if ((((($("#tempHFin").val()) == "11:30 PM")))

                                                      || ((($("#tempHFin").val()) == "12:00 AM") || ((($("#tempHFin").val()) == "12:30 AM")))

                                                      || ((($("#tempHFin").val()) == "01:00 AM" || ($("#tempHFin").val()) == "1:00 AM") || ((($("#tempHFin").val()) == "01:30 AM" || ($("#tempHFin").val()) == "1:30 AM")))

                                                      || ((($("#tempHFin").val()) == "02:00 AM" || ($("#tempHFin").val()) == "2:00 AM") || ((($("#tempHFin").val()) == "02:30 AM" || ($("#tempHFin").val()) == "2:30 AM")))

                                                      || ((($("#tempHFin").val()) == "03:00 AM" || ($("#tempHFin").val()) == "3:00 AM") || ((($("#tempHFin").val()) == "03:30 AM" || ($("#tempHFin").val()) == "3:30 AM")))

                                                      || ((($("#tempHFin").val()) == "04:00 AM" || ($("#tempHFin").val()) == "4:00 AM") || ((($("#tempHFin").val()) == "04:30 AM" || ($("#tempHFin").val()) == "4:30 AM")))

                                                      || ((($("#tempHFin").val()) == "05:00 AM" || ($("#tempHFin").val()) == "5:00 AM") || ((($("#tempHFin").val()) == "05:30 AM" || ($("#tempHFin").val()) == "5:30 AM")))) {
                                                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error Hora Fin:' + $("#tempHFin").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                                                } else {
                                                    var glob_root;
                                                    var Path = location.host;
                                                    if (Path.indexOf("localhost") >= 0 && Path.indexOf(":") >= 0) { glob_root = ''; }
                                                    else { var pathname = window.location.pathname; var VirtualDir = pathname.split('/'); glob_root = VirtualDir[1]; glob_root = '/' + glob_root; }
                                                    $('input').keypress(function (e) { if (e.which == 13) { return false; } });
                                                    $(document).on("keydown", function (e) { if (e.which === 8 && !$(e.target).is("input")) { e.preventDefault(); } });

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
                                                        IDDETAACT = $(this).attr('data-iddeta');
                                                        IDLOC = $(this).attr('data-idloc');
                                                        FREAL = $(this).attr('data-frealizacion');
                                                        HINI = $(this).attr('data-hinicio');
                                                        HFIN = $(this).attr('data-hfin');

                                                        if (FREAL != undefined) {
                                                            IDLOCS[i] = IDLOC;
                                                            IDDETAACTS[i] = IDDETAACT;
                                                            FREALS[i] = FREAL;
                                                            HINIS[i] = HINI;
                                                            HFINS[i] = HFIN;
                                                        }
                                                        i++;
                                                    });

                                                    var url = glob_root + '/Planificacion/oDetaVer';
                                                    var data = {
                                                        IdLoc: $("#LocalId").val(),
                                                        idAct: $("#TempIdAct").val(), 
                                                        idDetaAct: $("#TempIdDeta").val(), 
                                                        FRealizacion: $("#oValFRealizacionId").val(), 
                                                        FInicia: $("#tempHInicio").val(),
                                                        FTermina: $("#tempHFin").val()
                                                    };
                                                    
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "oDetaVer",
                                                        dataType: 'json',
                                                        data: {
                                                            oVerDeta: data, fReal: JSON.stringify(FREALS), hIni: JSON.stringify(HINIS), hFi: JSON.stringify(HFINS), ids: JSON.stringify(IDDETAACTS), IdsLoc: JSON.stringify(IDLOCS)
                                                        },
                                                        beforeSend: function () {
                                                            $('.mensaje_esperar1').frm('mostrar', { ancho: '420px', mensaje_html: 'Verificando...' });
                                                            $('#Horario').addClass('loading');
                                                        },
                                                        success: function (e) {

                                                            if (e.result == 'success') {
                                                               
                                                                $('.mensaje_esperar1').frm('ocultar');

                                                                $('.info-detalle').each(function () {

                                                                    var idremover = $(this).attr('data-iddeta');

                                                                    if (idremover == $("#TempIdDeta").val()) {
                                                                       
                                                                    $("#" + $("#TempIdDeta").val()).empty();
                                                                    $("#" + $("#TempIdDeta").val()).prepend("<td style='padding: 0px;text-align: center;'>" + $("#DescripLocalid").val() + "</td>" +
                                                                    "<td style='padding: 0px;text-align: center;'>" + $("#oValFRealizacionId").val() + "</td>" +
                                                                    "<td style='padding: 0px;text-align: center;'>" + $("#tempHInicio").val() + "</td>" +
                                                                    "<td style='padding: 0px;text-align: center;'>" + $("#tempHFin").val() + "</td>" +
                                                                    "<td><span style='display:none'>" + "*" + $("#TempIdDeta").val() + "*" + $("#TempIdAct").val() + "*" + $("#LocalId").val() + "</span>" +
                                                                    "<span class='info-detalle ocultar' data-idDeta=" + $("#TempIdDeta").val() + " data-idAct='" + $("#TempIdAct").val() + "' data-idLoc='" +
                                                                    $("#LocalId").val() + "' data-FRealizacion='" + $("#oValFRealizacionId").val() + "' data-Hinicio='" + $("#tempHInicio").val() +
                                                                    "' data-Hfin='" + $("#tempHFin").val() + "'></span></td>");

                                                                        $("#" + $("#TempIdDeta").val()).removeClass('SelectedItem');
                                                                        $("#" + $("#TempIdDeta").val()).addClass('webgrid-row-style');
                                                                        InicializaControles();
                                                                        DesabilitaCamposDeta();
                                                                        $("#oValFRealizacionId").addClass('ocultar');
                                                                        $("#modal-OperaccionDetalle").addClass('ocultar');
                                                                        $("#ODHorarios").addClass('ocultar');

                                                                        for (var i = 0, len = e.ResultDeta.length; i < len; i++) {
                                                                            var dato = e.ResultDeta[i];
                                                                            $("#" + dato.Id).removeClass('webgrid-verificacion-Reg');
                                                                            $("#" + dato.Id).removeClass('SelectedItem');
                                                                            $("#" + dato.Id).addClass('webgrid-row-style');
                                                                        }
                                                                    }
                                                                    $('#Horario').removeClass('loading');

                                                                });
                                                            } else {
                                                                if (e.result == 'error') {

                                                                    $('.mensaje_esperar1').frm('ocultar');
                                                                    $('.mensajes_anunciar1').frm('mostrar', {
                                                                        ancho: '500px', mensaje_html: 'Error no se puede modificar los datos debido a los registros marcados en rojo en el detalle,'
                                                                        + ' que se encuentran dentro del margen de los horarios para esta fecha espesificada, favor verifique e intente nuevamente.' +
                                                                        '<br/>Nota:<br/>Para modificar los horarios debe tener un mangen de una hora como minimo entre cada horario en el detalle de la actividad para la fecha espesificada.!'
                                                                    });
                                                                    $('#Horario').removeClass('loading');
                                                                    for (var i = 0, len = e.ResultDeta.length; i < len; i++) {
                                                                        var dato1 = e.ResultDeta[i];
                                                                        $("#" + dato1.Id).removeClass('webgrid-verificacion-Reg');
                                                                        $("#" + dato1.Id).addClass('webgrid-row-style');

                                                                        for (var i = 0, len = e.results.length; i < len; i++) {
                                                                            var dato2 = e.results[i];

                                                                            $("#" + dato2.idDetaView).removeClass('webgrid-row-style');
                                                                            $("#" + dato2.idDetaView).addClass('webgrid-verificacion-Reg');

                                                                        }
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    });

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    });

    $('#btnDeletDeta').on('click', function (e) {
        e.preventDefault();
        $('#Horario').addClass('loading');

        $('.info-detalle').each(function () {

            var idremover = $(this).attr('data-idDeta');

            if (idremover == idsLst) {
                $(this).closest('tr').remove();
                $("#" + idsLst).removeClass('SelectedItem');
                $("#oValFRealizacionId").addClass('ocultar');
                $("#modal-OperaccionDetalle").addClass('ocultar');
                $("#ODHorarios").addClass('ocultar');
                return false;
            } else {
                $('#Horario').removeClass('loading');
            }
            $('#Horario').removeClass('loading');
            $("#" + idremover).removeClass('webgrid-verificacion-Reg');
            $("#" + idremover).removeClass('SelectedItem');
            $("#" + idremover).addClass('webgrid-row-style');
        });

        $("#oHorarios").addClass('ocultar');
        $('#Horario').removeClass('loading');
        InicializaControles();
        DesabilitaCamposDeta();
    });

    $('#btnCancelDeta').on('click', function () {
        $("#oValFRealizacionId").addClass('ocultar');
        $("#modal-OperaccionDetalle").addClass('ocultar');
        $("#ODHorarios").addClass('ocultar');
        $('#oDHorario').addClass('loading');
        InicializaControles();
        DesabilitaCamposDeta();
        $('.info-detalle').each(function () {
            IDDETAACT = $(this).attr('data-iddeta');
            $("#" + IDDETAACT).removeClass('webgrid-verificacion-Reg');
            $("#" + IDDETAACT).removeClass('SelectedItem');
            $("#" + IDDETAACT).addClass('webgrid-row-style');

        });
    });

    $("#Descripcion,#TipoActividadId,#UnidadId,#LocalId").change(function () {
        limpiar($(this).attr("id"));
    });
})

function GrdActividad() {
    $("#modal-HorariosChocantes").addClass('ocultar');
    $("#ListaActividadExistentes tbody").empty();
    LoadPage1();

    var Contador = 0;
    $('.info-detalle').each(function () {
        Contador++;
    });

    if (Contador == 0) {
        $('.mensaje_esperar1').frm('ocultar');
        $("#modal-HorariosChocantes").addClass('ocultar');
        $("#ListaActividadExistentes > tbody").empty();
        $('#HorariosVerificaicon').removeClass('loading');
        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error para guardar un nuevo registro, debe tener almenos una fecha  y los horarios especificados para la actividad!.' });
    } else {

        if ($("#oValFRealizacionId").val() == "" && $("#tempHInicio").val() == "" && $("#tempHFin").val() == "") {
            if (Validaciones() == true) {
                if (($("#Descripcion").val() != "") || ($("#TipoActividadId").val() != "") || ($("#DescripUnidadid").val() != "" && $("#UnidadId").val() != "")) {
                    if ($("#Descripcion").val().toString().length > 10) {
                        if (($("#DescripUnidadid").val() == "" && $("#UnidadId").val() == "") || ($("#TipoActividadId").val() == "")) {
                            Validaciones();
                            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos para guardar la actividad!.' });
                        } else {
                            GrabarActividad();
                        }
                    } else {
                        Validaciones();
                        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la descripcion debe ser mayor o igual a 10 caracteres para guardar la actividad!.' });
                    }
                } else {
                    Validaciones();
                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos para guardar la actividad!.' });
                }
            } else {
                Validaciones();
                $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error debe completar todos los campos para guardar la actividad!.' });
            }
        } else {
            $('.mensaje_esperar1').frm('ocultar');
            $("#modal-HorariosChocantes").addClass('ocultar');
            $("#ListaActividadExistentes > tbody").empty();
            $('#HorariosVerificaicon').removeClass('loading');
            $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Para guardar el registro de la actividad, debe terminar de relizar  una de las operaciones mostradas de la fila seleccionada en el detalle!.' });
        }
    }
}

function valHora(n, t) {

    var res = true;
    
    var Hora = n.split(':');

    var hh = parseInt(Hora[0], 10);
    var mm = parseInt(Hora[1], 10)

    if (hh < 0 || hh > 23) {
        res = false;
    }
    if (mm < 0 || mm > 59) {
        res = false;
    }
    return res;
}

function DesabilitaCamposDeta() {
    $("#btnModDet").attr('disabled', 'disabled');
    $("#btnDeletDeta").attr('disabled', 'disabled');
    $("#btnCancelDeta").attr('disabled', 'disabled');
    $("#LclsId").attr('disabled', 'disabled');
    $("#oValFRealizacionId").attr('disabled', 'disabled');
    $("#tempHInicio").attr('disabled', 'disabled');
    $("#tempHFin").attr('disabled', 'disabled');
}

function HabilitaCamposDeta() {
    $("#oValFRealizacionId").daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    $("#btnModDet").removeAttr('disabled', 'disabled');
    $("#btnDeletDeta").removeAttr('disabled', 'disabled');
    $("#btnCancelDeta").removeAttr('disabled', 'disabled');
    $("#LclsId").removeAttr('disabled', 'disabled');
    $("#oValFRealizacionId").removeAttr('disabled', 'disabled');
    $("#tempHInicio").removeAttr('disabled', 'disabled');
    $("#tempHFin").removeAttr('disabled', 'disabled');

}

function oModActividadView() {
    LoadPage1();
    if ($("#DescripActdid").val().trim().length == 0 && $("#ActividadId").val() == "") {
        $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: "Debe buscar y seleccionar una actividad existente para modificarla!." });
    } else {
        $("#AddAct").modal('hide');
        $("#TIdAct").val($("#ActividadId").val());
        $("#myModalLabelId").empty();
        $.ajax({
            type: "GET",
            dataType: "html",
            url: "ModificacionActividad",
            success: function (n) {
                $("#CuerpoModal").html(n),
                LoadPage1(),
                $("#myModalLabelId").prepend('Actualizar Registro'),
                $("#DscActLocId").prepend('Editar Actividad Para El Local Seleccionado'),
                $("#btn-ModificarAll").attr('disabled', 'disabled');
                var ActActual = $("#TIdAct").val();
                ActAtual(ActActual);

                if ($("input[id=All]:checked").is(":checked")) {
                    DetaActualAll(ActActual);

                } else {
                    DetalleAct(ActActual);
                }
                InicializaControles();

            },
            error: function (n) {
                n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
            }
        })       
    }
}

function DetaActualAll(actId) {

    $("#ListaActividad > tbody").empty();
    $('#Horario').addClass('loading');
    var html = "";
    $.ajax({
        type: "GET",
        url: 'ObtenerDetalleAll',
        dataType: 'json',
        data: { idAct: actId },
        success: function (data) {
            $.each(data.Result, function (i, item) {
                var html = "";

                html = "<tr id='" + item.idDeta + "' class='webgrid-row-style' " +
                            "title='Doble click para seleccionar el horario para modificar'>" +
                            "<td style='padding: 0px;text-align: center;'>" + item.DescripcionLocal + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Inicia).format('h:mm A') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Termina).format('h:mm A') + "</td>" +
                            "<td><span style='display:none'>" + "*" + item.idDeta + "*" + item.idAct + "*" + item.IdLoc + "</span>" +
                            "<span class='info-detalle ocultar' data-idDeta=" + item.idDeta + " data-idAct='" + item.idAct + "' data-idLoc='" +
                            item.IdLoc + "' data-FRealizacion='" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "' data-Hinicio='" + moment(item.Inicia).format('h:mm A') +
                            "' data-Hfin='" + moment(item.Termina).format('h:mm A') + "'></span></td></tr>";
                                
                $("#myModal").modal('show');
                $("#ListaActividad > tbody").append(html);
            });
            
            AddAllCheckedDate();
            $("#AddAct").modal('hide');
        }
    });
}

function AddAllCheckedDate() {

    jQuery.fn.getCheckboxValues = function () {
        var values = [];
        var i = 0;
        this.each(function () {
            values[i++] = $(this).val();

        });
        return values;
    }

    var HoraI = $("#HInicio").val();
    var HoraFn = $("#HFin").val();
    var cod_id = "-" + Math.floor((Math.random() * 100) + 1);
    $.ajax({
        type: "GET",
        url: "GeneraCodIdMod",
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
                             "<td><span style='display:none'>" + "*" +  item.Id + "*" + -1 + "*" + item.idLoc + "</span>" +
                             "<span class='info-detalle ocultar' data-idDeta=" +  item.Id + " data-idAct='-1' data-idLoc='" +
                             item.idLoc + "' data-FRealizacion='" + item.FechaRealizacion + "' data-Hinicio='" + HoraI +
                             "' data-Hfin='" + HoraFn + "'></span></td></tr>"),

                    $('#Horario').removeClass('loading'),
                    $("#btn-ModificarAll").removeAttr('disabled', 'disabled')

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
                        $("#btn-ModificarAll").removeAttr('disabled', 'disabled')

                    });

                    $('.mensajes_anunciar1').frm('mostrar', { ancho: '500px', mensaje_html: 'Error se encontraron registros en conflicto(s) con el/los horario(s) de la(s) nueva(s) fecha(s) seleccionada(s).<br/>Nota: Para poder registar los cambios deS la(s) actividad(es) los horarios espesificados no deben estar dentro del rango de la(s) actividad(es) existente(s), y tener como m&iacute;nimo de una hora como margen entre cada actividad!.' });
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

function DetalleAct(actId) {
    $("#ListaActividad > tbody").empty();
    $('#Horario').addClass('loading');
    var html = "";
    $.ajax({
        type: "GET",
        url: 'ObtenerDetalleAll',
        dataType: 'json',
        data: { idAct: actId },
        success: function (data) {
            $.each(data.Result, function (i, item) {
                var html = "";

                html = "<tr id='" + item.idDeta + "' class='webgrid-row-style' " +
                            "title='Doble click para seleccionar el horario para modificar'>" +
                            "<td style='padding: 0px;text-align: center;'>" + item.DescripcionLocal + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Inicia).format('h:mm A') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Termina).format('h:mm A') + "</td>" +
                            "<td><span style='display:none'>" + "*" + item.idDeta + "*" + item.idAct + "*" + item.IdLoc + "</span>" +
                            "<span class='info-detalle ocultar' data-idDeta=" + item.idDeta + " data-idAct='" + item.idAct + "' data-idLoc='" +
                            item.IdLoc + "' data-FRealizacion='" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "' data-Hinicio='" + moment(item.Inicia).format('h:mm A') +
                            "' data-Hfin='" + moment(item.Termina).format('h:mm A') + "'></span></td></tr>";


                $("#Horario").removeClass('loading');
                $("#ListaActividad > tbody").append(html);
                $("#btn-ModificarAll").removeAttr('disabled', 'disabled');

            });
            $("#myModal").modal('show');
        }
    });
}

function InitCalendario() {
    $("#myModalDetaValInfo").modal('hide');
    $('#calendar').fullCalendar('destroy');
    $("#ContenedorBloqueo").fadeIn('slow');
    var LocalActual = $("#LocActualId").val();
    InicializaCaposDelDEtalle();
    ObtenerActividad(LocalActual);
}

var idLista = 0;
var idsLst = 0;

function oModAct() {
    var hVerifIni = new Date("01/01/1990" + " " + $("#InfoHini").val());
    var hVerifTerm = new Date("01/01/1990" + " " + $("#InfoHFin").val())

    LoadPage2();

    if (!valHora($("#InfoHini").val(), this)) {
        $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "Hora Inicio" contiene formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
    } else {
        if (!valHora($("#InfoHFin").val(), this)) {
            $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "Hora Fin" contiene formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
        } else {
            if (!valHora($("#InfoHini").val(), this) && !valHora($("#InfoHFin").val(), this)) {
                $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para la "Hora Inicio" y "Hora Fin" son incorrectos favor vuelva a seleccionar la hora correcta.' });
            } else {
                if ($("#InfoHini").val().toString().length < 7) {
                    $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para el campo "Hora Inicio" no pueden ser vacios favor vuelva a seleccionar la hora correcta.' });
                } else {
                    if ($("#InfoHFin").val().toString().length < 7) {
                        $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para el campo "Hora Fin" no pueden ser vacios o formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
                    } else {
                        if ($("#InfoHini").val().toString().length < 7 && $("#InfoHFin").val().toString().length < 7) {
                            $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'El formato espesificado para los campos "Hora Inicio" y "Hora Fin" no pueden ser vacios o formatos incorrectos favor vuelva a seleccionar la hora correcta.' });
                        } else {
                            if ($("#InfoHini").val() == "" || $("#InfoHFin").val() == "") {
                                $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error los horarios no pueden estar vac&iacute;o favor verifique e intente nuevamente!.' });
                            } else {
                                if ((hVerifIni.getHours() > hVerifTerm.getHours()) || (hVerifIni.getHours() == hVerifTerm.getHours() && hVerifIni.getMinutes() > hVerifTerm.getMinutes())) {
                                    $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe comenzar despues que la hora fin, favor verifique e intente nuevamente.' });
                                } else {
                                    if (hVerifIni.getHours() == hVerifTerm.getHours() && hVerifIni.getMinutes() == hVerifTerm.getMinutes()) {
                                        $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la hora inicio no debe ser igual que la hora fin, favor verifique e intente nuevamente.' });
                                    } else {
                                        if (((((($("#InfoHini").val()) == "11:30 PM")))

                                                    || ((($("#InfoHini").val()) == "12:00 AM") || ((($("#InfoHini").val()) == "12:30 AM")))

                                                    || ((($("#InfoHini").val()) == "01:00 AM" || ($("#InfoHini").val()) == "1:00 AM") || ((($("#InfoHini").val()) == "01:30 AM" || ($("#InfoHini").val()) == "1:30 AM")))

                                                    || ((($("#InfoHini").val()) == "02:00 AM" || ($("#InfoHini").val()) == "2:00 AM") || ((($("#InfoHini").val()) == "02:30 AM" || ($("#InfoHini").val()) == "2:30 AM")))

                                                    || ((($("#InfoHini").val()) == "03:00 AM" || ($("#InfoHini").val()) == "3:00 AM") || ((($("#InfoHini").val()) == "03:30 AM" || ($("#InfoHini").val()) == "3:30 AM")))

                                                    || ((($("#InfoHini").val()) == "04:00 AM" || ($("#InfoHini").val()) == "4:00 AM") || ((($("#InfoHini").val()) == "04:30 AM" || ($("#InfoHini").val()) == "4:30 AM")))

                                                    || ((($("#InfoHini").val()) == "05:00 AM" || ($("#InfoHini").val()) == "5:00 AM") || ((($("#InfoHini").val()) == "05:30 AM" || ($("#InfoHini").val()) == "5:30 AM"))))


                                                      &&

                                                      ((((($("#InfoHFin").val()) == "11:30 PM")))

                                                                   || ((($("#InfoHFin").val()) == "12:00 AM") || ((($("#InfoHFin").val()) == "12:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "01:00 AM" || ($("#InfoHFin").val()) == "1:00 AM") || ((($("#InfoHFin").val()) == "01:30 AM" || ($("#InfoHFin").val()) == "01:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "02:00 AM" || ($("#InfoHFin").val()) == "2:00 AM") || ((($("#InfoHFin").val()) == "02:30 AM" || ($("#InfoHFin").val()) == "2:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "03:00 AM" || ($("#InfoHFin").val()) == "3:00 AM") || ((($("#InfoHFin").val()) == "03:30 AM" || ($("#InfoHFin").val()) == "3:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "04:00 AM" || ($("#InfoHFin").val()) == "4:00 AM") || ((($("#InfoHFin").val()) == "04:30 AM" || ($("#InfoHFin").val()) == "4:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "05:00 AM" || ($("#InfoHFin").val()) == "5:00 AM") || ((($("#InfoHFin").val()) == "05:30 AM" || ($("#InfoHFin").val()) == "5:30 AM"))))) {
                                            $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la Hora Inicio:' + $("#InfoHini").val() + ' y la Hora Fin: ' + $("#InfoHFin").val() + ' espesificadas,<br/> no son laborales favor verifique e intente nuevamente!.' });
                                        } else {

                                            if ((((($("#InfoHini").val()) == "11:30 PM")))

                                                    || ((($("#InfoHini").val()) == "12:00 AM") || ((($("#InfoHini").val()) == "12:30 AM")))

                                                    || ((($("#InfoHini").val()) == "01:00 AM" || ($("#InfoHini").val()) == "1:00 AM") || ((($("#InfoHini").val()) == "01:30 AM" || ($("#InfoHini").val()) == "1:30 AM")))

                                                    || ((($("#InfoHini").val()) == "02:00 AM" || ($("#InfoHini").val()) == "2:00 AM") || ((($("#InfoHini").val()) == "02:30 AM" || ($("#InfoHini").val()) == "2:30 AM")))

                                                    || ((($("#InfoHini").val()) == "03:00 AM" || ($("#InfoHini").val()) == "3:00 AM") || ((($("#InfoHini").val()) == "03:30 AM" || ($("#InfoHini").val()) == "3:30 AM")))

                                                    || ((($("#InfoHini").val()) == "04:00 AM" || ($("#InfoHini").val()) == "4:00 AM") || ((($("#InfoHini").val()) == "04:30 AM" || ($("#InfoHini").val()) == "4:30 AM")))

                                                    || ((($("#InfoHini").val()) == "05:00 AM" || ($("#InfoHini").val()) == "5:00 AM") || ((($("#InfoHini").val()) == "05:30 AM" || ($("#InfoHini").val()) == "5:30 AM")))) {
                                                $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error la Hora Inicio:' + $("#InfoHini").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                                            } else {
                                                if ((((($("#InfoHFin").val()) == "11:30 PM")))

                                                                   || ((($("#InfoHFin").val()) == "12:00 AM") || ((($("#InfoHFin").val()) == "12:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "01:00 AM" || ($("#InfoHFin").val()) == "1:00 AM") || ((($("#InfoHFin").val()) == "01:30 AM" || ($("#InfoHFin").val()) == "01:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "02:00 AM" || ($("#InfoHFin").val()) == "2:00 AM") || ((($("#InfoHFin").val()) == "02:30 AM" || ($("#InfoHFin").val()) == "2:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "03:00 AM" || ($("#InfoHFin").val()) == "3:00 AM") || ((($("#InfoHFin").val()) == "03:30 AM" || ($("#InfoHFin").val()) == "3:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "04:00 AM" || ($("#InfoHFin").val()) == "4:00 AM") || ((($("#InfoHFin").val()) == "04:30 AM" || ($("#InfoHFin").val()) == "4:30 AM")))

                                                                   || ((($("#InfoHFin").val()) == "05:00 AM" || ($("#InfoHFin").val()) == "5:00 AM") || ((($("#InfoHFin").val()) == "05:30 AM" || ($("#InfoHFin").val()) == "5:30 AM")))) {
                                                    $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error Hora Fin:' + $("#InfoHFin").val() + ' espesificada, no es laboral favor verifique e intente nuevamente!.' });
                                                } else {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "ModificarActual",
                                                        dataType: 'json',
                                                        data: {
                                                            idAct: $("#TempDescActInfoId").val(), idLoc: $("#TempDescLocId").val(), idDeta: $("#TempDescDetaActInfoId").val(),
                                                            Freal: $("#FRealDesctActId").text(), Inicia: $("#FRealDesctActId").text() + " " + $("#InfoHini").val(),
                                                            Termina: $("#FRealDesctActId").text() + " " + $("#InfoHFin").val()
                                                        },
                                                        beforeSend: function () {
                                                            $('.mensaje_esperar2').frm('mostrar', { ancho: '420px', mensaje_html: 'Grabando modificación ...' });
                                                        },
                                                        success: function (msj) {

                                                            if (msj.result == 'success') {
                                                                $('.mensaje_esperar2').frm('ocultar');
                                                                $('#calendar').fullCalendar('destroy');
                                                                $("#ContenedorBloqueo").fadeIn('slow');
                                                                var LocalActual = $("#LocActualId").val();
                                                                $("#ListaVerMov > tbody").empty();
                                                                InicializaCaposDelDEtalle();
                                                                ObtenerActividad(LocalActual);
                                                                $("#myModalDetaValInfo").modal('hide');

                                                            } else {
                                                                $('.mensaje_esperar2').frm('ocultar');
                                                                $('.mensajes_anunciar2').frm('mostrar', { ancho: '500px', mensaje_html: 'Error al realizar la operaci&oacute;n favor verifique e intente nuevamente!.' });

                                                                $("#ListaVerMov > tbody").empty();
                                                                var html = "";
                                                                for (var i = 0, len = msj.results.length; i < len; i++) {
                                                                    var item = msj.results[i];
                                                                    $('.mensaje_esperar2').frm('ocultar');
                                                                    html = "<tr class='webgrid-verificacion'><td>" + item.DescripcionAct + "</td><td>" + item.DescipcionLocal + "</td><td>" + moment(item.FechaR).format('DD/MM/YYYY') + "</td><td>" + moment(item.Inicia).format('h:mm A') + "</td><td>" + moment(item.Termina).format('h:mm A') + "</td></tr>";
                                                                    $('#ListaVerMov > tbody').append(html);

                                                                }
                                                            }
                                                        },
                                                        error: function (n) {
                                                            $('.mensaje_esperar2').frm('ocultar');
                                                            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  
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
            inicializacampos();
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

function InicializaControles() {

    idLista = 0;
    idsLst = 0;
    $("#DescripLocalid").val("");
    $("#LocalId").val("");
    $("#oValFRealizacionId").val("");
    $("#tempHInicio").val("");
    $("#tempHFin").val("");
    $("#TempIdAct").val("");
    $("#TempIdDeta").val("");
}

function inicializacamposView() {

    $("#modal-HorariosChocantes").addClass('ocultar');
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

function EdicionActividadActual() {
    $("#myModalLabelId").empty();
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "ModificacionActividadActualView",
        success: function (n) {
            $("#CuerpoModal").html(n),
            $("#myModalLabelId").prepend('Actualizar Registro');
            GetSelectedAct($("#IAId").val());
            DetaActual($("#IACTDId").val());
            $("#oValFRealizacionId").val("");
            $("#tempHInicio").val("");
            $("#tempHFin").val("");
            $("#btn-ModificarActual").attr('disabled','disabled');
        },
        error: function (n) {
            n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
        }
    })

    $('#myModalDeta').modal('hide');
}

function GetSelectedAct(actId) {
    $.ajax({
        type: "GET",
        url: 'ObtenerAct',
        dataType: 'json',
        data: { actId: actId },
        success: function (e) {
            for (var i = 0, len = e.length; i < len; i++) {
                var data = e[i];
                $("#AId").val(data.Id),
                $('#DescripcionAct').append(data.DescripcionAct),
                $("#DescTipoActId").append(data.DescripcionTipo),
                $("#TipoActividadId").val(data.TipoActividadId),
                $("#DescripUnidadid").append(data.DescripcionUnidad),
                $("#UnidadId").val(data.UnidadId),
                $('#myModal').modal('show');
            }
        }
    });
}

function DetaActual(idDeta) {
    $("#ListaActividad > tbody").empty();
    $('#Horario').addClass('loading');

    $.ajax({
        type: "GET",
        url: 'ObtenerDetalle',
        dataType: 'json',
        data: { idDetaAct: idDeta },
        success: function (data) {
            $.each(data.Result, function (i, item) {
                var html = "";

                html = "<tr id='" + item.idDeta + "' class='webgrid-row-style' " +
                            "title='Doble click para seleccionar el horario para modificar'>" +
                            "<td style='padding: 0px;text-align: center;'>" + item.DescripcionLocal + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Inicia).format('h:mm A') + "</td>" +
                            "<td style='padding: 0px;text-align: center;'>" + moment(item.Termina).format('h:mm A') + "</td>" +
                            "<td><span style='display:none'>" + "*" + item.idDeta + "*" + item.idAct + "*" + item.IdLoc + "</span>" +
                            "<span class='info-detalle ocultar' data-idDeta=" + item.idDeta + " data-idAct='" + item.idAct + "' data-idLoc='" +
                            item.IdLoc + "' data-FRealizacion='" + moment(item.FechaRealizacion).format('DD/MM/YYYY') + "' data-Hinicio='" + moment(item.Inicia).format('h:mm A') +
                            "' data-Hfin='" + moment(item.Termina).format('h:mm A') + "'></span></td></tr>";

                $('#Horario').removeClass('loading');
                $("#ListaActividad > tbody").append(html);

                $("#btn-ModificarActual").removeAttr('disabled', 'disabled');
            });
        }
    });
}

function Validaciones() {
    var band = true;

    if ($("#Descripcion").val() == "") {
        $("span[data-valmsg-for=Descripcion]").each(function () {

            $(this).removeClass("field-validation-valid");
            $(this).addClass("field-validation-error");
            $(this).html("El titulo de la actividad es Obligatorio");
        });
        $('.mensaje_esperar1').frm('ocultar');
        $('.mensaje_esperar').frm('ocultar');
        band = false;
    } else {
        if ($("#Descripcion").val().toString().length < 10) {
            $("span[data-valmsg-for=Descripcion]").each(function () {

                $(this).removeClass("field-validation-valid");
                $(this).addClass("field-validation-error");
                $(this).html("El titulo de la actividad debe ser mayor que 10 caracteres");
            });
            $('.mensaje_esperar1').frm('ocultar');
            $('.mensaje_esperar').frm('ocultar');
            band = false;
        }
    }

    if ($("#TipoActividadId").val() == "") {
        $("span[data-valmsg-for=TipoActividadId]").each(function () {

            $(this).removeClass("field-validation-valid");
            $(this).addClass("field-validation-error");
            $(this).html("El Tipo Actividad es Obligatorio");
        });
        $('.mensaje_esperar1').frm('ocultar');
        $('.mensaje_esperar').frm('ocultar');
        band = false;
    }


    if ($("#DescripUnidadid").val() == "" && $("#UnidadId").val() == "") {
        $("span[data-valmsg-for=UnidadId]").each(function () {

            $(this).removeClass("field-validation-valid");
            $(this).addClass("field-validation-error");
            $(this).html("El solicitante es Obligatorio");
        });
        $('.mensaje_esperar1').frm('ocultar');
        $('.mensaje_esperar').frm('ocultar');
        band = false;
    } else {
        $("span[data-valmsg-for=UnidadId]").each(function () {

            $(this).addClass("field-validation-valid");
            $(this).removeClass("field-validation-error");
            $(this).html("");
        });
        band = true;
    }

    var n = $("#Descripcion").val();
    return (!validarTextoEspacios($("#Descripcion"), 2),
    $("#Descripcion").val(textoValidoDescripcion($("#Descripcion").val())),
        !PalabraLogica($("#Descripcion"))) ? !1 : !$("#FrmTipoActividad").val() ||
        ($("#Descripcion").val() == "" &&
        ($("#Descripcion").addClass("input-validation-error"),
        $("#Descripcion").val(n)), !1)

    return band;
}

function limpiar(Campo) {
    $("span[data-valmsg-for=" + Campo + "]").each(function () {
        $(this).removeClass("field-validation-error");
        $(this).addClass("field-validation-valid");
        $(this).html("");
    });
}

function LoadPage2() {
    $('.mensaje_esperar2').frm();
    $('.mensajes_anunciar2').frm({
        titulo: 'Información',
        tipoModal: 'mensaje',
        onOk: function () { $('.mensajes_anunciar2').frm('ocultar'); },
        onClose: function () { $('.mensajes_anunciar2').frm('ocultar'); }
    });
    $('.mensajes_confirmar2').frm({
        titulo: 'Información',
        tipoModal: 'confirmar',
        onOk: function (accion) {
            $('.mensajes_confirmar2').frm('ocultar');
        },
        onClose: function () { $('.mensajes_confirmar2').frm('ocultar'); },

    });
    setTimeout(function () { $(".frm_ok"); }, 500);
    $(document).on('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 27) { e.preventDefault(); }
    });
}
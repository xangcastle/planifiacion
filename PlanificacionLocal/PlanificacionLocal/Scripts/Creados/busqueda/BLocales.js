function CancelarInfoAll() {
    $("#myModalLabelId").empty();
    $("#gridSystemModalLocal").modal('hide');
    $("#gridSystemModalActividad").modal('hide');
    $("#gridSystemModalLocalesid").modal('hide');
    $("#gridSystemModalUnidades").modal('hide');
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
}

function SalirBusquedaActividad() {
    $("#gridSystemModalActividad").modal('hide');
}

function SalirBusquedaLocal() {   
    $("#gridSystemModalLocalesid").modal('hide');
}

function SalirBusquedaUnidad() {   
    $("#gridSystemModalUnidades").modal('hide');
}

function InicializaControles() {
    TempFechaRealizacion = "";
    TempHorarioInicio = "";
    TempHorarioFin = "";
    var idLista = 0;

    $("#TempIdAct").val("");
    $("#TempIdDeta").val("");
}

function inicializacampos() {
   
    $("#modal-HorariosChocantes").addClass('ocultar');

    $('.formulario input[type=checkbox]').prop('checked', false);
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
    $("#LclsId").attr('disabled', 'disabled');
    $("#BscUnid").removeAttr('disabled', 'disabled');
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

function BusquedaLocales() {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "BusquedaLocalPrincipal",
        success: function (n) {
            $("#BsqLocPrinc").html(n),
            $("#DescripLclsid").val(""),
            $("#LstBusqLocales").addClass('ocultar'),
            $("#LstBusqLocales > tbody").empty(),
            $("#gridSystemModalLocal").modal('show')
        },
        error: function (n) {
            n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
        }
    })
}

function BusquedaActId() {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "BusquedaActividad",
        success: function (n) {
            $("#BusqActividad").html(n),
            $("#DescripActividadids").val(""),
            $("#LstBusqActividades").addClass('ocultar'),
            $("#LstBusqActividades > tbody").empty(),
            $("#gridSystemModalActividad").modal('show')
        },
        error: function (n) {
            n.status == 200 ? MensajePermisos() : MensajeErrorAjax()
        }
    })       
}

function BusquedaLocalesId() {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "BusquedaLocal",
        success: function (n) {
            $("#BsqLocid").html(n),
            $("#DescripLclid").val(""),
            $("#LstBusqLocalId").addClass('ocultar'),
            $("#LstBusqLocalId > tbody").empty(),
            $("#gridSystemModalLocalesid").modal('show')
        },
        error: function (n) {
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    })  
    
}

function BusquedaUnidadId() {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "BusquedaUnidad",
        success: function (n) {
            $("#BsqUnid").html(n),
            $("#LstBusqUnidadId").addClass('ocultar'),
            $("#DescripUndsid").val(""),
            $("#LstBusqUnidadId > tbody").empty(),
            $("#gridSystemModalUnidades").modal('show')
        },
        error: function (n) {
            n.status == 200 ? MsjPermisos() : MsjErrorDePeticion()
        }
    })            
}

function CancelBusqLocales() {
    $("#btnloadActs").hasClass("icon-close") && ($("#DescripLclsid").val(""),
    $("#DescripActividadids").empty(),
    $("#btnloadActs").addClass("icon-close"),
    $("#btnloadActs img").hide())
}

function CancelBusqActividad() {
    $("#btnloadActs").hasClass("icon-close") && ($("#DescripLclsid").val(""),
    $("#LstBusqActividades").empty(),
    $("#btnloadActs").addClass("icon-close"),
    $("#btnloadActs img").hide())
}

function CancelBusqLocalId() {
    $("#btnloadblclid").hasClass("icon-close") && ($("#DescripLclid").val(""),
    $("#LstBusqLocalId").empty(),
    $("#btnloadblclid").addClass("icon-close"),
    $("#btnloadblclid img").hide())
}

function CancelBusqUnidadId() {

    $("#btnloadbunis").hasClass("icon-close") && ($("#DescripUndsid").val(""),
    $("#LstBusqUnidadId").empty(),
    $("#btnloadbunis").addClass("icon-close"),
    $("#btnloadbunis img").hide())
}

function ListarLocales() {
    $("#DescripLclsid").val().trim().length > 0 ?
    $.ajax({
        type: "GET",
        url: "BuscarLocalesPlugin",
        data: { valor: $("#DescripLclsid").val() },
        beforeSend: function () {
            $('.ebody_table1').addClass('loading');
            $("#LstBusqLocales").addClass('ocultar');
            $("#LstBusqLocales > tbody").empty();
            $("#btnloadblcls").removeClass("icon-close");
            $("#btnloadblcls img").show();
        },
        success: function (n) {
            $("#btnloadblcls").addClass("icon-close");
            $("#btnloadblcls img").hide();
            $('.ebody_table1').removeClass('loading');
            $("#LstBusqLocales").removeClass('ocultar');
            $.each(n, function (i, item) {
                
                var html = "";
                html = "<tr class='webgrid-row-style' title='Doble click para seleccionar el local'><td>" + item.NoLocal + "<span style='display:none'>" + "*" + item.Id + "</span></td><td>" + item.Descripcion + "</td><td>" + item.Capacidad + "</td></tr>";
                $("#LstBusqLocales > tbody").append(html);
                $("#DescripLclsid").val("");
            });
        },
        error: function (n) {
            n.status == 500 ? ($("#btnloadblcls").addClass("icon-close"),
            $("#btnloadblcls img").hide()) : ($("#btnloadblcls").addClass("icon-close"),
            $("#btnloadblcls img").hide());
            $("#LstBusqLocales tbody tr").empty();
        }
    }) : ($("#LstBusqLocales tbody tr").empty())
}

function ListarActividades() {
    $("#DescripActividadids").val().trim().length > 0 ?
   $.ajax({
       type: "GET",
       url: "BuscarActividadPlugin",
       data: { valor: $("#DescripActividadids").val() },
       beforeSend: function () {
           $('.ebody_table1').addClass('loading');
           $("#LstBusqLocales").addClass('ocultar');
           $("#LstBusqActividades > tbody").empty();
           $("#btnloadActs").removeClass("icon-close");
           $("#btnloadActs img").show();
       },
       success: function (n) {
           $("#btnloadActs").addClass("icon-close");
           $("#btnloadActs img").hide();
           $('.ebody_table1').removeClass('loading');
           $("#LstBusqActividades").removeClass('ocultar');
           $.each(n, function (i, item) {
               var html = "";
               html = "<tr class='webgrid-row-style' title='Doble click para seleccionar el local'><td>" + item.Tipo + "<span style='display:none'>" + "*" + item.Id + "</span></td><td>" + item.Solicitante + "</td><td>" + item.Descripcion + "</td></tr>";
               $("#LstBusqActividades > tbody").append(html);
               $("#DescripActividadids").val("");
           });
       },
       error: function (n) {
           n.status == 500 ? ($("#btnloadActs").addClass("icon-close"),
           $("#btnloadActs img").hide()) : ($("#btnloadActs").addClass("icon-close"),
           $("#btnloadActs img").hide());
           $("#LstBusqActividades tbody tr").empty();
       }
   }) : ($("#LstBusqActividades tbody tr").empty())
}

function ListarLocalesId() {
    $("#DescripLclid").val().trim().length > 0 ?
    $.ajax({
        type: "GET",
        url: "BuscarLocalPlugin",
        data: { valor: $("#DescripLclid").val() },
        beforeSend: function () {
            $("span[data-valmsg-for=oVerLocalId]").each(function () {

                $(this).addClass("field-validation-valid");
                $(this).removeClass("field-validation-error");
            });
            $('.ebody_table1').addClass('loading');
            $("#LstBusqLocalId").addClass('ocultar');
            $("#LstBusqLocalId > tbody").empty();
            $("#btnloadblclid").removeClass("icon-close");
            $("#btnloadblclid img").show();
        },
        success: function (n) {
            $("#btnloadblclid").addClass("icon-close");
            $("#btnloadblclid img").hide();
            $('.ebody_table1').removeClass('loading');
            $("#LstBusqLocalId").removeClass('ocultar');
            $.each(n, function (i, item) {

                var html = "";
                html = "<tr class='webgrid-row-style' title='Doble click para seleccionar el local'><td>" + item.NoLocal + "<span style='display:none'>" + "*" + item.Id + "</span></td><td>" + item.Descripcion + "</td><td>" + item.Capacidad + "</td></tr>";
                $("#LstBusqLocalId > tbody").append(html);
                $("#DescripLclid").val("");
            });
        },
        error: function (n) {
            n.status == 500 ? ($("#btnloadblclid").addClass("icon-close"),
            $("#btnloadblclid img").hide()) : ($("#btnloadblclid").addClass("icon-close"),
            $("#btnloadblclid img").hide());
            $("#LstBusqLocalId tbody tr").empty();
        }
    }) : ($("#LstBusqLocalId tbody tr").empty())
}

function ListarUnidadesId() {
    $("#DescripUndsid").val().trim().length > 0 ?
    $.ajax({
        type: "GET",
        url: "BuscarUnidadPlugin",
        data: { valor: $("#DescripUndsid").val() },
        beforeSend: function () {
            $('.ebody_table1').addClass('loading');
            $("#LstBusqUnidadId").addClass('ocultar');
            $("#LstBusqUnidadId > tbody").empty();
            $("#btnloadbunis").removeClass("icon-close");
            $("#btnloadbunis img").show();
        },
        success: function (n) {
            $("#btnloadbunis").addClass("icon-close");
            $("#btnloadbunis img").hide();
            $('.ebody_table1').removeClass('loading');
            $("#LstBusqUnidadId").removeClass('ocultar');
            $.each(n, function (i, item) {

                var html = "";
                html = "<tr class='webgrid-row-style' title='Doble click para seleccionar la unidad'><td>" + item.Descripcion + "</td><td><span style='display:none'>" + "*" + item.Id + "</span></td></tr>";
                $("#LstBusqUnidadId > tbody").append(html);
                $("#DescripUndsid").val("");
            });
        },
        error: function (n) {
            n.status == 500 ? ($("#btnloadbunis").addClass("icon-close"),
            $("#btnloadbunis img").hide()) : ($("#btnloadbunis").addClass("icon-close"),
            $("#btnloadbunis img").hide());
            $("#LstBusqUnidadId tbody tr").empty();
        }
    }) : ($("#LstBusqUnidadId tbody tr").empty())
}

$("#modal-resultlista").delegate("table thead a", "click", function (n) {
    n.preventDefault();
    href = $(this).attr("href");
    PaginacionOrdenParcial(href, "#modal-resultlista");
});

$("#modal-resultlistaLocalid").delegate("table thead a", "click", function (n) {
    n.preventDefault();
    href = $(this).attr("href");
    PaginacionOrdenParcial(href, "#modal-resultlistaLocalid");
});

$("#modal-resultlistaUnidad").delegate("table thead a", "click", function (n) {
    n.preventDefault();
    href = $(this).attr("href");
    PaginacionOrdenParcial(href, "#modal-resultlistaUnidad");
});

function PaginacionOrdenParcial(n, t) {
    $(".loading_body").fadeIn(300),
    $.ajax({
        type: "get",
        dataType: "html",
        url: n,
        success: function (n) {
            $(t).empty(),
            $(t).html(n),
            $(".loading_body").fadeOut(300)
        }

    })
}
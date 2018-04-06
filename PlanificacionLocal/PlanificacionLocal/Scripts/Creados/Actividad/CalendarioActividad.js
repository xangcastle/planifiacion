$(document).ready(function () {
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
        $('#warningId').removeClass('ocultar');

        var LocalId = $("#LocActualId").val();
        $('#calendar').fullCalendar('destroy');
        $("#ContenedorBloqueo").fadeIn('slow');
        ObtenerActividad(LocalId);
     

        setTimeout(function () {
            CancelarInfoAllId();
        }, 2000000);

    });
});

function CancelarInfoAllId() {
    $("#gridSystemModalLocal").modal('hide');
    $('#calendar').fullCalendar('destroy');
    $("#descriplocalid").val("");
    $('#warningId').addClass('ocultar');
    $("#idCap").empty();
    $("#CapLocId").val("");
   
}

function BusquedaLocales() {
    $("#gridSystemModalLocal").modal('show');
    $("#DescripLclsid").val("");
    $("#LstBusqLocales").addClass('ocultar');
    $("#LstBusqLocales > tbody").empty();
}

function CancelBusqLocales() {
    $("#btnloadActs").hasClass("icon-close") && ($("#DescripLclsid").val(""),
    $("#DescripActividadids").empty(),
    $("#btnloadActs").addClass("icon-close"),
    $("#btnloadActs img").hide())
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
            $("#LstBusqLocales").empty();
        }
    }) : ($("#LstBusqLocales").empty())
}

$("#modal-resultlista").delegate("table thead a", "click", function (n) {
    n.preventDefault();
    href = $(this).attr("href");
    PaginacionOrdenParcial(href, "#modal-resultlista");
});

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
            $("#ContenedorBloqueo").fadeOut('slow');
            initCalendar(eventItems, 'month');
        }
    });
}

function initCalendar(eventItems, view)
{
    var calendar = $('#calendar').fullCalendar({
        theme:true,
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
        eventLimit: true, // allow "more" link when too many events
        navLinks: true,
        lang:['es'],
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
                element.find('.fc-title').html('<span><b>Actividad:</b></span>');
                element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
            }
        }
    });
}

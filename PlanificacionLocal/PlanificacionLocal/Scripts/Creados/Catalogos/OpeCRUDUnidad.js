$(document).ready(function () {
    var _raiz = ObtenerRaiz();
    var controlador = $("#Controlador").val();
    var Accion = $("#Accion").val();

    $('.text-right').delegate("#btnGrabar", "click", function () {
        ValidarGuardado();
        ActivarPost();
        $('.loading_body').fadeIn(300);
    });

    $("#DescripcionUnidad").LimiteCaracter($("#DescripcionUnidad").val());

    function ValidarGuardado() {
        var n = $("#DescripcionUnidad").val();
        return (!validarTextoEspacios($("#DescripcionUnidad"), 2),
        $("#DescripcionUnidad").val(textoValidoDescripcion($("#DescripcionUnidad").val())),
            !PalabraLogica($("#DescripcionUnidad"))) ? !1 : !$("#FrmUnidad").valid() ||
            ($("#DescripcionUnidad").val() == "" &&
            (MsjDanger("Introduzca una <b>Descripción<\/b> correcta y que no presente demasiados números", ".msjEerroDg"),
            $("#DescripcionUnidad").addClass("input-validation-error"),
            $("#DescripcionUnidad").val(n)), !1)
    }

    function ActivarPost() {
        var parametros = $('.panel-body form').serialize();
        var ruta = "/" + controlador + "/" + Accion;
        $.post(_raiz + ruta, parametros, function (data) {
            if (data.HayError === true) {
                $('.loading_body').fadeOut(300);
                EstablecerErrores(data.Errores);
            }
            else {
                Load();
            }
        }).complete(function () {
            $('.loading_body').fadeOut(300);
        });
    }
    function Load() {
        window.location.href = '../Unidades/Index';
    }
    function EstablecerErrores(Errores) {


        $.each(Errores, function (index, value) {

            if (value.toString() != "") {
                if (index.toString() != "") {
                    $("[data-valmsg-for=" + index.toString() + "]").addClass("field-validation-error").removeClass("field-validation-valid").html("<span id='" + index + "-error'>" + value.toString() + "</span>");
                    $("#" + index).addClass("input-validation-error").removeClass("input-validation-valid");
                }
            }
        });
    }
})
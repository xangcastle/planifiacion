$(document).ready(function () {
    var _raiz = ObtenerRaiz();
    var controlador = $("#Controlador").val();
    var Accion = $("#Accion").val();

    $('.text-right').delegate("#btnGrabar", "click", function () {
        Validaciones(); 
        ActivarPost();
        $('.loading_body').fadeIn(300);
    });
    $("#Descripcion").LimiteCaracter($("#Descripcion").val());
  
    function Validaciones() {
        var n = $("#Descripcion").val();
        return (!validarTextoEspacios($("#Descripcion"), 2),
        $("#Descripcion").val(textoValidoDescripcion($("#Descripcion").val())),
            !PalabraLogica($("#Descripcion"))) ? !1 : !$("#FrmTipoActividad").valid() ||
            ($("#Descripcion").val() == "" &&
            (MsjDanger("Introduzca una <b>Descripción<\/b> correcta y que no presente demasiados números", ".msjEerroDg"),
            $("#Descripcion").addClass("input-validation-error"),
            $("#Descripcion").val(n)), !1)
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
        window.location.href = '../TiposActividad/Index';
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


$(document).ready(function () {
    
    var _raiz = ObtenerRaiz();
    var controlador = $("#Controlador").val();
    var Accion = $("#Accion").val();

    $('.text-right').delegate("#btnGrabar", "click", function () {
        $('.loading_body').fadeIn(300);
        ValidarGuardado();
        Validaciones();
        ActivarPost();
    });

    $("#Descripcion").LimiteCaracter($("#Descripcion").val());
    $("#NumLocal").LimiteCaracter($("#NumLocal").val());

    function ValidarGuardado() {
        var n = $("#Descripcion").val();
        return (!validarTextoEspacios($("#Descripcion"), 2),
             $("#Capacidad").val() == "" ||
            ($("#Descripcion").val() == "" &&
            (MsjDanger("Introduzca una <b>Descripción<\/b> correcta y que no presente demasiados números", ".msjEerroDg"),
            $("#Descripcion").addClass("input-validation-error"),
            $("#Descripcion").val(n)), !1)||
            $("#UnidadId").val() == "" &&
            $("#TipoLocalId").val() == "")
    }
    function Validaciones() {
        var band = true;

        if ($("#UnidadId").val() == "") {
            $("span[data-valmsg-for=UnidadId]").each(function () {
                $('.loading_body').fadeOut(300);
                $(this).removeClass("field-validation-valid");
                $(this).addClass("field-validation-error");
                $(this).html("La unidad es Obligatorio");
            });
            band = false;
        } else {
            $("span[data-valmsg-for=UnidadId]").each(function () {

                $(this).addClass("field-validation-valid");
                $(this).removeClass("field-validation-error");
                $(this).html("");
            });
        }


        if ($("#TipoLocalId").val() == "") {
            $("span[data-valmsg-for=TipoLocalId]").each(function () {
                $('.loading_body').fadeOut(300);
                $(this).removeClass("field-validation-valid");
                $(this).addClass("field-validation-error");
                $(this).html("El tipo local es Obligatorio");
            });
            band = false;
        } else {
            $("span[data-valmsg-for=TipoLocalId]").each(function () {

                $(this).addClass("field-validation-valid");
                $(this).removeClass("field-validation-error");
                $(this).html("");
            });
        }
        return band;
    }

    function ActivarPost() {
        var parametros = $('.panel-body form').serialize();
        var ruta = "/" + controlador + "/" + Accion;
        $.post(_raiz + ruta, parametros, function (data) {
            if (data.HayError === true) {
                EstablecerErrores(data.Errores);
                $('.loading_body').fadeOut(300);
            }
            else {
                Load();
            }
        }).complete(function () {
            $('.loading_body').fadeOut(300);
        });
    }
    function Load() {
        window.location.href = '../Locales/Index';
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
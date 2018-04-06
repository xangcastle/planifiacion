﻿$(document).ready(function () {
    $("#btnAceptarId").on('click', function () {
        document.location.reload();
    });
    $("#btnAceptar").on('click', function () {
        $("#ModalConfirmacion").modal('hide');
        Eliminar();
    });
    $("#btnCerrar").on('click', function () {
        Cancelar();
    });
});

function msjConfi(idUni) {
    $("#ModalConfirmacion").modal('show');
    $("#UnidId").val(idUni);

}

function msjInfo() {
    $("#ModalInfo").modal('show');
    $(".loading_body").fadeOut(300);
}

function Cancelar() {
    $("#ModalConfirmacion").modal('hide');
    $("#UnidId").val("");
}
function Eliminar() {
    $(".loading_body").fadeIn(300);
    $.ajax({
        type: "POST",
        url: 'DeleteUnidad',
        dataType: 'json',
        data: { id: $("#UnidId").val() },
        success: function (msj) {
            if (msj != 'success') {
                $(".loading_body").fadeOut(300);
                bootbox.alert(msj);
            }
            else {
                msjInfo();
            }
        },
        error: function (e) {
            $(".loading_body").fadeOut(300);
            e.status == 200 ? bootbox.alert('No se pudo completar su operación, favor inténtelo más tarde.') : bootbox.alert('No cuenta con los permisos necesarios para realizar la operación.')
        },
        failure: function (e) {
            $(".loading_body").fadeOut(300);
            bootbox.alert(e);
        }
    });
}

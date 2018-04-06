(function ($) {
    var nombre_plugin = 'frm';
    var modales = { 'esperar': 0, 'mensaje': 1, 'confirmar': 2, 'form': 3 };
    var propiedades = {
        ancho: '320px',
        tipoModal: 'esperar',
        accion: 0,
        mensaje_html: 'Esperar...',
        titulo: 'Mi Plugin'
    };

    var eventos = {
        onOpen: function () { },
        onClose: function () { },
        onOk: function (accion) { },
        onSelected: function (objeto) { }
    };

    var metodos = {
        init: function (opciones) {
            return this.each(function () {
                o = $.extend({}, eventos, propiedades, opciones);
                m = metodos;
                var data = $(this).data(nombre_plugin);
                if (!data) {
                    codigo($(this), o, m);
                    data = $(this).data(nombre_plugin, 'inicializado');
                }
            });
        },
        mostrar: function (opciones) {
            $(this).attr('data-accion', ((opciones.accion == undefined) ? 0 : opciones.accion));
            $(this).find('.frm_v2').css('width', ((opciones == undefined) ? propiedades.ancho : opciones.ancho));
            $(this).find('.frm_msj').html(opciones.mensaje_html);
            $(this).children().removeClass('ocultar');
        },
        ocultar: function () {
            $(this).children().addClass('ocultar');
        },
        load: function (id, titulo, ancho, html, action) {
            $(this).find('.frm_titulo').text(titulo);
            $(this).find('.frm_v2').css('width', ancho);
            $(this).find('form').html(html).attr({ 'action': action, 'data-id': id });
            $(this).children().removeClass('ocultar');
        },
        loadSelect: function (id, data) {
            if (data.Id != undefined) {
                var option = "<option value='" + data.Id + "' >" + data.Descripcion + "</option>";
                $(id).append(option);
                $(id).val(data.Id);
            } else {
                $(this).find('form').html(data);
            }
        },
        bloquear: function () {
            $(this).next('.eboton_open').addClass('bloquear');
        },
        desbloquear: function () {
            $(this).next('.eboton_open').removeClass('bloquear');
        }
    };

    $.fn[nombre_plugin] = function (metodo) {
        if (metodos[metodo]) {
            return metodos[metodo].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof metodo === 'object' || !metodo) {
            return metodos.init.apply(this, arguments);
        }
        else {
            $.error('el metodo ' + metodo + ' no existe en este plugins');
        }
    };
    var codigo = function (el, o, m) {
        var html = "<div class='cont_frm_v2 ocultar'><div class='frm_v2' style='width:" + o.ancho + ";'>";
        if (modales[o.tipoModal] != 0) {
            html += "<div class='frm_head'><h1 class='frm_titulo'>" + o.titulo + " </h1><button class='frm_close frm_up'>X</button></div>";
        }
        //inicio del body
        html += "<div class='frm_body'>";
        if (modales[o.tipoModal] == 0) {
            html += "<div class='frm_msj loading'><p>" + o.mensaje_html + "</p></div>";
        }
        else if (modales[o.tipoModal] == 1 || modales[o.tipoModal] == 2) {
            html += "<div class='frm_msj'><p>" + o.mensaje_html + "</p></div>";
        }
        else {
            html += "<div class='frm_form_cont'><form></form></div>"
        }
        html += "</div>";
        //fin del body

        if (modales[o.tipoModal] != 0) {
            html += "<div class='frm_foot'>";
            if (modales[o.tipoModal] == 1) {
                html += "<span class='frm_button_msj'><button class='frm_ok frm_down'>Aceptar</button></span>";
            }
            else {
                html += "<span class='frm_button_opcion'><button class='frm_ok'>" + ((modales[o.tipoModal] == 2) ? "Confirmar" : "Guardar") + "</button><button class='frm_close'>Cancelar</button></span>";
            }
            html += "</div>";
        }
        html += "</div></div>";
        el.html(html);
        el.attr('data-accion', o.accion);
        el.find('.frm_close').on('click', function () { o.onClose(); });
        el.find('.frm_ok').on('click', function () { o.onOk(el.attr('data-accion')); });
        el.find('.frm_form_cont form').on('submit', function (e) { e.preventDefault(); });
    };
})($);
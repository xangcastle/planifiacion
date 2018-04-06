(function ($) {

    $.fn.extend({

        LimiteCaracter: function (Opciones) {

            var ValoresPorDefecto =
                {
                   // LimiteCaracteres: 250,
                    ColorMensajeInicial: "rgb(72, 140, 241)",
                    ColorMensajeFinal: "red"
                };

            var EventosPorDefecto =
                {
                    ObtenerFoco: function () { }
                };

            Op = $.extend({}, ValoresPorDefecto, EventosPorDefecto, Opciones);

            if (Op.LimiteCaracteres != 0) {

                return this.each(function () {

                    var $this = $(this);

                    $this.attr("maxlength", Op.LimiteCaracteres);

                    $this.wrap("<div class=contenedor-LimiteCaracter></div>");
                    $this.before("<span class=etiqueta-LimiteCaracter></span><br/>");
                    var $span = $this.siblings("span.etiqueta-LimiteCaracter");

                    //Agregar opciones
                    $span.css("color", Op.ColorMensajeInicial);

                    var CantidadLimiteCaracteres = $this.attr("maxlength");
                    var CantidadActualCaracteres = $this.val().trim().length;
                    $span.html("Cantidad Caracteres Permitidos: " + (CantidadLimiteCaracteres - CantidadActualCaracteres));

                    $this.keyup(function () {

                        CantidadActualCaracteres = $this.val().trim().length;

                        if (CantidadActualCaracteres <= CantidadLimiteCaracteres) {

                            if (CantidadLimiteCaracteres >= 50) {

                                (CantidadActualCaracteres >= (CantidadLimiteCaracteres - 20)) ? $span.css("color", Op.ColorMensajeFinal) : $span.css("color", Op.ColorMensajeInicial);
                            }
                            else
                                if (CantidadLimiteCaracteres <= 49 && CantidadLimiteCaracteres >= 21) {

                                    (CantidadActualCaracteres >= (CantidadLimiteCaracteres - 10)) ? $span.css("color", Op.ColorMensajeFinal) : $span.css("color", Op.ColorMensajeInicial);
                                }
                                else {
                                    (CantidadActualCaracteres >= (CantidadLimiteCaracteres - 5)) ? $span.css("color", Op.ColorMensajeFinal) : $span.css("color", Op.ColorMensajeInicial);
                                }

                            $span.html("Cantidad Caracteres Permitidos: " + (CantidadLimiteCaracteres - CantidadActualCaracteres));
                        }

                    });

                    $this.focus(Op.ObtenerFoco);

                });
            }
            else
                $.error('El parametro "LimiteCaracteres" no puede ser cero');
        }
    });

})(jQuery)
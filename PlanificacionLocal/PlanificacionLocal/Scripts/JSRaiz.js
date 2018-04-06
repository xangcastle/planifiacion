function ObtenerRaiz() {

    var RaizGlobal;
    var Ruta = location.host;

    if (Ruta.indexOf("localhost") >= 0 && Ruta.indexOf(":") >= 0) {
        RaizGlobal = '';
    }
    else {
        var NombreRuta = window.location.pathname;
        var DirectorioVirtual = NombreRuta.split('/');
        RaizGlobal = DirectorioVirtual[1];
        RaizGlobal = '/' + RaizGlobal;
    }

    return RaizGlobal;

}
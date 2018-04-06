
function PalabraLogica(n) {
    patronCnst = /[A-ZÁ-Ú]/;
    patronVocal = /[ÁÉÍÓÚAEIOU]/;
    for (var i = $(n).val().toUpperCase(),
    r = 0, u = 0, t = 0, t = 0; t < i.length; t++) patronCnst.test(i[t]) && !patronVocal.test(i[t]) ?
    r++ : patronVocal.test(i[t]) && u++; return r == 0 || u == 0 ? ($(n).addClass("input-validation-error"),
    $(n).val(""), !1) : ($(n).removeClass("input-validation-error"), !0)
}

function validaTexto(n, t) {
    return (tecla = document.all ? n.keyCode : n.which, tecla == 8) ?
        !0 : tecla == 0 ? !0 : tecla == 32 && t ? !0 : (patron = /[a-zA-Zá-úÁ-Ú0-9]/,
        te = String.fromCharCode(tecla), patron.test(te))
}

function validarTextoEspacios(n, t) {
    var i = $(n).val().split(" "),
        r = ""; return i != null && $.each(i, function (n, t) { t != "" && (r = r + t + " ") }),
            $(n).val(r.trim()),
            i != null &&
            (t == 1 && i.length > 1 || t == 0 && i.length > 4) ?
            ($(n).addClass("input-validation-error"), !1) : ($(n).removeClass("input-validation-error"), !0)
}

function numero(n) {
    return (tecla = document.all ? n.keyCode : n.which, tecla == 8) ? !0 : tecla == 0 ? !0 : (patron = /[0-9]/, te = String.fromCharCode(tecla), patron.test(te))
}

function textoValidoDescripcion(n) {
    var h = "", t = 0, r = !1, u = 0, f = 0, e = 0, o = 0, s = 0, i;
    if (n = n.trim(), patron = /[a-zA-Zá-úÁ-Ú0-9/.#,\-() ]/, patronNum = /[0-9]/, n.length > 0) {
        while (t < n.length && !r) patronNum.test(n[t]) && (u = u + 1), n[t] == "#" && e++, n[t] == "," && f++, n[t] == "/" && o++,
            n[t] == "-" && s++, patron.test(n[t]) ? t++ : r = !0; i = parseFloat(n.length); (100 * u / i >= 30 || 100 * e / i >= 30 || 100 * f / i >= 30 || 100 * o / i >= 30 || 100 * s / i >= 30) &&
            (h = "", r = !0)
    } else r = !0; return r ? "" : n
}

function textoValidoHora(n) {
    return (tecla = document.all ? n.keyCode : n.which, tecla == 8) ?
        !0 : tecla == 0 ? !0 : (patron = /[AM-PM:0-9]/,
        te = String.fromCharCode(tecla), patron.test(te))
}

function keypressDescripcion(n) {
    return (tecla = document.all ? n.keyCode : n.which, tecla == 8) ?
        !0 : tecla == 0 ? !0 : (patron = /[a-zA-Zá-úÁ-Ú0-9/.#,\- ]/,
        te = String.fromCharCode(tecla), patron.test(te))
}

function valFecha(n) {
    var t = $(n).val().split("/");
    return t.length == 3 ? (parseInt(t[2]) >= _fchmin && parseInt(t[2]) <= _fchmax) ? !0 : ($(n).val(t[0] + "/" + t[1] + "/"),
        $(n).addClass("input-validation-error"), !1) : ($(n).val(""), $(n).addClass("input-validation-error"), !1)
}

//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function limpiarErrores() {
    document.getElementById("errorIngresos").innerText = "";
    document.getElementById("errorEgresos").innerText = "";
    document.getElementById("errorMonto").innerText = "";
    document.getElementById("errorPlazo").innerText = "";
    document.getElementById("errorTasaInteres").innerText = "";

    document.getElementById("txtIngresos").classList.remove("error-input");
    document.getElementById("txtEgresos").classList.remove("error-input");
    document.getElementById("txtMonto").classList.remove("error-input");
    document.getElementById("txtPlazo").classList.remove("error-input");
    document.getElementById("txtTasaInteres").classList.remove("error-input");
}

function mostrarError(idError, idInput, mensaje) {
    document.getElementById(idError).innerText = mensaje;
    document.getElementById(idInput).classList.add("error-input");
}

function validarFormulario() {
    limpiarErrores();

    let valido = true;

    let ingresosTexto = document.getElementById("txtIngresos").value;
    let egresosTexto = document.getElementById("txtEgresos").value;
    let montoTexto = document.getElementById("txtMonto").value;
    let plazoTexto = document.getElementById("txtPlazo").value;
    let tasaTexto = document.getElementById("txtTasaInteres").value;

    let ingresos = parseFloat(ingresosTexto);
    let egresos = parseFloat(egresosTexto);
    let monto = parseFloat(montoTexto);
    let plazoAnios = parseInt(plazoTexto);
    let tasa = parseFloat(tasaTexto);

    if (ingresosTexto === "") {
        mostrarError("errorIngresos", "txtIngresos", "El ingreso es obligatorio.");
        valido = false;
    } else if (isNaN(ingresos)) {
        mostrarError("errorIngresos", "txtIngresos", "Ingrese solo números.");
        valido = false;
    } else if (ingresos < 100) {
        mostrarError("errorIngresos", "txtIngresos", "El ingreso mínimo es 100.");
        valido = false;
    } else if (ingresos > 100000) {
        mostrarError("errorIngresos", "txtIngresos", "El ingreso máximo es 100000.");
        valido = false;
    }

    if (egresosTexto === "") {
        mostrarError("errorEgresos", "txtEgresos", "El egreso es obligatorio.");
        valido = false;
    } else if (isNaN(egresos)) {
        mostrarError("errorEgresos", "txtEgresos", "Ingrese solo números.");
        valido = false;
    } else if (egresos < 0) {
        mostrarError("errorEgresos", "txtEgresos", "No puede ingresar valores negativos.");
        valido = false;
    } else if (!isNaN(ingresos) && egresos >= ingresos) {
        mostrarError("errorEgresos", "txtEgresos", "Los egresos deben ser menores que los ingresos.");
        valido = false;
    }

    if (montoTexto === "") {
        mostrarError("errorMonto", "txtMonto", "El monto es obligatorio.");
        valido = false;
    } else if (isNaN(monto)) {
        mostrarError("errorMonto", "txtMonto", "Ingrese solo números.");
        valido = false;
    } else if (monto < 500) {
        mostrarError("errorMonto", "txtMonto", "El monto mínimo es 500.");
        valido = false;
    } else if (monto > 50000) {
        mostrarError("errorMonto", "txtMonto", "El monto máximo es 50000.");
        valido = false;
    }

    if (plazoTexto === "") {
        mostrarError("errorPlazo", "txtPlazo", "El plazo es obligatorio.");
        valido = false;
    } else if (isNaN(plazoAnios)) {
        mostrarError("errorPlazo", "txtPlazo", "Ingrese solo números enteros.");
        valido = false;
    } else if (plazoTexto.includes(".")) {
        mostrarError("errorPlazo", "txtPlazo", "El plazo debe ser un número entero.");
        valido = false;
    } else if (plazoAnios < 1) {
        mostrarError("errorPlazo", "txtPlazo", "El plazo mínimo es 1 año.");
        valido = false;
    } else if (plazoAnios > 30) {
        mostrarError("errorPlazo", "txtPlazo", "El plazo máximo es 30 años.");
        valido = false;
    }

    if (tasaTexto === "") {
        mostrarError("errorTasaInteres", "txtTasaInteres", "La tasa es obligatoria.");
        valido = false;
    } else if (isNaN(tasa)) {
        mostrarError("errorTasaInteres", "txtTasaInteres", "Ingrese solo números.");
        valido = false;
    } else if (tasa < 1) {
        mostrarError("errorTasaInteres", "txtTasaInteres", "La tasa mínima es 1%.");
        valido = false;
    } else if (tasa > 50) {
        mostrarError("errorTasaInteres", "txtTasaInteres", "La tasa máxima es 50%.");
        valido = false;
    }

    return valido;
}

function calcular() {

    if (validarFormulario() == false) {
        document.getElementById("spnEstadoCredito").innerText = "CORRIJA LOS ERRORES";
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    let disponible = calcularDisponible(ingresos, egresos);

    document.getElementById("spnDisponible").innerText = "USD " + disponible.toFixed(2);

    let capacidadPago = calcularCapacidadPago(disponible);

    document.getElementById("spnCapacidadPago").innerText = "USD " + capacidadPago.toFixed(2);

    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("spnInteresPagar").innerText = "USD " + interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = "USD " + totalPagar.toFixed(2);

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    document.getElementById("spnCuotaMensual").innerText = "USD " + cuotaMensual.toFixed(2);

    let estadoCredito = aprobarCredito(capacidadPago, cuotaMensual);

    if (estadoCredito == true) {
        document.getElementById("spnEstadoCredito").innerText = "CREDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").innerText = "CREDITO RECHAZADO";
    }
}
document.getElementById("btnReiniciar").addEventListener("click", function () {
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";

    limpiarErrores();
});
//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular (){
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
}

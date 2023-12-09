// Función para calcular las horas trabajadas en un día
function calcularHorasDia(entrada, salida) {
    let horaEntrada = new Date(`2000-01-01T${entrada}`);
    let horaSalida = new Date(`2000-01-01T${salida}`);
    let diferencia = Math.abs(horaSalida - horaEntrada);
    let horasDia = new Date(diferencia).toISOString().substr(11, 5);
    return horasDia;
}

// Función para actualizar los totales
function actualizarTotales() {
    const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    let totalHoras = 0;

    diasSemana.forEach(dia => {
        let entrada = document.querySelector(`.entrada.${dia}`).value;
        let salida = document.querySelector(`.salida.${dia}`).value;
        let totalElemento = document.querySelector(`.horas.${dia}`);

        if (entrada && salida) {
            let horasTrabajadas = calcularHorasDia(entrada, salida);
            totalElemento.textContent = horasTrabajadas;
            totalHoras += Number(horasTrabajadas.substr(0, 2)) * 60 + Number(horasTrabajadas.substr(3, 2));
        } else {
            totalElemento.textContent = '00:00';
        }
    });

    let horas = Math.floor(totalHoras / 60);
    let minutos = totalHoras % 60;
    document.getElementById('total').textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// Evento para cambios en los inputs
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.entrada, .salida').forEach(input => {
        input.addEventListener('change', actualizarTotales);
    });
});
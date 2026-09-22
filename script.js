const tarjetas = document.querySelectorAll('#card-posicion span');

const filas = [
  document.querySelectorAll('#fecha-nacimiento .digito'),
  document.querySelectorAll('#fecha-hoy .digito')
];

// ✅ Mapea cada input (0 a 7) a su tarjeta real (saltándose los guiones)
const mapaPosiciones = [0, 1, 3, 4, 6, 7, 8, 9];

// ✅ Los guiones (posición 3 y 6) siempre están "puestos"
tarjetas[2].classList.add('azul');
tarjetas[5].classList.add('azul');

function actualizarTarjeta(indexInput) {
  const tarjetaIndex = mapaPosiciones[indexInput];
  const algunoConValor = filas.some(fila => fila[indexInput] && fila[indexInput].value !== '');

  if (algunoConValor) {
    tarjetas[tarjetaIndex].classList.add('azul');
  } else {
    tarjetas[tarjetaIndex].classList.remove('azul');
  }
}

filas.forEach((fila) => {
  fila.forEach((input, index) => {

    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');

      actualizarTarjeta(index);

      if (e.target.value !== '' && input.nextElementSibling) {
        const siguiente = input.nextElementSibling;
        if (siguiente.tagName === 'INPUT') siguiente.focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value === '' && input.previousElementSibling) {
        const anterior = input.previousElementSibling;
        if (anterior.tagName === 'INPUT') anterior.focus();
      }
    });

  });
});

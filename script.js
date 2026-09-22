const btnLeer = document.getElementById('btnLeer');
const articulo = document.querySelector('.pregunta');

btnLeer.addEventListener('click', () => {
  // Si ya está leyendo, lo detenemos (funciona como toggle)
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    btnLeer.textContent = '🔊 Leer pregunta';
    return;
  }

  // Armamos el texto uniendo título + párrafo + cada punto de la lista
  const titulo = articulo.querySelector('.titulo').textContent;
  const parrafo = articulo.querySelector('.parrafo').textContent;
  const puntos = [...articulo.querySelectorAll('.lista li')]
    .map((li, i) => `Punto ${i + 1}: ${li.textContent}`)
    .join('. ');

  const textoCompleto = `${titulo}. ${parrafo}. ${puntos}`;

  const utterance = new SpeechSynthesisUtterance(textoCompleto);
  utterance.lang = 'es-MX';
  utterance.rate = 1;

  // Cuando termine de leer, el botón vuelve a su texto original
  utterance.onend = () => {
    btnLeer.textContent = '🔊 Leer pregunta';
  };

  speechSynthesis.speak(utterance);
  btnLeer.textContent = '⏸️ Detener';
});




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

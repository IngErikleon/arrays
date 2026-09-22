document.addEventListener('DOMContentLoaded', () => {

  // ===== BOTÓN DE LECTURA =====
  const btnLeer = document.getElementById('btnLeer');
  const articulo = document.querySelector('.pregunta');

  if (btnLeer && articulo) {
    btnLeer.addEventListener('click', () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        btnLeer.textContent = '🔊 Leer pregunta';
        return;
      }

      const titulo = articulo.querySelector('.titulo')?.textContent || '';
      const parrafo = articulo.querySelector('.parrafo')?.textContent || '';
      const puntos = [...articulo.querySelectorAll('.lista li')]
        .map((li, i) => `Punto ${i + 1}: ${li.textContent}`)
        .join('. ');

      const textoCompleto = `${titulo}. ${parrafo}. ${puntos}`;

      const utterance = new SpeechSynthesisUtterance(textoCompleto);
      utterance.lang = 'es-MX';
      utterance.rate = 1;

      utterance.onend = () => {
        btnLeer.textContent = '🔊 Leer pregunta';
      };

      speechSynthesis.speak(utterance);
      btnLeer.textContent = '⏸️ Detener';
    });
  } else {
    console.warn('No se encontró #btnLeer o .pregunta en el HTML');
  }

  // ===== TU CÓDIGO DE LOS INPUTS DE FECHA =====
  const tarjetas = document.querySelectorAll('#card-posicion span');

  const filas = [
    document.querySelectorAll('#fecha-nacimiento .digito'),
    document.querySelectorAll('#fecha-hoy .digito')
  ];

  const mapaPosiciones = [0, 1, 3, 4, 6, 7, 8, 9];

  if (tarjetas.length) {
    tarjetas[2].classList.add('azul');
    tarjetas[5].classList.add('azul');
  }

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

});

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

  // ===== INPUTS DE FECHA → TARJETAS DE POSICIÓN =====
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

    // ===== COMENTARIOS: se actualizan mientras el maestro va escribiendo =====
  const inputsNac = document.querySelectorAll('#fecha-nacimiento .digito');
  const inputsHoy = document.querySelectorAll('#fecha-hoy .digito');

  const comDia  = document.getElementById('com-dia');
  const comMes  = document.getElementById('com-mes');
  const comAnio = document.getElementById('com-anio');

  const comDiaHoy  = document.getElementById('com-dia-hoy');
  const comMesHoy  = document.getElementById('com-mes-hoy');
  const comAnioHoy = document.getElementById('com-anio-hoy');

  function armarTexto(inputs) {
    const d1 = inputs[0]?.value || '';
    const d2 = inputs[1]?.value || '';
    const m1 = inputs[2]?.value || '';
    const m2 = inputs[3]?.value || '';
    const a1 = inputs[4]?.value || '';
    const a2 = inputs[5]?.value || '';
    const a3 = inputs[6]?.value || '';
    const a4 = inputs[7]?.value || '';

    const dia  = (d1 && d2) ? `${d1}${d2}` : (d1 ? `${d1}?` : '??');
    const mes  = (m1 && m2) ? `${m1}${m2}` : (m1 ? `${m1}?` : '??');
    const anio = `${a1}${a2}${a3}${a4}`.padEnd(4, '?');

    return { dia, mes, anio };
  }

  function actualizarComentarios() {
    if (inputsNac.length) {
      const { dia, mes, anio } = armarTexto(inputsNac);
      if (comDia)  comDia.textContent  = `"${dia}"`;
      if (comMes)  comMes.textContent  = `"${mes}"`;
      if (comAnio) comAnio.textContent = `"${anio}"`;
    }

    if (inputsHoy.length) {
      const { dia, mes, anio } = armarTexto(inputsHoy);
      if (comDiaHoy)  comDiaHoy.textContent  = `"${dia}"`;
      if (comMesHoy)  comMesHoy.textContent  = `"${mes}"`;
      if (comAnioHoy) comAnioHoy.textContent = `"${anio}"`;
    }
  }

  [...inputsNac, ...inputsHoy].forEach(input => {
    input.addEventListener('input', actualizarComentarios);
    input.addEventListener('keydown', actualizarComentarios);
  });

  actualizarComentarios();
  });

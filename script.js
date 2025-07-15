document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.ramo');
  let estado = JSON.parse(localStorage.getItem('estadoRamos')) || {};

  // Inicializar botones
  botones.forEach(boton => {
    const id = boton.dataset.id;
    const req = boton.dataset.req;

    if (estado[id]) {
      boton.classList.add('aprobado');
      boton.disabled = true;
    } else if (req) {
      const requisitos = req.split(' ');
      if (!requisitos.every(r => estado[r])) {
        boton.disabled = true;
        boton.classList.add('bloqueado');
      }
    }
  });

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('aprobado')) return;

      boton.classList.add('aprobado');
      boton.disabled = true;
      const id = boton.dataset.id;
      if (!id) return;
      estado[id] = true;
      localStorage.setItem('estadoRamos', JSON.stringify(estado));

      // Revisar qué ramos dependen de este
      botones.forEach(destino => {
        const requisitos = destino.dataset.req?.split(' ');
        if (!estado[destino.dataset.id] && requisitos && requisitos.every(req => estado[req])) {
          destino.disabled = false;
          destino.classList.remove('bloqueado');
        }
      });
    });
  });
});


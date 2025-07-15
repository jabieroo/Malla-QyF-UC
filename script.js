document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(boton => {
    if (boton.classList.contains("bloqueado")) {
      boton.disabled = true;
    }

    boton.addEventListener("click", () => {
      if (boton.classList.contains("bloqueado")) return;

      boton.classList.add("aprobado");
      boton.disabled = true;

      const abre = boton.dataset.abre?.split(",") || [];
      abre.forEach(id => {
        const siguiente = document.querySelector(`[data-id='${id}']`);
        if (siguiente && requisitosAprobados(siguiente)) {
          siguiente.disabled = false;
          siguiente.classList.remove("bloqueado");
        }
      });
    });
  });

  function requisitosAprobados(boton) {
    const prereqs = boton.dataset.prereqs?.split(",") || [];
    return prereqs.every(id => {
      const req = document.querySelector(`[data-id='${id}']`);
      return req && req.classList.contains("aprobado");
    });
  }
});

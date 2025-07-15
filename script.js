const ramos = [
  { id: "qg1", nombre: "Química general I", requisitos: [], abre: ["qg2"] },
  { id: "mundo", nombre: "El mundo de los medicamentos", requisitos: [], abre: ["botanica"] },
  { id: "precalculo", nombre: "Precálculo", requisitos: [], abre: ["calculo1"] },
  { id: "intro", nombre: "Introducción a las ciencias farmacéuticas", requisitos: [], abre: [] },
  { id: "labqg1", nombre: "Laboratorio de química general I", requisitos: [], abre: [] },
  { id: "electivo1", nombre: "Electivo", requisitos: [], abre: [] },

  { id: "qg2", nombre: "Química general II", requisitos: ["qg1"], abre: ["botanica", "qo1", "qa1", "qf"] },
  { id: "calculo1", nombre: "Cálculo I", requisitos: ["precalculo"], abre: ["estadistica", "qf"] },
  { id: "fisica", nombre: "Física para ciencias", requisitos: [], abre: ["qf"] },
  { id: "electivo2", nombre: "Electivo", requisitos: [], abre: [] },
  { id: "electivo3", nombre: "Electivo", requisitos: [], abre: [] },

  { id: "botanica", nombre: "Botánica y farmacognosia", requisitos: ["mundo", "qg2"], abre: [] },
  { id: "qo1", nombre: "Química orgánica I", requisitos: ["qg2"], abre: ["qo2"] },
  { id: "estadistica", nombre: "Estadística para QF", requisitos: ["calculo1"], abre: ["qa1"] },
  { id: "bio", nombre: "Biología de la célula", requisitos: [], abre: ["fisio"] },
  { id: "qo2", nombre: "Química orgánica II", requisitos: ["qo1"], abre: ["labqo", "bioq"] },
  { id: "qa1", nombre: "Química analítica I", requisitos: ["estadistica", "qg2"], abre: ["ai"] },
  { id: "fisio", nombre: "Fisiología", requisitos: ["bio"], abre: ["micro", "fisioPat"] },

  { id: "labqo", nombre: "Laboratorio de química orgánica", requisitos: ["qo2"], abre: ["fq1"] },
  { id: "bioq", nombre: "Bioquímica", requisitos: ["qo2"], abre: ["micro", "bioqClin", "farm1"] },
  { id: "qf", nombre: "Química-Física", requisitos: ["qg2", "calculo1", "fisica"], abre: ["farmacoK", "fq1"] },
  { id: "fisioPat", nombre: "Fisiopatología", requisitos: ["fisio"], abre: ["farm1", "bioqClin"] },

  { id: "micro", nombre: "Microbiología e inmunología", requisitos: ["bioq", "fisio"], abre: [] },
  { id: "farm1", nombre: "Farmacología I", requisitos: ["bioq", "fisioPat"], abre: ["farm2", "saludPublica"] },
  { id: "fq1", nombre: "Fármaco-química I", requisitos: ["labqo", "qf"], abre: ["fq2", "legislacion"] },
  { id: "farmacoK", nombre: "Farmacocinética y Biofarmacia", requisitos: ["qf"], abre: ["tecfarma1"] },

  { id: "bioqClin", nombre: "Bioquímica clínica", requisitos: ["bioq", "fisioPat"], abre: [] },
  { id: "farm2", nombre: "Farmacología II", requisitos: ["farm1"], abre: ["farm3", "farmaciaClinica"] },
  { id: "fq2", nombre: "Fármaco-química II", requisitos: ["fq1"], abre: ["toxico", "fq3", "farmaciaClinica", "tecfarma2"] },
  { id: "tecfarma1", nombre: "Tecnología farmacéutica I", requisitos: ["farmacoK"], abre: ["tesis", "practica1", "tecfarma2"] },

  { id: "toxico", nombre: "Toxicología", requisitos: ["fq2"], abre: [] },
  { id: "tesis", nombre: "Tesis", requisitos: ["tecfarma1"], abre: [] },

  { id: "farm3", nombre: "Farmacología III", requisitos: ["farm2"], abre: [] },
  { id: "fq3", nombre: "Fármaco-química III", requisitos: ["fq2"], abre: ["farmaciaPrivada"] },
  { id: "farmaciaClinica", nombre: "Farmacia clínica y Atención farmacéutica", requisitos: ["farm2", "fq2"], abre: ["internado"] },
  { id: "tecfarma2", nombre: "Tecnología farmacéutica II", requisitos: ["tecfarma1", "fq2"], abre: [] },

  { id: "opr1", nombre: "OPR", requisitos: [], abre: [] },
  { id: "practica1", nombre: "Práctica profesional I", requisitos: ["tecfarma1"], abre: ["practica2"] },

  { id: "saludPublica", nombre: "Salud pública para QF", requisitos: ["farm1"], abre: [] },
  { id: "internado", nombre: "Internado clínico", requisitos: ["farmaciaClinica"], abre: [] },
  { id: "farmaciaPrivada", nombre: "Farmacia privada", requisitos: ["fq3"], abre: [] },
  { id: "legislacion", nombre: "Legislación y Deontología farmacéutica", requisitos: ["fq1"], abre: [] },
  { id: "opr2", nombre: "OPR", requisitos: [], abre: [] },
  { id: "opr3", nombre: "OPR", requisitos: [], abre: [] },
  { id: "practica2", nombre: "Práctica profesional II", requisitos: ["practica1"], abre: [] },
];

const malla = document.getElementById("malla");
const ramosMap = {};

ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.id = ramo.id;
  div.textContent = ramo.nombre;
  if (ramo.requisitos.length > 0) div.classList.add("bloqueado");
  ramosMap[ramo.id] = { ...ramo, div, aprobado: false };
  div.addEventListener("click", () => aprobarRamo(ramo.id));
  malla.appendChild(div);
});

function aprobarRamo(id) {
  const ramo = ramosMap[id];
  if (ramo.requisitos.some(req => !ramosMap[req].aprobado)) return;
  if (ramo.aprobado) return;
  ramo.aprobado = true;
  ramo.div.classList.remove("bloqueado");
  ramo.div.classList.add("aprobado");
  ramo.abre.forEach(idDest => {
    const destino = ramosMap[idDest];
    if (destino.requisitos.every(req => ramosMap[req].aprobado)) {
      destino.div.classList.remove("bloqueado");
    }
  });
}

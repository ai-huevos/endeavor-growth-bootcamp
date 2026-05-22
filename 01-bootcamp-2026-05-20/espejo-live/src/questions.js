export const SESSION_CODE = "MEDE2605";

export const QUESTIONS = [
  {
    tag: "pregunta 1 de 6",
    text: "Esta semana, ¿cuántas decisiones del proceso comercial pasaron por ti?",
    hint: "decisión = un sí/no que cambia el rumbo de un deal o campaña",
    options: [
      { text: "Más de 10. Soy el filtro de casi todo.", scores: { medir: 0, founder: 3, decisiones: 3 } },
      { text: "Entre 5 y 10. Los temas importantes pasan por mí.", scores: { medir: 0, founder: 2, decisiones: 2 } },
      { text: "Menos de 5. Hay criterios claros que el equipo aplica.", scores: { medir: 0, founder: 0, decisiones: 0 } },
      { text: "No sé contarlas. No las trackeo.", scores: { medir: 3, founder: 2, decisiones: 1 } },
    ],
  },
  {
    tag: "pregunta 2 de 6",
    text: "Si te preguntan tu CAC real hoy mismo, ¿qué pasa?",
    hint: "CAC = costo de adquisición de un cliente, en pesos, incluyendo todo el esfuerzo",
    options: [
      { text: "Te lo digo exacto. Lo monitoreo mensualmente.", scores: { medir: 0 } },
      { text: "Te doy una estimación cualitativa.", scores: { medir: 2 } },
      { text: "Sé que es algo, pero no lo he calculado.", scores: { medir: 3 } },
      { text: "No tengo idea. Y creo que tampoco lo necesito.", scores: { medir: 3, ia: 1 } },
    ],
  },
  {
    tag: "pregunta 3 de 6",
    text: "¿Cuál es tu próximo lead magnet?",
    hint: "lead magnet = el activo gratuito que entregas para capturar contacto",
    options: [
      { text: "No tengo. La gente nos llega por referidos.", scores: { normativo: 3, traduccion: 1 } },
      { text: "Un ebook genérico sobre 'tendencias' o 'tips'.", scores: { normativo: 2 } },
      { text: "Un diagnóstico/calculadora basado en datos propios.", scores: { normativo: 0, traduccion: 0 } },
      { text: "Algo derivado de una norma o regulación reciente.", scores: { normativo: 0 } },
    ],
  },
  {
    tag: "pregunta 4 de 6",
    text: "Cuando explicas tu producto a un cliente no-técnico, ¿qué pasa?",
    hint: "cliente no-técnico = el decisor de compra, no el usuario técnico final",
    options: [
      { text: "Lo entiende rápido. La conversión a demo es alta.", scores: { traduccion: 0 } },
      { text: "Necesita 5–10 minutos. A veces no cierra.", scores: { traduccion: 2 } },
      { text: "Casi nunca entiende. Lo decidimos con su CTO.", scores: { traduccion: 3, founder: 1 } },
      { text: "No estoy seguro. Casi siempre lo explico yo.", scores: { traduccion: 2, founder: 2 } },
    ],
  },
  {
    tag: "pregunta 5 de 6",
    text: "Tu producto premium (más caro), ¿cuánto representa de tu revenue?",
    hint: "premium = el producto/servicio top-tier de tu portfolio",
    options: [
      { text: "Más del 30%. Es nuestra columna vertebral.", scores: { precio: 0 } },
      { text: "Entre 10–30%. Lo vendemos cuando podemos.", scores: { precio: 1 } },
      { text: "Menos del 10%. Casi todo es producto core.", scores: { precio: 2 } },
      { text: "0%. No tengo premium o lo regalo como bonus.", scores: { precio: 3 } },
    ],
  },
  {
    tag: "pregunta 6 de 6",
    text: "Si tuvieras que resolver UN problema en 90 días, ¿cuál es?",
    hint: "fuerza la elección — si tarda más de 30 segundos en responder, no hay claridad",
    options: [
      { text: "Tengo claridad. Lo puedo decir en una línea.", scores: { revenuehole: 0 } },
      { text: "Tengo 2 candidatos. Cuesta elegir.", scores: { revenuehole: 1 } },
      { text: "Tengo 5+. No sé por dónde empezar.", scores: { revenuehole: 3, founder: 1 } },
      { text: "Depende del día. Cambio de foco constantemente.", scores: { revenuehole: 3, founder: 2, decisiones: 1 } },
    ],
  },
];

export const TRAMPAS = {
  medir: {
    name: "Pides tácticas. Necesitas instrumentos.",
    reframe: "Tu problema no es vender más. Es que no estás midiendo lo que ya estás haciendo, así que no puedes saber qué pieza arreglar. Sin baseline, cualquier acción es ruido.",
    actions: [
      "Semana 1: define tu CAC real. Si toma 2h, está bien. Es el número que va a ordenar todo lo demás.",
      "Semana 2: instala 3 etapas claras en tu CRM con criterio de paso medible. Sin esto, el pipeline es opinión.",
      "Semana 3: dashboard de 5 KPIs leading. Si no anticipa, no sirve.",
    ],
    cluster: "Cluster B · funnel roto en la mitad",
  },
  founder: {
    name: "Tu sistema se llama tu nombre.",
    reframe: "El cuello de botella no es el equipo, ni la herramienta. Eres tú. Tu CRM funciona en proporción inversa a las decisiones que pasan por ti.",
    actions: [
      "Semana 1: lista las 10 decisiones que tomaste esta semana. Para cada una, escribe el criterio. Eso es un manual.",
      "Semana 2: identifica 3 decisiones que alguien más puede tomar con ese criterio. Delegátelas.",
      "Semana 3: lee The E Myth de Michael Gerber. Es el atajo intelectual a esto.",
    ],
    cluster: "Cluster A · vendes por relación",
  },
  ia: {
    name: "Pides a la IA que venda. Debería pensar.",
    reframe: "La IA no automatiza ventas. Automatiza tu pensamiento. Es tu becario senior, no tu sales rep. Aguas arriba del proceso, no aguas abajo.",
    actions: [
      "Semana 1: usa IA para el primer 60% de cada propuesta. El último 40% lo haces tú.",
      "Semana 2: brief pre-call automático antes de cada discovery. Te ahorra 20 min × 5 calls = 100 min/sem.",
      "Semana 3: resumen post-call estructurado + draft de follow-up automático.",
    ],
    cluster: "Cluster A · vendes por relación",
  },
  normativo: {
    name: "Buscas un lead magnet. La norma te lo da gratis.",
    reframe: "El lead magnet no se inventa. Se extrae de la última actualización normativa de tu industria. ¿Qué decreto o resolución le quita el sueño a tu cliente esta semana?",
    actions: [
      "Semana 1: identifica los 3 cambios normativos/regulatorios más recientes en tu industria.",
      "Semana 2: convierte UNO en un 'Decoder' — un PDF que traduce la norma a acciones operativas. 6 páginas máximo.",
      "Semana 3: distribuye a tu base + LinkedIn. Mide leads cualificados (no descargas).",
    ],
    cluster: "Cluster B · funnel roto en la mitad",
  },
  traduccion: {
    name: "Tu diferencial es técnico. El cliente no es técnico.",
    reframe: "Tu equipo técnico es brillante. Pero si la cosa más impresionante de tu producto necesita 3 minutos para que la entienda un decisor de compra, no es impresionante. Es invisible.",
    actions: [
      "Semana 1: graba 5 demos. Cuenta cuántos segundos pasan antes de mencionar UNA palabra técnica. Bench: <60s OK.",
      "Semana 2: reescribe tu landing en lenguaje de outcome del cliente. Cero jerga técnica.",
      "Semana 3: 3 casos de éxito con métricas en el idioma del COMPRADOR, no del usuario.",
    ],
    cluster: "Cluster C · producto sí, sistema no",
  },
  precio: {
    name: "Estás vendiendo premium a precio de bait.",
    reframe: "El producto que tienes es premium. El precio que cobras es bait. Esa asimetría es por qué tu pipeline crece pero la cuenta de banco no.",
    actions: [
      "Semana 1: documenta qué entregas en horas/$ a tu cliente más reciente. Compara con el precio cobrado.",
      "Semana 2: crea un tier premium (3-10× tu precio actual) y véndelo al próximo prospecto que califique.",
      "Semana 3: identifica 5 clientes actuales candidatos a upgrade. Tu próximo revenue está en tu base instalada.",
    ],
    cluster: "Cluster C · producto sí, sistema no",
  },
  revenuehole: {
    name: "Tienes 5 problemas. Tienes UNO.",
    reframe: "Los 5 problemas son síntomas del UN problema. Hasta que no destiles cuál es el Revenue Hole — el hueco prioritario en una sola línea — tu equipo va a estar disperso.",
    actions: [
      "Semana 1: ejercicio Revenue Hole con tu equipo core. 30 min. Una sola línea. Si no convergen, hay un problema de visión.",
      "Semana 2: alinea las próximas 4 semanas de trabajo del equipo SÓLO al Revenue Hole. Lo demás se pausa.",
      "Semana 3: review semanal: ¿esto movió el Revenue Hole? Si no, se mata.",
    ],
    cluster: "Cluster B · funnel roto en la mitad",
  },
  decisiones: {
    name: "Cambias de foco constantemente.",
    reframe: "No automatizas tareas. Automatizas decisiones. Toda decisión que tomas dos veces igual se vuelve criterio, y todo criterio se delega.",
    actions: [
      "Semana 1: decision log diario. Cada decisión: contexto, decisión, criterio, quién más podría haberla tomado.",
      "Semana 2: identifica los 3 criterios más repetidos. Escríbelos como mini-manual de 1 página cada uno.",
      "Semana 3: delega esas 3 decisiones a alguien del equipo.",
    ],
    cluster: "Cluster A · vendes por relación",
  },
};

export function computeTrampa(answers) {
  const totals = {};
  answers.forEach((optionIndex, qIndex) => {
    if (optionIndex === null) return;
    const scores = QUESTIONS[qIndex].options[optionIndex].scores;
    Object.entries(scores).forEach(([key, val]) => {
      totals[key] = (totals[key] || 0) + val;
    });
  });
  let top = null, max = -1;
  Object.entries(totals).forEach(([k, v]) => {
    if (v > max) { max = v; top = k; }
  });
  return top || "revenuehole";
}

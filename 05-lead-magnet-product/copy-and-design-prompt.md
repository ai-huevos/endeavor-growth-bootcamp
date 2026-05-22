# Lead Magnet · El Espejo del Founder · COPY + Claude Design Prompt

**Producto:** Tripwire $9 USD
**Entrega:** PDF 4 páginas personalizado por trampa + Loom embedded + acceso masterclass
**Fulfillment:** Stripe → GHL webhook → Mailgun adjunta PDF → email <60s
**Para generar el PDF visual:** copiar el "PROMPT PARA CLAUDE DESIGN" abajo en una nueva conversación de claude.ai

---

## PARTE 1 · Arquitectura del PDF (mismo para las 8 trampas)

```
┌──────────────────────────────────────┐
│ PÁGINA 1 — COVER                     │
│ • Logo huevito + brand mark          │
│ • "El Espejo del Founder"            │
│ • {{founder_name}}, {{company}}       │
│ • Trampa: "[NOMBRE PUNCHY]"           │
│ • Fecha emisión                       │
│ • Visual de identidad (yellow accent)│
├──────────────────────────────────────┤
│ PÁGINA 2 — EL REFRAME                │
│ • Header: "Lo que viste"             │
│ • El reframe expandido (3 párrafos)   │
│ • Quote pull (frase memorable)        │
│ • Contexto: por qué esta trampa       │
│ • Cluster identificado                │
├──────────────────────────────────────┤
│ PÁGINA 3 — EL PLAN DE 3 SEMANAS      │
│ • Header: "Lo que vas a hacer"       │
│ • Card semana 1 — action + sucesso    │
│ • Card semana 2 — action + sucesso    │
│ • Card semana 3 — action + sucesso    │
│ • Footer: "si terminas las 3..."      │
├──────────────────────────────────────┤
│ PÁGINA 4 — LO QUE SIGUE              │
│ • Loom embebido (link grande)         │
│ • Acceso masterclass (link)          │
│ • Newsletter signup                   │
│ • Discovery call optional             │
│ • Footer brand                        │
└──────────────────────────────────────┘
```

### Merge tags (variables que se inyectan por compra)

```
{{founder_name}}        → nombre del comprador
{{company}}             → empresa del comprador
{{trampa_name}}         → nombre punchy de la trampa
{{trampa_key}}          → identificador (medir, founder, ia, etc.)
{{cluster_name}}        → "Cluster B · funnel roto en la mitad"
{{reframe_body}}        → el reframe expandido (per trampa)
{{quote_pull}}          → frase memorable destacada
{{action_w1_title}}, {{action_w1_body}}, {{action_w1_success}}
{{action_w2_title}}, {{action_w2_body}}, {{action_w2_success}}
{{action_w3_title}}, {{action_w3_body}}, {{action_w3_success}}
{{loom_url}}            → URL del Loom específico de su trampa
{{masterclass_url}}     → URL video privado del 20 May
{{newsletter_url}}      → URL signup newsletter
{{discovery_url}}       → URL calendar discovery
{{purchase_date}}       → fecha de compra (DD MMM YYYY)
```

---

## PARTE 2 · COPY por trampa

> **Importante:** el "reframe_body" usa spanglish natural (D1). El "quote_pull" siempre va literal del questions.js para mantener la voz canon vista en bootcamp.

### Trampa "medir"

```yaml
trampa_name: "Pides tácticas. Necesitas instrumentos."
cluster_name: "Cluster B · funnel roto en la mitad"
quote_pull: "Sin baseline, cualquier acción es ruido."

reframe_body: |
  Tu problema no es que necesites vender más. Tu problema es que no estás midiendo
  lo que ya estás haciendo, así que no puedes saber qué pieza arreglar primero.
  
  Lo veo cada semana en diagnósticos Endeavor: founders con producto sólido,
  equipo brillante, y pipeline 100% en la cabeza del fundador. Cuando pregunto
  cuántas decisiones del proceso comercial pasaron por ti esta semana — silencio.
  CAC — silencio. Cómo va el lead que entró el lunes — silencio.
  
  La trampa es pedir tácticas (más outbound, mejor copy, agencia de pauta) cuando
  lo que necesitas son instrumentos. Tablero de medición antes que el siguiente
  experimento. Sin baseline, cualquier acción es ruido.

action_w1_title: "Define tu CAC real esta semana"
action_w1_body: |
  Aunque te tome 2 horas. Aunque salga sucio. Suma todo lo que gastas en adquirir
  clientes (marketing + tiempo del equipo comercial × costo/hora + herramientas)
  y divídelo por los clientes cerrados último trimestre. Ese número va a ordenar
  todo lo demás.
action_w1_success: "Si puedes decirlo en una línea sin abrir un Excel, está limpio."

action_w2_title: "3 etapas en tu CRM con criterio de paso medible"
action_w2_body: |
  Mínimo viable: Lead → Discovery → Cotización → Cierre. Para cada paso, define
  qué tiene que pasar para mover al lead al siguiente stage. Sin esto, el
  pipeline es opinión, no instrumento.
action_w2_success: "Cualquiera del equipo puede mirar el CRM y saber qué hacer con cada lead."

action_w3_title: "Dashboard de 5 KPIs leading"
action_w3_body: |
  Leading = anticipa, no reporta. Discovery calls/sem, propuestas enviadas/sem,
  tiempo promedio en cada stage, tasa de conversión Discovery→Cotización,
  pipeline value. Si tu dashboard solo mira revenue cerrado, ya es tarde.
action_w3_success: "Miras el dashboard el lunes y sabes qué va a pasar el viernes."
```

### Trampa "founder"

```yaml
trampa_name: "Tu sistema se llama tu nombre."
cluster_name: "Cluster A · vendes por relación"
quote_pull: "Tu CRM funciona en proporción inversa a las decisiones que pasan por ti."

reframe_body: |
  El cuello de botella no es tu equipo, ni la herramienta, ni el mercado.
  Eres tú actuando como técnico. Tú aprobando cada cotización porque "cada
  cliente es distinto". Tú resolviendo el ticket en lugar de escribir el
  procedimiento. Tú diciéndole al equipo qué hacer con cada lead nuevo.
  
  La asimetría es esta: si todas las decisiones pasan por ti, tu CRM es
  teatro. Por eso muchos founders sienten que "el equipo no funciona" — pero
  en realidad el equipo está esperando criterios escritos que nunca llegaron.
  
  Esto no se arregla contratando más gente. Se arregla con un decision log:
  cualquier decisión que tomas dos veces igual se vuelve criterio. Y todo
  criterio se delega.

action_w1_title: "Lista las 10 decisiones de esta semana + el criterio"
action_w1_body: |
  Cada decisión: una línea de contexto, una línea de criterio que usaste,
  una línea con quién más podría haberla tomado. Esa lista es un manual.
action_w1_success: "Lees la lista y reconoces patrones — eso es la base de tu sistema."

action_w2_title: "Identifica 3 decisiones para delegar"
action_w2_body: |
  De las 10, las 3 más obvias para que otro las tome con tu criterio escrito.
  No las más fáciles — las más repetitivas. Esas son las que te quitan tiempo
  estratégico hoy.
action_w2_success: "Las 3 personas que las van a tomar las leen y entienden sin preguntarte."

action_w3_title: "Lee The E-Myth de Michael Gerber"
action_w3_body: |
  Es el atajo intelectual a este problema. 200 páginas, lectura de fin de
  semana. Explica por qué la mayoría de fundadores se vuelve técnico
  atrapado en lugar de empresario.
action_w3_success: "Terminas el libro y tienes vocabulario para tu siguiente reorganización."
```

### Trampa "ia"

```yaml
trampa_name: "Pides a la IA que venda. Debería pensar."
cluster_name: "Cluster A · vendes por relación"
quote_pull: "La IA es tu becario senior, no tu sales rep."

reframe_body: |
  El error que veo cada semana en founders LatAm: quieren AI agents que
  cierren deals, bots que respondan WhatsApp, outbound automatizado al
  máximo. Y luego se sorprenden cuando los leads se sienten como spam.
  
  La IA no automatiza ventas. Automatiza tu pensamiento. Es tu becario
  senior, no tu sales rep. Aguas arriba del proceso, no aguas abajo.
  
  El move correcto: usa IA para acelerar el pre-call, el draft de propuesta,
  el resumen post-call. La conversación humana se queda humana. Y tu
  output mejora 4x porque liberas las horas que estabas perdiendo en tareas
  cognitivas repetitivas.

action_w1_title: "IA para el primer 60% de cada propuesta"
action_w1_body: |
  Próxima cotización: dale a Claude/GPT el contexto del cliente + lo que
  cobras + outcome esperado. Te genera el 60% del documento. Tú haces
  el 40% final — el pricing, la negociación, el cierre.
action_w1_success: "Reduces tiempo de cotización de 2h a 45 min sin perder calidad."

action_w2_title: "Brief pre-call automatizado antes de cada discovery"
action_w2_body: |
  20 minutos × 5 calls/sem = 100 min liberados. Automation: enviar URL
  empresa → AI resume noticias, funding, signals + sugiere 3 preguntas
  específicas para abrir la call.
action_w2_success: "Llegas a la call con contexto que el lead nota — y conversion sube."

action_w3_title: "Post-call estructurado + draft de follow-up"
action_w3_body: |
  Termina la call → AI genera resumen (decisiones, next steps, objeciones)
  + draft del email follow-up. Solo revisas y envías. Cierre acelera por
  velocidad de respuesta.
action_w3_success: "Follow-up sale el mismo día — no 48 horas después como ahora."
```

### Trampa "normativo"

```yaml
trampa_name: "Buscas un lead magnet. La norma te lo da gratis."
cluster_name: "Cluster B · funnel roto en la mitad"
quote_pull: "¿Qué decreto le quita el sueño a tu cliente esta semana?"

reframe_body: |
  El lead magnet no se inventa. No te sientas en blanco a "pensar qué ebook
  hacer". La regla, el decreto, la resolución reciente de tu industria — ESA
  es tu lead magnet. Está escrito por el gobierno, gratis, y le quita el
  sueño a tu cliente esta semana.
  
  La trampa es asumir que el lead magnet tiene que ser una invención original.
  No tiene que serlo. El valor está en la decodificación — traducir 50
  páginas de jerga regulatoria a 6 páginas de "qué tienes que hacer
  operativamente". Eso es oro para tu prospect.
  
  Los founders de tu industria que están usando este patrón están capturando
  los leads cualificados. Los que no, están haciendo "ebook de 10 tips de
  productividad" que nadie descarga ni lee.

action_w1_title: "Identifica los 3 cambios normativos más recientes de tu industria"
action_w1_body: |
  Google "[tu sector] resolución 2026", "[tu sector] decreto 2026". Lee
  Superintendencia, MinSalud, MinCIT, según industria. 60 minutos de
  búsqueda. Resultado: lista de 3 cambios con fecha + autoridad.
action_w1_success: "Tienes los 3 escritos en una hoja con qué obligación crean."

action_w2_title: "Convierte UNO en un Decoder PDF"
action_w2_body: |
  Eliges el más relevante. 6 páginas máximo: qué dice la norma, qué tienes
  que hacer operativamente, errores típicos, checklist. Diseño limpio,
  no copies la resolución — decodifícala.
action_w2_success: "Tu cliente actual lo lee y dice 'esto me ahorra horas'."

action_w3_title: "Distribuye + mide leads (no descargas)"
action_w3_body: |
  LinkedIn post + email a tu base + DM a 20 cuentas target con link. La
  métrica que cuenta no es descargas — es leads cualificados que llegan
  a hablar contigo desde el PDF.
action_w3_success: "Al menos 3 leads cualificados con role + empresa identificable en 2 semanas."
```

### Trampa "traduccion"

```yaml
trampa_name: "Tu diferencial es técnico. El cliente no es técnico."
cluster_name: "Cluster C · producto sí, sistema no"
quote_pull: "Si necesita 3 minutos de explicación, no es impresionante. Es invisible."

reframe_body: |
  Tu equipo técnico es brillante. Eso no está en discusión. Pero la cosa
  más impresionante de tu producto, si necesita 3 minutos para que un
  decisor de compra la entienda, no es impresionante. Es invisible.
  
  El error patrón: founders técnicos hablando en el lenguaje del USUARIO
  técnico — el que va a usar el producto — y olvidando que el que firma
  el cheque NO ES el usuario técnico. Es el director financiero, el VP, el
  CEO. Y ese cliente piensa en OUTCOME, no en FEATURE.
  
  "Usamos LLMs propios entrenados en tu data" → es feature, invisible.
  "Reducimos tu tiempo de conciliación de 12 días a 1" → es outcome, vendible.
  La traducción no es opcional. Es la conversación misma.

action_w1_title: "Graba 5 demos esta semana"
action_w1_body: |
  No demos nuevas — graba las que ya haces normalmente. Cuenta cuántos
  segundos pasan antes de que menciones UNA palabra técnica. Bench: <60s OK.
action_w1_success: "Tienes el dato cuantificado: 'menciono X técnica al segundo Y'."

action_w2_title: "Reescribe tu landing page en lenguaje de outcome"
action_w2_body: |
  Cero jerga técnica. Cada beneficio en términos de plata, horas, riesgo,
  o competitividad. Si una frase no pasa el test de "¿esto importa para
  el CFO?", se borra.
action_w2_success: "Tu CFO ideal lee la landing y dice 'esto resuelve mi problema'."

action_w3_title: "3 casos de éxito con métricas en idioma del comprador"
action_w3_body: |
  No "implementamos 12 features". Sí "el cliente X subió revenue 23% en 4
  meses". No "redujimos latencia 80ms". Sí "su equipo legal recuperó 6
  horas semanales".
action_w3_success: "Compartes los 3 casos en LinkedIn y los DMs llegan de CEOs, no de CTOs."
```

### Trampa "precio"

```yaml
trampa_name: "Estás vendiendo premium a precio de bait."
cluster_name: "Cluster C · producto sí, sistema no"
quote_pull: "Monetización tiene 4x más impacto que adquisición."

reframe_body: |
  El producto que entregas es premium. El servicio que das es premium. La
  calidad de tu output es premium. El precio que cobras es bait. Esa
  asimetría es exactamente la razón de que tu pipeline crezca pero tu
  cuenta de banco no.
  
  Patrick Campbell tiene mil estudios sobre esto: monetización tiene 4x más
  impacto en crecimiento que adquisición. 4x. Es decir, subir precio mueve
  la aguja 4 veces más que conseguir más leads. Y duele menos que diluirte
  buscando capital.
  
  La trampa es psicológica, no estratégica: muchos founders LatAm tienen
  un techo mental de cuánto pueden cobrar. Ese techo está bajo. Y los
  clientes premium que podrían pagar 5-10x más están firmando contratos
  donde tu margen real es 15%, cuando debería ser 60%.

action_w1_title: "Audita lo que entregaste a tu último cliente"
action_w1_body: |
  Cuenta horas dedicadas (team incluido). Multiplica por costo/hora real.
  Suma herramientas usadas. Compara con lo que cobraste. Vas a ver la
  asimetría en blanco y negro.
action_w1_success: "Sabes tu margen real por cliente — no el margen 'estimado'."

action_w2_title: "Crea un tier premium 3-10x el precio actual"
action_w2_body: |
  Mismo entregable core + 2-3 cosas que solo los premium reciben (priority
  delivery, custom integrations, mentoría 1:1, lo que sea defendible). Y
  ofrécelo al próximo prospect que califique — no a todos, a UNO.
action_w2_success: "Cierras al menos 1 cliente en tier premium en las próximas 4 semanas."

action_w3_title: "Identifica 5 clientes actuales candidatos a upgrade"
action_w3_body: |
  Tu próximo revenue está en tu base instalada, no buscando leads nuevos.
  ¿Quiénes de tus clientes actuales se beneficiarían más del tier premium?
  Esos son los que llamas esta semana con la propuesta de upgrade.
action_w3_success: "Al menos 2 upgrades cerrados en 30 días."
```

### Trampa "revenuehole"

```yaml
trampa_name: "Tienes 5 problemas. Tienes UNO."
cluster_name: "Cluster B · funnel roto en la mitad"
quote_pull: "Los 5 problemas son síntomas del UN problema."

reframe_body: |
  Los 5 problemas que tienes son síntomas del UN problema. Y mientras los
  trates como 5 problemas separados, tu equipo va a estar disperso, tu
  calendario va a estar disperso, y tu pipeline va a sentirse como una
  orquesta sin director.
  
  Esto se llama Revenue Hole: el hueco prioritario de tu negocio, en UNA
  línea. Si tu equipo core no puede escribir esa línea en 30 segundos sin
  discutir, ahí está tu problema real. No es operativo. Es de claridad
  estratégica.
  
  El reto: cuando hagas el ejercicio honestamente, vas a descubrir que
  muchas de tus "prioridades urgentes" no mueven el Revenue Hole. Pero
  parecen urgentes. La disciplina de matarlas es la diferencia entre
  empresa con dirección y empresa con ansiedad disfrazada de productividad.

action_w1_title: "Ejercicio Revenue Hole con tu equipo core"
action_w1_body: |
  30 minutos. Cada uno escribe el Revenue Hole en una hoja, UNA línea.
  Comparan. Si convergen, bien. Si no convergen — has descubierto algo
  más valioso que cualquier plan estratégico: hay un problema de visión
  compartida.
action_w1_success: "El equipo core puede recitar el Revenue Hole de memoria a la semana siguiente."

action_w2_title: "Alinea las próximas 4 semanas al Revenue Hole"
action_w2_body: |
  Lo demás se pausa. Sí, lo demás. Especialmente las cosas urgentes que
  no son importantes. Cada lunes review: ¿qué hacemos esta semana que
  mueve el Revenue Hole?
action_w2_success: "Tu calendario y el del equipo está 80% dedicado al hueco prioritario."

action_w3_title: "Review semanal: ¿esto movió el Revenue Hole?"
action_w3_body: |
  Cada viernes 30 min. Si una iniciativa NO movió el Revenue Hole esta
  semana, se mata. No se pospone — se mata. La acumulación de iniciativas
  zombies es la razón #1 de dispersión en startups.
action_w3_success: "Al final del mes tienes 3 iniciativas vivas (vs las 12 que tenías al inicio)."
```

### Trampa "decisiones"

```yaml
trampa_name: "Cambias de foco constantemente."
cluster_name: "Cluster A · vendes por relación"
quote_pull: "No automatizas tareas. Automatizas decisiones."

reframe_body: |
  El problema cuando cambias de foco constantemente no es que seas
  desordenado o indisciplinado. Es que estás tomando decisiones nuevas
  cada día que ya tomaste antes — sin darte cuenta. Decisiones sobre
  prioridades, sobre clientes a perseguir, sobre quién hace qué. Cada
  vez desde cero. Eso quema.
  
  El reframe que cambia todo: no automatizas tareas. Automatizas
  decisiones. Toda decisión que tomas dos veces igual se vuelve criterio.
  Y todo criterio se delega.
  
  La trampa silenciosa es la creencia "ningún criterio aplica a todos
  los casos porque cada caso es único". Falso. La mayoría de tus
  decisiones repetidas tienen 80% de patrones comunes — el 20% es el
  matiz, y eso lo decides tú. El otro 80% lo decide un manual.

action_w1_title: "Decision log diario por una semana"
action_w1_body: |
  Cada decisión que tomes: contexto en una línea, decisión en una línea,
  criterio en una línea, "¿quién más podría haberla tomado?" en una línea.
  4 líneas. 5 minutos al día.
action_w1_success: "Al final de la semana tienes ~25-40 decisiones documentadas."

action_w2_title: "Identifica los 3 criterios más repetidos"
action_w2_body: |
  De las decisiones loggeadas, ¿qué patrones aparecen 3+ veces? Esos
  son los 3 criterios que se vuelven manuales. Uno página cada uno.
action_w2_success: "Tienes 3 mini-manuales de 1 página listos para entregar al equipo."

action_w3_title: "Delega esas 3 decisiones al equipo"
action_w3_body: |
  Entrégale el manual a la persona apropiada. Y cuando vengan a
  preguntarte, dices: "ya está escrito el criterio, aplícalo y cuéntame
  el resultado". Sin excepciones la primera semana.
action_w3_success: "Esas 3 decisiones no vuelven a tu plato. Liberas 4-6h/sem cognitivamente."
```

---

## PARTE 3 · PROMPT PARA CLAUDE DESIGN (copy/paste literal)

> Copia el bloque siguiente en una nueva conversación de claude.ai. Te va a generar el HTML+CSS del PDF como artifact. Después conectas merge tags al sistema (GHL/Stripe).

```
Necesito que generes un artifact HTML+CSS print-ready (un solo archivo, CSS inline)
para un PDF de 4 páginas tamaño A4 (210mm × 297mm), que se llama "El Espejo del
Founder · versión async". Es un lead magnet de $9 USD para founders LatAm B2B.

CONTEXTO DE MARCA (AI Huevos):
- Logo: huevito amarillo (emoji 🥚 OK como placeholder, idealmente SVG simple)
- Marca: minimalista, mucho whitespace, tono directo "sin filtros"
- Tipografía: 'Inter' para todo (system fallback: -apple-system, BlinkMacSystemFont, sans-serif)
- Acentos monospace: 'JetBrains Mono' (para tags, labels, IDs)
- Paleta de colores (variables CSS exactas):
  --yellow: #FFD826
  --blue: #3988FF
  --black: #101010
  --white: #FFFFFF
  --violet: #B59EF9
  --orange: #FF5C23
  --gray-light: #F4F4F4
  --gray-mid: #888888
  --green: #22C55E

ESTRUCTURA DEL PDF (4 páginas A4 vertical, page-break-after: always entre cada una):

PÁGINA 1 — COVER
- Top-left: pequeño huevito amarillo (44px circular yellow background, contains emoji 🥚 or text "AI")
- Brand mark texto: "AI HUEVOS · EL ESPEJO" en JetBrains Mono pequeño gris-mid
- Hero centrado (vertical center de la página):
  - Eyebrow: "TU TRAMPA" en JetBrains Mono uppercase yellow background tag
  - H1 grande: {{trampa_name}} en Inter 700 weight, 48-56px, color black, line-height 1.15, max-width 80%, centered
  - Subtítulo: "Lo que el espejo te devolvió" en Inter regular 18px gray-mid
- Card horizontal abajo del hero (white card, border-radius 16px, padding 24px, box-shadow soft):
  - "Para:" {{founder_name}} · {{company}} (negrita)
  - "Cluster:" {{cluster_name}} (color blue)
  - "Emitido:" {{purchase_date}}
- Footer: "huevos.ai" small, gray-mid, centered

PÁGINA 2 — EL REFRAME
- Header bar: yellow strip top con texto "PÁGINA 2 · LO QUE VISTE" en JetBrains Mono uppercase black
- Sección 1: H2 "El reframe" Inter 32px black
- Sección 2: {{reframe_body}} (3 párrafos) — Inter 17px line-height 1.65 color black con max-width 60ch
- Pull quote destacado mid-page: blue border-left 6px, padding 20px 24px, font-style italic, 22px,
  contiene {{quote_pull}} con citas estilo «"»
- Footer micro: número de página + brand

PÁGINA 3 — EL PLAN DE 3 SEMANAS
- Header bar: yellow strip top con texto "PÁGINA 3 · LO QUE VAS A HACER" en JetBrains Mono uppercase
- 3 cards verticales stacked (gap 16px):

  Card 1 — Semana 1
  - Background: white
  - Border-left: 6px solid yellow
  - Tag pequeño top: "SEMANA 1" en JetBrains Mono yellow background
  - H3: {{action_w1_title}} Inter 22px 600
  - Body: {{action_w1_body}} Inter 15px line-height 1.55
  - Footer card: check-icon ✓ + "Lo que es éxito:" en gray-mid uppercase tiny + {{action_w1_success}} en italic
  
  Card 2 — Semana 2 (igual estructura, border-left blue, tag blue background)
  - {{action_w2_title}}, {{action_w2_body}}, {{action_w2_success}}
  
  Card 3 — Semana 3 (igual estructura, border-left violet, tag violet background)
  - {{action_w3_title}}, {{action_w3_body}}, {{action_w3_success}}

- Footer pequeño en gray-mid: "Si terminas las 3 semanas, escríbeme cómo te fue. Hablo con cada founder que las completa."

PÁGINA 4 — LO QUE SIGUE
- Header: H2 "Lo que sigue después de este PDF" centered, Inter 36px 700
- 4 cards en grid 2x2 (12px gap, white cards):

  Card 1 — Tu Loom personalizado
  - Icon o emoji ▶
  - Title: "Tu Loom de 2 minutos"
  - Subtitle: "Daniel reaccionando específicamente a tu trampa"
  - CTA button (yellow background black text): "Ver Loom" link a {{loom_url}}

  Card 2 — Masterclass del 20 May
  - Icon 🎙
  - Title: "Acceso a la masterclass"
  - Subtitle: "Grabación completa del bootcamp donde nació este ejercicio"
  - CTA button (blue background white text): "Ver masterclass" link a {{masterclass_url}}

  Card 3 — Newsletter
  - Icon ✉
  - Title: "Newsletter semanal"
  - Subtitle: "1 framework/sem para founders LatAm. Sin fluff."
  - CTA button outline: "Suscribirme" link a {{newsletter_url}}

  Card 4 — Discovery call (optional)
  - Icon 📞
  - Title: "Una conversación de 30 min"
  - Subtitle: "Si quieres profundizar tu trampa con Daniel. Gratis para buyers del Espejo."
  - CTA button outline: "Agendar" link a {{discovery_url}}

- Footer final: full-width yellow band con frase grande centered black bold:
  "huevos.ai — diseñamos motores comerciales para founders LatAm"
  + "© 2026 AI Huevos · Hecho con propósito en Medellín, Colombia"

REGLAS DE FORMATO:
- @media print: garantiza que cada página rompa correctamente con page-break-after: always
- Margin de página: 20mm top/bottom, 18mm left/right
- Box-sizing: border-box global
- No usar fonts custom externas — usar font-stack del sistema solamente
- Background blanco en todas las páginas
- Las merge tags ({{algo}}) déjalas literales en el HTML para que se reemplacen posteriormente
- Asegúrate que la página 3 con 3 cards quepa en una sola A4 sin overflow
- Tag y eyebrow elements: padding 4px 10px, border-radius 12px, font-size 11px,
  font-weight 500, JetBrains Mono

Devuélveme el artifact completo como un solo HTML file con toda la CSS inline en
<style> block. Listo para usar con Puppeteer/print-to-PDF.

Después del HTML, dame además un README breve con:
1. Cómo reemplazar las {{merge_tags}} desde el sistema
2. Cómo exportar a PDF (browser print o Puppeteer)
3. Cuáles tags son obligatorias vs opcionales
```

---

## PARTE 4 · Flow técnico fulfillment

```
[Founder compra]
   ↓
Stripe Checkout $9 (cuenta huevos.ai)
   ↓
Stripe webhook → GHL endpoint /webhooks/stripe-tripwire
   ↓
GHL crea contact + tag "tripwire_9_buyer"
   ↓
GHL redirect post-pago → landing /espejo-async
   ↓
[Founder llena quiz 6 preguntas]
Convex form (mismo computeTrampa() del espejo-live)
   ↓
Convex POST → GHL endpoint /webhooks/trampa-assigned
   ↓
GHL field update: trampa_assigned = "medir" (etc)
   ↓
GHL workflow trigger: "PDF generation + email send"
   ↓
[Backend job]
1. Carga template HTML
2. Reemplaza merge tags con datos del contact
3. Headless Chrome / Puppeteer → PDF binary
4. Upload PDF a S3/GHL files → URL temporal
   ↓
GHL email vía Mailgun:
   - Subject: "Tu Espejo: [trampa_name]"
   - Body: HTML email con link al PDF + Loom embed + Masterclass link
   - PDF adjunto + Hosted link backup
   ↓
[Founder recibe email <60s después del pago]
   ↓
Tag GHL "tripwire_9_delivered" → arranca secuencia upgrade día 2
```

**Stack mínimo:**
- Stripe (existente)
- GHL (existente, $0 marginal)
- Convex (existente para espejo-live, extender a async form)
- Mailgun (cuenta nueva si Daniel no la tiene, $35/mes)
- Puppeteer/Browserless o GHL native PDF builder (depende qué soporte GHL — investigar antes)

**Alternativa si GHL no soporta PDF dinámico:** usar PDFMonkey ($29/mes) o Documint ($24/mes) — servicios SaaS que hacen exactamente esto vía API.

---

## PARTE 5 · Checklist pre-launch

Antes de poner el producto a la venta el lunes 26 May:

- [ ] HTML template generado vía Claude Design + revisado
- [ ] 8 Looms grabados, subidos a Loom, URLs en GHL custom fields
- [ ] Convex async form deployado en landing pública /espejo-async
- [ ] Stripe checkout $9 USD creado + producto "El Espejo del Founder · async"
- [ ] Stripe webhook → GHL conectado y probado con compra dummy
- [ ] Mailgun SMTP configurado en GHL custom domain (mail.huevos.ai o similar)
- [ ] Email template diseñado en GHL con merge tags + link a PDF + Loom embed
- [ ] PDF generator (Puppeteer/PDFMonkey/Documint) integrado y testeado con las 8 trampas
- [ ] Test E2E: compra real con tarjeta propia → recibir email → abrir PDF → ver Loom
- [ ] Landing page tripwire /espejo con copy + Stripe button + FAQ
- [ ] Política de reembolso clara (30 días money back)

**Time estimate total setup:** 12-16h Daniel/VA combinados.

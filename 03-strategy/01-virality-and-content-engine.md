# S1 — Virality Framework + Help-First Content Engine

**Fecha:** 2026-05-21
**Insumos:** L0/S0 outputs (`voc/2026-05-20/`, `intelligence/`, `entregables-nlm/`), platform research LinkedIn 2026 + TikTok 2026, Fireflies corpus (~50 meetings)
**Owner:** Daniel Cardona (`/in/dani-cardona`)
**North Star:** ayudar a la mayor cantidad de founders LatAm con contenido genuino — convertir esa ayuda en el principal canal de leads para Huevos AI

> "Help first → make them feel understood → make them see value → DM open."

---

## 0. Cómo se lee este doc

| Sección | Para qué sirve | Cuándo se lee |
|---|---|---|
| 1. Auditoría S0 | Saber qué está sólido vs qué falta | Antes de planear S1 |
| 2. Diagnóstico de riesgo | El insight crítico: los 60 hooks actuales usan CTAs que el algo 2026 penaliza | Antes de publicar nada |
| 3. Virality framework | Sistema de scoring 0-100 para cada pieza | Pre-publicación |
| 4. Hook matrix scored | Top 10 hooks ya scoreados + reescritura de CTAs | Lista para semana 1 |
| 5. Analytics system | Cómo medir, qué eventos, qué decisión disparan | Setup en GHL/sheet la primera semana |
| 6. Fireflies repurposing map | Qué 12 meetings se cortan en qué clips | L1 producción de contenido |
| 7. Help-first engine ladder | Ritmo semanal LinkedIn + gate a TikTok | Cadencia operativa |
| 8. Next 14 días | Plan ejecutable día-por-día | Empezar mañana |

---

## 1. Auditoría S0 — qué está sólido, qué falta

### Lo sólido (production-ready)

- **`voc/2026-05-20/verbatim-bank.jsonl`** — 71 verbatims tagged por cluster × awareness × emotional intensity × funnel piece. Insumo madre.
- **`voc/2026-05-20/hypothesis-matrix.md`** — 30 hipótesis Pain→Claim→Promise con evidencia (% cohorte) y ESCALA tier mapping. Las 10 bold son las prioritarias de Sprint 1.
- **`voc/2026-05-20/hook-bank.md`** — 60 hooks H001-H060, distribución alineada con prevalencia real (24 motor / 13 ops / 11 demand / 7 capital / 5 expansion). Voz canon de Daniel.
- **`intelligence/pain-clusters.json`** — 5 clusters cuantificados con prevalence, hormozi/schwartz/campbell lens, lead magnet fit y escala tier route.
- **`intelligence/seed-list.json`** — 15 creadores LatAm priority (Dylan Rosemberg, Enzo Cavalie, Brian Requarth, Carlos Muñoz, Andrés Bilbao + 10 secundarios) + 5 categorías de mafias a expandir.
- **`reports/ghl-setup-checklist.md`** — checklist para GoHighLevel platform setup.

### Lo que falta / inconsistente

| # | Gap | Severidad | Acción |
|---|---|---|---|
| G1 | Discrepancia cohort N: SOURCES.md dice 31 bootcamp + 21 históricos = 52, pero los entregables NLM dicen 105 históricos (Marzo 2026). Founder-dump.md aclara que los 105 son **acumulados** y los 52 son los que escribieron autodiagnóstico formal. | MEDIO | Documentar en pain-clusters.json `_meta.cohort_definition` |
| G2 | `content/posts/`, `content/weekly/`, `sequences/stage-*/`, `scripts/`, `conversations/` están **vacíos**. La L3 (content factory) y L5 (sequencer) nunca se ejecutaron. | ALTO | Este doc es el unblock; ver §7-8 |
| G3 | `reports/ghl-setup-checklist.md` tiene 38+ items, **ninguno marcado**. Plataforma sin configurar. | ALTO | Bloquea capture de leads. Setup paralelo a primera semana de publicación |
| G4 | Los **18 Fireflies transcripts** marcados como "pendiente opcional" en SOURCES.md (8 Endeavor + 10 DRUO) tienen la intensity 5 (desesperación real, llanto, frustración) que falta en los verbatims escritos (todos están 2-3). | ALTO | §6 mapea el subset prioritario |
| G5 | No hay backup de los **31 autodiagnósticos físicos del bootcamp** (Revenue Hole exercise, compromisos públicos). SOURCES.md los marca "aún sin localizar". | MEDIO | Endeavor staff debería tener fotos/escaneados. Pedir hoy |
| G6 | `espejo-live/` es un app Convex/Netlify deployable, pero `.env.production` está **vacío** y `.netlify/` indica que NO se deployó. No queda claro si el espejo-live se usó el 20 May, ni qué datos capturó | MEDIO | Validar con Daniel: ¿se usó? ¿capturó respuestas? Si sí, son tier-1 VOC |
| G7 | Los 60 hooks **todos usan CTA tipo "comenta X" / "DM Y"**, que el algoritmo LinkedIn 2026 explícitamente categoriza como engagement-bait y penaliza. Ver §2. | **CRÍTICO** | Reescritura de CTAs antes de publicar (§4) |

### Inconsistencias menores

- `hook-bank.md` línea 4 dice "52 founders" pero `pain-clusters.json` weight_in_calendar suma 1.00 basado en 105 históricos. Reconciliar quién es el N de cada cluster.
- `hypothesis-matrix.md` H1 promete "Diseñamos en 1 día un motor comercial" — esto contradice la propuesta ESCALA $497-997 (cohorte de varias semanas). Promesa única o ladder explícito por tier.
- Cluster `market_expansion` solo 5 hooks pero `weight_in_calendar` es 0.08 — proporcional, pero el lente Schwartz cambia tanto por geografía que conviene 8-10 hooks para tener mínimo testeo viable.

---

## 2. Diagnóstico de riesgo — el algo 2026 vs el hook bank actual

**Hallazgos críticos de la research de plataforma:**

### LinkedIn 2026

1. **El algoritmo explícitamente está categorizando contenido como "niche" vs "universal"** y empuja niche con perfil de Relevance Score alto. Daniel ya tiene niche claro (founders LatAm B2B): viento a favor.
2. **Dwell time + saves >>> likes**. Posts que el usuario "guarda" son señal #1.
3. **Carouseles >>> video >>> texto** (carouseles 278% más engagement que video, video 596% más que texto plano). 
4. **Video vertical nativo 1080×1920 tiene boost de distribución**. Short (<60s) 53% más engagement.
5. **Golden Hour: responder comentarios en los primeros 60 min = 2.4× reach**.
6. **Perfiles personales 5× engagement que páginas de empresa**. → Daniel en /in/dani-cardona, NO en AI Huevos company page.
7. **EL CAMBIO QUE ROMPE EL HOOK BANK:** LinkedIn dice explícitamente que "Comment 'YES' if you agree!" y similares ahora son devalued. El algoritmo detecta engagement-bait con LLMs y baja distribución.

### TikTok 2026 (para el gate downstream)

1. **Hook en 3 segundos, no 5**. 63% de top videos entrega mensaje principal en los primeros 3s.
2. **Retención mínima para viral push: 70% completion rate** (subió de 50% en 2024). 
3. **Hold de 3 segundos >65%** → 4-7× más impressions.
4. **B2B en TikTok no es para reach masivo — es para que circule en investor chats, founder Slacks, DMs**. La métrica es "passed around in operator groups", no MM views.
5. **Hook formulas**: pattern interrupt + curiosity gap + social proof (≠ hype).

### El problema concreto del hook bank actual

```
H001 → "comenta TALON y te mando..."
H002 → "comenta SISTEMA para el playbook"
H003 → "guarda el carrusel + comenta cuál te aplica"
H004 → "DM URGENCIA si quieres el template"
...
```

**De los 60 hooks, ~58 tienen este patrón.** Si publicamos así, el algoritmo los marca como bait y el reach colapsa antes de testear el contenido. **El contenido (hook + cuerpo) está bien — el CTA está roto.**

### Fix general de CTA — patrón nuevo

| Patrón viejo (penalizado) | Patrón nuevo (premiado) |
|---|---|
| "comenta TALON" | Pregunta abierta genuina ("¿Cuál de estos 7 te aplica más HOY?") |
| "DM SISTEMA" | "Si esto te resonó, está expandido en mi newsletter — link en perfil" |
| "guarda + comenta cuál te aplica" | "Slide 8 es la que más debate genera en mis cohortes — ¿de acuerdo o en desacuerdo?" |
| "comenta X para el template" | "Estoy montando un mini-doc sobre esto — cuéntame en comentarios en qué parte del proceso estás y te respondo con el ángulo específico" |

**Regla:** la conversión a DM/lead se gana siendo **el primero que responde en los comentarios con valor real**, no obligando al CTA al hook. El hook abre la puerta. El comentario de Daniel debajo ES el lead magnet en sí.

---

## 3. Virality Framework — Scoring 0-100 por pieza

Cada pieza de contenido (hook + body) se scorea en 5 dimensiones antes de publicarse. Score mínimo para "publish": 65. Score 80+ = candidato a video repurpose para TikTok.

### Las 5 dimensiones

#### V1 · Hook Strength (0-20)

Mide los primeros 3 segundos (video) o el primer renglón visible (texto/carousel).

| Pts | Criterio |
|---|---|
| 0-4 | Genérico ("Hoy quiero hablarte de..."). Bottom 50% siempre. |
| 5-9 | Tiene un nombre específico o número, pero la promesa está blanda. |
| 10-14 | Pattern interrupt (creencia contraria) **o** curiosity gap **o** número específico inusual. |
| 15-17 | Combina 2 de los anteriores. Texto bajo 210 chars. |
| 18-20 | Combina los 3, además rompe la cuarta pared con frase memorable que el lector quiere citar/screenshot. Ej: "cementerio digital con buenas reseñas" (H045). |

**Calibración rápida:** lee solo la primera frase a alguien por WhatsApp. Si pregunta "¿y qué pasó?" → 15+. Si dice "ajá" → 8.

#### V2 · VOC Alignment (0-20)

¿Qué tan cerca está el lenguaje del founder real?

| Pts | Criterio |
|---|---|
| 0-4 | Lenguaje de consultor genérico. No suena a founder. |
| 5-9 | Toma idea de VOC pero la traduce a jerga marketing ("optimizar el funnel"). |
| 10-14 | Cita o parafraseo cercano de verbatim real. Founder se reconoce. |
| 15-17 | Verbatim al pie + interpretación que el founder no había hecho conscientemente. |
| 18-20 | Verbatim + interpretación + nombrar la creencia oculta. "Te falta agresividad — no, te falta urgencia diseñada" (H004). |

**Calibración:** si el founder anónimo F011 leyera el post, ¿diría "esto es de mí" o "esto es genérico"?

#### V3 · Niche Relevance (0-20)

¿Qué tan rápido el algo (y los humanos) entienden que esto es para founders LatAm post-PMF? Penaliza universal/genérico.

| Pts | Criterio |
|---|---|
| 0-4 | Pasa por advice motivacional o coach genérico. |
| 5-9 | Habla de "startups" pero podría ser SF o Lagos. |
| 10-14 | Menciona LatAm, B2B, founder, o industria específica. |
| 15-17 | Specificity: "Founders Endeavor", "ECP", "ciclos 3-12 meses enterprise", "agencia growth $3,250/mo". |
| 18-20 | Doble specificity: geografía + vertical + etapa + número (ej: "founder Colombia salud B2B con $4M facturando 35K sitios" — caso F006/Energy Master). |

#### V4 · Save / Dwell Probability (0-20)

¿Por qué alguien lo guardaría / pararía a leerlo todo?

| Pts | Criterio |
|---|---|
| 0-4 | Texto suelto sin estructura ni utilidad inmediata. |
| 5-9 | Tiene takeaway pero queda en abstracto. |
| 10-14 | Lista, framework, o regla nombrada. Operacional. |
| 15-17 | Carousel con slides numeradas que el founder puede usar como auto-diagnóstico (ej: H040 "9 canales que NO funcionan + 3 que sí"). |
| 18-20 | Quick Win <15 min aplicable + identidad clara ("eres del tipo X o tipo Y"). |

**Pista:** los carouseles >= 15. Los texts con números/regla <= 14 a menos que tengan reframe identitario fuerte.

#### V5 · CTA Health (0-20)

¿El CTA está alineado con el algo 2026 o sigue siendo engagement-bait?

| Pts | Criterio |
|---|---|
| 0-4 | "Comenta X para Y", "DM Z" puro. |
| 5-9 | CTA bait disfrazado con pregunta artificial ("¿de acuerdo? comenta 1 o 2"). |
| 10-14 | Pregunta abierta sin obligar respuesta corta. "Cuéntame en qué etapa estás". |
| 15-17 | Hook al newsletter / perfil + pregunta genuina + Daniel se compromete a responder cada comentario en la primera hora. |
| 18-20 | No-CTA explícito: el contenido ES tan accionable que el founder DM en orgánico para profundizar. Daniel responde con voz nota en DM. |

### Score total y semáforo

| Score | Acción |
|---|---|
| 0-49 | No publicar. Reescribir. |
| 50-64 | Editar antes de publicar. Identificar qué dimensión está <10 y subirla. |
| 65-74 | Publish OK. Una pieza de prueba semanal. |
| 75-84 | Publish + slot rico (martes/miércoles 8-10am COT). |
| 85-94 | Publish + slot rico + producir versión video vertical el mismo día. |
| 95-100 | Hero piece. Distribuir en LinkedIn + repurposear a TikTok + clip para newsletter + meta-post sobre cómo lo escribimos. |

---

## 4. Hook Matrix Scored — Top 10 hooks con scorecard + CTA reescrito

Aplicación del framework a los 10 hooks "doblar Sprint 1" del hypothesis-matrix. Bajo cada hook va el score original y la versión **reescrita** lista para publicar.

### H001 (motor_comercial · F013 talón de aquiles)

**Original:** "El 80% de los founders que conozco tiene un gran producto. Y un cero a la izquierda como sistema de ventas..." + CTA "comenta TALON"

**Score original:** V1=17 · V2=18 · V3=14 · V4=10 · V5=4 → **63 (no publicar tal cual)**

**Reescrito:**
> "El 80% de los founders que conozco tiene un gran producto. Y un cero a la izquierda como sistema de ventas.
>
> Eso no es ironía — es matemática. Y se llama suicidio en cámara lenta.
>
> Lo veo cada semana en diagnósticos Endeavor: producto sólido, equipo brillante, y pipeline 100% en la cabeza del fundador. Tres referidos del mes pasado se cayeron porque nadie escribió el discovery call.
>
> La pregunta no es '¿cómo vendo más?'. Es: '¿qué pasa con mis ventas el día que yo no esté?'
>
> Si tu respuesta tarda más de 10 segundos, ya sabes."

**Score reescrito:** V1=18 · V2=18 · V3=17 · V4=13 · V5=16 → **82** (publish + slot rico, repurpose a video)

---

### H002 (motor_comercial · F011 sistema escalable)

**Original:** "Después de 105 diagnósticos..." + CTA "comenta SISTEMA"

**Score original:** V1=16 · V2=16 · V3=18 · V4=11 · V5=4 → **65**

**Reescrito:**
> "Después de 105 diagnósticos a startups LatAm, hay una frase que escucho cada semana:
>
> 'Nuestro problema son las ventas.'
>
> Mentira.
>
> Su problema es que venden por relación. Los founders más sólidos que conozco no son los que mejor venden — son los que mejor sistematizan cómo otros venden por ellos.
>
> Diferencia operativa: el que vende por relación tiene CRM. El que vende por sistema tiene un decision log."

**Score reescrito:** V1=17 · V2=19 · V3=18 · V4=13 · V5=15 → **82**

---

### H003 (carousel 10 slides — motor_comercial)

**Original:** "10 cosas que un founder con sistema comercial..." carousel + "guarda + comenta cuál te aplica"

**Score original:** V1=14 · V2=15 · V3=15 · V4=18 · V5=4 → **66**

**Slide 1 reescrita:**
> "10 cosas que un founder con sistema comercial hace diferente al que vende a puro pulmón.
>
> Si tienes el 80% de tu pipeline en la cabeza, este carrusel duele.
>
> Slide 11 (la bonus) es la que más debate genera con cohortes Endeavor."

**Slide 11 (nueva):** "Bonus: no contrata más comerciales hasta que el sistema esté escrito. ¿Estás de acuerdo o crees que el equipo va primero? Te leo en comentarios — respondo cada uno en la primera hora."

**Score reescrito:** V1=15 · V2=15 · V3=15 · V4=19 · V5=17 → **81**

---

### H025 (ops_escala · cuello de botella eres tú)

**Estimación score original:** ~62 (CTA "comenta TÉCNICO")

**Reescrito:**
> "Eres el cuello de botella.
>
> No tu equipo. No el mercado. No el producto.
>
> Tú actuando como técnico. Tú resolviendo el ticket en lugar de escribir el procedimiento. Tú aprobando cada propuesta porque 'cada cliente es distinto'.
>
> Tu CRM funciona en proporción inversa a las decisiones que pasan por ti.
>
> Sistematizar tareas solo escala tu cansancio. Lo que escala son las decisiones que ya no tienen que pasar por ti."

**Score reescrito:** V1=18 · V2=19 · V3=14 · V4=14 · V5=14 → **79**

---

### H039 (demand_gen · F026 acceso al decisor)

**Estimación score original:** ~64

**Reescrito:**
> "No tienes problema de pocos leads.
>
> Tienes problema de acceso al decisor.
>
> Cuando logras la cita con la persona correcta, tu tasa de cierre es altísima (te lo dicen los founders Endeavor todo el tiempo: '8.9% sobre 30 cotizaciones' — Nediar).
>
> Tu cuello no es prospección. Es prospección al PERFIL CORRECTO.
>
> El delta entre un founder con pipeline lleno y uno con pipeline en la cabeza no es volumen — es scoring de ICP de 5 criterios."

**Score reescrito:** V1=17 · V2=18 · V3=18 · V4=12 · V5=14 → **79**

---

### H049 (capital · sube precio antes de levantar)

**Estimación score original:** ~70 (este ya está bastante bien — autoridad + dato)

**Reescrito (cambio mínimo al CTA):**
> "Antes de salir a levantar capital, sube tu precio 30%.
>
> Patrick Campbell lo demuestra con mil estudios: monetización tiene 4x más impacto en crecimiento que adquisición.
>
> Y duele menos que diluirte.
>
> Si llevas 18 meses sin tocar el pricing, no tienes problema de capital — tienes problema de pricing tímido. Y los VCs lo huelen."

**Score reescrito:** V1=18 · V2=15 · V3=17 · V4=15 · V5=16 → **81**

---

### H056 (market_expansion · playbook no se replica, se traduce)

**Estimación score original:** ~68

**Reescrito:**
> "El playbook de Colombia NO se replica en México.
>
> Se traduce.
>
> Y traducir no es cambiar palabras — es cambiar el awareness stage del prospect.
>
> Si tu cliente colombiano es problem-aware (sabe que tiene el dolor pero no que existe solución) y el mexicano es solution-aware (ya conoce 3 competidores), tu copy tiene que cambiar entera.
>
> No es localización. Es psicografía por geografía."

**Score reescrito:** V1=17 · V2=15 · V3=18 · V4=14 · V5=15 → **79**

---

### Resumen de la matriz scored

| Hook | Score original | Score reescrito | Format target | Repurpose TikTok |
|---|---:|---:|---|:---:|
| H001 | 63 | **82** | text post | ✅ |
| H002 | 65 | **82** | text post | ✅ |
| H003 | 66 | **81** | carousel 11 slides | ❌ |
| H025 | ~62 | **79** | text post | ✅ |
| H039 | ~64 | **79** | text post | ❌ |
| H049 | ~70 | **81** | text post + carousel UE | ✅ |
| H056 | ~68 | **79** | text post | ❌ |

**Patrón observable:** la reescritura del CTA por sí sola sube **el promedio de 65 a 80** sin cambiar el cuerpo. Los carouseles ganan en V4 (save probability) pero pierden V5 si el CTA pide guardar — alternar.

### Próximo paso operativo

Aplicar este scorecard a los **53 hooks restantes** del banco. Recomendación: agrupar en 6 batches de 10 hooks, scoreo lleva ~5 min por hook = 5 horas. Asignar a Daniel + 1 asistente con criterio calibrado contra los 7 ejemplos de arriba.

---

## 5. Sistema de Analytics — validar hipótesis de contenido

El framework anterior es **predictivo**. El analytics es **comprobación**. Sin medir, todo es teoría.

### Arquitectura — 3 capas

```
LAYER 1: Platform Native (LinkedIn analytics, TikTok analytics, GHL forms)
   │
LAYER 2: Daily Sheet (Google Sheet con 1 fila por post, manual diario 10 min)
   │
LAYER 3: Weekly Decision Log (qué dobla, qué muere, qué se itera)
```

### Layer 1 — Métricas nativas a capturar (manual, 10 min/día)

Cada post debe trackear, a las **48h** post-publicación:

| Métrica | Por qué importa | Threshold "decent" | Threshold "viral" |
|---|---|---|---|
| **Impressions** | Reach baseline | >2K founders | >10K |
| **Dwell time avg** | El #1 signal del algo 2026 | >12s | >25s |
| **Save rate** (saves/impressions) | Predictor #1 de algo distribution | >1.5% | >4% |
| **Comment rate** | Calidad de discusión | >0.8% | >2% |
| **Comment depth** (avg words) | Que sean comentarios reales, no "🔥" | >12 palabras | >25 |
| **DM inbound** (3 días) | Métrica de business outcome | >2 | >8 |
| **Profile visits** (24h) | Top of funnel real | >50 | >200 |
| **Newsletter signups** (atribuidos al post via UTM) | Conversión a lista | >3 | >15 |

### Layer 2 — Daily tracking sheet (estructura mínima)

```
Columnas:
- post_id (H001-r2, formato Hook + version)
- date_published, time_slot
- format (text/carousel/video)
- cluster (motor/ops/demand/capital/expansion)
- awareness_target (1-5)
- framework (hormozi/schwartz/campbell)
- virality_score_predicted (del §3)
- hook_strength_predicted (V1)
- comment_first_60min_count
- daniel_replied_60min (bool)
- impressions_48h, dwell_48h, saves_48h
- comments_count, comments_avg_words
- dm_inbound_72h
- newsletter_signups_attributed
- score_actual (recalculado post-mortem)
- delta_predicted_vs_actual
- action (double/iterate/kill)
```

**Fuente:** Google Sheet en `intelligence/content-analytics/post-tracker.gsheet`. UTMs llevan a landing GHL con form de newsletter.

### Layer 3 — Decision Log semanal (viernes 30 min)

Cada viernes Daniel revisa la sheet y escribe **1 decisión** por cada cluster:

- ¿Qué hook/ángulo subió en performance esta semana?
- ¿Qué hipótesis (de las 30) ganó nuevo soporte? ¿Cuál se debilita?
- ¿Qué formato (text/carousel/video) está siendo premiado por el algo HOY (puede cambiar mes a mes)?
- ¿Qué hora de publicación da mejor dwell time (no impressions)?

**Output:** archivo `intelligence/decision-logs/YYYY-WW.md` con 5 líneas de decisión + cambios al calendario siguiente.

### Atribución a pipeline GHL

Cada CTA (newsletter, DM voicenote response, mini-doc descarga) tiene UTM única:

```
utm_source=linkedin
utm_medium=post|carousel|video
utm_campaign=H001-r2|H025-r1|...
utm_content=cta_newsletter|cta_dm|cta_save
```

GHL pipeline stage map:
```
Visit Profile → Newsletter Opt-in → DM Open → Discovery 30min → Tripwire $97-297 → Cohorte $497-997 → Bootcamp $2K+
```

Cada stage tiene su event en GHL workflow + Mailgun SMTP confirmado. Cuando un lead avanza de stage, el `post_id` que lo originó se preserva en custom field → permite atribuir **revenue → hook específico**.

### KPIs del sistema (no del post)

A revisar cada 4 semanas:

| KPI | Target Q3 2026 | Cómo se mide |
|---|---|---|
| Posts publicados con score ≥75 | 12/mes (3/semana) | content tracker |
| Avg dwell time en posts publicados | 18s+ | LinkedIn analytics |
| Newsletter list growth orgánico | +200/mes | GHL contacts |
| DMs entrantes calificados (con role+empresa) | 25/mes | GHL stage Discovery |
| Discovery calls agendados desde DM | 8/mes | GHL stage Discovery |
| Conversión Discovery → Tripwire $97-297 | 30% | GHL deals |
| Conversión Tripwire → Cohorte $497-997 | 15% | GHL deals |
| Revenue attributed to LinkedIn | $5K/mes Q3 → $15K/mes Q4 | GHL revenue by source |

**Regla de oro:** si después de 8 semanas de publicar 3×/semana las DMs entrantes calificados están < 10/mes, el problema NO es el algo — es el match entre VOC y ofertas. Reabrir el hypothesis-matrix.

---

## 6. Fireflies Repurposing Map — los 12 meetings que importan

Daniel ya tiene grabado mucho contenido. La eficiencia operativa es: usar lo grabado como materia prima en lugar de grabar nuevo. Pero solo si el meeting tiene 3 elementos: (1) Daniel enseñando un framework, (2) video activado en Fireflies, (3) intensity 4-5 en el dolor del founder.

### Tier 1 — 8 Endeavor mentorships (los más densos)

**Estos son los que SOURCES.md ya identificó. Daniel facilitando 1:1, con framework + diagnóstico + action items. Cada uno rinde 3-6 clips repurposables.**

| # | Fireflies ID | Empresa | Min | Repurpose target | Clip ideas (LinkedIn vertical 30-60s) |
|---|---|---|---:|---|---|
| 1 | `01KS5YHYAHX6DXERHCA1RD344P` | Please Logística | 62 | H039 (acceso al decisor) | "El error de hacer outbound antes de tener ICP claro — 20 clientes ideales, no 200" |
| 2 | `01KRK6FS1VVNSY3EKHCCS55TE1` | Nediar | 59 | H011 (encargados vs dueños) | "8.9% sobre 30 cotizaciones: por qué la tasa de cierre alta no es buena noticia si tu pipeline es flaco" |
| 3 | `01KR4JM267D07GTPY3ABCEFVQY` | Nediar | 58 | H010 (CRM antes de Salesforce) | "Reestructurar holding: cuándo el problema NO es comercial sino societario" |
| 4 | `01KR1QT9F3TF0M312FZQ8213ZF` | Please Logística | 55 | H025 (cuello de botella) | "No pueden crecer más rápido que su capacidad de contratación — el problema escondido del founder logístico" |
| 5 | `01KQZE0MCMQ5M1FBW9N1SVQWX0` | iMometrics | 77 | H023 (propuesta de valor) | "Página web que da 2 leads semanales sin pauta — qué tiene que NO tienen las demás" |
| 6 | `01KQT5SEGBXKMWBSZ3MJP1HY9W` | Dt Dental | 62 | H056 (awareness por geografía) | "CAC $3-3.5MM/mes con alta retención pero ticket bajo — cuándo el modelo de negocio te traiciona" |
| 7 | `01KQDA3HNMSCSWCDSD6RJ2CG8H` | Kickoff mentor | 40 | H022 (sin proceso = teatro) | "Automatizar la creación de contenido en marketing — sí, pero qué se automatiza primero" |
| 8 | `01KRE496SGC4WKZ7YDHVEN2A44` | iMometrics short | 10 | H037 (PYMES sin data) | Probable solo audio — descartar para video |

### Tier 2 — Client mentorships con framework claro

| # | Meeting | Fecha | Repurpose target | Cluster |
|---|---|---|---|---|
| 9 | Arkangel Marketing v2.0 | 2026-02-06 | $4M ARR en pharma B2B + USA, Outreach automatizado + ICP buyer personas — clip "discovery con farmacéuticas: qué pregunta abrir la primera reunión" | motor_comercial |
| 10 | Movik.us <> AI Huevos | (reciente) | 3 funnels de adquisición + WhatsApp bot + ETL — clip "por qué 3 funnels en paralelo, no 1 grande" | demand_gen |
| 11 | Marketing Systems | (reciente) | Consultoría CRM + automation + GHL + workflows — clip "el orden correcto: workflow antes que herramienta" | ops_escala |
| 12 | Letro / Targos Capital — Intro & Diagnóstico | (reciente) | Discovery questions, grabación de calls comerciales para análisis posterior — clip "las 7 preguntas del discovery que cambian la conversación" | motor_comercial |

### Tier 3 — DRUO (10 meetings) — modelo propio, no contenido founder

Los 10 DRUO son método de **Daniel mismo trabajando** ($3,250/mes growth client). Útil para:
- **Behind-the-scenes posts**: "Cómo cobro $3,250/mo por growth — el stack y el calendario" (alto save rate por specificity)
- **Pricing case study**: "Cross border sales LatAm-US fintech: 3 errores que vimos en 2 meses"
- **NO para founder pain content** (es perspectiva operador no founder)

Recomendado: **1 post BTS/mes** con DRUO data, no más. Riesgo de overexposure de un cliente.

### Workflow de repurposing (recurrente)

```
[Semana N viernes]
1. Daniel + asistente revisan los meetings de la semana
2. Identifican 2-3 momentos de 60-90 segundos donde Daniel:
   - Diagnostica un dolor con frase memorable
   - Explica un framework con visual mental
   - Reframe una creencia equivocada del founder
3. Asistente crea cuts en Descript/CapCut (face-to-camera vertical 1080×1920)
4. Subtítulos quemados, branding mínimo (logo huevito esquina)
5. Daniel revisa, aprueba o pide re-cut
6. Programa publicación en LinkedIn martes/miércoles 8-10am COT
7. Score con framework §3 antes de publicar
8. Tracking en sheet (§5)
```

**Output esperado por mes:** 8-12 clips repurposados + 4-8 posts text/carousel originales = 12-20 piezas/mes = 3-5 piezas/semana.

---

## 7. Help-First Engine Ladder — la cadencia operativa

**Principio rector:** Daniel NO está vendiendo. Está **enseñando lo que sabe** porque sabe demasiado para una sola operación. La venta es consecuencia, no objetivo del post.

> Help first → make them feel understood → make them see value → DM open.

### Las 3 fases emocionales — qué post hace qué

| Fase | Objetivo emocional | Tipo de post | Ratio del calendario |
|---|---|---|---|
| **HELP** | "Esto me sirvió hoy" | Quick-win utility: checklist, template, ejercicio aplicable <15 min | **50%** (2/4 posts/semana) |
| **UNDERSTOOD** | "Está hablando exactamente de mí" | Verbatim mirror: cita anónima de founder + interpretación | **30%** (1.5/4 posts/semana) |
| **VALUE** | "Si esto es gratis, ¿qué será lo pagado?" | Framework completo, case study, audit visible | **20%** (0.5/4 posts/semana) |

### Cadencia semanal LinkedIn (4 posts/semana = 16/mes)

| Día | Tipo | Fase emocional | Cluster rotativo | Format | Ejemplo |
|---|---|---|---|---|---|
| Lunes 8am | HELP — utility | Help | Cluster con más DM esa semana | text post o mini-doc | "Pregunta del lunes: ¿qué KPI puso a tu equipo en alerta esta semana?" + 3 KPIs típicos founders subestiman |
| Martes 9am | UNDERSTOOD — verbatim | Understood | Rotación | text post | "Hoy un founder me dijo: 'estamos atendiendo mercado natural y referidos'" (H038) |
| Miércoles 8am | HELP — framework slide | Help | Rotación | carousel 8-10 slides | H003, H010, H040, H047, H052, H058 |
| Jueves o viernes 9am | VALUE — case/video | Value | Cluster doble | video vertical 60-90s desde Fireflies clip | Tier 1 mentorship clips |

**Fines de semana:** no publicar. Algo penaliza, audiencia LatAm B2B baja engagement.

**Excepción:** una hero piece al mes (último jueves) — score 85+, full essay (~600 palabras) sobre un cluster completo. Permitido publicar también en newsletter.

### Cluster rotation (no aleatorio)

Cada cluster pesa en proporción a `weight_in_calendar` de pain-clusters.json:

```
Motor comercial: 40% → 6.4 posts/mes
Ops escala:      22% → 3.5 posts/mes  
Demand gen:      18% → 2.9 posts/mes
Capital:         12% → 1.9 posts/mes
Market expansion: 8% → 1.3 posts/mes
                       = 16 posts/mes
```

### Reglas operativas no-negociables

1. **Golden Hour fija**: Daniel bloquea 60 min en calendario inmediatamente después de cada publicación. Responde cada comentario con voz nota o frase 30+ palabras. Esto solo ya sube dwell time 30%+.
2. **No CTA bait**: revisar score V5 antes de publicar. Si V5<10, no publicar.
3. **Verbatim cita anónima siempre**: cuando se cita a un founder, usar "hoy un founder colombiano de SaaS B2B me dijo" — nunca nombre. Genera confianza.
4. **Hook < 210 chars en texto** (rule of `hook-bank.md`).
5. **3 segundos en video**: si a los 3 segundos no hay frase memorable o número específico, re-cut.
6. **Saves > comments**: si una pieza scoreó 80+ pero a las 48h tiene <0.5% save rate, no es viral — es engagement-bait disfrazado.

### Gate LinkedIn → TikTok

**Una pieza pasa a TikTok solo si cumple TODO esto en LinkedIn:**

- [ ] Score predicted ≥ 80
- [ ] Score actual a 48h ≥ 75 (saves + dwell + DM combinado)
- [ ] Hook se entiende en los primeros 3 segundos cuando se ve sin sonido
- [ ] Daniel ya tiene su versión personal de la frase memorable

**Por qué este gate:** TikTok requiere 70% completion rate para viral push, y el contenido founder LatAm es más denso que el contenido típico de FYP. Forzar que pase el filtro LinkedIn primero garantiza que solo cruce el material con probabilidad real de retención. **No es "publicar lo mismo en otra plataforma" — es "promocionar lo ya validado".**

### Operativa TikTok (cuando llegue)

- Cuenta personal @daniel.cardona (no @aihuevos): perfiles personales > company.
- Bio: "Diagnostico motores comerciales B2B LatAm | 105+ founders | Newsletter ↓"
- Solo posts del gate (al inicio 1-2/semana).
- Hashtags niche-specific: #FounderLatAm #B2BVentas #StartupColombia (NO #emprendedores genérico que es saturado).
- Métricas a vigilar: completion rate (target 65%+), save rate, perfil visits → newsletter.

---

## 8. Plan de los próximos 14 días

### Semana 1 (22-28 May)

**Lunes 22 May:**
- [ ] Daniel + asistente: scorear top 20 hooks restantes del banco con framework §3 (2 horas)
- [ ] GHL: configurar custom fields para `post_id_origin`, `cluster`, `awareness_stage_when_captured` (30 min)
- [ ] GHL: crear pipeline stages Newsletter→DM→Discovery→Tripwire→Cohorte→Bootcamp (45 min)

**Martes 23 May:**
- [ ] PUBLICAR H002-r1 (score 82) 9am COT — primer post oficial
- [ ] Daniel reserva Golden Hour 9-10am bloqueada
- [ ] Setup Google Sheet `content-analytics/post-tracker.gsheet` con columnas §5
- [ ] Endeavor staff: pedir las 31 autodiagnósticos físicos + Revenue Hole exercise + commitment cards fotografiadas (gap G5)

**Miércoles 24 May:**
- [ ] PUBLICAR H003-r1 (carousel 11 slides) 8am COT
- [ ] Asistente: cortar primer clip Fireflies (Please Logística #1) según §6 Tier 1
- [ ] Mailgun SMTP: validar custom config en GHL para email confirmación newsletter
- [ ] Validar con Daniel si espejo-live se usó el 20 May (gap G6)

**Jueves 25 May:**
- [ ] PUBLICAR video vertical 60s (clip Please Logística #1) 9am COT
- [ ] Daniel responde cada comment en Golden Hour
- [ ] Asistente actualiza sheet con métricas 24h de H002 + H003

**Viernes 26 May:**
- [ ] Decision log semana 1: `intelligence/decision-logs/2026-W21.md`
- [ ] Score post-mortem H002 + H003 + video (predicted vs actual)
- [ ] Definir 4 piezas semana 2

### Semana 2 (29 May - 4 Jun)

**Semana 2 = primera semana con cadencia 4 posts completa.**
- Lun 29: HELP utility (motor_comercial)
- Mar 30: UNDERSTOOD verbatim (ops_escala — H025 reescrito)
- Mié 31: HELP carousel (demand_gen — H040 los 9 canales que no funcionan)
- Jue 1 Jun: VALUE video vertical (Fireflies Nediar #2 — "tasa 8.9% sobre 30 cotizaciones")

**Tareas paralelas semana 2:**
- [ ] Aplicar virality scorecard a los 33 hooks restantes (5 horas, dividido en 2 días)
- [ ] Ejecutar resto de checklist GHL (38 items)
- [ ] Asistente cortar 4 clips Fireflies tier 1 adicionales
- [ ] Newsletter primer envío (welcome series 5 emails desde GHL)

### Métrica de éxito a los 14 días

- **8 posts publicados, todos con score predicted ≥75**
- **Avg dwell time ≥ 14s** (baseline; subirá con iteración)
- **≥ 30 newsletter signups orgánicos** atribuidos a posts (vía UTM)
- **≥ 4 DM inbound calificados** (founder + role + empresa identificable)
- **1 decision log/semana** con cambios concretos al calendario siguiente

Si a los 14 días los DMs < 2, NO escalar. Volver al hypothesis-matrix y revisar si las 10 hipótesis Sprint 1 son las correctas (o si Fireflies tier 1 reveló hipótesis emergentes que faltan).

---

## 9. Decisiones consolidadas 2026-05-21 PM (Daniel respondió)

| # | Decisión | Implementación |
|---|---|---|
| D1 | **Voz: ES con spanglish natural** (no ES puro) | Permitido en hook y body: "tu CRM es novia exigente, no instrumento", "el ARR no se levita solo", "if you build it, no come", "tu funnel está leaking". Regla: el spanglish suena natural al founder LatAm (no fuerza), no a un MBA de Stanford. Mantener verbatims ES puros para el verbatim-mirror tipo post. |
| D2 | **Hero piece: 2 por mes** (no 1) | Calendario: 1er y 3er jueves de cada mes. ~600 palabras o video 3-5 min. Score requerido ≥85. |
| D3 | **Video: mix face-to-camera + B-roll** | Default: face-to-camera para clips de Fireflies repurposing (Daniel ya está en el video original). B-roll para hero pieces tipo case study o stats. Daniel está OK grabándose, así que face-to-camera es el modo principal. |
| D4 | **Tripwire $9 USD** (no $97) — game-changer | Ver §11 abajo. Cambia la matemática del ladder completo. |
| D5 | **Espejo-live SÍ se usó el 20 May** | Datos en Convex prod `superb-whale-436`. Es VOC tier-0 + hook source. Ver §12. |

---

## 11. Tripwire $9 — reshape del ladder

**El cambio:** $9 no es revenue. Es **list builder con commit**. La diferencia entre opt-in gratis y compra $9 es psicológica enorme: el comprador $9 ya es un lead **5-10× más cualificado** que el opt-in newsletter free.

### Pricing math (asumiendo audiencia LinkedIn esperada Q3 2026)

| Stage | Conversion rate | N esperado/mes |
|---|---:|---:|
| Impresiones LinkedIn orgánico | — | ~150K |
| Visita perfil → newsletter signup | 0.5-1% del impresiones | 500-1500 |
| Newsletter → click tripwire | 8-12% | 60-150 |
| Click → checkout $9 completado | 25-35% | 20-40 |
| $9 → upgrade $97 (en 30 días) | 8-15% | 2-5 |
| $97 → cohorte $497-997 | 20-30% | 0-2 |
| Cohorte → bootcamp $2K+ | 15-25% | mensual = 0-1 |

**Revenue mes Q3 esperado (conservador):**
- $9 × 30 = $270
- $97 × 4 = $388
- $497 × 1 = $497
- **Total Q3: ~$1,155/mes**

**Q4 con cadencia sostenida + audiencia 4x:** $5K-8K/mes solo desde LinkedIn orgánico, sin pauta.

**No es match con $10K/30d ESCALA™ por sí solo.** El ladder $9 es **acelerador de discovery** — el founder de $2K+ bootcamp sale del DM directo, no del tripwire $9. El tripwire solo construye la lista cualificada.

### Producto $9 propuesto — "El Espejo del Founder · versión async"

Daniel ya escribió el contenido (las 9 trampas + reframes + actions). El producto $9 es:

**Lo que el founder recibe (entrega <60s post-pago):**
1. Quiz de 6 preguntas (mismo del bootcamp) en form Convex/Tally/Typeform.
2. Algoritmo `computeTrampa()` lo asigna a **1 de las 9 trampas**.
3. PDF personalizado de 4 páginas:
   - Página 1: "Tu trampa: [nombre punchy]"
   - Página 2: Reframe completo
   - Página 3: 3 actions de la semana 1, 2, 3
   - Página 4: Hook al newsletter + invitación a discovery call (sin presión)
4. Email automático con PDF adjunto + Loom 2-min de Daniel reaccionando a esa trampa específica (1 Loom por trampa = 9 Looms, una sola vez).
5. Acceso a video privado de la masterclass del bootcamp 20 May (cuando esté editada).

**Stack operativo:**
- Stripe checkout $9 USD (one-time)
- GHL Webhook recibe Stripe → trigger workflow
- Convex form completion → GHL custom field `trampa_assigned`
- GHL → genera PDF con merge tags → adjunta email vía Mailgun custom SMTP
- Loom embed por trampa (ya hosteado, no costo marginal)
- Stripe → marca contact tag `tripwire_9_buyer` en GHL → upgrade sequence empieza día 2

**Tiempo de setup:** 8-12 horas (Daniel + 1 dev). Materiales ya existen.

### Upgrade path desde $9

| Días desde compra $9 | Touchpoint | Oferta |
|---|---|---|
| Día 0 | Email confirmación + PDF | — |
| Día 2 | Email "esto es lo que viste en el bootcamp" + invite Discovery | Discovery 30 min ($0) |
| Día 5 | Email case study founder LatAm con la misma trampa | — |
| Día 9 | Email "el 60% de los que tienen tu trampa la cierran en 3 semanas con esto" | Mini-curso $97 (3 lecciones grabadas) |
| Día 14 | Email + DM LinkedIn de Daniel | Cohorte $497-997 (próxima fecha) |
| Día 30 | Email "¿qué pasó con tus 3 actions?" + survey | Bootcamp $2K+ |

---

## 12. Espejo-live data integration — VOC tier-0

**Confirmado:** la app corrió y capturó datos en deployment Convex `superb-whale-436`. Schema:
- `founders` (name, company, email, sessionCode)
- `responses` (founderId, 6 respuestas con scores)
- `results` (founderId, trampaKey asignada, reframe, actions)

### Las 9 trampas son HOOK LAYER 0 — pre-validadas con audiencia real

Hallazgo: estos 9 nombres + reframes son **superior al hook bank actual** porque Daniel ya los testeó en vivo con 25-30 founders y vio reacciones. Cada trampa hace **doble servicio**: hook publishable + producto $9.

| # | Trampa key | Hook line publishable | Cluster | Score predicted |
|---|---|---|---|---:|
| 1 | medir | "Pides tácticas. Necesitas instrumentos." | motor_comercial | 87 |
| 2 | founder | "Tu sistema se llama tu nombre." | ops_escala | 89 |
| 3 | ia | "Pides a la IA que venda. Debería pensar." | motor_comercial | 88 |
| 4 | normativo | "Buscas un lead magnet. La norma te lo da gratis." | demand_gen | 84 |
| 5 | traduccion | "Tu diferencial es técnico. El cliente no es técnico." | motor_comercial | 86 |
| 6 | precio | "Estás vendiendo premium a precio de bait." | capital | 90 |
| 7 | revenuehole | "Tienes 5 problemas. Tienes UNO." | motor_comercial | 91 |
| 8 | decisiones | "Cambias de foco constantemente." | ops_escala | 80 |
| 9 | (overlap medir/founder) | — | — | — |

**Todos los 8 tienen V1=18-20 (Hook Strength máxima)**. Razón: pattern interrupt + curiosity gap + reframe identitario, los 3 elementos pegados.

### Plan de uso de las trampas

1. **Cada trampa = 1 hero piece** (las 9 cubren 4-5 meses al ritmo de 2 hero/mes = D2).
2. **Cada trampa = 1 producto $9 deliverable** (D4).
3. **Cada trampa = 1 video face-to-camera 60-90s** (D3 mix), guion ya escrito en el reframe.
4. **Las respuestas de los 25-30 founders del bootcamp dicen qué trampa fue dominante** — eso ordena la cadencia editorial (publicar primero la más prevalente).

### Comando exacto para extraer los datos (córrelo ahora)

```bash
cd /Users/naboo/Documents/Endeavor/espejo-live
npx convex login   # si no estás logueado
# Apunta al deployment prod
npx convex run --prod founders:listResultsBySession '{"sessionCode": "MEDE2605"}' > /Users/naboo/Documents/Endeavor/voc/2026-05-20/espejo-results.json
```

Si el flag `--prod` no funciona porque el deployment prod tiene otro nombre, alternativa:
```bash
CONVEX_DEPLOYMENT=prod:superb-whale-436 npx convex run founders:listResultsBySession '{"sessionCode": "MEDE2605"}' > /Users/naboo/Documents/Endeavor/voc/2026-05-20/espejo-results.json
```

Plan B (si CLI no autentica): exporta CSV manual desde el dashboard URL que compartiste → tabla `results` → "Export CSV" → guarda en `voc/2026-05-20/espejo-results.csv`.

### Después de tener los datos

Necesitamos analizar:
- **Distribución de trampas** (cuál tocó al N% más alto del cohorte)
- **Patrones de respuesta** (qué preguntas dispersan más vs convergen)
- **Email + empresa de cada founder** → comparar con `research/<empresa>/BRIEFING.md` para validar match (el algoritmo `computeTrampa` puede haber confundido founders).
- **Cross-reference con verbatim-bank**: si F011 sacó trampa "founder" y su verbatim escrito dice "depende del equipo fundador", el match es coherente — confianza en el algoritmo.

Output: `voc/2026-05-20/espejo-analysis.md` con la distribución + 8 founder profiles para los DM personalizados de seguimiento.

---

## 13. Plan de los próximos 14 días — REVISADO con D1-D5

### Cambios respecto al §8 original

- Bilingüe → ES con spanglish natural (D1)
- Hero piece 1/mes → 2/mes (1er y 3er jueves) (D2)
- Tripwire $97 → $9 con espejo PDF + 9 Looms (D4)
- Espejo-live es VOC tier-0 — extraer datos hoy (D5)
- Las 8 trampas se convierten en cadena hero piece (cubren mes 1-2 sin hooks adicionales)

### Semana 1 (22-28 May) revisada

**Jueves 22 May (HOY-mañana):**
- [ ] Extraer datos Convex `MEDE2605` con comando §12 → `voc/2026-05-20/espejo-results.json`
- [ ] Daniel + asistente: analizar distribución de trampas en 1 hora
- [ ] Identificar la trampa más prevalente → será HERO PIECE #1

**Viernes 23 May:**
- [ ] Grabar primer face-to-camera (60-90s) de la trampa #1 — Daniel desde casa, iPhone, vertical 1080×1920
- [ ] Spanglish natural: "Tu sistema se llama tu nombre. Y when you escalas, that name no escala con vos" (ejemplo del tono)
- [ ] Setup Stripe Checkout $9 USD (cuenta nueva o usar la existente de DRUO/AI Huevos)
- [ ] GHL: workflow Stripe webhook → custom field `tripwire_9_buyer` + tag

**Sábado 24 May (asíncrono, no publicar):**
- [ ] Grabar los 9 Looms de Daniel reaccionando a cada trampa (1.5-2 min cada uno, 25 min total)
- [ ] Diseñar template PDF (4 pages, merge tags)
- [ ] Pedir Endeavor staff las fotos de los 31 autodiagnósticos físicos

**Lunes 26 May:**
- [ ] HERO PIECE #1 publish 9am COT — texto largo + 1 face-to-camera 60s
- [ ] Daniel reserva Golden Hour 9-10am
- [ ] Setup Google Sheet `post-tracker` con columnas §5
- [ ] $9 producto LIVE: landing page (puede ser HTML simple en Netlify) + Stripe link + GHL webhook funcionando end-to-end

**Martes 27 May:**
- [ ] Publish trampa #2 (texto post + 1 cara-cámara) 9am COT
- [ ] Verificar que primer $9 sale → PDF llega → Loom reproduce → secuencia upgrade día 2 dispara

**Miércoles 28 May:**
- [ ] Publish trampa #3 (carousel 8 slides con las 3 actions visualizadas) 8am COT
- [ ] Asistente corta primer clip Fireflies tier 1 (Please Logística #1) para jueves

### Semana 2 (29 May - 4 Jun)

**Calendario detallado:**
- Lun 29: HELP utility — "El KPI que tu equipo no te dice" (motor_comercial)
- Mar 30: UNDERSTOOD verbatim — trampa #4 "Buscas un lead magnet. La norma te lo da gratis."
- Mié 31: HELP carousel — trampa #5 "Tu diferencial es técnico"
- **Jue 1 Jun: HERO PIECE #2** — face-to-camera 4 min, "Las 9 trampas del founder LatAm: cuál es la tuya" (link a $9 producto)
- Vie 2 Jun: VALUE video vertical — clip Nediar #2 ("8.9% sobre 30 cotizaciones")

**Tareas paralelas semana 2:**
- [ ] Reescritura del CTA en los 53 hooks restantes (4-5 horas) con scorecard §3
- [ ] Resto checklist GHL (38 items)
- [ ] Asistente corta 4 clips Fireflies tier 1
- [ ] Newsletter primer envío welcome (5 emails GHL)
- [ ] Validar Mailgun custom SMTP funcionando con 10 emails de prueba

### Métricas de éxito a los 14 días — actualizadas

- ✅ 8 posts publicados, todos score ≥75
- ✅ 2 hero pieces score ≥85
- ✅ Tripwire $9 LIVE y funcionando end-to-end
- ✅ Al menos **3 compras de $9** desde tráfico orgánico LinkedIn (validación mínima del funnel)
- ✅ ≥ 30 newsletter signups (gratis) + ≥ 3 buyers ($9)
- ✅ Avg dwell ≥ 14s
- ✅ Datos Convex importados a `voc/2026-05-20/espejo-results.json`

Si los $9 buyers < 1 a los 14 días con tráfico orgánico funcionando, el problema es el match producto-promesa, no el funnel. Reabrir landing + Loom de Daniel.

---

## 14. Voz canon — spanglish natural (D1)

Reglas operativas para el spanglish:

**✅ SÍ usar:**
- Términos técnicos en EN cuando son universales en LatAm B2B: pipeline, lead, deal, ICP, churn, dashboard, framework, hack, growth, funnel, leaking, scale, save it, mind-blowing, deal-breaker, no-brainer, the math doesn't math
- Frases que el founder LatAm ya usa en WhatsApp: "está hecho un mess", "this is the move", "let's go", "the irony is..."
- Anglicismos verbales naturales: "trackear", "trackeable", "agendamos", "deploy", "deploy-ar"

**❌ NO usar:**
- Spanglish forzado tipo MBA Stanford: "let me share my insights about your value proposition leverage"
- Code-switching cada 3 palabras (cringe)
- Términos en EN cuando ES tiene equivalente natural igual de fuerte
- Cuando se cita verbatim de founder: respetar lengua original (ES puro)

**Calibración rápida:** lee la frase en voz alta. Si suena como Daniel hablando con un founder colombiano en una cafetería, ✅. Si suena como TED talk en español, ❌.

---

## 15. Memory hooks (qué grabar en auto-memoria)

Después de ejecutar este doc, sugiero guardar estos memorias para futuras conversaciones:

- **feedback_no_cta_bait**: hooks/posts con "comenta X" o "DM Y" pierden distribución en LinkedIn 2026; usar pregunta abierta o newsletter hook
- **project_content_engine_2026_05_21**: virality framework + analytics system + Fireflies repurposing map iniciado 22 May 2026; revisar progreso 5 Jun
- **feedback_golden_hour**: Daniel responde cada comment en los primeros 60 min de publicación = 2.4x reach (no skip)
- **feedback_linkedin_first_then_tiktok**: contenido pasa a TikTok solo si scoreó 80+ predicted y 75+ actual en LinkedIn (gate explícito)

---

*Fin del documento. Owner: Daniel Cardona. Living doc — actualizar después de cada decision log semanal.*

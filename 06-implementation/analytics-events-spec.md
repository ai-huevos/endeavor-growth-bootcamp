# Analytics Events Spec · Operacional

**Para:** VA + Daniel
**Setup window:** Domingo 24 May (antes del launch del lunes 26)
**Tiempo estimado de setup:** 6-8 horas (VA con guidance Daniel)
**Mantenimiento ongoing:** 10 min/día (VA) + 30 min/sem (Daniel decision log)

---

## TL;DR

Sin medición no hay aprendizaje. Sin atribución no hay decisión. Este doc define:

1. **Cómo taggeamos cada link que sale al mundo** (UTM convention)
2. **Qué eventos capturamos** y dónde viven (17 eventos del customer journey)
3. **Cómo se conectan** (Stripe + Convex + Cal.com + Mailgun → GHL como source of truth)
4. **Cómo se ve cada semana** (post-tracker + KPI dashboard + decision log)
5. **Cuándo doblamos vs iteramos vs matamos** (decision rules cuantitativas)

---

## 1. UTM Tagging Convention

**Regla:** TODO link que sale a la audiencia (en post, bio, comment, email, DM) lleva UTMs. Sin excepciones.

### Schema

```
utm_source     = de dónde vino el click
utm_medium     = qué formato de contenido lo originó
utm_campaign   = identificador único del post o secuencia
utm_content    = qué CTA específico hicieron click
```

### Valores válidos

#### utm_source
| Valor | Cuándo |
|---|---|
| `linkedin` | Cualquier post LinkedIn |
| `tiktok` | Post TikTok |
| `newsletter` | Cualquier email del newsletter |
| `dm` | DM personal de Daniel |
| `bio` | Link clickeado desde bio LinkedIn |
| `email_personal` | Email 1:1 (thank you, follow-up manual) |
| `loom` | CTA dentro de Loom (description) |
| `referral` | Lead viene por share de otro founder |
| `direct` | Sin attribution (tipear URL) |

#### utm_medium
| Valor | Cuándo |
|---|---|
| `post_text` | Post de solo texto |
| `post_carousel` | Carousel slides |
| `post_video` | Video vertical |
| `comment` | Link en primer-comment (siempre Daniel) |
| `dm_template` | DM template a 32 founders |
| `dm_personal` | DM 1:1 fuera de template |
| `email_welcome` | Email del welcome series |
| `email_broadcast` | Newsletter normal semanal |
| `email_upgrade` | Email secuencia upgrade tripwire |
| `email_followup` | Email manual post-call |
| `bio_featured` | Featured section LinkedIn |
| `bio_link` | Link principal en bio |

#### utm_campaign
**Formato estricto:** `[tipo]-[id]-[version]`

Ejemplos:
- `hero-medir-w1` → Hero piece #1 trampa "medir" semana 1
- `post-H025-r2` → Hook H025 reescrito v2
- `welcome-email-1` → Email 1 del welcome series
- `upgrade-day-9` → Email día 9 de la secuencia upgrade tripwire
- `tripwire-launch` → Anuncio inicial del producto $9
- `bootcamp-thankyou` → Thank you email a los 32 founders
- `dm-cross-felipe` → DM personal a Felipe Calad (iMometrics)

**Regla:** un campaign = un emisor único de tráfico. Si el mismo hero piece se promueve en LinkedIn Y en TikTok → DOS campaigns distintas (`hero-medir-w1-li` y `hero-medir-w1-tt`).

#### utm_content
**Qué CTA específico siguieron:**
| Valor | Lleva a |
|---|---|
| `cta_newsletter` | Landing newsletter signup |
| `cta_tripwire` | Landing producto $9 |
| `cta_discovery` | Cal.com booking |
| `cta_masterclass` | Video privado masterclass |
| `cta_loom` | Loom video específico |
| `cta_calendar` | Calendar booking (alias discovery) |
| `cta_pdf` | PDF descarga (lead magnet free, no tripwire) |

### Ejemplo de URL completa

Post hero piece #1 en LinkedIn linkea a tripwire $9:

```
https://huevos.ai/espejo?utm_source=linkedin&utm_medium=post_text&utm_campaign=hero-medir-w1&utm_content=cta_tripwire
```

Comment first-in-row con link al newsletter:

```
https://huevos.ai/newsletter?utm_source=linkedin&utm_medium=comment&utm_campaign=hero-medir-w1&utm_content=cta_newsletter
```

### Tooling

Usar **GHL Link Tracking** nativo (genera UTMs auto cuando creas link en un email/SMS), o **Bitly** ($0/free tier hasta 50 links/mes — suficiente Phase 1) con UTMs manuales para LinkedIn posts.

**Convención de URL corta:** `huv.ai/[campaign]-[content]` (e.g. `huv.ai/hero-medir-trip`). Compra dominio corto (huv.ai o hue.vo, ~$15/año) — sube CTR vs bitly genérico.

---

## 2. Customer Journey Events (17 eventos)

Estos son los eventos que **capturamos**. Cada uno se registra en GHL (single source of truth) con properties específicas.

### Funnel de adquisición

#### E01 · profile_view
- **Source:** LinkedIn analytics (no API pública — proxy via Shield.app)
- **Propiedades:** timestamp, day_of_week, source_post_id (si se puede atribuir)
- **Action en GHL:** No automation. Solo reporte.

#### E02 · newsletter_signup
- **Source:** Form submit landing → GHL form webhook
- **Propiedades:** email, first_name, source_url, utm_*
- **Action en GHL:**
  - Crear contact si no existe
  - Tag `newsletter_subscriber`
  - Trigger workflow `welcome_series_5_emails`
  - Custom field `acquisition_post_id` = utm_campaign

#### E03 · tripwire_view
- **Source:** Page view en /espejo landing → GHL pixel
- **Propiedades:** session_id, utm_*, time_on_page
- **Action en GHL:** Track in funnel reports. Si time_on_page >60s y no compra → trigger remarketing email día +2.

#### E04 · tripwire_initiated
- **Source:** Stripe `checkout.session.created`
- **Propiedades:** email, amount, currency
- **Action en GHL:**
  - Crear contact tentative
  - Tag `tripwire_initiated_not_complete`
  - Si pasa 24h sin completar → trigger abandoned cart email

#### E05 · tripwire_purchased
- **Source:** Stripe `charge.succeeded`
- **Propiedades:** email, amount, stripe_customer_id, utm_*
- **Action en GHL:**
  - Tag `tripwire_9_buyer`
  - Custom field `tripwire_purchase_date`
  - Redirect to /espejo-async (quiz)
  - Trigger workflow `tripwire_fulfillment`

#### E06 · quiz_started
- **Source:** Convex mutation `register`
- **Propiedades:** email, company, founder_id (Convex)
- **Action en GHL:** Update contact con company.

#### E07 · quiz_completed
- **Source:** Convex mutation `saveResult`
- **Propiedades:** trampa_key, cluster, founder_id
- **Action en GHL:**
  - Custom field `trampa_assigned` = trampa_key
  - Custom field `cluster_assigned` = cluster
  - Trigger workflow `pdf_generation_and_delivery`

#### E08 · pdf_delivered
- **Source:** Mailgun webhook `delivered`
- **Propiedades:** message_id, email
- **Action en GHL:**
  - Tag `pdf_delivered`
  - Si bounce → alert Daniel manual

#### E09 · loom_viewed
- **Source:** Loom API webhook (si configurado) OR pixel tracking en email open
- **Propiedades:** loom_url, founder_id
- **Action en GHL:** Tag `loom_viewed` + signal de engagement

#### E10 · masterclass_accessed
- **Source:** Click tracking en email link / Vimeo private video view
- **Propiedades:** founder_id, watch_duration_pct (si Vimeo)
- **Action en GHL:** Tag `masterclass_engaged` + signal de upgrade readiness

### Funnel de conversión

#### E11 · discovery_booked
- **Source:** Cal.com webhook `BOOKING_CREATED`
- **Propiedades:** email, scheduled_at, duration, pre_call_answers (qty, trampa, win_expectation)
- **Action en GHL:**
  - Tag `discovery_booked`
  - Move contact a pipeline stage "Discovery Scheduled"
  - Send confirmation email con pre-call questions
  - Calendar invite

#### E12 · discovery_completed
- **Source:** Manual Daniel marks in GHL post-call OR Cal.com `BOOKING_RESCHEDULED`/`BOOKING_CANCELLED`/`BOOKING_COMPLETED` (si API soporta)
- **Propiedades:** outcome (showed/no_show/rescheduled), notes
- **Action en GHL:**
  - Si showed → move to stage "Discovery Completed"
  - Si no_show → tag + trigger workflow re-engagement
  - Daniel completa notes en custom field `discovery_notes`

#### E13 · course_purchased ($97)
- **Source:** Stripe `charge.succeeded` con product_id = mini_curso
- **Propiedades:** email, days_since_tripwire, utm_*
- **Action en GHL:**
  - Tag `course_97_buyer`
  - Move pipeline stage "Course Buyer"
  - Trigger course delivery workflow
  - Calcular y log `tripwire_to_course_days`

#### E14 · cohorte_purchased ($497-797)
- **Source:** Stripe `charge.succeeded` con product_id = cohorte
- **Propiedades:** email, price, cohorte_id
- **Action en GHL:**
  - Tag `cohorte_buyer`
  - Move pipeline stage "Cohorte Member"
  - Trigger onboarding workflow

### Eventos de engagement / retención

#### E15 · unsubscribed
- **Source:** Mailgun webhook OR GHL native
- **Propiedades:** email, unsubscribe_reason (si form pregunta)
- **Action en GHL:** Tag `unsubscribed` + remove de all email lists.

#### E16 · dm_inbound
- **Source:** Manual — Daniel/VA registran en sheet OR Slack webhook si Daniel forward DMs a un canal
- **Propiedades:** sender_name, sender_company, sender_role, message_excerpt, related_post_id, qualification_score (1-5)
- **Action:**
  - Crear/update contact en GHL
  - Custom fields: `dm_first_received`, `dm_count`, `dm_qualification`
  - Si qualification ≥4 → trigger Daniel response template + Cal.com discovery link

#### E17 · dm_qualified
- **Source:** Daniel marca manualmente
- **Propiedades:** sender_id, qualification_reason
- **Action en GHL:**
  - Move to pipeline stage "Qualified Lead"
  - Si Daniel hace touch personal → log activity

---

## 3. Stack de Integraciones

```
┌─────────────────────────────────────────────────────────────┐
│                    GHL (SOURCE OF TRUTH)                    │
│  contacts · tags · custom fields · workflows · pipeline     │
└──────┬───────────────┬────────────────┬────────────────┬────┘
       │ webhooks      │ webhooks       │ webhooks       │ webhooks
       │ in/out        │ in/out         │ in/out         │ in/out
       │               │                │                │
       ▼               ▼                ▼                ▼
   ┌────────┐     ┌─────────┐      ┌──────────┐    ┌─────────┐
   │ STRIPE │     │ CONVEX  │      │ Cal.com  │    │ MAILGUN │
   │        │     │ form    │      │ booking  │    │ SMTP    │
   │tripwire│     │ + quiz  │      │ tool     │    │delivery │
   └────────┘     └─────────┘      └──────────┘    └─────────┘
       ▲              ▲                  ▲              ▲
       │              │                  │              │
       │              │                  │              │
       └──────────────┴──── customer ────┴──────────────┘
                            click flow
```

### Webhooks a configurar (orden de prioridad)

1. **Stripe → GHL** (E04, E05, E13, E14) — sin esto no hay revenue tracking
2. **Convex → GHL** (E06, E07) — sin esto no se asigna trampa
3. **Cal.com → GHL** (E11, E12) — sin esto no se trackea pipeline discovery
4. **Mailgun → GHL** (E08, E15) — sin esto no se detecta bounce/unsub
5. **LinkedIn → Sheet** (E01) — manual con Shield.app o tableo manual

---

## 4. Post Tracker Sheet (estructura)

**Tool:** Google Sheets (compartido VA + Daniel) OR Airtable
**Ubicación:** `intelligence/content-analytics/post-tracker` (link en Sheets)
**Frequency:** Una fila por post. VA llena 24h y 48h post-publicación.

### Columnas (en orden)

| Col | Name | Tipo | Cuándo se llena |
|---|---|---|---|
| A | `post_id` | text | Pre-publish |
| B | `date_published` | date | Pre-publish |
| C | `time_slot` | time | Pre-publish |
| D | `day_of_week` | text | Auto formula |
| E | `format` | enum [text/carousel/video] | Pre-publish |
| F | `cluster` | enum [motor/ops/demand/capital/expansion] | Pre-publish |
| G | `trampa_target` | enum [medir/founder/normativo/etc/none] | Pre-publish |
| H | `awareness_target` | num 1-5 | Pre-publish |
| I | `framework` | enum [hormozi/schwartz/campbell/multi] | Pre-publish |
| J | `cta_pattern` | enum [P1-P6] | Pre-publish |
| K | `score_predicted` | num 0-100 | Pre-publish |
| L | `v1_hook` | num 0-20 | Pre-publish |
| M | `v2_voc` | num 0-20 | Pre-publish |
| N | `v3_niche` | num 0-20 | Pre-publish |
| O | `v4_save` | num 0-20 | Pre-publish |
| P | `v5_cta` | num 0-20 | Pre-publish |
| Q | `comments_60min` | num | 60 min post-publish |
| R | `daniel_replied_all_60min` | bool | 60 min post-publish |
| S | `impressions_24h` | num | 24h post |
| T | `impressions_48h` | num | 48h post |
| U | `dwell_avg_24h_sec` | num | 24h post (de Shield.app) |
| V | `dwell_avg_48h_sec` | num | 48h post |
| W | `saves_24h` | num | 24h post |
| X | `saves_48h` | num | 48h post |
| Y | `comments_24h` | num | 24h post |
| Z | `comments_48h` | num | 48h post |
| AA | `comments_avg_words` | num | 48h post (manual estimate o tool) |
| AB | `clicks_to_link_48h` | num | Bitly/GHL |
| AC | `dm_inbound_72h` | num | 72h post |
| AD | `profile_visits_24h` | num | 24h post |
| AE | `newsletter_signups_attributed` | num | 7d post |
| AF | `tripwire_purchases_attributed` | num | 7d post |
| AG | `discovery_booked_attributed` | num | 7d post |
| AH | `score_actual` | num 0-100 | Auto formula post-48h |
| AI | `delta_predicted_vs_actual` | num | Auto formula |
| AJ | `action` | enum [double/iterate/kill] | Decision log viernes |
| AK | `notes_daniel` | text | Daniel viernes |

### Formula `score_actual` (columna AH)

```
=
  IF(T2>=10000, 18, IF(T2>=2000, 14, IF(T2>=500, 10, 5)))  + // impressions weight
  IF(V2>=25, 18, IF(V2>=12, 14, IF(V2>=6, 8, 3))) +         // dwell weight
  IF(X2/T2>=0.04, 18, IF(X2/T2>=0.015, 14, 8)) +            // save rate weight
  IF(Z2/T2>=0.02, 16, IF(Z2/T2>=0.008, 12, 6)) +            // comment rate weight
  IF(AC2>=8, 16, IF(AC2>=2, 12, 4))                         // dm inbound weight
```

**Total max: 86.** Multiplica × 100/86 si quieres normalizar a 100. (O ajusta pesos según prioridad del trimestre.)

### Color coding visual

- Score actual 75+ → verde
- Score 50-74 → amarillo
- Score <50 → rojo
- Delta <-15 → rojo (predicted >> actual, hipótesis falló)
- Delta >+10 → verde brillante (sorprendió al alza, doblar)

---

## 5. Daily VA Workflow (10 min/mañana)

### Rutina lunes-viernes 8:00am COT

```
□ Step 1 (2 min): abrir LinkedIn analytics → screenshot impressions de los posts del día anterior
□ Step 2 (2 min): abrir Shield.app (o tool dwell) → tomar dwell time avg de cada post
□ Step 3 (3 min): llenar columnas S-Z del post-tracker para el post de hace 24h
□ Step 4 (2 min): llenar columnas Q-R del post de ayer (si VA estuvo presente Golden Hour)
□ Step 5 (1 min): contar DMs entrantes nuevos en LinkedIn de Daniel → log en sheet aparte
```

### Rutina sábados 9:00am COT

```
□ Step 1 (10 min): cerrar tracking de los 4 posts de la semana (columnas T, V, X, Z, AB, AC, AD)
□ Step 2 (5 min): calcular score_actual (auto) + delta + flag anomalías
□ Step 3 (5 min): preparar email viernes summary a Daniel:
   - Top post de la semana (más score actual)
   - Bottom post de la semana
   - 1 patrón observable
   - DM inbound count del periodo
   - Newsletter signups del periodo
   - Tripwire purchases del periodo
```

---

## 6. Weekly Decision Log (Daniel, viernes 30 min)

**Cuándo:** Cada viernes 4:00-4:30pm COT
**Tool:** Markdown file `intelligence/decision-logs/YYYY-WW.md` (un archivo por semana ISO)
**Input:** Daniel mira el sheet post-tracker + summary email del VA

### Template del log

```markdown
# Decision Log · 2026-WXX

## Stats de la semana

- Posts publicados: X (target 4)
- Score actual promedio: XX
- Mejor post: [post_id] · score XX
- Peor post: [post_id] · score XX
- Newsletter signups orgánicos: XX
- Tripwire purchases ($9): XX
- Discovery booked: XX
- DM inbound qualified: XX
- Revenue de la semana: $XXX

## 1 patrón positivo de la semana
[Observación cuantitativa específica]

## 1 patrón negativo de la semana
[Observación cuantitativa específica]

## 3 decisiones para la semana siguiente
1. [Doblar X porque Y]
2. [Iterar X cambiando Z]
3. [Matar X reemplazando con W]

## Hipótesis que ganó soporte
[Cuál de las 30 hypothesis-matrix entries se reforzó esta semana]

## Hipótesis que se debilitó
[Cuál perdió evidencia]

## Cambios al calendario semana próxima
- Lun: [post tipo X]
- Mar: [post tipo X]
- Mié: [post tipo X]
- Jue: [post tipo X]
```

### Reglas de proceso

- Si Daniel no escribe el log un viernes → ese sábado VA lo recuerda 1 vez. Si pasa 2 viernes seguidos sin log → es señal de burnout, replantear cadencia.
- Decisión "kill" requiere al menos 3 datapoints (3 posts del mismo tipo con score <50).
- Decisión "double" requiere 2 datapoints + alta confianza cualitativa.

---

## 7. KPI Dashboards (3 niveles)

### Daily snapshot (5 métricas, vista 1-glance VA por la mañana)

```
┌─────────────────────────────────────────┐
│  YYYY-MM-DD                             │
├─────────────────────────────────────────┤
│  Post de ayer impressions:   X,XXX      │
│  Post de ayer dwell avg:     XX.X s     │
│  DM inbound últimas 24h:     X          │
│  Newsletter signups 24h:     X          │
│  Tripwire purchases 24h:     X          │
└─────────────────────────────────────────┘
```

Implementación: tab "Daily" en Google Sheets con formulas que apuntan al tracker.

### Weekly review (15 métricas, Daniel viernes)

```
┌─────────────────────────────────────────────┐
│  Semana 2026-WXX                            │
├─────────────────────────────────────────────┤
│  CONTENT                                    │
│  Posts publicados:           4/4 ✓         │
│  Score promedio:             78            │
│  Hero pieces ≥85:            1/1           │
│  Dwell promedio:             14.2s         │
│  Save rate promedio:         2.1%          │
│                                             │
│  AUDIENCE                                   │
│  Followers nuevos LI:        +XX           │
│  Newsletter contacts:        XXX (+XX)     │
│  TikTok followers:           XX (+X)       │
│                                             │
│  PIPELINE                                   │
│  DMs entrantes:              X             │
│  DMs qualified:              X (XX%)       │
│  Discovery booked:           X             │
│  Discovery showed:           X (XX%)       │
│                                             │
│  REVENUE                                    │
│  Tripwire $9 buyers:         X ($XX)       │
│  Mini-curso $97 buyers:      X ($XX)       │
│  Total revenue semana:       $XXX          │
└─────────────────────────────────────────────┘
```

### Monthly business review (8 KPIs, Daniel + advisors)

```
┌─────────────────────────────────────────────┐
│  YYYY-MM                                    │
├─────────────────────────────────────────────┤
│  Newsletter:            XXX  (+XXX MoM)    │
│  Tripwire MRR equiv:    $XXX               │
│  Cohorte revenue MTD:   $XXX               │
│  Avg dwell time:        XX.Xs              │
│  Posts score ≥75:       XX/XX (XX%)        │
│  DMs qualified MTD:     XX                 │
│  Discovery → Tripwire:  XX%                │
│  LinkedIn followers:    X,XXX              │
└─────────────────────────────────────────────┘
```

---

## 8. Decision Rules (cuantitativas)

### When to DOUBLE (producir más del mismo tipo)

Una pieza se dobla si cumple ≥2 de estas:
- Score actual ≥80 a 48h
- Save rate ≥3% en 48h
- DMs attribuibles ≥4 en 72h
- Newsletter signups attribuibles ≥10 en 7d
- Dwell time ≥20s

**Acción concreta:**
- Variar el ángulo en otro post de la misma semana
- Repurpose a video vertical si fue text/carousel
- Repurpose a TikTok si pasa gate (§5 master doc)
- Convertir en hero piece expandido próximo mes

### When to ITERATE (mantener concepto, cambiar ejecución)

Score 50-74. Algún componente débil pero idea válida.
- Si V1 (hook) bajo: reescribir primer renglón
- Si V4 (save) bajo: convertir a carousel o agregar utility
- Si V5 (CTA) bajo: cambiar pattern del §1 del hook-bank-v2

**Acción:** publicar versión-r2 del mismo post 3-4 semanas después, distinto día/hora.

### When to KILL (parar de producir ese tipo)

Tres datapoints (3 posts del mismo formato/cluster) consecutivos con score actual <50.

**Acción:**
- Suspender ese formato 4 semanas mínimo
- Documentar en decision log la hipótesis muerta
- Si el cluster entero falla: rebrise pain-clusters.json (¿el cluster era hipótesis o real?)

### When to PAUSE (no decisión, solo señal)

Si reach colapsa >70% week-over-week sin razón aparente: señal de algo flag por LinkedIn. Pausar 7 días, no publicar. Investigar (bait detection, spam flag, política).

---

## 9. Atribución a Revenue (la parte que importa)

### Pregunta master: "¿Qué post originó este buyer $9 / $97 / cohorte?"

Cada buyer tiene un campo `acquisition_post_id` (custom field en GHL) que se setea en E02 (newsletter signup) o E05 (tripwire purchase) basado en utm_campaign.

### Reportes derivados

**Revenue por post:**
```sql
SELECT 
  utm_campaign,
  COUNT(DISTINCT contact_id) as buyers,
  SUM(deal_amount) as revenue
FROM ghl_deals
WHERE acquisition_post_id IS NOT NULL
GROUP BY utm_campaign
ORDER BY revenue DESC;
```

**Top 5 posts por revenue cada mes:**
- VA genera ese reporte primer día de cada mes
- Daniel revisa cuáles fueron los hooks/trampa/formatos ganadores
- Ese feedback ALIMENTA el calendario del mes siguiente

**Customer journey length:**
```
acquisition_post_id → newsletter_signup → tripwire_purchase → course_purchase → cohorte
                       (días entre cada step)
```

Si el promedio es 14 días entre tripwire y course → marketing automation timing puede comprimir. Si es 60 días → es ciclo normal post-PMF.

---

## 10. Sample CSV Headers (para importar a Sheets)

```csv
post_id,date_published,time_slot,day_of_week,format,cluster,trampa_target,awareness_target,framework,cta_pattern,score_predicted,v1_hook,v2_voc,v3_niche,v4_save,v5_cta,comments_60min,daniel_replied_all_60min,impressions_24h,impressions_48h,dwell_avg_24h_sec,dwell_avg_48h_sec,saves_24h,saves_48h,comments_24h,comments_48h,comments_avg_words,clicks_to_link_48h,dm_inbound_72h,profile_visits_24h,newsletter_signups_attributed,tripwire_purchases_attributed,discovery_booked_attributed,score_actual,delta_predicted_vs_actual,action,notes_daniel
hero-medir-w1,2026-05-26,09:00,Lunes,text,motor,medir,3,multi,P4,88,18,18,17,15,16,,,,,,,,,,,,,,,,,,,,
```

---

## 11. Setup Checklist Domingo 24 May

Antes del launch lunes 26, VA confirma:

### GHL
- [ ] Custom field `acquisition_post_id` (text) creado
- [ ] Custom field `trampa_assigned` (text, valores: medir/founder/ia/normativo/traduccion/precio/revenuehole/decisiones) creado
- [ ] Custom field `cluster_assigned` (text) creado
- [ ] Custom field `discovery_notes` (text long) creado
- [ ] Custom field `tripwire_purchase_date` (date) creado
- [ ] Custom field `dm_qualification` (number 1-5) creado
- [ ] Tags creados: newsletter_subscriber, tripwire_initiated_not_complete, tripwire_9_buyer, course_97_buyer, cohorte_buyer, pdf_delivered, loom_viewed, masterclass_engaged, discovery_booked, unsubscribed
- [ ] Pipeline stages: Newsletter Lead → Tripwire Initiated → Tripwire Buyer → Discovery Scheduled → Discovery Completed → Course Buyer → Cohorte Member
- [ ] Workflow `welcome_series_5_emails` creado y emails cargados
- [ ] Workflow `tripwire_fulfillment` con steps: trampa lookup → PDF gen → email send + Loom URL
- [ ] Workflow `pdf_generation_and_delivery` configurado

### Stripe
- [ ] Producto "El Espejo del Founder · async" creado · $9 USD one-time
- [ ] (Phase 3) Producto "Mini-curso 7 piezas" · $97 USD one-time
- [ ] Webhook endpoint apuntando a GHL: charge.succeeded, checkout.session.created
- [ ] Test webhook con compra dummy de $9 desde tarjeta personal

### Convex
- [ ] Async form deployado en `/espejo-async` (mismo computeTrampa que el bootcamp)
- [ ] Webhook salida hacia GHL endpoint con email + trampa_key + cluster
- [ ] Test: completar quiz → ver trampa correcta + GHL contact actualizado

### Mailgun
- [ ] Domain custom (mail.huevos.ai o similar) verificado con SPF/DKIM
- [ ] Inbound webhook a GHL para tracking opens/clicks/bounces
- [ ] Test: enviar email desde GHL → recibir en gmail/outlook → tracking funciona

### Cal.com
- [ ] Calendar "Discovery 30 min" creado con slots mar/jue 4-6pm COT
- [ ] Pre-call form con 3 preguntas (etapa, trampa, win expectation)
- [ ] Webhook → GHL endpoint con email + scheduled_at + form responses
- [ ] Test: bookear slot dummy → ver en GHL → recibir email confirmación

### Shield.app (LinkedIn analytics)
- [ ] Cuenta activa con /in/dani-cardona conectado
- [ ] Verificar acceso a dwell time data
- [ ] Decidir si trial $0/free o subscription ($24/mes)

### Google Sheet
- [ ] Sheet `post-tracker-2026.gsheet` creado con headers exactos del §4
- [ ] Tab "Daily" con dashboard del §7
- [ ] Tab "Weekly" con review del §7
- [ ] Tab "Decision Logs" — formulas que apunten a `intelligence/decision-logs/` markdown si Daniel los escribe en repo
- [ ] Compartir read/write con Daniel + VA

### Repo
- [ ] Folder `intelligence/decision-logs/` creado vacío
- [ ] `intelligence/content-analytics/` folder con link al sheet

---

## 12. Lo que NO tracking en Phase 1 (deliberado)

Para no sobrediseñar:

- ❌ Heatmaps en landing pages (Phase 3 con Hotjar si signup conversion <20%)
- ❌ Cohort retention de newsletter (Phase 3, suficiente con churn rate)
- ❌ Multi-touch attribution (Phase 4, last-touch attribution suficiente por ahora)
- ❌ AI-driven content scoring (mantener manual scoring §3 master doc, AI agrega ruido sin señal en N<100 posts)
- ❌ A/B testing automatizado (Phase 3, hacer A/B manual con 2 variantes)

**Regla:** simplicidad en Phase 1. Cada métrica que se mide tiene que disparar al menos una decisión semanal. Si no — se mata.

---

## 13. Recovery scenarios

### Si Shield.app no funciona o no soporta dwell

**Fallback:** estimar dwell con proxy = `(comments + 2×saves + 3×reshares) / impressions × constant`. Calibrar constant con primeros 20 posts cruzando contra el cualitativo de Daniel ("este post sentí que pegó duro").

### Si GHL webhooks no entregan reliable

**Fallback:** VA hace daily reconciliation manual entre Stripe dashboard + GHL contacts. 5 min extra/día. Pero ALERTA — si pasa más de 1 semana sin webhooks confiables, Daniel mete devops fix.

### Si Daniel olvida poner UTMs en posts manuales

**Fallback:** asumir attribution genérica `linkedin/organic` y notar en sheet. Pero en review semanal Daniel reaprende a poner UTMs — el costo de no atribuir es ceguera.

### Si los datos del sheet se acumulan sin que nadie los mire

**Fallback:** ScheduleWakeup tipo automation que recuerda al VA hacer review viernes + ping a Daniel si no escribió decision log en 14 días. Esta es la falla más común de sistemas analytics — recolección sin uso.

---

## 14. Notas finales

- **Source of truth = GHL.** Si datos en Stripe no matchean GHL, GHL gana — Stripe se reconcilia. (Excepción: revenue dinero real → Stripe gana.)
- **El sheet es human-readable mirror del GHL.** No es source of truth — es interfaz cómoda para decisiones humanas.
- **Decision log es source of truth de aprendizaje.** Si una decisión no está en el log, no se tomó. Aunque parezca obvia.
- **Si todo lo anterior no se puede ejecutar el domingo 24 — postpone launch lunes 26.** Mejor 1 semana tarde con analytics que 1 semana adelantado sin medir. La data del Phase 1 es la materia prima de las decisiones Phase 2-4.

---

*Documento operacional. Actualizar cuando se agregue evento o métrica. Mantener formato estricto — el VA depende de esto.*

# GHL Setup Checklist — Sprint 0

**Ejecuta:** Daniel + VA en GoHighLevel UI. Tiempo estimado: 4-6 horas spread across 2-3 días. Mark each item with `[x]` when done.

**Cuenta destino:** GHL account de Daniel (Huevos AI). Asegurar plan que incluya Funnels V2, Workflows, Memberships, Survey builder y API access.

---

## 1. Custom Fields (9) — Settings → Custom Fields → Contacts

Crear con tipo y opciones exactas:

- [ ] `li_source_post` — type: Text. Description: "ID del post LinkedIn que originó el contacto. Usado para atribución."
- [ ] `li_pain_cluster` — type: Dropdown. Options: `motor_comercial`, `ops_escala`, `demand_gen`, `capital`, `market_expansion`.
- [ ] `li_awareness_stage` — type: Number. Range hint: 1-5 (Schwartz: 1=unaware, 5=most-aware).
- [ ] `li_first_touch_date` — type: Date.
- [ ] `li_dm_turns_to_magnet` — type: Number. Cuántos turnos de DM antes de pedir el magnet.
- [ ] `magnet_consumed` — type: Dropdown. Options: `diagnostico`, `reporte`, `prompts`, `none`.
- [ ] `escala_tier` — type: Dropdown. Options: `free`, `97`, `297`, `497`, `997`, `2k_plus`.
- [ ] `discovery_outcome` — type: Dropdown. Options: `booked`, `confirmed`, `showed`, `no_show`, `closed_won`, `closed_lost`, `stalled`.
- [ ] `voc_source` — type: Dropdown. Options: `105_historico`, `2026-05-20`, `new`.

---

## 2. Tag taxonomy — Settings → Tags

Crear como tags planos pero CON convención `categoria:valor` jerárquica:

- [ ] `source:li` (LinkedIn como source primario)
- [ ] `source:referral`, `source:event`, `source:other`
- [ ] `magnet:diagnostico`, `magnet:reporte`, `magnet:prompts`
- [ ] `awareness:1`, `awareness:2`, `awareness:3`, `awareness:4`, `awareness:5`
- [ ] `cluster:motor`, `cluster:ops`, `cluster:demand`, `cluster:capital`, `cluster:market`
- [ ] `buyer:97`, `buyer:297`, `buyer:497`, `buyer:997`, `buyer:2k`
- [ ] `status:dm_iniciada`, `status:magnet_sent`, `status:magnet_consumed`, `status:nurturing`, `status:discovery_booked`, `status:won`, `status:lost`, `status:stalled`
- [ ] `voc:fresh`, `voc:historico`
- [ ] `hitl:va_approved`, `hitl:founder_approved`

---

## 3. Pipelines (3) — CRM → Opportunities → Pipelines

### Pipeline 1: PL1 LinkedIn → Magnet (6 stages)

- [ ] Crear pipeline `PL1 - LI to Magnet`
- [ ] Stages (en orden):
  - [ ] `01 - DM Initiated` (when Heyreach/manual DM enviado)
  - [ ] `02 - Reply Received` (cuando responden el primer DM)
  - [ ] `03 - Diagnostic Conversation` (≥3 turnos)
  - [ ] `04 - Magnet Delivered` (enviado el link)
  - [ ] `05 - Magnet Consumed` (completaron diagnóstico)
  - [ ] `06 - Handoff to PL2` (entran a email sequence)

### Pipeline 2: PL2 ESCALA Ladder (8 stages)

- [ ] Crear pipeline `PL2 - ESCALA Ladder`
- [ ] Stages:
  - [ ] `01 - Opted In` (email captured)
  - [ ] `02 - Email-1 Read` (open + CTR primer email)
  - [ ] `03 - Tripwire Buyer ($97)`
  - [ ] `04 - Frontend Upsell ($297)`
  - [ ] `05 - Mid Buyer ($497)`
  - [ ] `06 - Discovery Booked ($2K+)`
  - [ ] `07 - Discovery Attended`
  - [ ] `08 - Won / Lost`

### Pipeline 3: PL3 Discovery Calls (7 stages)

- [ ] Crear pipeline `PL3 - Discovery Calls`
- [ ] Stages:
  - [ ] `01 - Booked`
  - [ ] `02 - Confirmed (reminder enviado)`
  - [ ] `03 - Showed`
  - [ ] `04 - Diagnosed (filled discovery script)`
  - [ ] `05 - Proposal Sent`
  - [ ] `06 - Closed-Won`
  - [ ] `07 - Closed-Lost / Stalled`

---

## 4. Funnels (5) — Sites → Funnels (V2)

### F1: Diagnóstico 7 Piezas (entry magnet)
- [ ] Página 1: Landing con quiz embed (Survey nativo GHL — ver sección 6)
- [ ] Página 2: Thank you + email opt-in si quieren PDF detallado
- [ ] Página 3: PDF auto-download + redirect a F2 después de 8s
- [ ] Workflow trigger: opt-in → PL1 stage `04 - Magnet Delivered`

### F2: Reporte Motor Comercial LatAm (mid magnet, gated)
- [ ] Landing con email opt-in gate
- [ ] Email auto con link al PDF gated
- [ ] Workflow trigger: opt-in → tag `magnet:reporte`

### F3: Tripwire $97 (Mini-curso o herramienta)
- [ ] Sales page con order form
- [ ] Order bump $47 (15 AI Prompts) — AOV target $144
- [ ] Thank-you con upsell a F4
- [ ] Workflow: compra → PL2 stage `03 - Tripwire Buyer`

### F4: Mid $497 (Curso completo o cohorte corto, 1-click upsell)
- [ ] Sales page accesible vía 1-click upsell post-F3
- [ ] 1-click upsell pre-built
- [ ] Workflow: compra → PL2 stage `05 - Mid Buyer`

### F5: High-Ticket Discovery Booking (Calendly embed)
- [ ] Página de application form con campos cualificadores
- [ ] Calendar booking nativo GHL
- [ ] HIDDEN FIELD: `li_handle` (LinkedIn handle, prellenado vía URL param)
- [ ] Confirmación + redirect a un video de "qué esperar"
- [ ] Workflow: booking → PL3 stage `01 - Booked` + email confirmation + SMS reminder T-24h y T-1h (si A2P aprobado, else email only)

---

## 5. Workflows críticos (10) — Automation → Workflows

Crear con Trigger + Filter + Actions. Empezar simple, iterar.

### W1: LI DM → Lead Magnet
- [ ] Trigger: tag `status:magnet_sent` added
- [ ] Action: email con link al magnet (Mailgun custom SMTP)
- [ ] Action: agregar a PL1 stage 04
- [ ] Action: SMS (si A2P) recordatorio T+4h si email no abierto

### W2: Lead Magnet Consumed → Awareness Routing
- [ ] Trigger: `magnet_consumed` updated (any value not none)
- [ ] Filter por `li_awareness_stage`:
  - [ ] 1-2 → enroll en sequence W3
  - [ ] 3 → enroll en sequence W4
  - [ ] 4-5 → enroll en sequence W5

### W3: Email Nurture Sequence A (awareness 1-2)
- [ ] 7 emails / 10 días
- [ ] Templates en `sequences/stage-1-2/E0[1-7].md` (Daniel aprueba master una vez)
- [ ] Cada email envía via Mailgun SMTP custom
- [ ] Día 6: invitación discovery solo si CTR E1 ≥40%

### W4: Email Nurture Sequence B (awareness 3)
- [ ] 7 emails / 10 días
- [ ] Día 4: tripwire offer $97
- [ ] Día 6: discovery invitation

### W5: Email Nurture Sequence C (awareness 4-5)
- [ ] 5 emails / 7 días, accelerated
- [ ] Día 2: discovery offer directo
- [ ] Día 4: mid $497
- [ ] Día 6: bootcamp $2K+

### W6: Frontend $97 Buyer → Mid Upsell
- [ ] Trigger: tag `buyer:97` added
- [ ] Action: 1-click upsell page en F4 (Mid $497)
- [ ] Si no compra: email follow-up D+3 + D+7 + D+14
- [ ] Si compra: tag `buyer:497` + enroll en W7

### W7: Mid Buyer → High-Ticket Discovery
- [ ] Trigger: tag `buyer:497` added
- [ ] Action: SMS/email invitación a discovery call ($2K+ bootcamp)
- [ ] Action: Calendly link personalizado

### W8: Discovery Booked → Show Confirmation
- [ ] Trigger: PL3 stage `01 - Booked`
- [ ] Action: email confirmation immediate
- [ ] Action: email T-24h con "qué esperar"
- [ ] Action: SMS T-1h (si A2P aprobado)
- [ ] Action: email T+30min post-call con resumen + next steps

### W9: Discovery No-Show → Re-engagement
- [ ] Trigger: PL3 stage `01 - Booked` y NO `03 - Showed` después de calendar time + 30min
- [ ] Action: email "te perdí, podemos reagendar?"
- [ ] Action: 1 reminder D+3, otro D+7
- [ ] Si no reagenda: mover a stage `07 - Stalled`

### W10: Stalled Lead (14 días sin actividad)
- [ ] Trigger: no activity en 14 días después de cualquier touch
- [ ] Action: email reactivación con nuevo ángulo (rotación de los 5 pain clusters)
- [ ] Action: si no responde D+7, tag `status:stalled`

---

## 6. Forms / Surveys — Sites → Forms / Surveys

### Survey: Diagnóstico 7 Piezas del Funnel
- [ ] Crear nuevo Survey
- [ ] 7 preguntas (una por pieza), tipo radio o slider 1-10
- [ ] Lógica de scoring: cada respuesta suma puntos por cluster
- [ ] Custom field assignment: setear `li_pain_cluster` al cluster con mayor score
- [ ] Custom field assignment: setear `li_awareness_stage` basado en lenguaje usado en pregunta abierta final
- [ ] Redirect post-submission a página de PDF auto-generado

**Las 7 piezas (referencia del playbook-v5):**
1. ICP claro (1 = ningún criterio, 10 = scoring 1-10 con 5 criterios)
2. Lead source diversificado (1 = solo red personal, 10 = 4+ canales escalables)
3. Discovery call estandarizada (1 = improviso, 10 = 7 preguntas exactas)
4. Oferta empaquetada (1 = vendo horas, 10 = paquete con outcome claro)
5. CRM activo (1 = no tengo, 10 = pipeline con stages + automations)
6. Email nurture (1 = nada, 10 = secuencia automatizada)
7. Escalera de valor (1 = un solo producto, 10 = 4 tiers conectados)

---

## 7. Email setup — Settings → Email Services

- [ ] Conectar Mailgun Foundation ($35/mo) como SMTP custom
- [ ] Configurar SPF, DKIM, DMARC en DNS
- [ ] Warmup plan: 5 emails día 1 → 25 día 3 → 100 día 7 → 500 día 14
- [ ] Test deliverability con Mail-Tester (target ≥9/10)
- [ ] Crear sender identity: Daniel Cardona <dani@huevos.ai> (o similar)

---

## 8. Calendar — Settings → Calendars

- [ ] Crear calendar `Discovery Call - Huevos AI` (30 min)
- [ ] Round robin disabled (solo Daniel)
- [ ] Buffer 10 min antes/después
- [ ] Form fields incluir: nombre, email, LinkedIn URL, empresa, role, revenue band, "qué dolor te trae"
- [ ] HIDDEN FIELD `li_handle` para atribución
- [ ] Confirmation email + 24h reminder
- [ ] Available hours: lun-vie 10am-5pm COT

---

## 9. Integrations to connect

- [ ] Apify webhook → GHL contact create (configurar webhook al final de L1 scraping output)
- [ ] Heyreach webhook → GHL contact update (DM events sync)
- [ ] Zapier/Make watcher para `content/posts/` carpeta del repo → AuthoredUp schedule (cuando posts marcados `status: approved`)
- [ ] (Opcional Sprint 5+) LinkedIn Ads → GHL para amplificación de winners

---

## 10. Verificación final Sprint 0

- [ ] Crear un contacto de prueba con todos los custom fields llenos
- [ ] Disparar manualmente W2 (awareness routing) y verificar que el contacto entra a la sequence correcta
- [ ] Enviar email de prueba a Gmail, Outlook, Yahoo — verificar inbox (no spam) en los 3
- [ ] Bookear un calendar slot de prueba y verificar workflow W8 dispara
- [ ] Tomar screenshot del dashboard mostrando los 3 pipelines + custom fields visibles → adjuntar a este checklist

**Cuando todos los checkboxes estén [x], marcar Task #6 (GHL setup checklist) como completed.**

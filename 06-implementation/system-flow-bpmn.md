# System Flow Diagrams · BPMN-Style (Mermaid)

**Para:** Daniel + GHL Implementer
**Uso:** Daniel aprueba → implementer construye. Si Daniel ve algo mal en cualquier diagrama, comenta inline y volvemos a aprobar antes de construir.

**Render:** todos los diagramas son Mermaid — se ven correctamente en GitHub, VSCode, Notion, Obsidian, y cualquier markdown viewer moderno.

---

## ÍNDICE

1. [Master Funnel — vista alto nivel](#1-master-funnel)
2. [Tripwire $9 Fulfillment — detalle técnico](#2-tripwire-9-fulfillment)
3. [Newsletter Welcome Series — 5 emails](#3-newsletter-welcome-series)
4. [Discovery Call Flow](#4-discovery-call-flow)
5. [Pipeline ESCALA Ladder — state transitions](#5-pipeline-state-transitions)
6. [Attribution Model — cómo se ata revenue a post_id](#6-attribution-model)

---

## 1. Master Funnel {#1-master-funnel}

Vista alto nivel de las 4 entry paths + sus destinos.

```mermaid
flowchart TD
    Start([Founder LatAm B2B<br>scroll LinkedIn]) --> Post{Ve post Daniel<br>/in/dani-cardona}
    
    Post -->|Hook engancha| Read[Lee post completo]
    Post -->|Hook no engancha| Scroll[Scroll away — pérdida]
    
    Read --> CTA{Qué hace<br>siguiente?}
    
    CTA -->|Click bio link| Bio[LinkedIn bio<br>3 featured links]
    CTA -->|Click newsletter CTA| News[Landing<br>/newsletter]
    CTA -->|Click tripwire CTA| Trip[Landing<br>/espejo]
    CTA -->|Click Cal link| Disc[Cal.com<br>discovery booking]
    CTA -->|Comenta| Comment[Comment<br>en post]
    CTA -->|DM directo| DM[DM a Daniel]
    
    Bio --> News
    Bio --> Trip
    Bio --> Disc
    
    Comment --> DanielReply[Daniel responde<br>Golden Hour]
    DanielReply --> WarmDM{Conversación<br>genera DM?}
    WarmDM -->|Sí| DM
    WarmDM -->|No| Followup[Follow signal pending]
    
    News --> NewsFlow[FLOW: Newsletter<br>Welcome 5 emails]
    Trip --> TripFlow[FLOW: Tripwire $9<br>Fulfillment]
    Disc --> DiscFlow[FLOW: Discovery<br>Call Booking]
    DM --> ManualFlow[FLOW: Manual DM<br>Daniel responde]
    
    NewsFlow --> Upgrade1{Upgrade a<br>Tripwire $9?}
    TripFlow --> Upgrade2{Upgrade a<br>Mini-curso $97?}
    DiscFlow --> Upgrade3{Cierra a<br>$497-2K?}
    
    Upgrade1 -->|Sí| TripFlow
    Upgrade2 -->|Sí| Course[Mini-curso $97<br>Phase 3]
    Course --> Upgrade4{Cohorte<br>$497-797?}
    Upgrade4 -->|Sí| Cohort[Cohorte Phase 4]
    Cohort --> Bootcamp[Bootcamp $2K+]
    
    style Start fill:#FFD826,stroke:#101010,stroke-width:2px,color:#101010
    style Trip fill:#3988FF,stroke:#101010,color:#FFFFFF
    style News fill:#B59EF9,stroke:#101010,color:#101010
    style Disc fill:#22C55E,stroke:#101010,color:#FFFFFF
    style Scroll fill:#888888,stroke:#101010,color:#FFFFFF
```

### Decisiones pendientes en este diagrama

- [ ] ¿Qué pasa con "Comment" que NO genera DM? Daniel: ¿dejas signal en GHL para futuro retargeting o lo dejas pasar?
- [ ] ¿Qué pasa con visitor que SOLO ve bio sin click? Sin tracking visible — aceptamos pérdida.

---

## 2. Tripwire $9 Fulfillment {#2-tripwire-9-fulfillment}

Sequence diagram detallado del flujo más complejo: $9 → PDF + Loom en <60s.

```mermaid
sequenceDiagram
    actor Founder
    participant Land as Landing /espejo
    participant Stripe
    participant Quiz as Convex Quiz
    participant GHL
    participant PDF as PDF Generator<br>(PDFMonkey / Puppeteer)
    participant Mail as Mailgun

    Founder->>Land: 1. Visita /espejo<br>(UTM tracked)
    Note over Land: E03 tripwire_view
    
    Founder->>Land: 2. Click "Comprar $9"
    Land->>Stripe: 3. checkout.session.created
    Note over Stripe: E04 tripwire_initiated
    Stripe->>GHL: 4. Webhook<br>checkout.session.created
    GHL->>GHL: 5. Create contact tentative<br>+ tag tripwire_initiated
    
    Founder->>Stripe: 6. Completa pago
    Stripe->>GHL: 7. Webhook<br>charge.succeeded
    Note over GHL: E05 tripwire_purchased
    GHL->>GHL: 8. Tag tripwire_9_buyer<br>+ custom field<br>tripwire_purchase_date
    
    Stripe->>Founder: 9. Redirect a<br>/espejo-async (quiz)
    
    Founder->>Quiz: 10. Llena 6 preguntas
    Note over Quiz: E06 quiz_started<br>E07 quiz_completed
    Quiz->>Quiz: 11. computeTrampa()<br>asigna trampa_key
    Quiz->>GHL: 12. Webhook<br>/trampa-assigned
    GHL->>GHL: 13. Update field<br>trampa_assigned = "medir"<br>(etc)
    
    GHL->>PDF: 14. Trigger PDF generation<br>con merge tags del contact
    PDF->>PDF: 15. Render HTML template<br>→ PDF binary
    PDF->>GHL: 16. Upload PDF<br>retorna URL temporal
    
    GHL->>Mail: 17. Send email<br>+ PDF adjunto<br>+ Loom embed URL<br>(según trampa_key)
    Mail->>Founder: 18. Email llega<br><60s después de pago
    Note over Mail: E08 pdf_delivered
    
    Founder->>Founder: 19. Abre email,<br>descarga PDF,<br>click Loom
    Note over Founder: E09 loom_viewed
    
    GHL->>GHL: 20. Schedule upgrade<br>sequence:<br>Day 2, 5, 9, 14, 30
```

### Decisiones pendientes en este diagrama

- [ ] **Step 11 — Quiz**: ¿el quiz vive en mismo deployment Convex `superb-whale-436` que la versión live (bootcamp), o se crea uno nuevo `async-superb-whale`? **Recomendación:** mismo deployment, nuevo `sessionCode = "ASYNC2026"` para no mezclar data con bootcamp.
- [ ] **Step 15 — PDF stack**: Daniel decide Puppeteer self-host vs PDFMonkey ($29/mo) vs Documint ($24/mo). Implementer recomienda PDFMonkey.
- [ ] **Step 17 — Email template**: ¿adjunto + hosted backup link, o solo hosted link (más liviano email)? **Recomendación:** ambos. Adjunto + hosted link en cuerpo, por si client no abre adjuntos.
- [ ] **Step 20 — Upgrade sequence**: copy específico día 2, 5, 9, 14, 30 — Daniel aprueba en sesión separada Phase 2.

### Error states (qué pasa si algo falla)

```mermaid
flowchart LR
    Payment[Pago OK] --> Quiz[Quiz?]
    Quiz -->|Founder no completa| Recovery1[Email D+1<br>recordatorio quiz]
    Quiz -->|Completa OK| PDF[PDF gen?]
    
    PDF -->|Generación falla| Recovery2[Email holding<br>'tu PDF llega en 24h'<br>+ alert Daniel manual]
    PDF -->|OK| Mail[Mailgun send?]
    
    Mail -->|Bounce hard| Recovery3[Alert Daniel<br>contact manual]
    Mail -->|Delivered OK| End[End — track tags]
    
    style Recovery1 fill:#FFB800,color:#101010
    style Recovery2 fill:#FF5C23,color:#FFFFFF
    style Recovery3 fill:#FF5C23,color:#FFFFFF
```

---

## 3. Newsletter Welcome Series {#3-newsletter-welcome-series}

5 emails con triggers temporales + branch logic.

```mermaid
flowchart TD
    Start([Visitor llena<br>form newsletter]) --> E1[Email 1<br>INMEDIATO<br>Welcome + PDF 7 Piezas]
    
    E1 --> Wait1{Espera<br>24h}
    Wait1 --> E2[Email 2<br>DAY +1<br>Caso 80K WhatsApp]
    
    E2 --> Wait2{Espera<br>48h}
    Wait2 --> E3[Email 3<br>DAY +3<br>CRM vs teatro]
    
    E3 --> Wait3{Espera<br>4 días}
    Wait3 --> E4[Email 4<br>DAY +7<br>Pitch suave $9]
    
    E4 --> Branch{Clickeó CTA $9<br>en email 4?}
    Branch -->|Sí, fue a /espejo| TripFlow[Va a Tripwire flow<br>Diagram §2]
    Branch -->|No| Wait4{Espera<br>1 semana}
    
    Wait4 --> E5[Email 5<br>DAY +14<br>Pregunta abierta<br>responde número 1-4]
    
    E5 --> Reply{Responde<br>el email?}
    Reply -->|Sí — número 1| Tag1[Tag<br>interest_framework]
    Reply -->|Sí — número 2| Tag2[Tag<br>interest_case_study]
    Reply -->|Sí — número 3| Tag3[Tag<br>interest_crm]
    Reply -->|Sí — número 4| Tag4[Tag<br>interest_data]
    Reply -->|Sí — discovery| DiscFlow[Va a Discovery flow<br>Diagram §4]
    Reply -->|No responde| Steady[Estado steady<br>newsletter normal 1/sem]
    
    Tag1 --> Steady
    Tag2 --> Steady
    Tag3 --> Steady
    Tag4 --> Steady
    
    style E1 fill:#FFD826,color:#101010
    style E4 fill:#3988FF,color:#FFFFFF
    style E5 fill:#B59EF9,color:#101010
    style TripFlow fill:#22C55E,color:#FFFFFF
```

### Stop conditions (cuándo PARA la secuencia)

- Si compra tripwire $9 en cualquier momento → mueve a secuencia upgrade tripwire, PARA welcome
- Si bookea discovery en cualquier momento → mueve a discovery flow, PARA welcome
- Si unsubscribe → PARA permanente
- Si bounce hard → tag `email_invalid`, PARA permanente

### Decisiones pendientes

- [ ] ¿El PDF "7 Piezas" del Email 1 ya existe? Si no, hay que crearlo (~2h Daniel) — **NO BLOQUEA go-live**, se puede swap link el martes
- [ ] ¿El "Caso 80K WhatsApp" del Email 2 es real o ficción? Si real, necesitamos permiso founder

---

## 4. Discovery Call Flow {#4-discovery-call-flow}

```mermaid
sequenceDiagram
    actor Founder
    participant Cal as Cal.com
    participant GHL
    participant Daniel
    participant Mail as Mailgun

    Founder->>Cal: 1. Visita link booking<br>(UTM tracked)
    Cal->>Founder: 2. Form pre-call<br>(stage, trampa, win expectation)
    
    Founder->>Cal: 3. Llena form +<br>selecciona slot
    Note over Cal: E11 discovery_booked
    Cal->>GHL: 4. Webhook BOOKING_CREATED<br>+ form answers
    
    GHL->>GHL: 5. Update contact<br>+ tag discovery_booked<br>+ stage Discovery Scheduled
    GHL->>Mail: 6. Confirmation email<br>+ calendar invite
    Mail->>Founder: 7. Email confirmación<br>+ 3 pregs prep
    
    Cal->>GHL: 8. T-24h trigger<br>(automation Cal o cron)
    GHL->>Mail: 9. Reminder email<br>'qué esperar'
    Mail->>Founder: 10. Reminder<br>24h antes
    
    Founder->>Daniel: 11. Llega a la call
    
    alt Founder no llega (no-show)
        GHL->>GHL: T+30min → tag no_show
        GHL->>Mail: Email 'te perdí, reagendamos?'
        Mail->>Founder: Reagenda link
    else Founder llega
        Daniel->>Daniel: 12. Hace la call 30 min
        Note over Daniel: E12 discovery_completed
        Daniel->>GHL: 13. Manual update post-call<br>(outcome + notas)
        GHL->>Mail: 14. Follow-up email<br>resumen + next step
        Mail->>Founder: 15. Email post-call<br>30 min después
    end
    
    alt Outcome = interesado en tripwire $9
        GHL->>GHL: Trigger tripwire upsell sequence
    else Outcome = interesado en cohorte $497
        GHL->>GHL: Manual offer + custom timeline
    else Outcome = no fit
        GHL->>GHL: Tag not_fit_now + 90-day re-engagement
    end
```

### Decisiones pendientes

- [ ] **Cal.com booking form fields**: confirmar las 3 preguntas en `04-content-production/content-week1-launch-pack.md` §12 son las definitivas
- [ ] **Calendar slots**: martes/jueves 4-6pm COT — ¿OK?
- [ ] **Daniel post-call update manual**: si Daniel no hace el update post-call, no hay E12. ¿Aceptable o necesitamos automation que pregunte "¿cómo fue la call?" T+1h?

---

## 5. Pipeline ESCALA Ladder — State Transitions {#5-pipeline-state-transitions}

Pipeline único con 8 stages. Un contact siempre está en exactamente 1 stage.

```mermaid
stateDiagram-v2
    [*] --> S01: First touch
    
    S01: 01 · Cold (visited any landing)
    S02: 02 · Newsletter Opt-in
    S03: 03 · Tripwire $9 Buyer
    S04: 04 · Discovery Booked
    S05: 05 · Discovery Completed
    S06: 06 · Mini-curso $97 Buyer
    S07: 07 · Cohorte $497-797 Inscrito
    S08: 08 · Bootcamp $2K+ Won
    
    Lost: 99 · Lost / Cold
    
    S01 --> S02: newsletter_signup
    S01 --> S03: tripwire_purchased (skip newsletter)
    S01 --> S04: discovery_booked (skip newsletter & tripwire)
    
    S02 --> S03: tripwire_purchased
    S02 --> S04: discovery_booked
    S02 --> Lost: 90 días sin actividad
    
    S03 --> S04: discovery_booked (post-tripwire)
    S03 --> S06: mini_curso_purchased
    S03 --> Lost: 90 días sin upgrade
    
    S04 --> S05: discovery_completed (showed)
    S04 --> Lost: no_show + 2 reagendas falladas
    
    S05 --> S06: mini_curso_purchased
    S05 --> S07: cohorte_purchased (skip mini)
    S05 --> Lost: 60 días sin compra
    
    S06 --> S07: cohorte_purchased
    S06 --> S08: bootcamp_purchased (skip cohorte)
    
    S07 --> S08: bootcamp_purchased
    S07 --> [*]: cohorte completada
    
    S08 --> [*]: bootcamp completed
    
    Lost --> S01: re-engagement campaign exitoso
```

### Regla clave

Un contact SOLO sube de stage, nunca baja (excepto a Lost). Si compra tripwire $9 antes de ser newsletter signup → salta directo a S03.

### Decisiones pendientes

- [ ] **¿Lost timing?** 90 días para newsletter sin actividad. ¿OK o más agresivo (60d) / menos (180d)?
- [ ] **¿Re-engagement campaign desde Lost?** Definir en Phase 2-3, no urgente

---

## 6. Attribution Model {#6-attribution-model}

Cómo se ata cada compra (revenue) al post de LinkedIn que originó el lead.

```mermaid
flowchart LR
    Post[LinkedIn post<br>hero-medir-w1] -->|Link con UTM| Click[Visitor click]
    Click --> Land[Landing /espejo<br>?utm_campaign=hero-medir-w1]
    
    Land -->|GHL pixel| Cookie[Cookie/session<br>guarda UTM]
    Land --> Buy[Compra Stripe]
    
    Buy --> Stripe[Stripe metadata<br>incluye utm_campaign]
    Stripe -->|Webhook| GHL[GHL contact<br>acquisition_post_id =<br>hero-medir-w1]
    
    GHL --> Upgrade1[Día 9 buy<br>mini-curso $97]
    Upgrade1 --> Attrib1[Revenue $97<br>attributed to<br>hero-medir-w1]
    
    GHL --> Upgrade2[Día 30 buy<br>cohorte $497]
    Upgrade2 --> Attrib2[Revenue $497<br>attributed to<br>hero-medir-w1]
    
    Attrib1 --> Dash[Dashboard:<br>hero-medir-w1<br>= $9 + $97 + $497<br>= $603 LTV-30d]
    Attrib2 --> Dash
    
    style Post fill:#FFD826,color:#101010
    style Dash fill:#22C55E,color:#FFFFFF
```

### Reglas de atribución

- **First-touch attribution**: el `acquisition_post_id` se setea en el primer touch (newsletter signup o tripwire compra) y NO cambia después. Aunque después el founder vea más posts, todo revenue se atribuye al post original.
- **Excepción**: si el founder hace newsletter signup desde post A y luego compra tripwire desde post B (separado de email newsletter), atribuimos a post B (segundo touch genera la conversión). Esto requiere lógica especial — definir Phase 2 si vale la pena.
- **Multi-touch (Phase 3+)**: si tenemos 100+ contacts/mes, vale la pena modelo multi-touch. Hoy first-touch es suficiente.

### Decisiones pendientes

- [ ] ¿First-touch o last-touch? **Recomendación: first-touch** Phase 1-2, switch a multi-touch Phase 3+
- [ ] ¿Cómo manejamos posts repurposeados (mismo contenido LinkedIn vs TikTok)? **Recomendación:** UTM campaign suffix `-li` o `-tt` para distinguir plataforma

---

## Cómo usar este doc en la review

**Daniel:** lee los 6 diagramas en orden. En cada uno, sección "Decisiones pendientes" requiere tu input. Marca con ✅ las que apruebas, ✏️ las que cambias.

**Implementer:** no construye nada hasta que Daniel marque ✅ en TODAS las decisiones pendientes. Si Daniel cambia algo (✏️), actualiza el diagrama acá y vuelves a pedir aprobación.

**Versión de este doc:** v1 · 2026-05-22

Cambios versión a versión van al final del archivo:

```
## Changelog
- v1 (2026-05-22): Initial version
```

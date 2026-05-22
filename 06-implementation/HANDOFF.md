# HANDOFF · GHL Implementer

**Cliente:** Daniel Cardona — Huevos AI
**Goal:** montar embudo completo de conversión LinkedIn → Newsletter → Tripwire $9 → Mini-curso $97 → Cohorte $497-797
**Stack obligatorio:** GoHighLevel + Stripe + Convex + Mailgun + Cal.com
**Window de implementación:** Vie 22 May → Dom 25 May (4 días) — go-live lunes 26 May 9:00 COT
**Effort estimado:** 14-18 horas de implementador + 4-6 horas de Daniel revisando

---

## 1. Lo que estás construyendo en 1 párrafo

Un embudo de conversión donde el contenido orgánico de LinkedIn de Daniel (4 posts/semana) atrae founders LatAm B2B a 4 destinos: newsletter gratis, tripwire $9 (PDF personalizado + Loom + masterclass), discovery call gratis, o DM directo. Todo se atribuye a un `post_id` específico vía UTMs. El producto $9 ("El Espejo del Founder") usa un quiz async de 6 preguntas en Convex que asigna 1 de 8 trampas, dispara generación de PDF personalizado con merge tags, y entrega vía Mailgun en <60s. Cada compra dispara una secuencia de upgrade automatizada hacia mini-curso $97 (Phase 3) y cohorte $497-797 (Phase 4). GHL es source of truth de contactos, atribución, y pipeline.

---

## 2. Leer en este orden (45 min de lectura)

| # | Documento | Por qué | Tiempo |
|---|---|---|---|
| 1 | **`HANDOFF.md`** (este) | Contexto general + scope | 5 min |
| 2 | **`system-flow-bpmn.md`** | 5 diagramas Mermaid del sistema completo. Visual. | 10 min |
| 3 | **`analytics-events-spec.md`** | UTM convention + 17 eventos + workflows GHL detallados | 15 min |
| 4 | **`credentials-and-access-checklist.md`** | Lo que necesitas de Daniel para arrancar | 3 min |
| 5 | `../05-lead-magnet-product/copy-and-design-prompt.md` PARTE 4 | Flow técnico Stripe → Convex → Mailgun | 5 min |
| 6 | `../03-strategy/01-virality-and-content-engine.md` §5 | KPIs y atribución (contexto, no acción) | 5 min |
| 7 | `../04-content-production/content-week1-launch-pack.md` §8 + §7 + §11 | Copy listo para cargar en GHL (welcome series, thank-you, crisis responses) | 3 min |

Los demás docs son contexto opcional. Tu fuente de verdad operacional es **system-flow-bpmn.md** + **analytics-events-spec.md**.

---

## 3. Decisiones YA tomadas (no preguntar, ejecutar)

| Área | Decisión |
|---|---|
| **Newsletter platform** | GHL nativo (no Beehiiv, no Substack) |
| **Calendar tool** | Cal.com (integra con GHL) |
| **Email custom SMTP** | Mailgun ($35/mes) en `mail.huevos.ai` |
| **Tripwire pricing** | $9 USD (NO el viejo $97 del checklist legacy) |
| **Refund policy** | 30 días money-back |
| **Newsletter cadencia** | 1/semana broadcast + welcome series 5 emails (Email 1 immediate, 2 day+1, 3 day+3, 4 day+7, 5 day+14) |
| **PDF generation** | Headless Chrome / Puppeteer / Browserless (decisión técnica tuya entre Puppeteer self-hosted vs PDFMonkey vs Documint vs GHL native) |
| **Pipeline structure** | 1 pipeline único "ESCALA Ladder" con 8 stages — ver `analytics-events-spec.md` §3 |
| **Domain corto para URLs** | Pendiente comprar (`huv.ai` o similar) — Daniel compra esta semana |

---

## 4. Decisiones que NECESITAS de Daniel antes de empezar

Bloquean implementación. Pedir HOY:

1. **Acceso GHL admin** → ver `credentials-and-access-checklist.md`
2. **Stripe account access** + Stripe webhook signing secret
3. **Convex prod credentials** para `superb-whale-436` deployment
4. **Mailgun account** — ¿ya existe o hay que crear?
5. **Decisión PDF stack:** Daniel prefiere ¿Puppeteer self-hosted (cero costo recurrente, más fricción setup) o PDFMonkey/Documint ($24-29/mes, plug-and-play)? **Recomendación implementador: PDFMonkey** — menos surface area de bugs, los $29/mes valen el ahorro de 10h de debug.
6. **Dominio email sender:** `dani@huevos.ai`? ¿`hola@huevos.ai`? ¿`espejo@huevos.ai`?
7. **Acceso Loom URLs** (cuando Daniel termine de grabar sábado — 8 URLs)
8. **PDF template HTML** (cuando se genere vía Claude Design — esperar a Daniel para esto)

---

## 5. Deliverables esperados por día

### Día 1 (vie 22) — Foundation

- [ ] Recibir credenciales de Daniel (todas las 8 cosas arriba)
- [ ] Crear 14 custom fields en GHL — ver `analytics-events-spec.md` §3.1
- [ ] Crear tag taxonomy — ver `analytics-events-spec.md` §3.2
- [ ] Crear pipeline "ESCALA Ladder" con 8 stages — ver `analytics-events-spec.md` §3.3
- [ ] Configurar Mailgun custom SMTP + verificar SPF/DKIM/DMARC
- [ ] Test deliverability con Mail-Tester (objetivo ≥9/10)

### Día 2 (sáb 23) — Conexiones

- [ ] Stripe webhook `checkout.session.completed` → GHL endpoint
- [ ] Stripe webhook `charge.succeeded` → GHL endpoint
- [ ] Convex extender espejo-live con form async público (consultar Daniel/VA dev)
- [ ] Convex mutation `saveResult` → trigger GHL webhook `/trampa-assigned`
- [ ] Cal.com cuenta + integración GHL + custom calendar `Discovery Call - Huevos AI`
- [ ] Cargar los 32 founders del cohorte (CSV en `02-voc/2026-05-20/espejo-results.json`) con tags por trampa

### Día 3 (dom 24) — Workflows + Email

- [ ] Cargar copy de Welcome Series 5 emails (`04-content-production/content-week1-launch-pack.md` §8) en GHL workflow
- [ ] Cargar copy de Thank-you email a 32 founders (`§7`) — listo para enviar manualmente lunes
- [ ] Workflow `tripwire_fulfillment`: trigger `tripwire_purchased` → PDF generation → Mailgun send
- [ ] Workflow `welcome_series_5_emails`: trigger newsletter signup → email 1 inmediato → cascadas día +1, +3, +7, +14
- [ ] Workflow `upgrade_sequence_from_tripwire`: día 2, 5, 9, 14, 30 — copy a generar (placeholder hoy, refina Phase 2)
- [ ] Workflow `abandoned_cart`: tripwire_initiated sin compra en 24h → email recovery

### Día 4 (lun 25 AM) — Tests E2E + Go-live

- [ ] Test compra dummy $9 con tarjeta real (refund post-test)
- [ ] Verificar: email llega <60s, PDF abre, Loom embed reproduce, masterclass link funciona
- [ ] Test newsletter signup → recibir email 1 en <30s
- [ ] Test Cal.com booking → recibir confirmación + pre-call email
- [ ] Crear landing page `/espejo` simple con copy del lead magnet doc + Stripe button
- [ ] Crear landing page `/newsletter` con form GHL embed
- [ ] Bitly o dominio corto → URLs UTM-tagged para los primeros 8 posts

### Día 4 (lun 26 PM) — Monitoreo

- [ ] Daniel publica hero piece #1 a las 9:00 COT
- [ ] Monitor en vivo: ¿llegan opt-ins? ¿qué UTM trae más?
- [ ] Stand-by para hotfix si algo se rompe

---

## 6. Definition of Done (DoD) — qué significa "terminado"

El sistema está terminado cuando **TODOS los 17 eventos** del `analytics-events-spec.md` §2 disparan correctamente en testeo manual:

- [ ] E02 newsletter_signup → tag + workflow welcome
- [ ] E04 tripwire_initiated → tag tentative
- [ ] E05 tripwire_purchased → tag + redirect quiz
- [ ] E06 quiz_started → contact update
- [ ] E07 quiz_completed → custom field trampa_assigned
- [ ] E08 pdf_delivered → tag
- [ ] E11 discovery_booked → tag + email + calendar invite
- [ ] E12 discovery_completed → manual tag update path probado
- [ ] (Otros eventos en orden — ver spec)

Y **3 KPIs visibles en dashboard GHL** desde día 1:
1. Newsletter signups / día
2. Tripwire purchases / día  
3. Discovery bookings / día

---

## 7. Riesgos conocidos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Mailgun deliverability baja en lanzamiento | MEDIA | Warmup plan: 5 → 25 → 100 → 500 emails/día progresivo. Empezar con thank-you email (32 founders) sábado 23 — eso warm-up. |
| Stripe webhook no llega por timeout | BAJA | Stripe retry policy automática 3 días. Backup: cron job que polla `charges.list` cada 5 min y compara con GHL contacts. |
| PDF generation falla con cierto merge tag | MEDIA | Test los 8 templates ANTES de go-live. Fallback: si genera falla, email de "tu PDF está procesándose, llegará en 24h" + alerta a Daniel. |
| Convex form async no scala más allá de 100 submissions/día | BAJA | Convex maneja >10K/día naturalmente. Ignorar este riesgo Phase 1-2. |
| Daniel no entrega Loom URLs a tiempo (sábado) | MEDIA | Workflow puede deploy con placeholder Loom URL inicial, swap el lunes mañana. NO bloquea go-live. |
| GHL API rate limit | BAJA | GHL permite 100 req/min — más que suficiente. Si pega: throttle webhooks server-side. |

---

## 8. Lo que NO está en scope (no construir)

- TikTok auto-posting (Phase 3)
- Mini-curso $97 video hosting (Phase 3 — TBD si Vimeo, Wistia, o GHL membership)
- Cohorte $497-797 platform (Phase 4 — TBD)
- A/B testing infra ($5 vs $9 pricing) — Phase 2
- LinkedIn API scraping/posting auto (manual)
- Multi-language switching ES/EN (Phase 3+)
- Affiliate program (out of scope 2026)

---

## 9. Cómo trabajamos

- **Daily check-in:** mensaje breve WhatsApp 8am COT con "ayer hice X, hoy hago Y, blockers Z"
- **Bloqueos:** si algo bloquea >2h, escala a Daniel inmediato (no esperar al check-in)
- **Decisiones técnicas pequeñas (PDF lib, naming convention, etc.):** decide tú, documenta en `06-implementation/decisions-log.md` que vas creando sobre la marcha
- **Decisiones grandes (cambiar stack, posponer feature):** Daniel decide
- **Code/config repo:** todo lo que toques (templates, scripts, workflows config exports) vive en `06-implementation/` con README explicando qué es

---

## 10. Success criteria a 14 días

Si al final de Phase 1 (Jun 4):

✅ Sistema implementado: **bonus de cierre** (acordar con Daniel)
✅ 8 posts publicados con UTM tracking funcionando 100%: **éxito mínimo**
✅ ≥3 compras $9 reales (no test): **éxito mínimo**
✅ ≥30 newsletter signups: **éxito mínimo**
✅ ≥2 discovery calls reales agendadas: **éxito mínimo**

Si alguno de los 4 ✅ falla, NO es necesariamente culpa del sistema — pero hay que diagnosticar juntos.

---

*Si tienes preguntas antes de empezar, lista todas y mándalas a Daniel en un solo mensaje. No empieces sin claridad.*

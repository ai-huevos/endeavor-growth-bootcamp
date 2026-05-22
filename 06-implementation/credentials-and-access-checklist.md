# Credentials & Access · Lo que el implementer necesita de Daniel

**Antes que el implementer pueda empezar:** Daniel debe entregar TODOS estos accesos. Si falta alguno, hay bloqueo.

**Forma segura de entrega:** crear vault compartido en 1Password / Bitwarden / Dashlane. NO mandar credenciales por WhatsApp/email plano.

---

## 1. Plataformas SaaS

### GoHighLevel
- [ ] Email + password de cuenta principal Huevos AI
- [ ] Invite implementer como user admin (Settings → Team → Add user)
- [ ] Confirmar plan incluye: Workflows V2, Funnels V2, API access, Custom Fields ilimitados
- [ ] API key (Settings → Integrations → API)
- [ ] Sub-account ID (visible en URL del dashboard)

### Stripe
- [ ] Invite implementer como Developer role (Settings → Team)
- [ ] Acceso a `Test mode` y `Live mode`
- [ ] Webhook signing secret (Developers → Webhooks → reveal)
- [ ] Crear nuevo Product: "El Espejo del Founder · async" a $9 USD
- [ ] Confirmar moneda: USD (no COP)
- [ ] Payouts configurados a cuenta bancaria

### Convex
- [ ] Invite implementer al team `hola-844f4`
- [ ] Acceso al project `espejo-live` con role Editor
- [ ] Production deployment URL: `https://superb-whale-436.convex.cloud`
- [ ] Deploy key (Dashboard → Settings → Deploy keys)

### Mailgun
- [ ] Si NO existe cuenta: Daniel crea cuenta Foundation plan ($35/mo)
- [ ] Si existe: invite implementer al account
- [ ] API key (master + sending)
- [ ] Confirmar domain `mail.huevos.ai` agregado (o el subdomain elegido)

### Cal.com
- [ ] Si NO existe cuenta: Daniel crea (free tier OK)
- [ ] Si existe: invite implementer
- [ ] Conectar Google Calendar de Daniel (para evitar double-booking)

### Loom
- [ ] No requiere acceso del implementer
- [ ] Daniel comparte las 8 URLs de Loom (cuando termine de grabar sábado 23)
- [ ] Confirmar privacy: "Anyone with link can view"

---

## 2. Dominios y DNS

### Cloudflare (o el provider DNS de huevos.ai)
- [ ] Invite implementer como user (rol: Zone Admin)
- [ ] Confirmar que Daniel tiene control de DNS del dominio principal
- [ ] Records que el implementer va a agregar:
  - SPF record para mail.huevos.ai
  - DKIM record (Mailgun lo da)
  - DMARC record
  - CNAME para landing pages (si usamos GHL nativo) o subdomain (si Netlify)

### Dominio corto (opcional pero recomendado)
- [ ] Daniel decide comprar `huv.ai` o similar (~$15-50/año)
- [ ] Si compra: implementer setup short URLs (Bitly Pro o YOURLS self-hosted)
- [ ] Si no compra: usa Bitly free tier (50 links/mes — suficiente Phase 1)

---

## 3. Datos a importar a GHL

### Los 32 founders del cohorte
**Archivo:** `02-voc/2026-05-20/espejo-results.json`

Cada founder se importa con:
- Email
- First name + last name (parse from `name` field)
- Company
- Custom field `trampa_assigned` = trampaKey
- Custom field `cluster_assigned` = cluster
- Tag `cohort_2026_05_20`
- Tag `trampa_[trampaKey]` (e.g. `trampa_medir`)
- Stage en pipeline: `01 · Cold (visited any landing)` (no hicieron compra todavía)

### Brand assets
**Ubicación:** `01-bootcamp-2026-05-20/visuales/` y `01-bootcamp-2026-05-20/entregables-nlm/`

- [ ] Logo huevito SVG (verificar que existe; si no, Daniel/diseñador genera)
- [ ] Color palette CSS variables (ya en `01-bootcamp-2026-05-20/espejo-live/espejo.html` líneas 8-12)
- [ ] Tipografía Inter (Google Fonts) + JetBrains Mono (Google Fonts) — gratis, no requiere license

---

## 4. Templates / Copy ya escritos

### Welcome series 5 emails
**Ubicación:** `04-content-production/content-week1-launch-pack.md` §8

Implementer copia/pega cada email a GHL workflow email node. Reemplaza `{{first_name}}` con merge tag GHL nativo.

### Thank-you email a 32 founders
**Ubicación:** `04-content-production/content-week1-launch-pack.md` §7

Implementer carga como email template en GHL. Daniel lo envía manualmente HOY/mañana (no automatizado).

### DM templates × 5 trampas
**Ubicación:** `04-content-production/content-week1-launch-pack.md` §9

NO se cargan en GHL — Daniel envía manualmente desde LinkedIn. Pero implementer puede crear template en GHL Conversations para futuro outreach.

### Lead magnet PDF template
**Ubicación:** `05-lead-magnet-product/copy-and-design-prompt.md` PARTE 3

Daniel genera el HTML vía Claude Design (https://claude.ai). Output esperado: `05-lead-magnet-product/pdf-template.html` (file nuevo).

**Si Daniel NO ha generado el HTML al sábado:** implementer puede setear el resto del flujo con un PDF placeholder (página única "Tu Espejo está procesándose, llega en 24h") y swap el template el lunes.

---

## 5. Decisiones que Daniel firma antes de empezar implementer

Marca con ✅ una vez decidido:

- [ ] PDF generation stack: `PDFMonkey` ($29/mo) ó `Puppeteer self-host` (gratis pero más fricción) ó `Documint` ($24/mo)
  - **Recomendación implementer:** PDFMonkey
- [ ] Domain sender email: `dani@huevos.ai` ó `hola@huevos.ai` ó `espejo@huevos.ai`
  - **Recomendación:** `dani@huevos.ai` (personal = más open rate)
- [ ] Pipeline naming exacto: usar nombres del `system-flow-bpmn.md` §5 (S01-S08)
- [ ] Calendar tool: Cal.com (ya decidido — verificar)
- [ ] UTM domain corto: comprar (`huv.ai`) ó no comprar (Bitly free)

---

## 6. Acceso al repo (este folder)

- [ ] Daniel comparte zip de `Endeavor/` con implementer
- [ ] O git push a un repo privado GitHub/GitLab → invite implementer
- [ ] Implementer commits cambios en `06-implementation/` (sus workflows, decisions log, troubleshooting notes)

**NO compartir:**
- `.env*` files (credenciales locales Convex)
- `99-archive/` (legacy, no útil)

---

## 7. Verificación pre-arranque (15 min sesión Daniel + implementer)

Antes de empezar día 1, sesión de 15 min para confirmar:

- [ ] Implementer puede entrar a GHL, Stripe, Convex, Mailgun, Cal.com
- [ ] Implementer leyó los 7 docs del HANDOFF §2
- [ ] Implementer leyó los 6 diagramas del system-flow-bpmn
- [ ] Implementer entendió las decisiones pendientes
- [ ] Daniel respondió las decisiones de §5 (PDF stack, sender, etc.)
- [ ] Daily check-in: hora acordada (recomendado 8am COT)
- [ ] Canal comunicación: WhatsApp / Slack / otro

Si los 7 checkboxes están ✅, el implementer arranca. Si no, no arranca hasta resolver.

---

## 8. Emergency contacts

- **Daniel Cardona:** [phone] [email] — primario
- **VA actual de Daniel:** [si existe, contact]
- **Stripe support:** support@stripe.com — chat 24/7
- **Convex support:** support@convex.dev — slack community
- **GHL support:** support@gohighlevel.com — chat business hours

---

## 9. Costos mensuales operativos (resumen)

Lo que Daniel paga cada mes después del setup:

| Item | Mensual |
|---|---:|
| Stripe (% transacciones, no fixed) | ~$3-15/mo Phase 1-2 |
| GHL (ya pagando) | $0 marginal |
| Mailgun Foundation | $35/mo |
| Convex prod | $0-25/mo dependiendo volumen |
| Cal.com free tier | $0 |
| PDFMonkey (si usa) | $29/mo |
| Bitly free / dominio corto | $0-5/mo |
| VA (12-15h/sem) | $400-600/mo LatAm rate |
| Implementer GHL setup (one-time) | $TBD acordado con Daniel |
| **TOTAL mensual recurrente** | **~$470-705/mo** |

Phase 1-2 ROI negativo. Phase 3 break-even. Phase 4 positivo.

---

*Última actualización: 2026-05-22*

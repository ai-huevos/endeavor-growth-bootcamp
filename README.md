# Huevos AI · Repo Operativo

**Owner:** Daniel Cardona · [/in/dani-cardona](https://linkedin.com/in/dani-cardona) · `hola@huevos.ai`
**Estado:** Phase 1 launch lunes 26 May 2026
**Última actualización estructura:** 2026-05-22

---

## ¿Por dónde empiezo?

| Soy... | Voy directo a... |
|---|---|
| **Daniel revisando estrategia** | `03-strategy/` — los 3 docs maestros (virality, 90-day plan, gaps) |
| **Daniel produciendo contenido esta semana** | `04-content-production/content-week1-launch-pack.md` |
| **Daniel grabando Looms** | `04-content-production/loom-scripts-8-trampas.md` |
| **GHL Implementer** | `06-implementation/HANDOFF.md` ← **empieza acá** |
| **VA con tareas operativas** | `06-implementation/HANDOFF.md` §5 (deliverables día por día) |
| **Diseñador / Editor video** | `01-bootcamp-2026-05-20/visuales/BRAND-INTEGRATION.md` (legacy pero válido para colores) + `05-lead-magnet-product/copy-and-design-prompt.md` |
| **Curioso revisando data** | `02-voc/` — verbatims, hipótesis, hooks, espejo results |

---

## Estructura del repo

```
Endeavor/
├── README.md                              ← estás acá
│
├── 00-context/                            Fundacional (frameworks, propuesta original, data cohorte)
│   ├── frameworks/
│   │   ├── hormozi.json                   Framework Hormozi (offer / value equation)
│   │   ├── schwartz.json                  Framework Schwartz (awareness stages)
│   │   └── campbell.json                  Framework Campbell (unit economics)
│   ├── propuesta-original-v4.pdf
│   ├── startups-emergentes-cohort.xlsx
│   └── startups-emergentes-cohort.csv     205 startups firmographics
│
├── 01-bootcamp-2026-05-20/                EVENTO del 20 May (histórico ahora)
│   ├── playbook-facilitator/              Scripts Daniel (A1-A7)
│   ├── kit-founders/                      Kit attendees (B1-B5)
│   ├── visuales/                          Sistema visual (C0-C6)
│   ├── entregables-nlm/                   Artefactos NotebookLM
│   ├── espejo-live/                       Convex/Netlify app (prod = superb-whale-436)
│   └── research-apify/                    Digital footprint 18 attendees
│
├── 02-voc/                                Voice of Customer (la materia prima)
│   ├── 2026-05-20/                        Procesado del bootcamp
│   │   ├── verbatim-bank.jsonl            71 verbatims tagged
│   │   ├── hypothesis-matrix.md           30 hipótesis Pain→Claim→Promise
│   │   ├── hook-bank-v1-original.md       60 hooks (versión 1, CTAs bait)
│   │   ├── hook-bank-v2-ctas.md           60 hooks (versión 2, CTAs algo-safe) ← USAR ESTA
│   │   ├── espejo-results.json            32 founders + trampas asignadas
│   │   ├── espejo-analysis.md             Distribución + insights
│   │   ├── founder-dump.md                Raw dump de los autodiagnósticos
│   │   ├── founder-diagnostics.jsonl      Diagnostics tagged
│   │   ├── raw-preguntas-daniel-cardona.xlsx
│   │   └── SOURCES.md                     Inventario de fuentes VOC
│   ├── pain-clusters.json                 5 clusters cuantificados + lens
│   └── seed-list.json                     15 creadores LatAm benchmarking
│
├── 03-strategy/                           Master docs (cambia menos seguido)
│   ├── 01-virality-and-content-engine.md  Master 22K palabras (framework + matrix + ladder)
│   ├── 02-90day-execution-plan.md         Plan por fases (Phase 1-4) hasta Ago 19
│   └── 03-gap-analysis.md                 Qué falta + decisiones pendientes Daniel
│
├── 04-content-production/                 Contenido publicable / scripts
│   ├── loom-scripts-8-trampas.md          Scripts grabar los 8 Looms del producto $9
│   ├── content-week1-launch-pack.md       Hero pieces + posts + bio + emails + DMs LISTO publicar
│   ├── posts/                             Posts publicados (poblar conforme se publica)
│   ├── weekly/                            Cadencia semanal
│   └── decision-logs/                     Decision log viernes (poblar W22, W23...)
│
├── 05-lead-magnet-product/                Producto $9 "El Espejo del Founder · async"
│   └── copy-and-design-prompt.md          Copy 8 trampas + Claude Design prompt + flow técnico
│
├── 06-implementation/                     ZONA HANDOFF GHL IMPLEMENTER ← compartir
│   ├── HANDOFF.md                         Master handoff doc — leer primero
│   ├── system-flow-bpmn.md                6 diagramas Mermaid del sistema (Daniel aprueba)
│   ├── analytics-events-spec.md           UTM + 17 eventos + workflows operacionales
│   ├── credentials-and-access-checklist.md Qué necesita el implementer de Daniel
│   └── ghl-setup-checklist-old.md         Checklist legacy (parcialmente válido, usar como referencia)
│
└── 99-archive/                            Legacy
    └── GUIDE-pre-bootcamp.md              Guía vieja del bootcamp (pre-pivot a content engine)
```

---

## Workflow operativo

### Esta semana (sem 21)

1. **Vie 22 May (hoy):** Daniel envía thank-you email + actualiza bio LinkedIn + email a Endeavor por permiso de stats
2. **Sáb 23 May:** Daniel graba 8 Looms + revisa hero pieces
3. **Dom 24 May:** Implementer setup completo + tests E2E
4. **Lun 26 May 9:00 COT:** PUBLISH hero piece #1 + producto $9 LIVE

### Cadencia post-launch

- **Lun-Jue:** 1 post/día LinkedIn (HELP / UNDERSTOOD / HELP carousel / VALUE video)
- **Vie:** Decision log → `04-content-production/decision-logs/2026-W22.md` (etc)
- **Sáb-Dom:** off (preparación próxima semana)

---

## Convenciones

- **Naming archivos:** kebab-case excepto si es un ID heredado (e.g. F006)
- **Fechas:** ISO `YYYY-MM-DD` siempre. Hora COT explícita (`9:00 COT`)
- **Decisiones del usuario:** numeradas `D1`, `D2`... en orden cronológico, registradas en `03-strategy/03-gap-analysis.md` §9
- **Tasks pendientes:** registradas en TaskList del workflow, NO en docs (los docs son living, las tasks son ephemeral)
- **Living docs:** todos en `03-strategy/` y `04-content-production/` se actualizan. Los de `02-voc/` y `06-implementation/` son snapshots versionados.

---

## Auto-memoria (Claude)

Las memorias persistentes están en `~/.claude/projects/-Users-naboo-Documents-Endeavor/memory/`. Las relevantes:

- `user_daniel_profile.md`
- `feedback_content_voice_rules.md` (spanglish + no CTA bait + Golden Hour)
- `project_content_engine_s1.md`
- `project_espejo_trampas_hook_layer.md`
- `project_voc_pipeline_bootcamp_2026_05_20.md`
- `feedback_stack_bundle_b.md`

---

## Cómo compartir con terceros

| Quién | Qué le mando |
|---|---|
| **GHL Implementer** | Zip de `06-implementation/` + lectura de `05-lead-magnet-product/` PARTE 4 + `03-strategy/01-virality-and-content-engine.md` §5. Eso. NADA más necesita Phase 1. |
| **Diseñador PDF** | `05-lead-magnet-product/copy-and-design-prompt.md` (le pides solo Parte 1-3) + `01-bootcamp-2026-05-20/visuales/BRAND-INTEGRATION.md` para colores |
| **Editor video Loom/clips** | `04-content-production/loom-scripts-8-trampas.md` + brand colors |
| **VA general** | `06-implementation/HANDOFF.md` §5 (deliverables día por día) |
| **Endeavor staff (pedir permiso data)** | Excerpt de `02-voc/2026-05-20/espejo-analysis.md` (anonimizado) |

---

## Contacto

- Daniel Cardona — `hola@huevos.ai` · `/in/dani-cardona`
- Repo: este folder, sin remote git todavía (decisión Daniel: ¿push a GitHub privado o quedar local?)

# MÉTRICAS OFICIALES CONSOLIDADAS DEL ECOSISTEMA (AUDITORÍA OCTUBRE 2026 - REGLA VINCULANTE)
Todo bot, modelo o agente que opere en este workspace debe tomar como **ÚNICA VERDAD ESTADÍSTICA OFICIAL** los siguientes números consolidados de la auditoría final de Octubre 2026 (Fuente canónica: `mixon-metrics-hub/docs/reportes/N3_Master_Executive_Report_MixOn_V4.md`):

* **Visualizaciones Brutas Totales:** **83.852.281 reproducciones** consolidadas (Marzo – Octubre 2026).
  - **Instagram (`@mixontv_` + cuentas de show):** **61.280.900** (73,1%) | 46.2M de alcance.
  - **TikTok (`@mixontv_` + cuentas de show):** **16.800.890** (20,0%) | 22.1M de impresiones.
  - **Facebook (Páginas oficiales + Watch):** **5.029.308** (6,0%) | 6.8M de impresiones.
  - **YouTube (`@mixontv_`):** **741.183** (0,9%) | 4.938.064 impresiones | **40.539,1 horas de consumo**.
* **Impactos Totales Consolidados:** **80.038.064 impresiones / alcance**.
* **Comunidad Digital Total:** **+182.200 seguidores** acumulados.
* **Earned Media Value (EAV):** **>$150.000 USD** de pauta publicitaria orgánica equivalente.
* **Métricas Consolidadas por Show:**
  - **Prendido Fuego (PF):** **20,70M visualizaciones** (20.702.435) | Hook Rate récord 74.1%.
  - **Fuera de Foco (FDF):** **10,42M visualizaciones** (10.420.449) | **16.871,3 horas en YouTube** (41,6% del canal).
  - **Giro Perfecto (GP):** **10,31M visualizaciones** (10.312.358) | **14.579,6 horas en YouTube** | RPM $1,37 USD.
  - **Gracias Te Aviso (GTA):** **1,11M visualizaciones** (1.111.458) | Engagement Rate récord (11.33% IG, 6.16% TikTok).
  - **Hoy Hay Que Ganar (HHQG - Archivo):** **8,51M visualizaciones** (8.508.138).
  - **Mix On Sports (MOS):** **399K visualizaciones** | 3.568 espectadores promedio en transmisiones de partido.
  - **Matriz Mix On (`@mixontv_`):** **32,39M impactos directos**.

❌ **PROHIBICIÓN ESTRICTA DE NÚMEROS ZOMBIE (CORTE VIEJO DE JULIO):**
Queda TERMINANTEMENTE PROHIBIDO afirmar que Mix On tiene "40 millones", "42 millones" o "17.400 horas". Esos datos pertenecían al corte preliminar de julio 2026. Todo reporte, análisis, cálculo o deep research debe utilizar obligatoriamente las cifras auditadas de Octubre 2026 (83.85M vistas y 40.539 horas).


<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git Synchronization & Cross-Platform Rules (Mac <-> Windows)

- **Al iniciar una tarea o sesión**: Antes de empezar a implementar cambios o cuando el usuario pida una tarea, verifica el estado de Git y haz `git pull origin main` para asegurarte de tener la versión más reciente subida desde la otra máquina.
- **Al finalizar cada tarea o cambio completado**:
  1. Verifica que el código compile y no tenga errores.
  2. Haz `git add` de los archivos correspondientes (asegúrate de NO commitear archivos sensibles como `.env*`).
  3. Haz commit con un mensaje descriptivo y claro en español o conventional commits (ej: `feat: ...`, `fix: ...`).
  4. Haz `git push origin main` inmediatamente para que la otra máquina (sea Mac o Windows) siempre quede sincronizada automáticamente sin que el usuario tenga que recordarlo.

# Rol en el Ecosistema Mix On (Satélite: Mix On NEws)
- Esta aplicación es un proyecto satélite de código independiente (Portal de noticias de streaming y extensión de clipping).
- NO mezclar con archivos de `clips-manager` ni con la carpeta raíz de Google Drive `Mix On`.

# Grilla Oficial de Publicación por Red Social y Programa (Schedule Binding)
- **YouTube Shorts (`@Mixontv_`):** De 09:00 a 23:00 hs ART (15 slots por hora en punto: `SLOT_9` a `SLOT_23`, 1 por hora fija).
- **Instagram Reels y Facebook Reels (4 clips por programa al día):**
  * `FDF`: `10:00`, `13:00`, `16:00`, `19:00` hs ART
  * `PF`: `11:00`, `14:00`, `17:00`, `20:00` hs ART
  * `GP`: `12:00`, `15:00`, `18:00`, `21:00` hs ART
  * `GTA`: `14:30`, `17:30`, `20:30`, `22:30` hs ART (va a las `:30` para no pisar el feed colab `@mixontv_`)
- **TikTok (Cuentas por Show y Canal Matriz):**
  * **Cuentas por Show:** Mismos 16 turnos diarios de Instagram/Facebook (4 por show).
  * **Canal Matriz (`@mixontv_` — 4 clips diarios desincronizados):** `11:00` FDF, `13:00` GP, `17:00` GTA, `21:00` PF (1 clip por show al día, sin colisión con el programa que emite a esa hora en su cuenta).
- **X / Twitter (`@Mixontv_`):** 1 clip por hora de 09:00 a 23:00 hs (15 turnos diarios), sincronizado con el clip de Meta/TikTok de esa hora, cubriendo extremos y huecos con archivo. Copy máx 280 caracteres (si supera, borrar sufijo).
- **Mix On Sports (`SPORTS` / `MOS` — Días de Partido de Rosario Central y Newell's Old Boys):**
  * Transmisiones en vivo los días de partido: 1 hora antes (previa), durante el partido y 1 hora post-partido (análisis y polémicas).
  * Durante esas horas y partidos se generan y suben clips en tiempo real a Instagram (`@mixonsports` con colab `@mixontv_`), TikTok (`@mixonsports` vía Buffer Cuenta 3), YouTube Shorts (`@Mixontv_`) y X (`@Mixontv_`).
  * ❌ **PROHIBICIÓN ESTRICTA DE PRE-PROGRAMACIÓN EN COLAS DE ARCHIVO:** Los clips de `SPORTS` / `MOS` son reacciones inmediatas a partidos en vivo y análisis perecedero. **JAMÁS se deben pre-programar en colas diarias ni en la grilla regular de archivo (YouTube Shorts, Matriz Facebook o Matriz TikTok)**. Todo script o bot que gestione colas o seleccione stock debe excluir categóricamente los clips de `SPORTS` / `MOS`.

# Ingesta Dinámica y Desplazamiento en Cascada (Ripple Shift)
- A medida que ingresan clips nuevos de actualidad o tendencias, entran en el turno más próximo disponible ("más recientes primero") y desplazan los clips de archivo hacia adelante.
- Ventana de congelamiento (*Freeze Window*): no se modifican slots programados dentro de las próximas 3 horas. Las urgencias rompen el congelamiento y salen al instante.

# Prohibición Absoluta de Contenido Duplicado y Gestión de Stock por Plataforma
- **Regla Anti-Duplicados Estricta:** Un clip que ya fue publicado o programado en una cuenta o red social, **JAMÁS puede volver a publicarse en esa misma plataforma ni repetirse entre cuentas distintas de la misma red** (ej: no duplicar entre la cuenta de show y la cuenta matriz de TikTok). Cada turno debe ser un clip 100% virgen para esa red.
- **Stock Independiente por Plataforma:** Cada red tiene un stock disponible distinto según el historial del Content Manager. El stock de YouTube Shorts es independiente del de TikTok o Meta.
- **Candado de Validación Previa:** Todo script debe auditar contra Supabase y `dedup_guard.py` antes de agendar o publicar cualquier turno.


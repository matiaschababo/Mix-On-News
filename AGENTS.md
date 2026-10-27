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

# Grilla Oficial de Publicación por Red Social y Programa (Schedule Binding)
Todo bot o agente que programe o asigne publicaciones en `ClipPublication` o gestione colas debe respetar estrictamente:

- **YouTube Shorts (`@Mixontv_`):** 5 turnos diarios espaciados cada 3 a 4 horas: **`10:00`, `13:00`, `17:00`, `20:00` y `23:00` hs ART** (`SLOT_10`, `SLOT_13`, `SLOT_17`, `SLOT_20`, `SLOT_23`) con `notifySubscribers=False`, rotación de programas y anti-colisión temática por día.
- **Instagram Reels y Facebook Reels (4 clips por programa al día):**
  * `FDF`: `10:00`, `13:00`, `16:00`, `19:00` hs ART
  * `PF`: `11:00`, `14:00`, `17:00`, `20:00` hs ART
  * `GP`: `12:00`, `15:00`, `18:00`, `21:00` hs ART
  * `GTA`: `14:30`, `17:30`, `20:30`, `22:30` hs ART (va a las `:30` para no pisar el feed colab `@mixontv_`)
- **TikTok (Cuentas por Show y Canal Matriz):**
  * **Cuentas por Show:** Mismos 16 turnos diarios de Instagram/Facebook (4 por show).
  * **Canal Matriz (`@mixontv_` — 4 clips diarios desincronizados):** `11:00` FDF, `13:00` GP, `17:00` GTA, `21:00` PF (1 clip por show al día, sin colisión con el programa que emite a esa hora en su cuenta).
- **X / Twitter (`@Mixontv_`):** 5 turnos diarios espaciados cada 3 a 4 horas: **`10:00`, `13:00`, `17:00`, `20:00` y `23:00` hs ART** (`SLOT_10`, `SLOT_13`, `SLOT_17`, `SLOT_20`, `SLOT_23`), sincronizados 1-a-1 con YouTube Shorts. Rotación equilibrada: `10:00` FDF, `13:00` GP (Matriz), `17:00` GTA (Matriz), `20:00` PF, `23:00` Prime Night (rotativo). **Fallback Dinámico Multi-Programa:** La falta de stock de un show NUNCA es un impedimento para usar el slot de X; si el programa preferido no tiene stock virgen para esa hora, se usa de inmediato el clip virgen más fresco de cualquier otro programa disponible (`GTA`, `GP`, `PF`, `FDF`). Ráfaga libre para Mix On Sports (MOS) en vivo y urgencias. Copy nativo conversacional de debate sin links externos ni sufijos de horarios.
- **Mix On Sports (`SPORTS` / `MOS` — Días de Partido de Rosario Central y Newell's Old Boys):**
  * Transmisiones en vivo los días de partido: 1 hora antes (previa), durante el partido y 1 hora post-partido (análisis y polémicas).
  * Durante esas horas y partidos se generan y suben clips en tiempo real a Instagram (`@mixonsports` con colab `@mixontv_`), TikTok (`@mixonsports` vía Buffer Cuenta 3), YouTube Shorts (`@Mixontv_`) y X (`@Mixontv_`).
  * ❌ **PROHIBICIÓN ESTRICTA DE PRE-PROGRAMACIÓN EN COLAS DE ARCHIVO:** Los clips de `SPORTS` / `MOS` son reacciones inmediatas a partidos en vivo y análisis perecedero. **JAMÁS se deben pre-programar en colas diarias ni en la grilla regular de archivo (YouTube Shorts, Matriz Facebook o Matriz TikTok)**. Todo script o bot que gestione colas o seleccione stock debe excluir categóricamente los clips de `SPORTS` / `MOS`.

# Ingesta Dinámica y Desplazamiento en Cascada (Ripple Shift)
- A medida que ingresan clips nuevos de actualidad o tendencias, entran en el turno más próximo disponible ("más recientes primero") y desplazan los clips de archivo hacia adelante.
- Ventana de congelamiento (*Freeze Window*): no se modifican slots programados dentro de las próximas 3 horas. Las urgencias rompen el congelamiento y salen al instante.
- **Hilo Conductor Cronológico (FIFO para Urgencias del Mismo Show):** Cuando entran múltiples urgencias de un mismo programa y fecha (ej: GTA), se asignan estrictamente en orden cronológico (`14:30`, `17:30`, `20:30`, `22:30`) para preservar la correlatividad de la transmisión (inicio -> desarrollo -> remate). Las urgencias previas del mismo día no se desplazan entre sí; solo los clips de archivo de stock se desplazan en cascada (+1 slot) hacia adelante.
- **Comando `/urgencias` y Cascada Inversa (-1 Slot / Pull-Back Cascade):** Permite consultar las primicias en espera y dispararlas en vivo al instante con el botón interactivo `[🚀 Publicar YA]`. Al publicarse en caliente, la función `pull_back_schedule_after_immediate_publish` adelanta -1 slot todos los clips pendientes posteriores del show en `meta_scheduled_queue.json` y Supabase, compactando la grilla sin baches vacíos.
- **Blindaje Anti-Duplicados en Disparo Inmediato:** Todo disparo bajo demanda ejecuta `audit_clip_virginity_and_pending_platforms` sobre las 5 plataformas (YT, IG, FB, TT, X). Si el clip ya fue emitido en una red, esa plataforma queda excluida de la llamada y se publica únicamente en las restantes redes vírgenes.
- **Sistema de Priorización Viral (`prioritize_clip_to_next_turn` / Telegram `/prioridad` y botón inline `[🔥 Próximo Turno]`):** Permite adelantar cualquier clip de inmediato al próximo turno oficial de su programa (ej. `:30` para GTA) en todas las redes donde aún no se emitió, desplazando el archivo remanente en cascada (+1 slot) y purgando calendarizaciones lejanas para evitar duplicados. Resuelve el show mediante 4 vías: FK `programId` en base de datos, prefijo en comando (`/prioridad gta airbag`), selector interactivo y metadatos en callback.

# REGLA PRIMORDIAL VINCULANTE: CERO PÉRDIDA DE TURNOS (4 CLIPS POR SHOW AL DÍA)
- **Principio Inviolable de Cobertura Total (No Perder Turnos Jamás):** Bajo ninguna circunstancia se puede perder un turno diario de un programa. Cada show debe completar rigurosamente sus 4 turnos oficiales diarios (16 turnos diarios de shows + slots de Shorts/Matriz). Si un clip se retrasa, falla momentáneamente en Telegram o debe reubicarse por cooldown anti-canibalización, el sistema **TIENE la obligación de aprovechar en primera instancia los turnos oficiales restantes del mismo día que estén vacíos o sin contenido virgen asignado**.
- **Prohibición de Postergación Prematura a Mañana:** Queda TERMINANTEMENTE PROHIBIDO postergar un clip al día siguiente si hoy todavía queda un turno oficial del programa sin cubrir y existe margen de respiro temporal (mínimo 75 minutos desde la última emisión real). Por ejemplo, si el clip de las 20:30 hs de GTA se demora o no salió a tiempo, debe reubicarse automáticamente para cubrir el turno oficial de las 22:30 hs de hoy, garantizando que el show no cierre el día con 3 clips en lugar de 4.

# Hilo Conductor Cronológico (Jerarquía Dual: Inter-Live LIFO vs Intra-Live FIFO)
- **Principio Rector:** Siempre las urgencias primero, y las urgencias más frescas primero. Pero si son del mismo live, salen en riguroso orden cronológico correlativo:
  * **Inter-Live (Entre Transmisiones Distintas):** Las urgencias y temas de actualidad más recientes tienen prioridad absoluta sobre material de archivo y emisiones anteriores (LIFO entre emisiones: lo nuevo desplaza lo viejo).
  * **Intra-Live (Dentro de la Misma Transmisión / Live):** Cuando existen múltiples clips que provienen de la **misma fecha de emisión o programa en vivo** (ej: `clip01`, `clip02`, `clip03`, `clip06`, `clip08` de FDF del 23/10):
    - **Los clips del mismo live DEBEN emitirse en riguroso orden cronológico correlativo** (inicio -> desarrollo -> remate).
    - Queda estrictamente prohibido alterar el orden de los capítulos de un mismo programa o emitir el remate/conclusión antes del inicio.
    - Si un clip de un live pierde su turno matutino, **toma de inmediato el próximo turno oficial del mismo show** y desplaza los clips siguientes de ese live hacia adelante (Cascada Inmediata).

# Fuente Única de la Verdad para Copys, Títulos y Redes (Prohibición Expresa de Nombres de Archivo - Caso #85)
- **Principio Canónico:** Todo título, gancho, copy, pie de publicación o texto de red social **DEBE provenir exclusivamente del Content Manager (`Clip.title` en Supabase)**.
- ❌ **TERMINANTEMENTE PROHIBIDO:** Deducir, limpiar o construir el título de un clip a partir del nombre de archivo (`.mp4`), metadatos de Telegram o expresiones regulares en el uploader. Ese error ya causó desastres históricos (Caso #85). Si un clip no tiene título en la base de datos o en la cola, el bot no puede inventarlo.

# Protocolo Maestro de Rescate: Cascada Inmediata y Ventana Intermedia (Prohibición de Postergación a la Noche)
- **Prohibición de Patear al Fondo de la Noche:** Si un clip pierde su turno matutino (ej: 10:00 o 11:00 hs), **QUEDA TERMINANTEMENTE PROHIBIDO postergarlo automáticamente hasta las 21:00 o 22:30 hs** si el show aún tiene turnos oficiales por delante ese mismo día.
- **Mecanismos Oficiales de Recuperación:**
  1. **Opción A (Cascada Inmediata al Próximo Turno Oficial - Ripple Shift de Show):** El clip rezagado toma el turno oficial inmediatamente siguiente del show (ej: si cayó a las 10:00 hs, sale en el slot de las 13:00 hs), empujando el clip de las 13:00 a las 16:00 hs, el de las 16:00 a las 19:00 hs, y el último de la fila pasa a ocupar la ventana nocturna de cierre (21:00 hs). Se preserva la secuencia cronológica y ningún turno queda vacío.
  2. **Opción B (Ventana Intermedia a Mitad de Camino):** Como los turnos regulares de un programa están distanciados por 3 horas (ej: 10:00 a 13:00, o 11:00 a 14:00), si existe respiro temporal (+90 minutos desde la emisión anterior y >75 minutos antes del próximo turno), el clip puede emitirse en una **ventana intermedia** (ej: 11:30 hs o 12:30 hs) sin alterar el resto de la grilla.
- **Regla Inquebrantable Anti-Canibalización (Mínimo 75-90 min entre publicaciones del mismo show):**
  * Dos clips de la **misma cuenta de programa** (ej. `@fueradefoco.mixon`) **JAMÁS deben publicarse con menos de 75 a 90 minutos de diferencia**, para no dividir el algoritmo ni destruir el alcance orgánico del clip anterior.
  * El guardián `RateLimitGuard` (`DEFAULT_MIN_COOLDOWN_MINUTES = 75`, `MAX_CLIPS_PER_ROLLING_HOUR = 1`) bloquea por sistema cualquier intento de emisión consecutiva que viole este intervalo.
- **Prohibición de Disparo Ciego en Caliente cerca de Turnos Oficiales:**
  * Si un clip se retrasa, falla o se rescata a destiempo y faltan **menos de 90 minutos para el siguiente turno oficial del mismo show**, **QUEDA TERMINANTEMENTE PROHIBIDO dispararlo de inmediato**.
- **Reubicación Inteligente Automática en Ventanas Libres (`resolve_automatic_rescue_slot`):**
  * Todo clip rescatado o pendiente debe reubicarse automáticamente en la **próxima ventana libre del día** donde el programa no tenga actividad programada:
    - **Fuera de Foco (FDF):** Ventana nocturna a las `21:00` hs (o `20:30` / `21:30` hs), tras concluir su jornada regular a las 19:00 hs (2 horas completas de respiro).
    - **Prendido Fuego (PF):** Ventana nocturna a las `21:30` hs o `22:00` hs (después de las 20:00 hs).
    - **Giro Perfecto (GP):** Ventana nocturna a las `22:30` hs o `23:00` hs (después de las 21:00 hs).
    - **Gracias Te Aviso (GTA):** Ventana intermedia a las `19:00` hs (entre 17:30 y 20:30 hs) o `21:30` hs.

# Blindaje Obligatorio de Copy por Plataforma (`lib/programs.ts`)
- **YouTube Shorts (`@Mixontv_`):** Va **SOLO el título limpio** (`{TITULO}`), sin sufijo `| PROGRAMA...` ni `#Shorts`.
- **Instagram Reels, Facebook Reels y TikTok (`getFormattedTitle`):**
  * ❌ **PROHIBIDO** incluir hashtags (`#`) o enlaces de YouTube (`Mirá el programa completo...`) en Meta Reels o TikTok.
  * **Fuera de Foco (`FDF`):** `{TITULO} | FUERA DE FOCO Lunes a Viernes de 11 a 13 hs con Fran Metz, Nahuel Cantero y Toti Or`
  * **Gracias Te Aviso (`GTA`):** `{TITULO} | GRACIAS TE AVISO Lunes a Viernes de 13 a 15 hs con Tici Saraceni, Agus Wuipi y Georgi Serafini`
  * **Prendido Fuego (`PF`):** `{TITULO} | PRENDIDO FUEGO por Mix On de Lunes y Miércoles de 15 a 17 hs con Tomas Holder, Diane Caracchi y Luli Case Rossi`
  * **Giro Perfecto (`GP`):** `{TITULO} | GIRO PERFECTO Lunes a Viernes de 17 a 19 hs CON Pato Filippini, Matias Villagra y Joaquín Enecoiz`
  * **Mix On Sports (`SPORTS` / `MOS`):** `{TITULO} | MIX ON SPORTS`
- **X / Twitter (`getFormattedXPost` / `format_x_clip_post`):**
  * ❌ **Cero enlaces salientes y cero sufijos largos de horarios:** Prohibido incluir links a YouTube (`https://youtube.com/@mixontv_`) o textos repetitivos de conductores/horarios (penalización severa de alcance orgánico en X).
  * ❌ **Cero preguntas genéricas o artificiales de IA (Caso #180 - Directiva Vinculante):** Prohibido insertar preguntas genéricas o hooks de debate inventados como "¿Te pasó algo así o bancás? 👇", "¿Bancás o se fueron al pasto?", "¿Qué opinás de esto? Te leemos 👇". Quedan falsas, parecen generadas por IA y desvirtúan el clip.
  * **Formato Limpio, Simple y Sobrio:** Estrictamente `{TITULO}\n\n🎙️ {Programa}` (máx 280 caracteres). Simple, directo y al grano.
  * **Desactivación de Auto-Tweet para Video Largo a las 20:01 hs:** Inhabilitado para no colisionar con el clip nativo de las 20:00 hs ni recibir penalización por link saliente.
- **Colaboradores Co-autores Oficiales en Instagram Reels (Handles Exactos):**
  * **Prendido Fuego (`PF`):** `['mixontv_', 'dianecaracchi', 'luliicaserossi']` *(con doble 'i')*.
  * **Fuera de Foco (`FDF`):**
    - **Clips anotados/grabados desde el 23/10/2026 en adelante:** `['mixontv_', 'franmetzz', 'nahu.cantero', 'toti_or']` *(con `@toti_or`)*.
    - **Clips anotados/grabados entre el 19/10/2026 y 22/10/2026:** `['mixontv_', 'franmetzz', 'nahu.cantero']`.
    - **Clips de archivo históricos anteriores al 19/10/2026:** `['mixontv_', 'franmetzz', 'dianecaracchi']`.
    - **Determinación Canónica de Fecha:** La era del clip se determina estrictamente por su fecha real en Supabase (`Episode.airDate` o `Clip.createdAt`), NUNCA por la fecha futura asignada en la cola (`scheduled_art`). Todo el stock de archivo previo a octubre conserva su elenco original.
  * **Gracias Te Aviso (`GTA`):** `['mixontv_', 'ticisaraceni', 'georgiserafini', 'agustinawuipi']` *(con 'agustina')*.
  * **Giro Perfecto (`GP`):** `['mixontv_', 'patofilippini', 'mativillagra', 'joaquinenecoiz']`.
  * **Mix On Sports (`SPORTS` / `MOS`):** `['mixontv_', 'gabrielluispennise', 'juliandmartin']` *(excluyendo a patofilippini y mativillagra por directiva operativa)*.

# Prohibición Absoluta de Contenido Duplicado y Gestión de Stock por Plataforma
- **Regla Anti-Duplicados Estricta:** Un clip que ya fue publicado o programado en una cuenta o red social, **JAMÁS puede volver a publicarse en esa misma plataforma ni repetirse entre cuentas distintas de la misma red** (ej: no duplicar entre la cuenta de show y la cuenta matriz de TikTok). Cada turno debe ser un clip 100% virgen para esa red.
- **Stock Independiente por Plataforma:** Cada red tiene un stock disponible distinto según el historial del Content Manager. El stock de YouTube Shorts es independiente del de TikTok o Meta.
- **Candado de Validación Previa:** Todo script debe auditar contra Supabase y `dedup_guard.py` antes de agendar o publicar cualquier turno.
- **Cobertura Multi-Clip Complementaria (1 a 4 clips por turno):** No es necesario que un único clip sea virgen en las 4 o 5 redes para cubrir un turno. Si un clip solo es virgen en una red (ej. Twitter o TikTok), se despacha para esa red y las restantes del turno se cubren en simultáneo con otro(s) clip(s) virgen(es) del mismo programa.
- **Desbloqueo Anti-Colisión Multi-Clip en Scheduler:** `meta_queue_scheduler.py` evalúa la emisión por par `seen_prog_plats[prog].add(platform)`, permitiendo el despacho paralelo de clips complementarios sin falsos bloqueos.
- **Política de Faltante de Stock por Red:** Si no hay stock virgen de un programa para una red particular, **no pasa nada: NO se sube en esa red**. El turno se aprovecha siempre y cuando exista stock virgen para esa plataforma. Queda terminantemente prohibido duplicar o forzar re-subidas.

# Protocolo de Reportes Telegram Centrados en el Clip (Clip-Centric Reporting)
- **El Producto es el Clip:** Todo reporte de publicación o alerta emitida hacia Telegram debe estructurarse desde la perspectiva del **clip como protagonista**, nunca desde la cuenta o el slot del servidor.
- **Identificación de Cuentas de Destino:** Debe indicar con precisión la cuenta o Fan Page exacta de cada plataforma (ej. `@graciasteaviso`, `Fan Page Mix On (Matriz)`, `@mixontv_ - Matriz`, etc.).
- **Balance de Cobertura Multiplataforma:** Cada notificación debe incluir el resumen de cobertura (ej. `3 de 5 redes cubiertas`), distinguiendo qué cuentas se publicaron en la corrida actual, cuáles ya estaban activas de antes y cuáles siguen pendientes en la cuenta del show.

# Blindaje Inviolable Anti-Contaminación de Shows en Telegram (`TELEGRAM_TOPIC_BY_PROGRAM`)
- **Aislamiento Estricto de Tópicos por Show:** Cada programa tiene un foro/tópico único e inmutable en el grupo de Telegram Mix On:
  * `FDF`: Tópico `2`
  * `PF`: Tópico `306`
  * `GP`: Tópico `3`
  * `GTA`: Tópico `2552`
  * `SPORTS` / `MOS`: Tópico `2927`
  * `HHQG`: Tópico `259`
- ❌ **Prohibición de Búsqueda Léxica Cruzada:** Queda TERMINANTEMENTE PROHIBIDO asociar o descargar un video de Telegram si su `topic_id` no coincide de forma exacta con el programa asignado. Ninguna coincidencia de palabras ("recitales", "amor", "futbol") puede saltarse el candado de tópico ni la coherencia de firma de show (`SHOW_SIGNATURES`). Coincidencia semántica mínima del 60% y al menos 2 palabras clave.

# Aislamiento Estricto de Slots de X / Twitter y Prohibición de Suplementarios Meta en Turnos de X
- **Exclusividad de Redes en Slots de X (`is_x_only_item`):** Los slots de X / Twitter (`SLOT_10`, `SLOT_13`, `SLOT_17`, `SLOT_20`, `SLOT_23`) tienen como único requerimiento `['TWITTER']`.
- ❌ **Prohibición de Suplementarios Meta/TikTok en Slots de X:** Queda TERMINANTEMENTE PROHIBIDO que el scheduler interprete que faltan redes en un slot de X y busque clips suplementarios de Instagram, Facebook o TikTok. En `SLOT_23` (23:00 hs) o cualquier ítem de Twitter, `needed_uncovered` es estrictamente vacío.

# Circuito de Cooldown Obligatorio en Uploader y Suplementarios (Circuit Breaker Anti-Canibalización)
- **Gatekeeper en `upload_dual_meta_reel`:** Antes de enviar llamadas a Instagram, Facebook o TikTok, el uploader audita `RateLimitGuard`. Si han transcurrido menos de 75-90 minutos desde la última publicación del show en esa plataforma, la emisión se aborta automáticamente (`SKIPPED_COOLDOWN`).
- **Filtro Previo en Suplementarios:** Todo clip complementario audita el cooldown por plataforma antes de su despacho. Si está en cooldown, no se envía.

# Botón de Pausa de Emergencia y Kill-Switch 24/7 (`/pausa` y `/reanudar`)
- **Comandos de Emergencia en Telegram:**
  * `/pausa` o `/stop` o `/emergencia`: Crea `/home/opc/mixon-uploader/EMERGENCY_STOP.flag` y congela de inmediato todo procesamiento y subida en el servidor.
  * `/reanudar` o `/play` o `/continuar`: Elimina la flag y reanuda el despacho normal de la cola.
- **Botón Inline de Emergencia:** Todo reporte de turno enviado a Telegram incluye el botón interactivo `[🛑 PAUSAR SISTEMA DE EMERGENCIA]` para frenar la cola con un solo toque desde el teléfono.




# Integridad Original de Video, TikTok Matriz Exacto y Descargas Atómicas (Casos #146–#154 — 25/10/2026)
- **Prohibición Absoluta de Recortar o Comprimir Videos Originales:** Si un video supera `140.0s` (tope Twitter API), se omite X directamente **sin cortarlo ni recortarlo jamás**. Cero recodificación; guarda pre-descarga únicamente en el techo técnico real de `1000 MB` (`1 GB`) de Meta Reels API (`SKIPPED_OVERSIZE` + reemplazo).
- **Mix On Sports (`SPORTS` / `MOS`):** Desacoplado para emitir videos `>180s` íntegros en IG Reels, FB Reels y TikTok; YouTube Shorts siempre bajo compuerta manual por copyright deportivo; anti-duplicado exacto normalizado (`target_norm == d_norm`) sin fuzzy `0.85`.
- **TikTok Matriz (`@mixontv_` — 1 Solo Clip por Slot):** Estrictamente 1 clip en cada uno de los 4 turnos (`11:00`, `13:00`, `17:00`, `21:00`), cooldown específico de `95 min` en `RateLimitGuard`, persistencia en disco de `SUPERSEDED_SLOT_COLLISION` y prohibición de canibalizar los 4 turnos de hoy del show en `heal_matriz_slot`.
- **Resiliencia de Staging y Crontab Preventivo:** Descarga atómica `.mp4.part` con `progress_callback` heartbeat cada 15s (Sentinel 15 min) + chequeo `ffprobe > 0.5s`, filtro anti-fechas futuras en `RateLimitGuard` y doble pasada matutina `sync_real_published_history.py -> morning_preflight_audit.py` (`06:10 -> 06:30` y `09:15 -> 09:25 ART`).

# Blindaje de Persistencia del Clip, Resolución Instagram y Agente Orquestador (Casos #155–#160 — 26/10/2026)
- **Caso #155: Aislamiento Canónico de Mix On Sports (`SPORTS` / `MOS`) en Cola Regular:** Prohibición absoluta de agendar o despachar clips de Sports en la grilla regular de archivo (YouTube Shorts, Matriz o cuentas de show de archivo). Validación directa obligatoria contra `Clip.programId` en Supabase para evitar reclasificaciones erróneas por tópicos de Telegram cruzados.
- **Caso #156: Protocolo de Persistencia del Clip Original (No Desistir Rápido por Frescura y Cronología):** El clip asignado originalmente a un slot es la prioridad máxima porque representa la primicia o la correlación cronológica del vivo (intra-live FIFO). Ante fallos técnicos transitorios (red, túnel de Cloudflare, saturación de API de Meta o timeout), el sistema DEBE insistir con reintentos espaciados dentro de la ventana de 3 horas del show antes de considerar cualquier reemplazo.
- **Caso #157: Únicas Causas de Descarte Inmediato:** Solo se omite de cuajo un clip si es un duplicado confirmado (`SKIPPED_DUPLICATE` en los 5 niveles del `MasterPublishedRegistry`), si no pertenece al programa (`NOT_IN_CM` / `SPORTS`), o si está fuera de regla.
- **Caso #158: Guardián Dimensional de Instagram Reels (`ResolutionGuard` — Límite 1080p):** Instagram Reels API no admite resoluciones superiores a 1080p (`1080x1920`) y rechaza videos 4K con error `2207053`. Como rige la prohibición estricta de recodificar videos originales, si un video es 4K, se excluye de Instagram de forma proactiva (0.1s vía `ffprobe`), se publica en calidad original en Facebook y TikTok, y se asigna un clip suplementario virgen de 1080p exclusivamente para cubrir Instagram en ese turno.
- **Caso #159: Despacho Reactivo Post-Fallo y Cero Turnos Perdidos:** Si una plataforma rebota de forma definitiva tras reintentos, el clip original se mantiene en las redes donde sí funcionó, y la red caída se rescata inmediatamente con el próximo clip virgen del archivo sin dejar el slot en blanco.
- **Caso #160: Despliegue del Agente Orquestador 24/7 (`mixon-agent.service`):** Guardián autónomo en Oracle Cloud que realiza auditorías de doble pasada (T-20 min pre-vuelo y T+1 min post-slot), supervisando la cobertura del 100% de la grilla de shows (16 turnos diarios) y los 5 turnos de X, con soporte para parada de emergencia (`/pausa`).


# Blindaje de Circuit Breaker, Disparo Ciego, Cooldown Split y Registro Obligatorio (Casos #166–#172 — 26/10/2026)
- **Caso #166: Buffer Circuit Breaker y Hard Timeout de Red (240s):** BufferCircuitBreaker abre el circuito tras 3 fallos consecutivos y enfría Buffer por 600s con persistencia en disco. Hard deadline de 240s de reloj en wait_for_post y create_and_verify para impedir cualquier congelamiento del proceso scheduler.
- **Caso #167: Prohibición de Disparo Ciego en Caliente Cerca de Turnos Oficiales (`ProximityGuard`):** Si un clip demorado (>25 min) está listo pero faltan MENOS de 75-90 minutos para el próximo turno oficial del show, QUEDA TERMINANTEMENTE PROHIBIDO dispararlo en caliente a destiempo. El clip demorado toma el próximo turno oficial por Ripple Shift, y el clip de ese turno se desplaza a la ventana nocturna de rescate de HOY (21:30 hs).
- **Caso #168: Eliminación de la Trampa de Conteo en Ventanas de Rescate (len < 4):** Todo clip de hoy que deba reubicarse TIENE derecho incondicional a aprovechar las ventanas nocturnas oficiales de rescate de HOY (21:00 / 21:30 / 22:30 hs) si respeta el cooldown (>=75 min). Queda terminantemente prohibido postergar clips a mañana si hoy quedan ventanas nocturnas disponibles.
- **Caso #169: Desdoble Automático de Redes por Cooldown (`CooldownPlatformSplitGuard`):** Si un clip tiene múltiples redes y algunas publican mientras otras quedan en cooldown, el scheduler desdobla automáticamente las redes pendientes en un ítem hijo diferido (`{id}_def_{HHMM}`) para el minuto exacto en que expira el cooldown (75 min). Ninguna red se pierde ni se descarta en silencio.
- **Caso #170: Anti-Colisión Multi-Plataforma en Ripple Shift:** La colisión entre dos turnos solo existe si comparten al menos una red social en común. Plataformas mutuamente excluyentes (Facebook vs TikTok) corren en paralelo en el mismo horario sin falso bloqueo ni desplazamiento.
- **Caso #171: Unificación Vinculante de Conductores Vigentes en Copys de FDF:** Las etiquetas/colaboradores en Instagram reflejan a quienes aparecen en pantalla en el video, pero el COPY / SUFIJO de publicación SIEMPRE debe llevar de forma obligatoria los conductores vigentes al aire: `| FUERA DE FOCO Lunes a Viernes de 11 a 13 hs con Fran Metz, Nahuel Cantero y Toti Or`.
- **Caso #172: Registro Obligatorio y Persistente de Errores y Aprendizajes (Learning Loop Invariable):** Todo error detectado y todo arreglo implementado tanto en el agente autónomo como en los scripts del ecosistema DEBE quedar registrado de forma obligatoria e inmediata en:
  1. `MANUAL_MAESTRO_ERRORES_APRENDIZAJES_Y_BLINDAJE_MIXON.md`
  2. `AGENTS.md` (en todos los workspaces)
  3. `agent_learnings.jsonl` (memoria en disco en Oracle VM)
  4. Commit y push inmediato a `origin main` en Git.

# Arquitectura del Enjambre Multiagente Autónomo Mix On (Caso #173 — 26/10/2026)
Todo el sistema opera bajo una jerarquía desacoplada de 5 agentes especializados inspirada en SpaceX, DuckSays, bl888m y Santiago Cura:
- **Chief of Staff (`ChiefOfStaffAgent`):** Orquestador general State-In / Decision-Out. Convoca al squad de especialistas, somete planes al QA Critic y ejecuta acciones aprobadas.
- **CMO Growth Agent (`CMOGrowthAgent`):** Custodio de las métricas canónicas auditadas (83.85M vistas, 40.539 hs YouTube). Administra cooldowns anti-canibalización, viralidad LIFO y Fallback Dinámico de Twitter (<140s, sin Sports).
- **Creative Showrunner Agent (`CreativeShowrunnerAgent`):** Orden cronológico correlativo intra-live FIFO (inicio -> desarrollo -> remate), copies Grok-mode en X (<140 caracteres, pregunta de debate, sin links a YouTube) y sufijo contemporáneo unificado de FDF (`con Fran Metz, Nahuel Cantero y Toti Or`).
- **Squad Especialista:**
  * `AutonomousIngestionAgent`: Ingesta atómica de Telegram (Ro Mayorga) y promoción de stock fresco.
  * `PlatformPublisherGuardAgent`: Buffer Circuit Breaker (240s deadline, 600s cooldown), Cooldown Split Guard, límites de 140s en X y 1080p en Instagram sin re-codificación.
- **QA Critic Agent (`QACriticAgent` — El "Abogado del Diablo"):** Veto Power absoluto sobre cualquier acción que viole la persistencia del clip original (Caso #156), intente postergar a mañana habiendo ventanas nocturnas hoy (Caso #168), dispare en caliente cerca de turnos oficiales (Caso #167) o use copys con conductores históricos (Caso #171). Cero tolerancia a la mediocridad o clichés robóticos.

# Independencia Estricta de Plataformas en Deduplicación y Prohibición de Inferencias Cruzadas (Caso #174 — 26/10/2026)
- **Principio Fundamental de Separación de Redes (Meta != TikTok):** La publicación en Instagram o Facebook **NO implica en absoluto que el clip haya sido emitido en TikTok**. Cada plataforma posee su propio inventario y su propia audiencia.
- ❌ **Prohibición Terminante de Inferencias Cruzadas:** Queda terminantemente prohibido asumir que porque un clip salió en Meta en el pasado, "ya salió en TikTok". Esa suposición genera falsos positivos masivos, bloquea clips vírgenes y destruye turnos de publicación.
- **Trazabilidad Real por Red:** La deduplicación en `dedup_guard.py` y `QACriticAgent` audita la plataforma específica de destino contra sus registros confirmados en Supabase y `published_registry.json`. Si un clip viejo es virgen en TikTok, es 100% elegible para emitirse en TikTok.
- **Priorización de Frescura Contemporánea:** Para evitar que la grilla recurra a material de archivo lejano (agosto/septiembre), el enjambre debe priorizar siempre el stock de los últimos 7-14 días y alertar cuando un show se queda sin clips frescos del último programa en vivo.

# Prohibición Terminante de Miniaturas Personalizadas en YouTube Shorts (Caso #175 — 26/10/2026)
- ❌ **Shorts Cero Miniaturas:** Los YouTube Shorts (formato vertical 9:16, duración < 180s) **NUNCA deben llevar miniatura personalizada** subida por API ni por bot. El algoritmo de YouTube Shorts selecciona y renderiza automáticamente un frame nativo vertical 9:16. Subir una miniatura 16:9 horizontal degrada la visualización y rompe el feed móvil.
- **Exclusividad para YouTube Lives:** Las miniaturas personalizadas 16:9 diseñadas por Ro Mayorga son **exclusivamente para los videos largos de transmisión en vivo de 2 horas (YouTube Live)**.
- **Veto en QA Critic y Tools:** `tool_sync_pending_thumbnails` en `mixon_agent_tools.py` y Check #7 en `QACriticAgent` vetan automáticamente cualquier intento de setear miniatura en videos de duración < 300s o marcados como shorts.

# Freshness Scope Guard y Priorización de Stock Fresco (<14 Días) (Caso #176 — 26/10/2026)
- **Prioridad a la Actualidad Contemporánea:** Todo turno programado debe nutrirse de clips del vivo del día o de los últimos 7 a 14 días.
- **Guardián de Frescura en CMO Agent:** `audit_freshness_scope` evalúa la antigüedad de los clips y penaliza (-30 pts) material con más de 21 días de antigüedad en el fallback de Twitter y selección de colas, bonificando (+50 pts) a clips menores a 7 días.
- **Alerta de Stock Añejo:** Si un programa tiene stock únicamente mayor a 14 días, el sistema emite alerta a Telegram para que los editores carguen clips frescos del vivo de hoy en lugar de recurrir ciegamente a meses anteriores.
- **Inyección en Gemini 2.5 Flash:** `get_dynamic_system_prompt()` en `mixon_agent_core.py` inyecta dinámicamente estos precedentes y aprendizajes operativos para que los agentes razonen con todo el contexto antes de tomar decisiones.

# Replicación Histórica Automática de Meta (Instagram -> Facebook Pre-13/10/2026) y Saneamiento de Inventario (Caso #177 — 27/10/2026)
- **Causa Raíz:** Facebook se integró al Content Manager el 13/10/2026 (commit `c3d12f7`). Todo clip publicado en Instagram previo a esa fecha se replicó automáticamente en Facebook vía crossposting nativo de Meta, pero no figuraba registrado en Supabase, generando un falso stock virgen de 500+ clips.
- **Backfill y Saneamiento Canónico:** Se ejecutó `backfill_historic_facebook_crosspost.py`, registrando 603 publicaciones históricas en Facebook dentro de Supabase y purgando 35 ítems duplicados de la cola en la VM de Oracle.
- **Desacople en Preflight:** `morning_preflight_audit.py` desglosa de forma independiente los turnos inmediatos de las próximas 24-36 horas de la proyección semanal (a 7 días), evitando alarmas de "falta de stock" por turnos futuros de vivos no emitidos.

# Blindaje Anti-Doble Publicación Simultánea en YouTube Shorts y Prevención de Colisiones de ID en Cola Meta (Caso #178 — 27/10/2026)
- **Error Detectado (Doble Short Simultáneo a las 17:00 hs ART):** A las 17:00 hs ART (20:00 UTC) salieron publicados en YouTube Shorts dos videos a la vez: "CÓMO ENCARAR EN EL GYM" (`hUO3qEJMQeo`) y "ESTAN FUNANDO A TOMAS" (`tn2Nb44UeIA`), con solo 21 segundos de diferencia.
- **Causa Raíz del Doble Short:**
  1. El Short de archivo "CÓMO ENCARAR EN EL GYM" estaba pre-programado desde el día anterior en YouTube Studio para las 17:00 hs ART (`publishAt = 2026-10-27T20:00:00Z`).
  2. A las 16:18 hs ART, ingresó el clip urgente de Prendido Fuego subido por Ro Mayorga. El bot de Telegram calculó el próximo turno (17:00 hs ART) y lo subió directamente con `schedule_datetime = 17:00 hs ART`.
  3. El bot emitió un mensaje indicando que "los clips de archivo se desplazaron ordenadamente (+1 slot)", pero **esa llamada a la API de YouTube jamás existió**: el bot no ejecutó ningún `videos().update` en YouTube Data API sobre el video preexistente ni corrió el script de Ripple Shift. Como además 17:00 hs estaba dentro de la ventana de congelamiento de 3 horas, el archivo preprogramado no se movió.
  4. YouTube Studio recibió dos videos privados con exactamente el mismo `publishAt` (20:00:00 UTC) y al llegar la hora liberó ambos al mismo tiempo.
- **Causa Raíz del Descarte Silencioso en Cola Meta (Prendido Fuego a las 17:00 hs):**
  1. `dynamic_queue_manager.py` generó el ID de cola `q_pf_20261027_1700` para la urgencia de Ro.
  2. En la cola ya existía un ítem histórico cancelado (`SKIPPED_DUPLICATE`) con ese mismo ID exacto `q_pf_20261027_1700`.
  3. Al ejecutarse `save_item_state_atomically` en `meta_queue_scheduler.py`, la deduplicación en disco retuvo el primer ítem encontrado (el cancelado) y descartó silenciosamente el ítem `PENDING` de la urgencia, impidiendo que el daemon disparara el clip a las 17:00 hs en Meta.
- **Soluciones Definitivas Implementadas:**
  1. **Candado Anti-Colisión en YouTube Data API (`YouTubeApiUploader._shift_colliding_short`):** Antes de programar cualquier video con `schedule_datetime`, se verifica en `youtube_studio_status.json` si ya existe un Short privado en ese mismo slot (±15 min). Si existe, el sistema ejecuta de inmediato `videos().update` sobre el video previo, empujándolo al siguiente slot oficial de la grilla de YouTube Shorts (+1 slot: 10, 13, 17, 20, 23 hs ART) en cascada, garantizando que **jamás dos videos compartan el mismo `publishAt`**.
  2. **Blindaje Anti-Drop de Ítems `PENDING` en Deduplicador Atómico (`save_item_state_atomically`):** Si existen colisiones de ID en disco, el serializador atómico tiene prohibido descartar un ítem `PENDING` por un ítem previo marcado como `SKIPPED_*`. Siempre preserva el ítem `PENDING` activo.
  3. **Identificadores Únicos con Sufijo de Clip en Urgencias (`prioritize_clip_to_next_turn`):** Todo ítem prioritario generado por urgencia incorpora el sufijo de su ID de clip (`_u_{clip_id[-6:]}`) y purga activamente cualquier ítem residual `SKIPPED_*` en ese horario antes de la inserción.

# Prioridad Absoluta de Urgencias Frescas Multiplataforma (YouTube Shorts + X) y Blindaje Anti-Robo de Suplementarios (Caso #179 — 27/10/2026)
- **Principio Rector de Urgencias Frescas (LIFO Multiplataforma Total):**
  - Toda urgencia de actualidad (y especialmente la más fresca del día, como los clips de Tomás Holder / Prendido Fuego) **DEBE tomar inmediatamente los turnos oficiales más próximos disponibles en TODAS las plataformas: YouTube Shorts, X / Twitter, Instagram Reels, Facebook Reels y TikTok**.
  - **Jerarquía Obligatoria de Publicación:**
    1. Primero: **Las urgencias más frescas** toman los turnos horarios más próximos (`SLOT_10`, `SLOT_13`, `SLOT_17`, `SLOT_20`, `SLOT_23` en YouTube Shorts y X; turnos de shows en Meta/TikTok), desplazando en cascada (+1 slot) cualquier contenido pre-programado.
    2. Segundo: **Los clips más frescos que no son urgencias** (vivos contemporáneos de los últimos 7 días) completan la grilla en riguroso orden cronológico correlativo intra-live FIFO.
    3. Tercero: El material de archivo se desplaza hacia adelante (Ripple Shift).
- **Blindaje Anti-Robo de Suplementarios (`find_supplementary_clip_for_platforms`):**
  - **Error Detectado en Facebook GTA (17:30 hs):** En el turno de las 17:30 hs, Facebook publicó un clip viejo de archivo ("NOS VISITAN DE BOLIVIA DE PELOTA VASCA") en lugar del clip fresco del día ("LOS DENTISTAS NOS OBLIGAN A HABLAR").
  - **Causa Raíz:** A las 14:30 hs, el turno de Facebook estaba vacío. El buscador suplementario recurrió al catálogo de Telegram y "robó" el clip de los Dentistas para tapar el bache de Facebook a las 14:30 hs, sin chequear que ya estaba agendado para las 17:30 hs. Al llegar las 17:30 hs, como Dentistas ya figuraba publicado en Facebook a las 14:30 hs, el scheduler buscó otro suplementario virgen en Facebook y metió el clip añejo de Bolivia de septiembre.
  - **Soluciones Definitivas:**
    1. **Prohibición de Robo de Clips Agendados:** `find_supplementary_clip_for_platforms` tiene prohibido tomar cualquier clip que ya esté en estado `PENDING` en la cola de hoy o de los próximos días. No se desarma un slot futuro para emparchar uno presente.
    2. **Filtro de Frescura de Catálogo:** Se prohíbe el uso de clips de catálogo con más de 21 días de antigüedad para parches suplementarios silenciosos.

# Prohibición Absoluta de Copys Genéricos / Falsos con Apariencia de IA en X (Twitter) (Caso #180 — 27/10/2026)
- **Problema Reportado:** En los posts de X / Twitter, el sistema añadía hooks de debate genéricos tipo `¿Te pasó algo así o bancás? 👇🤙`, `¿Bancás o se fueron al pasto? 👇🔥` o `¿Qué opinás de esto? Te leemos 👇`. Estos copys resultaban artificiales, robóticos, parecían redactados por IA sin aportar valor y deslucían la pieza audiovisual.
- **Directiva Vinculante del Usuario:**
  * Queda **TERMINANTEMENTE PROHIBIDO** inventar preguntas de debate o frases genéricas en los copies de X.
  * El formato debe mantenerse **simple, sobrio y directo**: `{TITULO}\n\n🎙️ {Programa}`.
  * Si el título ya contiene signos de interrogación o exclamación propios de la pieza, se respeta tal cual.
- **Implementación Técnica:**
  * Se eliminó el diccionario `X_PROGRAM_HOOKS` de `config.py` y `lib/programs.ts`.
  * La función `format_x_clip_post` en el uploader de Python y `getFormattedXPost` en TypeScript formatean directamente `{clean_title}\n\n🎙️ {prog_name}`, recortando con puntos suspensivos solo si el título excede los 280 caracteres permitidos por la API de X.

# Validación Canónica de Cobertura Multi-Clip Asincrónica, Primacía de Frescura y Cero Pérdida de Turnos (Caso #181 — 27/10/2026)
- **Directiva Vinculante del Usuario:**
  * **Desincronización Multiplataforma Permitida:** No es obligatorio que todas las redes sociales publiquen exactamente el mismo clip al mismo tiempo si una o más plataformas ya lo emitieron previamente. Si una red ya consumió un clip, esa red puede recibir otro clip virgen distinto para cubrir el slot.
  * **Primacía Estricta de Frescura por Red:** Siempre se debe priorizar el material virgen más reciente (urgencias primero, luego clips de transmisiones contemporáneas de la semana). Queda prohibido recurrir a archivo histórico si existen clips recientes sin publicar en esa red.
  * **Principio Inviolable de Cero Pérdida de Turnos ("No perder turnos por nada en el mundo"):** Cada show debe cumplir de manera inquebrantable con sus 4 turnos oficiales diarios (16 turnos de shows diarios + slots de Shorts/Matriz). Ningún turno horario puede quedar desierto si existe material disponible.
  * **Cero Duplicados en esa Red:** Cada clip emitido debe ser 100% virgen en la cuenta o plataforma de destino.






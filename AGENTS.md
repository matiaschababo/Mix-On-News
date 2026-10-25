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
- ❌ **Prohibición de Búsqueda Léxica Cruzada:** Queda TERMINANTEMENTE PROHIBIDO asociar o descargar un video de Telegram si su `topic_id` no coincide de forma exacta con el programa asignado. Coincidencia semántica mínima del 60% y al menos 2 palabras clave.

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
- **YouTube Shorts (`@Mixontv_`):** Va **SOLO el título limpio** (`{TITULO}`), sin sufijo `| PROGRAMA...` ni `#Shorts`.
- **Instagram Reels, Facebook Reels y TikTok (`getFormattedTitle`):**
  * ❌ **PROHIBIDO** incluir hashtags (`#`) o enlaces de YouTube en Meta Reels o TikTok.
  * **Fuera de Foco (`FDF` — desde el 19/10/2026 en adelante):** `{TITULO} | FUERA DE FOCO Lunes a Viernes de 11 a 13 hs con Fran Metz, Nahuel Cantero y Toti Or`
  * **Fuera de Foco (`FDF` — archivo histórico antes del 19/10/2026):** `{TITULO} | FUERA DE FOCO 📸 Lunes a Viernes de 11 a 13 hs CON FRAN METZ, DIANE CARACCHI Y FACU COLMAN`
  * **Gracias Te Aviso (`GTA`):** `{TITULO} | GRACIAS TE AVISO Lunes a Viernes de 13 a 15 hs con Tici Saraceni, Agus Wuipi y Georgi Serafini`
  * **Prendido Fuego (`PF`):** `{TITULO} | PRENDIDO FUEGO por Mix On de Lunes y Miércoles de 15 a 17 hs con Tomas Holder, Diane Caracchi y Luli Case Rossi`
  * **Giro Perfecto (`GP`):** `{TITULO} | GIRO PERFECTO Lunes a Viernes de 17 a 19 hs CON Pato Filippini, Matias Villagra y Joaquín Enecoiz`
  * **Mix On Sports (`SPORTS` / `MOS`):** `{TITULO} | MIX ON SPORTS`
- **X / Twitter (`getFormattedXPost` / `format_x_clip_post`):** Formato conversacional limpio sin links salientes a YouTube.

# Colaboradores Co-autores Oficiales en Instagram Reels (Handles Exactos)
- **Fuera de Foco (`FDF`):**
  * Clips anotados/grabados desde el 23/10/2026 en adelante: `['mixontv_', 'franmetzz', 'nahu.cantero', 'toti_or']` *(con `@toti_or`)*.
  * Clips anotados/grabados entre el 19/10/2026 y 22/10/2026: `['mixontv_', 'franmetzz', 'nahu.cantero']`.
  * Clips de archivo históricos anteriores al 19/10/2026: `['mixontv_', 'franmetzz', 'dianecaracchi']`.
  * Determinación de Fecha: La era se determina por fecha real en Supabase (`Episode.airDate` o `Clip.createdAt`), no por la fecha de programación en la cola.
- **Prendido Fuego (`PF`):** `['mixontv_', 'tomasholder_', 'dianecaracchi', 'luliicaserossi']`.
- **Gracias Te Aviso (`GTA`):** `['mixontv_', 'ticisaraceni', 'georgiserafini', 'agustinawuipi']`.
- **Giro Perfecto (`GP`):** `['mixontv_', 'patofilippini', 'mativillagra', 'joaquinenecoiz']`.
- **Mix On Sports (`SPORTS` / `MOS`):** `['mixontv_', 'gabrielluispennise', 'juliandmartin']`.

# Integridad Original de Video, TikTok Matriz Exacto y Descargas Atómicas (Casos #146–#154 — 25/10/2026)
- **Prohibición Absoluta de Recortar o Comprimir Videos Originales:** Si un video supera `140.0s` (tope Twitter API), se omite X directamente **sin cortarlo ni recortarlo jamás**. Cero recodificación; guarda pre-descarga únicamente en el techo técnico real de `1000 MB` (`1 GB`) de Meta Reels API (`SKIPPED_OVERSIZE` + reemplazo).
- **Mix On Sports (`SPORTS` / `MOS`):** Desacoplado para emitir videos `>180s` íntegros en IG Reels, FB Reels y TikTok; YouTube Shorts siempre bajo compuerta manual por copyright deportivo; anti-duplicado exacto normalizado (`target_norm == d_norm`) sin fuzzy `0.85`.
- **TikTok Matriz (`@mixontv_` — 1 Solo Clip por Slot):** Estrictamente 1 clip en cada uno de los 4 turnos (`11:00`, `13:00`, `17:00`, `21:00`), cooldown específico de `95 min` en `RateLimitGuard`, persistencia en disco de `SUPERSEDED_SLOT_COLLISION` y prohibición de canibalizar los 4 turnos de hoy del show en `heal_matriz_slot`.
- **Resiliencia de Staging y Crontab Preventivo:** Descarga atómica `.mp4.part` con `progress_callback` heartbeat cada 15s (Sentinel 15 min) + chequeo `ffprobe > 0.5s`, filtro anti-fechas futuras en `RateLimitGuard` y doble pasada matutina `sync_real_published_history.py -> morning_preflight_audit.py` (`06:10 -> 06:30` y `09:15 -> 09:25 ART`).

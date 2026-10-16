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
- **TikTok:** Mismos 16 turnos diarios de Instagram/Facebook.
- **X / Twitter (`@Mixontv_`):** 1 clip por hora de 09:00 a 23:00 hs (15 turnos diarios), sincronizado con el clip de Meta/TikTok de esa hora, cubriendo extremos y huecos con archivo. Copy máx 280 caracteres (si supera, borrar sufijo).


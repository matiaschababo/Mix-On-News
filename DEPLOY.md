# Mix On News - Deploy en Vercel (GRATIS)

## 🚀 Deployment Automático a Vercel

Todo está listo. Solo necesitás hacer estos pasos:

### Paso 1: Crear cuenta en Vercel (si no tenés)
1. Andá a https://vercel.com
2. Hacé click en "Sign Up"
3. Logueate con GitHub

### Paso 2: Conectar el proyecto a GitHub

#### Opción A: Desde la terminal (recomendado - más rápido)
```bash
# Asegurate de estar en la carpeta del proyecto
cd /Users/matiaschababo/.gemini/antigravity/scratch/mixon-news-aggregator

# Inicializar git (si no está)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Mix On News"

# Crear repo en GitHub y pushearlo
# (Vercel te va a pedir que selecciones el repo)
```

#### Opción B: Desde Vercel Dashboard (más visual)
1. Andá a https://vercel.com/new
2. Click en "Import Project"
3. Conectá con GitHub
4. Importá el repositorio `mixon-news-aggregator`

### Paso 3: Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, en la sección "Environment Variables", agregá:

| Variable | Valor | Dónde conseguirlo |
|----------|-------|-------------------|
| `DATABASE_URL` | `file:./prod.db` | Ya configurado, no cambiar |
| `GOOGLE_GEMINI_API_KEY` | Tu API key actual | Copiala de tu archivo `.env` local |
| `CRON_SECRET` | Cualquier string random | Ej: `mixon_secure_2024_XYZ` (inventá uno) |

**Nota sobre DATABASE_URL**: Vercel usa SQLite en la misma instancia, así que no necesitás cambiar nada.

### Paso 4: Deploy
Click en **"Deploy"** y listo. Vercel hace todo automáticamente.

---

## ⚙️ Qué se despliega automáticamente

✅ **Frontend**: Tu app Next.js con el nuevo diseño de Mix On  
✅ **Backend**: Todas las APIs (`/api/news`, `/api/refresh`, `/api/interactions`)  
✅ **Scraping Automático**: Cron job que corre **cada 6 horas** GRATIS  
✅ **Base de Datos**: SQLite (incluida en el deploy)  
✅ **IA Gemini**: Curación automática de noticias  

---

## 🕐 Scraping Automático (Vercel Cron - GRATIS)

Configuré un cron job que corre **cada 6 horas** en:
- Endpoint: `/api/cron` 
- Schedule: `0 */6 * * *` (cada 6 horas)
- Cost: **$0** (incluido en el plan gratuito de Vercel)

**Horarios de ejecución (UTC):**
- 00:00, 06:00, 12:00, 18:00
- En Argentina (UTC-3): 21:00, 03:00, 09:00, 15:00

### Qué hace el cron job
1. Scrapea todas las fuentes (La Nación, La Capital, Rosario 3)
2. Filtra duplicados
3. Usa Gemini para curar y categorizar
4. Guarda en la base de datos
5. Analiza preferencias si hay suficientes interacciones

**Nunca más necesitás clickear "Actualizar Feed"** - las noticias se actualizan solas.

---

## 🔒 Seguridad del Cron

El endpoint `/api/cron` está protegido con `CRON_SECRET`. Solo Vercel puede llamarlo automáticamente.

---

## 📊 Ver Logs del Cron

Después del deploy:
1. Andá al dashboard de Vercel  
2. Click en tu proyecto  
3. Pestaña "Functions"  
4. Elegí `/api/cron`  
5. Click en "Logs"

Vas a ver:
```
🕐 [CRON] Starting automated news refresh...
📊 [CRON] Scraped 15 articles
🆕 [CRON] Found 3 new articles
✅ [CRON] Saved 3 new articles
```

---

## 🌐 Tu URL

Después del deploy, tu app va a estar en:
```
https://mixon-news-aggregator-[tu-username].vercel.app
```

Vercel te da HTTPS gratis también.

---

## 💰 Costos

**TODO GRATIS** en el plan hobby de Vercel:
- ✅ Hosting ilimitado
- ✅ SSL/HTTPS
- ✅ Cron jobs (con límites generosos)
- ✅ 100GB bandwidth/mes
- ✅ Serverless functions

Solo vas a pagar si:
- Tenés más de 100GB de tráfico/mes (muy difícil para esta app)
- Querés un dominio custom (ej: `news.mixon.com`)

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:
1. `git add .`
2. `git commit -m "descripción"`
3. `git push`

Vercel detecta automáticamente y re-deploya. **Takes 1 minuto**.

---

## 🆘 Troubleshooting

### Error: "DATABASE_URL not found"
→ Asegurate de haber agregado las variables de entorno en Vercel

### Error: "Gemini API quota exceeded"
→ Tu API key llegó al límite gratuito. Considerá:
- Esperar al próximo día (se resetea)
- Usar otra API key
- Ya está configurado para cada 6 horas (eficiente)

### Error: "Cron not running"
→ En Vercel dashboard, verificá que `vercel.json` fue detectado correctamente

---

## ✅ Checklist Pre-Deploy

- [ ] Tengo cuenta en Vercel
- [ ] Tengo mi GOOGLE_GEMINI_API_KEY
- [ ] Inventé un CRON_SECRET random
- [ ] Mi código está en GitHub (o lo voy a pushear)
- [ ] Leí esta guía

**¿Todo listo?** → Andá a https://vercel.com/new y empezá el deploy 🚀

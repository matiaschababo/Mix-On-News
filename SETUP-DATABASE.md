# 🔧 Configurar Base de Datos en Vercel

El deployment está listo pero necesitás agregar una base de datos PostgreSQL.

## Pasos para Configurar Vercel Postgres (GRATIS):

### 1. Ir al Dashboard de Vercel
https://vercel.com/matiaschababo/mix-on-news

### 2. Ir a la pestaña "Storage"
- Click en **"Storage"** (arriba del dashboard)
- Click en **"Create Database"**
- Seleccioná **"Postgres"**

### 3. Configurar la DB
- **Database Name**: `mixon-news-db` (o el que quieras)
- **Region**: Elegí la más cercana (ej: `iad1` para US East)
- Click **"Create"**

### 4. Conectar la DB al Proyecto
- Vercel va a preguntarte: "Link to a project?"
- Seleccioná **"mix-on-news"**
- Click **"Link"**

**¡LISTO!** Vercel automáticamente va a:
- Agregar las variables de entorno necesarias (`POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`)
- Re-deployar tu app
- Configurar todo automáticamente

### 5. Esperar el Re-deploy
Vercel va a triggerear un nuevo deployment automáticamente.
Esperá ~2 minutos.

### 6. Migrar el Schema
Una vez deployed, ejecutá esto para crear las tablas:

En el dashboard de Vercel:
1. Andá a **Settings** → **Environment Variables**
2. Verificá que estas variables existan:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `GOOGLE_GEMINI_API_KEY` (ya la tenés)
   - `CRON_SECRET` (ya la tenés)

Luego en la terminal local:
```bash
# Generar migración para Postgres
npx prisma migrate dev --name init_postgres

# Pushear el schema a la DB de producción
npx prisma db push --schema=./prisma/schema.prisma
```

---

## ✅ Después de Esto

Tu app va a estar funcionando 100% en:
```
https://mix-on-news.vercel.app
```

**Siguiente paso:** Avisame cuando hayas creado la DB en Vercel y te guío para la migración final.

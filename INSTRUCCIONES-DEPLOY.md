# 🚀 INSTRUCCIONES ULTRA-SIMPLES PARA VOS

Ya preparé TODO el código. Solo necesitás hacer estos 4 pasos:

---

## ✅ PASO 1: Crear Repositorio en GitHub (1 minuto)

1. Andá a: **https://github.com/new**
2. Repository name: `mixon-news-aggregator`
3. Dejá todo lo demás como está (Public está bien)
4. **NO marques** ningún checkbox (ni README, ni .gitignore, ni nada)
5. Click **"Create repository"**

**Listo el Paso 1 ✅**

---

## ✅ PASO 2: Pushear el Código (30 segundos)

GitHub te va a mostrar una pantalla con comandos. **IGNORÁ ESA PANTALLA.**

En su lugar, **copiá y pegá este comando en tu terminal:**

```bash
cd /Users/matiaschababo/.gemini/antigravity/scratch/mixon-news-aggregator && git remote add origin https://github.com/TU-USERNAME/mixon-news-aggregator.git && git branch -M main && git push -u origin main
```

**⚠️ IMPORTANTE:** Reemplazá `TU-USERNAME` con tu usuario de GitHub antes de pegar.

Si te pide usuario/password, usá un **Personal Access Token** (no tu password):
- Andá a https://github.com/settings/tokens
- Generate new token (classic)
- Marcá `repo`
- Copiá el token y úsalo como password

**Listo el Paso 2 ✅**

---

## ✅ PASO 3: Deploy en Vercel (2 minutos)

1. Andá a: **https://vercel.com/new**
2. Si no tenés cuenta: **"Sign Up with GitHub"**
3. Buscá el repo `mixon-news-aggregator` y click **"Import"**
4. En **"Environment Variables"**, agregá estas 2 variables:

   | Variable Name | Value |
   |--------------|-------|
   | `GOOGLE_GEMINI_API_KEY` | **(Pegá tu API key de Gemini)** |
   | `CRON_SECRET` | `mixon2024secret` (o inventá otro) |

   **¿Dónde está tu API key?**
   Ejecutá esto en la terminal:
   ```bash
   grep GOOGLE_GEMINI_API_KEY /Users/matiaschababo/.gemini/antigravity/scratch/mixon-news-aggregator/.env
   ```

5. Click **"Deploy"**

**Listo el Paso 3 ✅**

---

## ✅ PASO 4: Esperar (2 minutos)

Vercel va a buildear y deployar tu app. Vas a ver:
- ✅ Building...
- ✅ Deploying...
- 🎉 **Success!**

Tu app va a estar en:
```
https://mixon-news-aggregator-[tu-username].vercel.app
```

**Listo el Paso 4 ✅**

---

## 🎉 ¡YA ESTÁ EN PRODUCCIÓN!

Tu app tiene:
- ✅ UI colorida con branding Mix On
- ✅ Scraping automático cada 6 horas (21:00, 03:00, 09:00, 15:00)
- ✅ Sistema de recomendaciones
- ✅ 100% GRATIS

---

## 🔍 Verificar que el Cron Funciona

1. En Vercel dashboard → tu proyecto
2. **Settings** → **Cron Jobs**
3. Deberías ver: `/api/cron` - cada 6 horas

Para probar manualmente (forzar scraping ahora):
```bash
curl -X GET "https://TU-URL.vercel.app/api/cron" -H "Authorization: Bearer mixon2024secret"
```

---

## ❓ ¿Problemas?

### "git push" falla
→ Necesitás un Personal Access Token de GitHub (no tu password normal)

### "Environment variable missing"
→ Asegurate de haber agregado las 2 variables en Vercel

### App deployed pero sin noticias
→ Esperá 1-2 minutos o llamá al endpoint `/api/refresh` manualmente

---

## 📞 Necesitás Ayuda?

Avisame en qué paso te trabaste y te ayudo.

**Total:** 4 pasos, ~5 minutos, $0 de costo.

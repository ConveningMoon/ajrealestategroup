# itmano-landing-pages · A&J Real Estate

Landing pages de lead magnets para clientes de ITMANO. Este repo es **público y no confiable** — no tiene acceso a la base de datos del CRM, no tiene service keys, no tiene secretos.

Deploys a `lm.ajrealestateva.com` vía Vercel.

---

## Frontera de seguridad

```
Este repo                          CRM (app.itmano.com)
─────────────────────              ──────────────────────────
Next.js estático          ──────▶  /api/intake/{public_id}/submit
sin Supabase                       /api/intake/{public_id}/view  (intake.js)
sin service keys
sin acceso a DB
```

La comunicación ocurre **solo** a través de los endpoints públicos de intake. El `channel_id` que va en el HTML no es un secreto — es un ID público que identifica el origen de los leads. Si este repo se compromete, la base de datos del CRM queda intacta.

**Nunca agregar:**
- Variables `SUPABASE_SERVICE_ROLE_KEY` o similares
- Llamadas directas a la DB
- Cualquier secret que no deba ser visible en el HTML final

---

## Quick Start

```bash
npm install
cp .env.example .env.local   # agregar el channel ID real (ver abajo)
npm run dev
```

Abre http://localhost:3000

---

## Configurar el Channel ID

El `channel_id` identifica el canal de entrada de leads en el CRM. Se obtiene así:

1. Entrar a **app.itmano.com → Sources**
2. Encontrar o crear el canal "Guía del Comprador Hispano"
3. Copiar el `public_id` (formato: `chn_xxxxxxxxxxxxxxxxxx`)
4. Pegarlo en `.env.local`:

```
NEXT_PUBLIC_ITMANO_CHANNEL_ID=chn_xxxxxxxxxxxxxxxxxx
```

También está declarado en [lib/channels.ts](lib/channels.ts) como referencia documentada. En producción, el valor siempre viene del env var de Vercel.

Sin channel ID, `intake.js` no carga y el formulario usa un fallback de `fetch` directo.

---

## Variables de entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `NEXT_PUBLIC_ITMANO_CHANNEL_ID` | **Sí** | Public channel ID de ITMANO → Sources |
| `NEXT_PUBLIC_ITMANO_BASE_URL` | No | Base URL del CRM (default: `https://app.itmano.com`) |

Ambas son `NEXT_PUBLIC_` — van embebidas en el HTML. No son secretos.

---

## Deploy a Vercel + subdominio

```bash
# 1. Push a GitHub
git push origin main

# 2. Importar en vercel.com/new (Next.js se detecta automático)

# 3. Agregar env vars en el dashboard de Vercel:
#    NEXT_PUBLIC_ITMANO_CHANNEL_ID = chn_xxxxxxxxxxxxxxxxxx
#    NEXT_PUBLIC_ITMANO_BASE_URL   = https://app.itmano.com

# 4. Domains → Add: lm.ajrealestateva.com
#    Agregar CNAME en el DNS del cliente apuntando a cname.vercel-dns.com
```

Preset: Next.js (auto). Build: `npm run build`. Output dir: `.next`.

---

## Agregar una nueva LP (nuevo lead magnet o nuevo cliente)

Este repo es single-tenant por ahora (solo A&J en `/`). Cuando entre el segundo cliente:

1. **Crear el canal** en app.itmano.com → Sources. Anotar el `public_id`.

2. **Agregar el channel ID** en [lib/channels.ts](lib/channels.ts):
   ```ts
   export const NUEVO_CLIENTE_CHANNEL =
     process.env.NEXT_PUBLIC_NUEVO_CLIENTE_CHANNEL_ID ?? 'REPLACE_WITH_CHANNEL_ID'
   ```

3. **Crear la ruta** en `app/`:
   - Single-tenant adicional: `app/nuevo-lead-magnet/page.tsx`
   - Multi-tenant por hostname: agregar middleware en `middleware.ts` que reescriba la ruta según `request.headers.get('host')`

4. **Crear los componentes** de la nueva LP en `components/sections/`. Reusar el quiz (`components/quiz/Quiz.tsx`) pasándole el channel ID como prop si se decide desacoplar.

5. **Configurar el subdominio** en Vercel → Domains → Add `lm.nuevocliente.com` + CNAME en su DNS.

6. **Agregar el env var** del nuevo channel ID en el dashboard de Vercel.

---

## Contenido reemplazable

| Archivo | Qué reemplazar |
|---------|---------------|
| `components/sections/AgentIntro.tsx` | Bio de Adriana, años de experiencia, familias atendidas |
| `components/sections/Testimonials.tsx` | Testimonios reales (foto, nombre, texto, ciudad) |
| `components/template/sections/CTAFinal.tsx` | Logo y link al sitio principal (cierre de página, reemplaza el antiguo footer) |
| `public/images/ASSETS.md` | Guía de dimensiones para imágenes |

---

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # ESLint
npx tsc --noEmit # type check
```

# Deploy — El Espejo · Bootcamp Medellín

## Setup (una sola vez, ~5 minutos)

### 1. Instalar dependencias
```bash
cd espejo-live
npm install
```

### 2. Conectar Convex (necesitas cuenta en convex.dev)
```bash
npx convex dev
```
Esto abre el browser para login, crea el proyecto, y genera `convex/_generated/`.
Deja esta terminal corriendo. Copia la URL que aparece: `https://xxx.convex.cloud`

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Edita .env y pega tu CONVEX_URL
```

### 4. Probar local
```bash
# En otra terminal:
npm run dev
# Abre: http://localhost:5173           → quiz del founder
# Abre: http://localhost:5173/presenter → dashboard presentador
```

---

## Deploy a Netlify (opción rápida — drag & drop)

```bash
# Terminal 1: Convex en producción
npx convex deploy
# Copia la Production URL que aparece

# Terminal 2: Build
VITE_CONVEX_URL=https://TU-URL-PRODUCCION.convex.cloud npm run build

# Arrastra la carpeta /dist a netlify.com/drop
```

## Deploy a Netlify (opción CLI)
```bash
npx convex deploy
VITE_CONVEX_URL=https://TU-URL-PRODUCCION.convex.cloud npm run build
npx netlify-cli deploy --dir dist --prod
```

---

## URLs del día

| Pantalla | URL |
|---|---|
| Founder (celular/laptop) | `https://tu-sitio.netlify.app` |
| Presentador (proyector) | `https://tu-sitio.netlify.app/presenter` |

## Código de sesión
El código de sesión está en `src/questions.js` → `SESSION_CODE = "MEDE2605"`.
Puedes cambiarlo antes de hacer deploy si quieres.

---

## Post-bootcamp: enviar resultados

Para enviar a cada founder su resumen:
1. Abre el dashboard de Convex en `convex.dev` → tu proyecto → Data → `results`
2. Exporta como CSV o usa la API para generar los emails personalizados

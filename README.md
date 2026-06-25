# DevKickstart Web

Frontend web de DevKickstart construido con Next.js, React, TypeScript y Tailwind CSS.

## Requisitos

- Node.js compatible con Next.js 16
- npm
- Backend de DevKickstart disponible por HTTP

## Configuracion Local

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

2. Ajusta la URL del backend en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5119
```

3. Instala dependencias y levanta el servidor:

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deploy en Vercel

Vercel puede desplegar este proyecto como una app Next.js sin Dockerfile. El proyecto usa el comando de build estandar:

```bash
npm run build
```

Configura esta variable de entorno en Vercel:

```env
NEXT_PUBLIC_API_URL=https://tu-backend-dev.example.com
```

Puntos importantes:

- No uses `http://localhost:5119` en Vercel. Debe ser una URL publica accesible desde el navegador.
- Define `NEXT_PUBLIC_API_URL` al menos en el entorno `Preview` para probar ramas y PRs.
- Como `NEXT_PUBLIC_API_URL` se incluye en el bundle del cliente durante `next build`, cada entorno de Vercel debe tener su propio valor antes de compilar.

## Estructura

- `app/`: rutas y layouts de Next.js App Router.
- `Components/`: componentes reutilizables de UI.
- `lib/api.ts`: helper central para construir requests al backend.
- `.env.example`: variables necesarias para configurar la app.

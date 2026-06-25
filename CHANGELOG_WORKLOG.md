# DevKickstart Worklog

Documento vivo para registrar cambios hechos durante esta sesión: qué cambió, por qué se cambió, cómo funciona ahora, validación y enlaces a PR/commits.

Añadir una entrada nueva para cada cambio significativo. Use la plantilla abajo y mantenga la sección más reciente arriba.

Plantilla de entrada (copiar y completar):

---
### [YYYY-MM-DD] - <Ámbito corto>

Repo/scope: `<ruta o repo>`

Cambios:
- Breve lista de cambios hechos (archivos principales, refactors, features, fixes).

Por qué:
- Razón del cambio (bug, requisito, refactor, seguridad, compatibilidad, etc.).

Cómo funciona ahora:
- Descripción breve de la nueva behavior, config requerida, y any breaking changes.

Validación:
- Comandos para probar (ej.: `npm run lint`, `npm run build`, pasos manuales, URL de preview).

Enlaces:
- PR: <url>
- Commit: <sha>

Autor: <nombre>

---

Resumen de cambios recientes (entradas automáticas añadidas):

---
### 2026-06-25 - Preparar commits de deploy dev

Repo/scope: `/Users/brucie/devkickstart-web` y `/Users/brucie/DevKickstart.Api`

Cambios:
- Se revisó el estado actual de ambos repos antes de preparar commits.
- Se validó el frontend con `npm run lint` y `npm run build`.
- Se validó la API con `dotnet build /Users/brucie/DevKickstart.Api/DevKickstart.Api.csproj`.
- Se validaron los tests .NET con `dotnet test /Users/brucie/DevKickstart.sln`.
- Se confirmó que el build de frontend requiere red para descargar fuentes Geist desde Google Fonts.

Por qué:
- Antes de desplegar en Vercel/API hosting conviene dejar commits separados y verificables.
- La validación evita publicar una configuración de entorno incompleta o rota.

Cómo funciona ahora:
- El frontend usa `NEXT_PUBLIC_API_URL` para apuntar al backend.
- La API queda preparada para leer Redis, JWT secret, CORS y puerto desde configuración/env vars.
- Los siguientes pasos son crear commits, publicar ramas/PRs y desplegar primero la API dev.

Validación:
- `npm run lint`: pasó.
- `npm run build`: pasó con acceso de red para Google Fonts.
- `dotnet build /Users/brucie/DevKickstart.Api/DevKickstart.Api.csproj`: pasó.
- `dotnet test /Users/brucie/DevKickstart.sln`: pasó. Nota: actualmente solo hay 1 test vacío.

Enlaces:
- PR frontend: https://github.com/bruno-diaz-dev/devkickstart-web/pull/3
- PR API: https://github.com/bruno-diaz-dev/DevKickstart.Api/pull/1
- Commit frontend: `08caa7a`
- Commit API: `4fbe938`

Autor: Codex

---
### 2026-06-04 - CI y documentación para Copilot

Repo/scope: `/Users/brucie/devkickstart-web`

Cambios:
- Se agregó `.github/copilot-instructions.md` con instrucciones para sesiones Copilot (build/lint, arquitectura, convenciones).
- Se creó `.github/workflows/ci.yml` (workflow de CI) que ejecuta `npm ci`, `npm run lint` y `npm run build` en push/PR.
- Se actualizó el workflow para ejecutar en una matriz de Node.js: 18 y 20.
- Se creó la plantilla `CHANGELOG_WORKLOG.md` y se añadió guía para registrar cambios.
- Branches/PRs creados: `ci/add-github-actions-1780600798` (PR #1), `chore/add-changelog-1780601325` (PR #2).

Por qué:
- Tener CI que valide build y lint en PRs detecta problemas temprano.
- Documentar instrucciones para Copilot mejora consistencia en futuras sesiones.
- Registrar cambios con plantillas facilita auditoría y comunicación entre colaboradores.

Cómo funciona ahora:
- CI: en cada push/PR a main (o master) se ejecutan jobs en Node 18 y 20 que instalan dependencias, lint y build.
- Copilot instructions: archivo en `.github/copilot-instructions.md` debe ser consultado por asistentes automáticos.
- CHANGELOG_WORKLOG.md contiene plantilla y se actualizará con entradas manuales o automáticas por cada cambio significativo.

Validación:
- PRs abiertos: https://github.com/bruno-diaz-dev/devkickstart-web/pull/1, https://github.com/bruno-diaz-dev/devkickstart-web/pull/2
- Branches locales/remotos: `ci/add-github-actions-1780600798`, `chore/add-changelog-1780601325`
- Comandos a ejecutar localmente: `npm run lint`, `npm run build`.

Enlaces:
- PR CI: https://github.com/bruno-diaz-dev/devkickstart-web/pull/1
- PR Changelog: https://github.com/bruno-diaz-dev/devkickstart-web/pull/2

Autor: Copilot (acciones ejecutadas desde la sesión)

---

(Entradas antiguas siguen abajo)


### 2026-06-04 - Frontend: arreglar errores de ESLint en useEffect y tipado

Repo/scope: `/Users/brucie/devkickstart-web`

Cambios:
- Modificado: `app/(workspace)/dashboard/page.tsx` — `cargarNotas()` envuelta en IIFE async con bandera `mounted`.
- Modificado: `app/(workspace)/notes/page.tsx` — misma corrección para `cargarNotas()`.
- Modificado: `app/(workspace)/notes/[id]/page.tsx` — tipado explícito de la respuesta: `Nota[]`.

Por qué:
- ESLint (regla `react-hooks/set-state-in-effect`) fallaba al invocar `setState` sincrónicamente dentro de un `useEffect`, lo que puede provocar renders en cascada.
- `@typescript-eslint/no-explicit-any` detectó usos de `any` que reducen seguridad de tipos.

Cómo funciona ahora:
- Las llamadas API se realizan en una IIFE async dentro del efecto y usan una bandera `mounted` para evitar `setState` después del unmount.
- Las respuestas se tipan explícitamente como `Nota[]` para eliminar `any` y mejorar chequeo de tipos.

Validación:
- Ejecutar: `npm run lint` (debe pasar)
- Ejecutar: `npm run build` (comprobación adicional)

Enlaces:
- PR: (ver PR creado)
- Commit: (sha generado al commitear)

Autor: Copilot (acciones desde la sesión)


## 2026-06-04

### Frontend: preparar configuracion de API por entorno

Repo: `/Users/brucie/devkickstart-web`

Cambios:

- Se agrego `lib/api.ts` con `apiUrl()` y `apiRequest()`.
- Se agrego `.env.local` con `NEXT_PUBLIC_API_URL=http://localhost:5119`.
- Se agrego `.env.example` para documentar la variable requerida.
- Se actualizo `.gitignore` para permitir versionar `.env.example`.
- Se reemplazaron llamadas directas a `http://localhost:5119` en login, registro, dashboard, notas, crear nota, editar nota y crear usuario.
- Se ajustaron errores de lint existentes en paginas tocadas:
  - `useEffect` en dashboard y notas ahora contiene la funcion async que actualiza estado.
  - Se tiparon las notas en `app/(workspace)/notes/[id]/page.tsx` para eliminar `any`.

Por que:

- Vercel y otros entornos no pueden usar `localhost` como backend.
- La URL del backend debe poder cambiar por entorno sin editar codigo.
- Centralizar los requests reduce duplicacion y hace mas facil manejar token/headers despues.

Como funciona ahora:

- El frontend lee `process.env.NEXT_PUBLIC_API_URL`.
- Si la variable no existe, `lib/api.ts` usa `http://localhost:5119` como fallback local.
- `apiRequest(path, { token })` construye la URL final y agrega `Authorization: Bearer <token>` cuando recibe token.

Validacion:

- `npm run lint` paso.
- `npm run build` paso con acceso de red para descargar fuentes Geist desde Google Fonts.

Notas:

- `NEXT_PUBLIC_API_URL` se inyecta en el bundle durante `next build`, asi que cada entorno de Vercel debe tener su propio valor antes de compilar.

### Frontend: documentar deploy en Vercel

Repo: `/Users/brucie/devkickstart-web`

Cambios:

- Se reemplazo el README generico de `create-next-app`.
- El README ahora documenta:
  - requisitos locales,
  - copia de `.env.example` a `.env.local`,
  - scripts disponibles,
  - deploy en Vercel sin Dockerfile,
  - variable `NEXT_PUBLIC_API_URL`,
  - estructura principal del proyecto.

Por que:

- El siguiente paso para un entorno dev en Vercel es configurar el proyecto y apuntarlo a una URL publica del backend.
- Dockerfile no es necesario para desplegar este frontend en Vercel.

Como funciona ahora:

- Vercel puede detectar Next.js y correr `npm run build`.
- El frontend desplegado usara el backend configurado en `NEXT_PUBLIC_API_URL`.

Validacion:

- `npm run lint` paso.
- `npm run build` paso con acceso de red para fuentes Geist.

### Backend API: preparar configuracion para deploy

Repo: `/Users/brucie/DevKickstart.Api`

Cambios:

- Se agrego `Configuration/JwtOptions.cs`.
- `Program.cs` ahora:
  - lee `PORT` y configura Kestrel con `http://0.0.0.0:{PORT}` cuando existe,
  - configura `RedisOptions` desde `Redis`,
  - configura `JwtOptions` desde `Jwt`,
  - crea `IConnectionMultiplexer` usando `Redis:ConnectionString`,
  - falla al arrancar si falta `Redis:ConnectionString`,
  - lee `Jwt:Secret` para validar tokens,
  - falla al arrancar si falta `Jwt:Secret`,
  - configura CORS desde `Cors:AllowedOrigins`,
  - mantiene `AllowAnyOrigin()` solo si no hay origenes configurados,
  - agrega endpoint `GET /health`.
- `TokenService` ahora recibe `IOptions<JwtOptions>` y usa `Jwt:Secret` en vez de una constante hardcodeada.
- `RedisUsuarioRepository` ahora reutiliza `IConnectionMultiplexer` inyectado en vez de abrir su propia conexion.
- `appsettings.json` ahora incluye secciones `Jwt` y `Cors`.
- Se agrego `README.md` en la API con variables necesarias para deploy.
- Se saco `bin/` y `obj/` del indice Git con `git rm --cached -r bin obj`; los archivos locales no se borraron, solo dejan de versionarse.

Por que:

- En deploy, Redis no va a vivir en `localhost:6379`.
- El secreto JWT no debe estar hardcodeado en codigo.
- Las plataformas de deploy suelen pasar el puerto por `PORT`.
- CORS debe permitir el dominio real del frontend en Vercel.
- `bin/` y `obj/` son artefactos de build y no deben estar versionados.

Como funciona ahora:

- Localmente puede seguir usando `appsettings.json`:
  - `Redis:ConnectionString=localhost:6379`
  - `Jwt:Secret=LOCAL_DEVELOPMENT_ONLY_CHANGE_ME_SECRET`
- En deploy, se configuran variables con formato de ASP.NET Core:
  - `Redis__ConnectionString=...`
  - `Jwt__Secret=...`
  - `Cors__AllowedOrigins__0=https://frontend-dev.vercel.app`
  - `PORT=8080` o el valor que entregue la plataforma.
- El endpoint `/health` sirve para health checks de Render/Railway/Fly/etc.

Validacion:

- `dotnet build /Users/brucie/DevKickstart.Api/DevKickstart.Api.csproj` paso.
- `dotnet test /Users/brucie/DevKickstart.sln` paso.
- Los tests actuales son limitados: solo hay 1 test vacio.

Notas:

- El repo Git de la API esta en `/Users/brucie/DevKickstart.Api`.
- `DevKickstart.Tests` esta fuera del repo Git de la API, por lo que no viajaria si se publica solo `DevKickstart.Api`.
- Antes de deploy hay que elegir plataforma y crear/provisionar Redis.
- Hay un cambio previo menor en `Domain/Entities/Note.cs`: una linea en blanco al final.

## Pendiente

- Elegir plataforma para desplegar API dev: Render, Railway, Fly.io u otra.
- Provisionar Redis gestionado o servicio Redis.
- Configurar variables de entorno de la API en la plataforma elegida.
- Obtener URL publica de la API.
- Configurar `NEXT_PUBLIC_API_URL` en Vercel con esa URL.
- Configurar `Cors__AllowedOrigins__0` en la API con el dominio de Vercel.
- Considerar mover los tests dentro del repo Git correcto o convertir `/Users/brucie` en estructura monorepo.

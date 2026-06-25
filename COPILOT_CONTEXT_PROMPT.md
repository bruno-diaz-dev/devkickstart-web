# Prompt Para Continuar En Copilot

Estoy trabajando en el proyecto DevKickstart, que tiene dos repos/proyectos locales:

- Frontend Next.js: `/Users/brucie/devkickstart-web`
- Backend ASP.NET Core API: `/Users/brucie/DevKickstart.Api`
- Solucion con tests fuera del repo API: `/Users/brucie/DevKickstart.sln`

Contexto del frontend:

- Next.js `16.2.5`, React `19.2.4`, TypeScript, Tailwind CSS v4.
- Hay una regla en `AGENTS.md`: antes de modificar APIs/conveciones de Next, consultar docs locales en `node_modules/next/dist/docs/`.
- App Router con rutas:
  - `/login`
  - `/register`
  - `/dashboard`
  - `/notes`
  - `/notes/create`
  - `/notes/[id]`
- El frontend usa `localStorage` para guardar el token JWT.
- Se agrego `lib/api.ts`:
  - `apiUrl(path)`
  - `apiRequest(path, { token, ...options })`
- La URL del backend se configura con:
  - `NEXT_PUBLIC_API_URL`
- `.env.local` actual:
  - `NEXT_PUBLIC_API_URL=http://localhost:5119`
- `.env.example` documenta la misma variable.
- README del frontend ya documenta deploy en Vercel.
- Validaciones pasaron:
  - `npm run lint`
  - `npm run build` con red disponible para descargar fuentes Geist.

Contexto del backend:

- ASP.NET Core 8.
- Usa Redis con StackExchange.Redis.
- Usa JWT Bearer auth.
- Usa Swagger.
- Tiene Dockerfile y docker-compose.
- API local corre en `http://localhost:5119`.
- Se preparo para deploy:
  - `Program.cs` lee `PORT`.
  - Redis ahora usa `Redis:ConnectionString`.
  - JWT secret ahora usa `Jwt:Secret`.
  - CORS usa `Cors:AllowedOrigins`.
  - Se agrego `GET /health`.
  - `TokenService` usa `IOptions<JwtOptions>`.
  - `RedisUsuarioRepository` reutiliza `IConnectionMultiplexer`.
  - Se agrego `Configuration/JwtOptions.cs`.
  - Se agrego README de API con variables para deploy.
  - Se saco `bin/` y `obj/` del indice Git.
- Variables esperadas en deploy:
  - `Redis__ConnectionString=...`
  - `Jwt__Secret=...`
  - `Cors__AllowedOrigins__0=https://frontend-dev.vercel.app`
  - `PORT=8080` o el valor de la plataforma.
- Validaciones pasaron:
  - `dotnet build /Users/brucie/DevKickstart.Api/DevKickstart.Api.csproj`
  - `dotnet test /Users/brucie/DevKickstart.sln`
- Tests actuales son muy limitados: solo hay 1 test vacio.

Objetivo actual:

Preparar y desplegar un entorno dev:

1. Elegir plataforma para API dev, idealmente Render/Railway/Fly.io.
2. Provisionar Redis accesible por la API.
3. Configurar variables de entorno de la API.
4. Desplegar API y verificar `/health`.
5. Configurar `NEXT_PUBLIC_API_URL` en Vercel con la URL publica de la API.
6. Configurar CORS de la API con el dominio de Vercel.
7. Probar login, registro y notas desde el frontend desplegado.

Importante:

- Mantener actualizado `CHANGELOG_WORKLOG.md` con cada cambio: que cambio, por que, como funciona ahora y validacion.
- No revertir cambios locales del usuario.
- No volver a versionar `bin/` ni `obj/`.

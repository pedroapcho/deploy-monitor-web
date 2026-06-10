# Deploy Monitor Core v1

Proyecto definitivo base para Deploy Monitor AI.

## Qué es

Una web core sin skins para:

- iPhone PWA
- Windows navegador
- Web app base
- Futuro Mac App con skins

## Qué incluye

- Login simple por password.
- Caja de instrucciones.
- Selector/configuración de proyecto.
- Preview embebido.
- Motor OpenAI + GitHub + Vercel.
- Aprobación antes de aplicar cambios.
- Historial local.
- Diseño mobile-first.

## Cómo correr

```bash
npm install
npm run dev
```

Abre:

```bash
http://localhost:3000
```

## Configurar

Copia `.env.example` a `.env.local` y completa:

```bash
OPENAI_API_KEY=
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=main
ALLOWED_FILES=
VERCEL_DEPLOY_HOOK_URL=
NEXT_PUBLIC_PREVIEW_URL=
MONITOR_PASSWORD=
```

## Flujo

1. Entras con password.
2. Escribes una instrucción.
3. El motor lee archivos permitidos desde GitHub.
4. OpenAI genera una propuesta.
5. Revisas archivos propuestos.
6. Apruebas y aplica commit a GitHub.
7. Disparas deploy en Vercel.
8. Revisas preview.

## Importante

No pongas claves en el frontend. Usa variables de entorno privadas.

Esta versión no tiene skins. Las skins van solo en la app Mac.

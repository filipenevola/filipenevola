# Quave Cloud Configuration

This file contains Quave Cloud identifiers for this project, used by MCP tools.

## Account

| Field | Value |
|-------|-------|
| **Account ID** | `KPADFfTBDQnk8J2Yv` |
| **Account Name** | filipenevola |
| **Slug** | filipenevola |

## App Environment (verdaoracional — Production)

| Field | Value |
|-------|-------|
| **App Env ID** | `s7mze9j3xcTSuQDNz` |
| **Environment Name** | production |
| **Region** | us-5 |
| **Git Branch** | `main`, `cursor/palmeirasapp-1aeb` |
| **CLI Env Name** | `filipenevola-palmeirasapp-production` |
| **Site URL** | `https://verdaoracional.com` |
| **Hosts (interno)** | `palmeirasapp-production-filipenevola.svc-us5.zcloud.ws` |

### Variáveis de ambiente (runtime)

| Nome | Secret | Descrição |
|------|--------|-----------|
| `MONGODB_URI` | sim | Conexão MongoDB (database: `verdaoracional`) |
| `POSTS_API_SECRET` | sim | Token da API `/api/posts` (mín. 32 chars) |
| `NEXT_PUBLIC_SITE_URL` | não | `https://verdaoracional.com` |
| `NEXT_PUBLIC_GOOGLE_CALENDAR_URL` | não | Embed do calendário de jogos |

Configure DNS de `verdaoracional.com` (e `www`) apontando para o ambiente no Quave One.

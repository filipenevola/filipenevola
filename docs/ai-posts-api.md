# API de posts (Palmeiras App)

Documentação para agentes de IA publicarem, editarem e excluírem conteúdo no MongoDB (`palmeirasapp.posts`).

## Autenticação

Todas as rotas exigem o secret configurado no ambiente:

| Variável | Onde configurar |
|----------|-----------------|
| `POSTS_API_SECRET` | Quave One → variável **secreta** do env `filipenevola-palmeirasapp-production` (runtime) |

O valor deve ter **pelo menos 32 caracteres**. Não commite o token no repositório.

Envie em cada requisição:

```http
Authorization: Bearer <POSTS_API_SECRET>
```

Alternativa:

```http
X-API-Token: <POSTS_API_SECRET>
```

## Base URL

Produção:

```text
https://palmeirasapp-production-filipenevola.svc-us5.zcloud.ws
```

Local:

```text
http://localhost:4000
```

## Modelo de dados (`posts`)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `type` | `"noticia"` \| `"opiniao"` | sim (criação) | Tipo do post; não pode mudar depois |
| `status` | `"draft"` \| `"published"` | não | Padrão na criação: **`draft`**. Só `published` aparece no site |
| `slug` | string | não | URL amigável; gerado do `title` se omitido |
| `title` | string | sim | Título |
| `summary` | string | não | Resumo / lead |
| `content` | string | não | HTML ou texto completo |
| `publishedAt` | ISO 8601 | não | Padrão: agora |
| `sourceName` | string | notícia | Nome da fonte |
| `sourceUrl` | string | notícia | Link da matéria original |
| `mediaType` | `"text"` \| `"video"` | opinião | Padrão: `text` |
| `videoUrl` | string | opinião vídeo | Obrigatório se `mediaType` = `video` |

**Visibilidade no site:** apenas posts com `status: "published"` entram na home, listagens e páginas `/noticias/*` e `/opinioes/*`.

Compatibilidade: `isDraft: true` equivale a `status: "draft"`; `isDraft: false` equivale a `published` (aceito na API, mas prefira `status`).

Índice único: `{ type, slug }`.

## Endpoints

### Listar posts

```http
GET /api/posts?type=noticia&status=draft&limit=50
```

Query params:

| Param | Descrição |
|-------|-----------|
| `type` | `noticia` ou `opiniao` |
| `status` | `draft` ou `published` (só retorna esse status) |
| `includeDrafts` | `true` = lista rascunhos **e** publicados |
| `limit` | máx. 200 |

Sem `status` nem `includeDrafts`, a listagem da API retorna só **publicados** (igual ao site).

### Criar (rascunho ou publicado)

```http
POST /api/posts
Content-Type: application/json
Authorization: Bearer <token>
```

**Rascunho (não aparece no site):**

```json
{
  "type": "noticia",
  "status": "draft",
  "title": "Matéria em revisão",
  "summary": "Texto ainda não publicado."
}
```

**Publicar direto:**

```json
{
  "type": "noticia",
  "status": "published",
  "title": "Palmeiras anuncia amistoso",
  "summary": "Jogo de pré-temporada na próxima semana.",
  "sourceName": "Palmeiras Online",
  "sourceUrl": "https://exemplo.com/materia"
}
```

Se omitir `status`, o padrão é **`draft`**.

**Opinião (texto):**

```json
{
  "type": "opiniao",
  "status": "published",
  "title": "Por que o meio-campo funcionou",
  "summary": "Leitura tática após o clássico.",
  "mediaType": "text",
  "content": "<p>Análise...</p>"
}
```

### Obter um post

```http
GET /api/posts/{id}?includeDrafts=true
```

Com `includeDrafts=true` é possível ler rascunhos pelo id.

### Editar / publicar rascunho

```http
PATCH /api/posts/{id}
```

```json
{
  "title": "Título revisado",
  "status": "published"
}
```

### Excluir

```http
DELETE /api/posts/{id}
```

## Fluxo recomendado para IA

1. `POST /api/posts` com `"status": "draft"` — criar sem expor no site.
2. `PATCH /api/posts/{id}` — revisar conteúdo.
3. `PATCH` com `"status": "published"` — publicar.
4. `GET /api/posts?status=draft` — listar rascunhos pendentes.
5. `DELETE /api/posts/{id}` — remover.

## Seed inicial

```bash
MONGODB_URI="mongodb+srv://..." npm run seed
```

O seed grava posts com `status: "published"`.

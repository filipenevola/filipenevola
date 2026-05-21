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
| `slug` | string | não | URL amigável; gerado do `title` se omitido |
| `title` | string | sim | Título |
| `summary` | string | não | Resumo / lead |
| `content` | string | não | HTML ou texto completo |
| `publishedAt` | ISO 8601 | não | Padrão: agora |
| `isDraft` | boolean | não | `true` = não aparece no site |
| `sourceName` | string | notícia | Nome da fonte |
| `sourceUrl` | string | notícia | Link da matéria original |
| `mediaType` | `"text"` \| `"video"` | opinião | Padrão: `text` |
| `videoUrl` | string | opinião vídeo | Obrigatório se `mediaType` = `video` |

Índice único: `{ type, slug }`.

Páginas públicas:

- Notícia → `/noticias/{slug}`
- Opinião → `/opinioes/{slug}`

## Endpoints

### Listar posts

```http
GET /api/posts?type=noticia&includeDrafts=false&limit=50
```

Resposta `200`:

```json
{
  "posts": [ { "_id": "...", "type": "noticia", "slug": "...", "title": "..." } ],
  "count": 1
}
```

`type` opcional: `noticia` ou `opiniao`.

### Criar / publicar

```http
POST /api/posts
Content-Type: application/json
Authorization: Bearer <token>
```

**Notícia:**

```json
{
  "type": "noticia",
  "title": "Palmeiras anuncia amistoso",
  "summary": "Jogo de pré-temporada na próxima semana.",
  "sourceName": "Palmeiras Online",
  "sourceUrl": "https://exemplo.com/materia",
  "content": "<p>Texto opcional</p>",
  "isDraft": false
}
```

**Opinião (texto):**

```json
{
  "type": "opiniao",
  "title": "Por que o meio-campo funcionou",
  "summary": "Leitura tática após o clássico.",
  "mediaType": "text",
  "content": "<p>Análise...</p>"
}
```

**Opinião (vídeo):**

```json
{
  "type": "opiniao",
  "title": "Resumo da semana em vídeo",
  "summary": "5 minutos de destaques.",
  "mediaType": "video",
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

Resposta `201`:

```json
{ "post": { "_id": "674a...", "type": "noticia", "slug": "...", ... } }
```

### Obter um post

```http
GET /api/posts/{id}?includeDrafts=true
```

### Editar

```http
PATCH /api/posts/{id}
Content-Type: application/json
Authorization: Bearer <token>
```

Corpo parcial (apenas campos a alterar):

```json
{
  "title": "Novo título",
  "summary": "Resumo atualizado",
  "isDraft": false
}
```

### Excluir

```http
DELETE /api/posts/{id}
Authorization: Bearer <token>
```

Resposta `200`:

```json
{ "deleted": true, "id": "674a..." }
```

## Códigos de erro

| Status | Significado |
|--------|-------------|
| `401` | Token ausente ou inválido |
| `400` | Validação (slug duplicado, campos obrigatórios) |
| `404` | Post não encontrado |
| `503` | `POSTS_API_SECRET` não configurado no servidor |

## Seed inicial

Para popular o banco com dados de exemplo (coleções `posts` e `jogos`):

```bash
MONGODB_URI="mongodb+srv://..." npm run seed
```

## Fluxo recomendado para IA

1. `GET /api/posts?type=noticia` — verificar slugs existentes.
2. `POST /api/posts` — publicar com `isDraft: true` se quiser revisar antes.
3. `PATCH /api/posts/{id}` — ajustar texto ou `isDraft: false` para publicar.
4. `DELETE /api/posts/{id}` — remover conteúdo incorreto.

Após publicar, o item aparece na home (timeline) com ícone de notícia ou opinião conforme o `type`.

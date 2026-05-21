export const POST_TYPES = {
  NOTICIA: 'noticia',
  OPINIAO: 'opiniao',
};

export const POST_TYPE_VALUES = Object.values(POST_TYPES);

export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const POST_STATUS_VALUES = Object.values(POST_STATUS);

export const MEDIA_TYPES = ['text', 'video'];

export const COLLECTION_POSTS = 'posts';

/** Filtro MongoDB: apenas conteúdo visível no site público */
export const PUBLISHED_FILTER = {
  $or: [
    { status: POST_STATUS.PUBLISHED },
    { status: { $exists: false }, isDraft: { $ne: true } },
  ],
};

import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/db';
import {
  COLLECTION_POSTS,
  POST_STATUS,
  POST_TYPE_VALUES,
  PUBLISHED_FILTER,
} from '@/lib/posts/constants';
import { slugify } from '@/lib/posts/slug';
import { resolveStatus, statusFromDocument, StatusError } from '@/lib/posts/status';

function parseObjectId(id) {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

function stripPost(doc) {
  if (!doc) return null;
  const { isDraft: _isDraft, ...rest } = doc;
  return {
    ...rest,
    _id: String(doc._id),
    status: statusFromDocument(doc),
  };
}

function buildStatusFilter({ includeDrafts = false, status } = {}) {
  if (status) {
    return { status };
  }
  if (includeDrafts) {
    return {};
  }
  return { ...PUBLISHED_FILTER };
}

function baseFields(body) {
  const fields = {};
  if (body.title !== undefined) fields.title = String(body.title).trim();
  if (body.summary !== undefined) fields.summary = String(body.summary).trim();
  if (body.content !== undefined) fields.content = body.content;
  if (body.publishedAt !== undefined) {
    fields.publishedAt = new Date(body.publishedAt).toISOString();
  }
  if (body.status !== undefined || body.isDraft !== undefined) {
    fields.status = resolveStatus(body);
  }
  if (body.sourceName !== undefined) fields.sourceName = body.sourceName;
  if (body.sourceUrl !== undefined) fields.sourceUrl = body.sourceUrl;
  if (body.mediaType !== undefined) fields.mediaType = body.mediaType;
  if (body.videoUrl !== undefined) fields.videoUrl = body.videoUrl;
  return fields;
}

function validateType(type) {
  return POST_TYPE_VALUES.includes(type);
}

export async function listPosts({
  type,
  includeDrafts = false,
  status,
  limit = 100,
} = {}) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) return [];

  const filter = buildStatusFilter({ includeDrafts, status });
  if (type) filter.type = type;

  const docs = await collection
    .find(filter)
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map(stripPost);
}

export async function getPostById(id, { includeDrafts = false } = {}) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) return null;

  const objectId = parseObjectId(id);
  if (!objectId) return null;

  const filter = { _id: objectId };
  if (!includeDrafts) Object.assign(filter, PUBLISHED_FILTER);

  const doc = await collection.findOne(filter);
  return stripPost(doc);
}

export async function getPostBySlug(slug, type, { includeDrafts = false } = {}) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) return null;

  const filter = { slug, type };
  if (!includeDrafts) Object.assign(filter, PUBLISHED_FILTER);

  const doc = await collection.findOne(filter);
  return stripPost(doc);
}

export async function createPost(body) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) {
    throw new Error('MongoDB não configurado (MONGODB_URI ausente).');
  }

  const type = body.type;
  if (!validateType(type)) {
    throw new ValidationError('type deve ser "noticia" ou "opiniao".');
  }

  let status;
  try {
    status = resolveStatus(body, { defaultStatus: POST_STATUS.DRAFT });
  } catch (error) {
    if (error instanceof StatusError) throw new ValidationError(error.message);
    throw error;
  }

  const title = String(body.title || '').trim();
  if (!title) throw new ValidationError('title é obrigatório.');

  const slug = (body.slug ? slugify(body.slug) : slugify(title)) || slugify(`post-${Date.now()}`);
  const now = new Date().toISOString();

  const existing = await collection.findOne({ type, slug });
  if (existing) {
    throw new ValidationError(`slug "${slug}" já existe para type "${type}".`);
  }

  if (type === 'opiniao' && body.mediaType === 'video' && !body.videoUrl) {
    throw new ValidationError('videoUrl é obrigatório quando mediaType é "video".');
  }

  const doc = {
    type,
    slug,
    title,
    summary: String(body.summary || '').trim(),
    content: body.content || '',
    status,
    publishedAt: body.publishedAt
      ? new Date(body.publishedAt).toISOString()
      : now,
    createdAt: now,
    updatedAt: now,
  };

  if (type === 'noticia') {
    doc.sourceName = body.sourceName || 'Palmeiras Online';
    doc.sourceUrl = body.sourceUrl || '';
  }

  if (type === 'opiniao') {
    doc.mediaType = body.mediaType === 'video' ? 'video' : 'text';
    if (doc.mediaType === 'video') doc.videoUrl = body.videoUrl || '';
  }

  const result = await collection.insertOne(doc);
  return stripPost({ ...doc, _id: result.insertedId });
}

export async function updatePost(id, body) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) {
    throw new Error('MongoDB não configurado (MONGODB_URI ausente).');
  }

  const objectId = parseObjectId(id);
  if (!objectId) throw new ValidationError('id inválido.');

  const existing = await collection.findOne({ _id: objectId });
  if (!existing) return null;

  let updates;
  try {
    updates = baseFields(body);
  } catch (error) {
    if (error instanceof StatusError) throw new ValidationError(error.message);
    throw error;
  }
  updates.updatedAt = new Date().toISOString();

  if (body.slug !== undefined) {
    const slug = slugify(body.slug);
    if (!slug) throw new ValidationError('slug inválido.');
    const conflict = await collection.findOne({
      type: existing.type,
      slug,
      _id: { $ne: objectId },
    });
    if (conflict) {
      throw new ValidationError(`slug "${slug}" já existe para type "${existing.type}".`);
    }
    updates.slug = slug;
  }

  if (body.type !== undefined && body.type !== existing.type) {
    throw new ValidationError('type não pode ser alterado após criação.');
  }

  if (existing.type === 'opiniao' || body.mediaType === 'video') {
    const mediaType = body.mediaType ?? existing.mediaType;
    if (mediaType === 'video' && !(body.videoUrl ?? existing.videoUrl)) {
      throw new ValidationError('videoUrl é obrigatório quando mediaType é "video".');
    }
  }

  await collection.updateOne({ _id: objectId }, { $set: updates, $unset: { isDraft: '' } });
  const doc = await collection.findOne({ _id: objectId });
  return stripPost(doc);
}

export async function deletePost(id) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) {
    throw new Error('MongoDB não configurado (MONGODB_URI ausente).');
  }

  const objectId = parseObjectId(id);
  if (!objectId) throw new ValidationError('id inválido.');

  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount > 0;
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

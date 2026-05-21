import { POST_STATUS, POST_STATUS_VALUES } from '@/lib/posts/constants';

export function resolveStatus(input, { defaultStatus = POST_STATUS.DRAFT } = {}) {
  if (input?.status !== undefined) {
    const status = String(input.status).toLowerCase();
    if (!POST_STATUS_VALUES.includes(status)) {
      throw new StatusError(`status deve ser "${POST_STATUS.DRAFT}" ou "${POST_STATUS.PUBLISHED}".`);
    }
    return status;
  }

  if (input?.isDraft !== undefined) {
    return input.isDraft ? POST_STATUS.DRAFT : POST_STATUS.PUBLISHED;
  }

  return defaultStatus;
}

export function statusFromDocument(doc) {
  if (!doc) return POST_STATUS.DRAFT;
  if (doc.status && POST_STATUS_VALUES.includes(doc.status)) return doc.status;
  return doc.isDraft ? POST_STATUS.DRAFT : POST_STATUS.PUBLISHED;
}

export class StatusError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StatusError';
  }
}

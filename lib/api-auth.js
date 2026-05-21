import { timingSafeEqual } from 'crypto';

const HEADER_NAMES = ['authorization', 'x-api-token'];

export function getPostsApiSecret() {
  return process.env.POSTS_API_SECRET?.trim() || '';
}

function extractBearerToken(headerValue) {
  if (!headerValue) return '';
  const match = headerValue.match(/^Bearer\s+(.+)$/i);
  return (match ? match[1] : headerValue).trim();
}

export function getTokenFromRequest(request) {
  for (const name of HEADER_NAMES) {
    const value = request.headers.get(name);
    if (value) return extractBearerToken(value);
  }
  return '';
}

function safeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function isPostsApiAuthorized(request) {
  const secret = getPostsApiSecret();
  if (!secret || secret.length < 32) return false;
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return safeEqual(token, secret);
}

export function unauthorizedResponse() {
  return Response.json(
    { error: 'Unauthorized', message: 'Token inválido ou ausente.' },
    { status: 401 }
  );
}

export function misconfiguredResponse() {
  return Response.json(
    {
      error: 'ServiceUnavailable',
      message: 'POSTS_API_SECRET não configurado no ambiente (mínimo 32 caracteres).',
    },
    { status: 503 }
  );
}

export function requirePostsApiAuth(request) {
  if (!getPostsApiSecret()) return misconfiguredResponse();
  if (!isPostsApiAuthorized(request)) return unauthorizedResponse();
  return null;
}

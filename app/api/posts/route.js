import { requirePostsApiAuth } from '@/lib/api-auth';
import {
  createPost,
  listPosts,
  ValidationError,
} from '@/lib/posts/repository';

function jsonError(error, status = 500) {
  return Response.json(
    { error: error.name || 'Error', message: error.message },
    { status }
  );
}

export async function GET(request) {
  const authError = requirePostsApiAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || undefined;
  const status = searchParams.get('status') || undefined;
  const includeDrafts = searchParams.get('includeDrafts') === 'true';
  const limit = Math.min(Number(searchParams.get('limit')) || 100, 200);

  if (status && status !== 'draft' && status !== 'published') {
    return Response.json(
      { error: 'ValidationError', message: 'status deve ser "draft" ou "published".' },
      { status: 400 }
    );
  }

  try {
    const posts = await listPosts({ type, status, includeDrafts, limit });
    return Response.json({ posts, count: posts.length });
  } catch (error) {
    console.error('GET /api/posts', error);
    return jsonError(error);
  }
}

export async function POST(request) {
  const authError = requirePostsApiAuth(request);
  if (authError) return authError;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError(new ValidationError('JSON inválido no corpo da requisição.'), 400);
  }

  try {
    const post = await createPost(body);
    return Response.json({ post }, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error, 400);
    }
    console.error('POST /api/posts', error);
    return jsonError(error);
  }
}

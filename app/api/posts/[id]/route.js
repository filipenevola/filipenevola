import { requirePostsApiAuth } from '@/lib/api-auth';
import {
  deletePost,
  getPostById,
  updatePost,
  ValidationError,
} from '@/lib/posts/repository';

function jsonError(error, status = 500) {
  return Response.json(
    { error: error.name || 'Error', message: error.message },
    { status }
  );
}

export async function GET(request, { params }) {
  const authError = requirePostsApiAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const includeDrafts = new URL(request.url).searchParams.get('includeDrafts') === 'true';

  try {
    const post = await getPostById(id, { includeDrafts });
    if (!post) {
      return Response.json(
        { error: 'NotFound', message: 'Post não encontrado.' },
        { status: 404 }
      );
    }
    return Response.json({ post });
  } catch (error) {
    console.error('GET /api/posts/[id]', error);
    return jsonError(error);
  }
}

export async function PATCH(request, { params }) {
  const authError = requirePostsApiAuth(request);
  if (authError) return authError;

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError(new ValidationError('JSON inválido no corpo da requisição.'), 400);
  }

  try {
    const post = await updatePost(id, body);
    if (!post) {
      return Response.json(
        { error: 'NotFound', message: 'Post não encontrado.' },
        { status: 404 }
      );
    }
    return Response.json({ post });
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error, 400);
    }
    console.error('PATCH /api/posts/[id]', error);
    return jsonError(error);
  }
}

export async function DELETE(request, { params }) {
  const authError = requirePostsApiAuth(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    const deleted = await deletePost(id);
    if (!deleted) {
      return Response.json(
        { error: 'NotFound', message: 'Post não encontrado.' },
        { status: 404 }
      );
    }
    return Response.json({ deleted: true, id });
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error, 400);
    }
    console.error('DELETE /api/posts/[id]', error);
    return jsonError(error);
  }
}

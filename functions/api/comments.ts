interface Env {
  COMMENTS_DB: D1Database;
}

interface Comment {
  id: number;
  post_id: string;
  author_name: string;
  comment_text: string;
  created_at: string;
  parent_id: number | null;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const postId = url.searchParams.get('post_id');

  if (!postId) {
    return json({ error: 'post_id is required' }, 400);
  }

  const { results } = await context.env.COMMENTS_DB.prepare(
    'SELECT id, post_id, author_name, comment_text, created_at, parent_id FROM comments WHERE post_id = ? AND approved = 1 ORDER BY created_at ASC'
  )
    .bind(postId)
    .all<Comment>();

  return json({ comments: results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: {
    post_id?: string;
    author_name?: string;
    comment_text?: string;
    parent_id?: number | null;
    website?: string; // honeypot — real users never fill this
  };

  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { post_id, author_name, comment_text, parent_id, website } = body;

  // Honeypot tripped — silently pretend success so bots don't learn to adapt
  if (website) {
    return json({ ok: true });
  }

  if (!post_id || typeof post_id !== 'string') {
    return json({ error: 'post_id is required' }, 400);
  }
  if (!author_name || typeof author_name !== 'string' || author_name.trim().length < 1 || author_name.trim().length > 60) {
    return json({ error: 'Name must be between 1 and 60 characters' }, 400);
  }
  if (!comment_text || typeof comment_text !== 'string' || comment_text.trim().length < 3 || comment_text.trim().length > 2000) {
    return json({ error: 'Comment must be between 3 and 2000 characters' }, 400);
  }

  let parentId: number | null = null;
  if (parent_id !== undefined && parent_id !== null) {
    if (typeof parent_id !== 'number' || !Number.isInteger(parent_id) || parent_id <= 0) {
      return json({ error: 'Invalid parent_id' }, 400);
    }
    // Confirm the parent actually exists on this same post, and is itself a
    // top-level comment — replies only nest one level deep by design.
    const parent = await context.env.COMMENTS_DB.prepare(
      'SELECT id, parent_id FROM comments WHERE id = ? AND post_id = ? AND approved = 1'
    )
      .bind(parent_id, post_id)
      .first<{ id: number; parent_id: number | null }>();
    if (!parent) {
      return json({ error: 'Parent comment not found' }, 400);
    }
    parentId = parent.parent_id ?? parent.id; // re-parent a reply-to-a-reply onto the original top-level comment
  }

  const trimmedName = author_name.trim();
  const trimmedComment = comment_text.trim();

  const result = await context.env.COMMENTS_DB.prepare(
    'INSERT INTO comments (post_id, author_name, comment_text, approved, parent_id) VALUES (?, ?, ?, 1, ?) RETURNING id, post_id, author_name, comment_text, created_at, parent_id'
  )
    .bind(post_id, trimmedName, trimmedComment, parentId)
    .first<Comment>();

  return json({ comment: result }, 201);
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

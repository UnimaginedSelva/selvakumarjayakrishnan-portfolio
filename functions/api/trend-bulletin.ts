interface Env {
  COMMENTS_DB: D1Database;
}

interface BulletinItem {
  id: number;
  headline: string;
  summary: string;
  source_name: string;
  source_url: string;
  run_date: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const latest = await context.env.COMMENTS_DB.prepare(
    'SELECT run_date FROM bulletin_items ORDER BY run_date DESC LIMIT 1'
  ).first<{ run_date: string }>();

  if (!latest) {
    return json({ runDate: null, items: [] });
  }

  const { results } = await context.env.COMMENTS_DB.prepare(
    'SELECT id, headline, summary, source_name, source_url, run_date FROM bulletin_items WHERE run_date = ? ORDER BY id ASC'
  )
    .bind(latest.run_date)
    .all<BulletinItem>();

  return json({ runDate: latest.run_date, items: results ?? [] });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Let /api/* routes fall through to their specific functions
  if (url.pathname.startsWith('/api/')) {
    return context.next();
  }

  // For all other routes, serve index.html (SPA fallback)
  const indexUrl = new URL('/index.html', url.origin);
  return context.env.ASSETS.fetch(indexUrl.toString());
};

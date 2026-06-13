export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // Pass through API routes, static assets, and files with extensions
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.match(/\.\w+$/)
  ) {
    return context.next();
  }

  // For all navigation routes (no extension), serve index.html
  const indexUrl = new URL('/index.html', url.origin);
  return context.env.ASSETS.fetch(indexUrl.toString());
};

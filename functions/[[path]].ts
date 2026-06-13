export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Try to serve the real asset first
  const assetResponse = await context.env.ASSETS.fetch(context.request);

  // If found, return it
  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  // Not a real file — serve the root (index.html) so React Router handles the path
  const rootRequest = new Request(new URL('/', url.origin).toString(), {
    headers: context.request.headers,
  });
  const rootResponse = await context.env.ASSETS.fetch(rootRequest);

  // Return the HTML body but keep the original URL (don't follow redirects)
  return new Response(rootResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
};

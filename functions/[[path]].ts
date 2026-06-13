export const onRequest: PagesFunction = async (context) => {
  // Try to serve the real asset (JS, CSS, images, fonts, etc.)
  const assetResponse = await context.env.ASSETS.fetch(context.request);

  // If the asset exists, return it directly
  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  // Asset not found — this is a client-side route (e.g. /change-readiness)
  // Serve index.html so React Router can handle it
  const url = new URL(context.request.url);
  const indexRequest = new Request(new URL('/index.html', url.origin).toString());
  return context.env.ASSETS.fetch(indexRequest);
};

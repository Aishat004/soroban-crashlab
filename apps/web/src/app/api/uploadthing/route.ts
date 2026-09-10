import { createRouteHandler } from 'uploadthing/next';
import { crashlabFileRouter } from './core';

export const { GET, POST } = createRouteHandler({
  router: crashlabFileRouter,
});

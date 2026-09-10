import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';
import { isRedisConfigured, getRedis } from '@/lib/redis';

const f = createUploadthing();

export const crashlabFileRouter = {
  fuzzArtifact: f({
    blob: { maxFileSize: '32MB', maxFileCount: 1 },
  })
    .input(z.object({
      runId: z.string().optional(),
      artifactType: z.string().optional(),
    }))
    .middleware(async ({ input }) => {
      if (!isRedisConfigured()) {
        throw new UploadThingError('Storage not configured');
      }
      return { runId: input.runId, artifactType: input.artifactType ?? 'unknown' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const redis = getRedis();
      const artifactId = file.key;
      const artifactRecord = {
        id: artifactId,
        name: file.name,
        type: metadata.artifactType,
        size: file.size,
        updatedAt: new Date().toISOString(),
        runId: metadata.runId ?? null,
        utKey: file.key,
        utUrl: file.ufsUrl,
      };

      await redis.set(`artifact:${artifactId}`, JSON.stringify(artifactRecord));

      if (metadata.runId) {
        await redis.sadd(`artifact:run:${metadata.runId}`, artifactId);
      }
      await redis.sadd('artifact:index', artifactId);

      return { artifactId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type CrashlabFileRouter = typeof crashlabFileRouter;

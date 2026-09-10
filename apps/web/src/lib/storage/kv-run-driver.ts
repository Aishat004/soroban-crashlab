import { getRedis } from '@/lib/redis';
import type { FuzzingRun } from '@/app/types';
import type { RunListOptions, RunStorageDriver, StoredArtifact } from './run-driver';
import type { Artifact } from '@/app/types';

interface KVArtifactRecord {
  id: string;
  name: string;
  type: string;
  size: number;
  updatedAt: string;
  runId: string | null;
  utKey: string;
  utUrl: string;
}

export class KVRunDriver implements RunStorageDriver {
  readonly name = 'upstash-kv';

  async listRuns(options: RunListOptions = {}): Promise<{ runs: FuzzingRun[]; total: number }> {
    const redis = getRedis();
    const ids = await redis.smembers('run:index');

    const runs: FuzzingRun[] = [];
    for (const id of ids) {
      const raw = await redis.get(`run:${id}`);
      if (!raw) continue;
      const run: FuzzingRun = typeof raw === 'string' ? JSON.parse(raw) : (raw as FuzzingRun);
      if (options.status && run.status !== options.status) continue;
      runs.push(run);
    }

    runs.sort((a, b) => {
      const aTime = a.startedAt ?? a.queuedAt ?? '';
      const bTime = b.startedAt ?? b.queuedAt ?? '';
      return bTime.localeCompare(aTime);
    });

    const total = runs.length;
    const offset = Math.max(0, options.offset ?? 0);
    const limit = options.limit === undefined ? runs.length : Math.max(0, options.limit);

    return { runs: runs.slice(offset, offset + limit), total };
  }

  async getRun(id: string): Promise<FuzzingRun | null> {
    const redis = getRedis();
    const raw = await redis.get(`run:${id}`);
    if (!raw) return null;
    return typeof raw === 'string' ? JSON.parse(raw) : (raw as FuzzingRun);
  }

  async putRun(run: FuzzingRun): Promise<void> {
    const redis = getRedis();
    await redis.set(`run:${run.id}`, JSON.stringify(run));
    await redis.sadd('run:index', run.id);
  }

  async deleteRun(id: string): Promise<boolean> {
    const redis = getRedis();
    const existed = await redis.srem('run:index', id);
    await redis.del(`run:${id}`);

    const artifactIds = await redis.smembers(`artifact:run:${id}`);
    for (const aid of artifactIds) {
      await redis.del(`artifact:${aid}`);
      await redis.srem('artifact:index', aid);
    }
    await redis.del(`artifact:run:${id}`);

    return existed > 0;
  }

  async putArtifact(_runId: string, artifact: Artifact, _bytes: Uint8Array): Promise<Artifact> {
    const redis = getRedis();
    const existing = await redis.get(`artifact:${artifact.id}`);
    if (existing) {
      const record: KVArtifactRecord = typeof existing === 'string' ? JSON.parse(existing) : existing;
      const updated = { ...record, ...artifact };
      await redis.set(`artifact:${artifact.id}`, JSON.stringify(updated));
    } else {
      await redis.set(`artifact:${artifact.id}`, JSON.stringify(artifact));
      await redis.sadd('artifact:index', artifact.id);
    }
    return artifact;
  }

  async getArtifact(id: string): Promise<StoredArtifact | null> {
    const redis = getRedis();
    const raw = await redis.get(`artifact:${id}`);
    if (!raw) return null;
    const record: KVArtifactRecord = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const metadata: Artifact = {
      id: record.id,
      name: record.name,
      type: record.type as Artifact['type'],
      size: record.size,
      updatedAt: record.updatedAt,
      runId: record.runId ?? undefined,
    };
    return { metadata, bytes: new Uint8Array(0) };
  }

  async getArtifactUrl(id: string): Promise<string | null> {
    const redis = getRedis();
    const raw = await redis.get(`artifact:${id}`);
    if (!raw) return null;
    const record: KVArtifactRecord = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return record.utUrl ?? null;
  }
}

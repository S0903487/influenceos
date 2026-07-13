import type { AuthedRequest, Env } from '../types';
import { badRequest, generateId, json, notFound, nowIso, readJson } from '../utils';

interface InfluencerBody {
  fullName?: string;
  username?: string;
  platform?: string;
  category?: string;
  country?: string;
  language?: string;
  followers?: number;
  engagementRate?: number;
  averageViews?: number;
  averageLikes?: number;
  averageComments?: number;
  email?: string;
  phone?: string;
  pricePost?: number;
  priceStory?: number;
  verified?: boolean;
  brandSafe?: boolean;
  status?: string;
  notes?: string;
  tags?: string[];
  bio?: string;
  profileImage?: string;
}

function toApi(row: Record<string, unknown>) {
  return {
    id: row.id,
    organizationId: row.organization_id,
    fullName: row.full_name,
    username: row.username,
    platform: row.platform,
    category: row.category,
    country: row.country,
    language: row.language,
    followers: row.followers,
    engagementRate: row.engagement_rate,
    averageViews: row.average_views,
    averageLikes: row.average_likes,
    averageComments: row.average_comments,
    email: row.email,
    phone: row.phone,
    pricePost: row.price_post,
    priceStory: row.price_story,
    verified: !!row.verified,
    brandSafe: !!row.brand_safe,
    status: row.status,
    notes: row.notes,
    tags: row.tags ? JSON.parse(row.tags as string) : [],
    bio: row.bio,
    profileImage: row.profile_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function list(_request: Request, env: Env, auth: AuthedRequest): Promise<Response> {
  const { results } = await env.DB.prepare('SELECT * FROM influencers WHERE organization_id = ? ORDER BY created_at DESC')
    .bind(auth.organizationId)
    .all();
  return json(results.map(toApi));
}

export async function getById(_request: Request, env: Env, auth: AuthedRequest, id: string): Promise<Response> {
  const row = await env.DB.prepare('SELECT * FROM influencers WHERE id = ? AND organization_id = ?')
    .bind(id, auth.organizationId)
    .first();
  if (!row) return notFound();
  return json(toApi(row));
}

export async function create(request: Request, env: Env, auth: AuthedRequest): Promise<Response> {
  const body = await readJson<InfluencerBody>(request);
  if (!body.fullName) return badRequest('fullName is required');

  const id = generateId('inf');
  const now = nowIso();

  await env.DB.prepare(
    `INSERT INTO influencers (
      id, organization_id, full_name, username, platform, category, country, language,
      followers, engagement_rate, average_views, average_likes, average_comments,
      email, phone, price_post, price_story, verified, brand_safe, status, notes, tags, bio, profile_image,
      created_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  )
    .bind(
      id,
      auth.organizationId,
      body.fullName,
      body.username ?? null,
      body.platform ?? 'Instagram',
      body.category ?? null,
      body.country ?? null,
      body.language ?? null,
      body.followers ?? 0,
      body.engagementRate ?? 0,
      body.averageViews ?? 0,
      body.averageLikes ?? 0,
      body.averageComments ?? 0,
      body.email ?? null,
      body.phone ?? null,
      body.pricePost ?? null,
      body.priceStory ?? null,
      body.verified ? 1 : 0,
      body.brandSafe === false ? 0 : 1,
      body.status ?? 'Active',
      body.notes ?? null,
      body.tags ? JSON.stringify(body.tags) : null,
      body.bio ?? null,
      body.profileImage ?? null,
      now
    )
    .run();

  const row = await env.DB.prepare('SELECT * FROM influencers WHERE id = ?').bind(id).first();
  return json(toApi(row as Record<string, unknown>), 201);
}

const COLUMN_MAP: Record<keyof InfluencerBody, string> = {
  fullName: 'full_name',
  username: 'username',
  platform: 'platform',
  category: 'category',
  country: 'country',
  language: 'language',
  followers: 'followers',
  engagementRate: 'engagement_rate',
  averageViews: 'average_views',
  averageLikes: 'average_likes',
  averageComments: 'average_comments',
  email: 'email',
  phone: 'phone',
  pricePost: 'price_post',
  priceStory: 'price_story',
  verified: 'verified',
  brandSafe: 'brand_safe',
  status: 'status',
  notes: 'notes',
  tags: 'tags',
  bio: 'bio',
  profileImage: 'profile_image',
};

export async function update(request: Request, env: Env, auth: AuthedRequest, id: string): Promise<Response> {
  const existing = await env.DB.prepare('SELECT id FROM influencers WHERE id = ? AND organization_id = ?')
    .bind(id, auth.organizationId)
    .first();
  if (!existing) return notFound();

  const body = await readJson<InfluencerBody>(request);
  const sets: string[] = [];
  const values: unknown[] = [];

  for (const key of Object.keys(body) as (keyof InfluencerBody)[]) {
    const column = COLUMN_MAP[key];
    if (!column) continue;
    let value: unknown = body[key];
    if (key === 'verified' || key === 'brandSafe') value = value ? 1 : 0;
    if (key === 'tags') value = value ? JSON.stringify(value) : null;
    sets.push(`${column} = ?`);
    values.push(value);
  }

  if (sets.length === 0) return badRequest('No fields to update');

  sets.push('updated_at = ?');
  values.push(nowIso());
  values.push(id);

  await env.DB.prepare(`UPDATE influencers SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();

  const row = await env.DB.prepare('SELECT * FROM influencers WHERE id = ?').bind(id).first();
  return json(toApi(row as Record<string, unknown>));
}

export async function remove(_request: Request, env: Env, auth: AuthedRequest, id: string): Promise<Response> {
  const result = await env.DB.prepare('DELETE FROM influencers WHERE id = ? AND organization_id = ?')
    .bind(id, auth.organizationId)
    .run();
  if (!result.meta.changes) return notFound();
  return json({ success: true });
}

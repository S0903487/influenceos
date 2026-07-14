import { apiRequest } from '../../../lib/api';
import type { Influencer } from '../types';

export interface CreateInfluencerInput {
  fullName: string;
  username?: string;
  platform?: Influencer['platform'];
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
  status?: Influencer['status'];
  notes?: string;
  tags?: string[];
  bio?: string;
  profileImage?: string;
}

export type UpdateInfluencerInput = Partial<CreateInfluencerInput>;

export async function listInfluencers(): Promise<Influencer[]> {
  return apiRequest<Influencer[]>('/influencers', { method: 'GET' });
}

export async function createInfluencer(data: CreateInfluencerInput): Promise<Influencer> {
  return apiRequest<Influencer>('/influencers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateInfluencer(id: string, data: UpdateInfluencerInput): Promise<Influencer> {
  return apiRequest<Influencer>(`/influencers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteInfluencer(id: string): Promise<void> {
  await apiRequest<{ success: boolean }>(`/influencers/${id}`, { method: 'DELETE' });
}

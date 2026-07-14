import { z } from 'zod';

export const influencerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  username: z.string().optional(),
  platform: z.enum(['Instagram', 'TikTok', 'YouTube']).default('Instagram'),
  category: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  followers: z.number().int().nonnegative().default(0),
  engagementRate: z.number().nonnegative().default(0),
  averageViews: z.number().int().nonnegative().default(0),
  averageLikes: z.number().int().nonnegative().default(0),
  averageComments: z.number().int().nonnegative().default(0),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  pricePost: z.number().nonnegative().optional(),
  priceStory: z.number().nonnegative().optional(),
  verified: z.boolean().default(false),
  brandSafe: z.boolean().default(true),
  status: z.string().default('Active'),
  pipelineStatus: z.string().default('New'),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  bio: z.string().optional(),
  profileImage: z.string().url('Invalid profile image URL').optional().or(z.literal('')),
});

export const updateInfluencerSchema = influencerSchema.partial();

export const influencerNoteSchema = z.object({
  body: z.string().min(1, 'Note body is required'),
});

export const influencerTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required'),
});

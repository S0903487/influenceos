import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  contactEmail: z.string().email('Invalid contact email').optional().or(z.literal('')),
  industry: z.string().optional(),
  status: z.enum(['prospect', 'active']).default('prospect'),
});

export const updateClientSchema = clientSchema.partial();

import type { Campaign } from '../db/models'

export type CampaignRepository = {
  list: () => Promise<Campaign[]>
  getById: (id: string) => Promise<Campaign | null>
}

export const campaignRepository: CampaignRepository = {
  list: async () => [],
  getById: async () => null,
}

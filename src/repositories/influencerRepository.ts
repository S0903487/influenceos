import type { Influencer } from '../db/models'

export type InfluencerRepository = {
  list: () => Promise<Influencer[]>
  getById: (id: string) => Promise<Influencer | null>
}

export const influencerRepository: InfluencerRepository = {
  list: async () => [],
  getById: async () => null,
}

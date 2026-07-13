import type { Campaign, Client, Influencer, Organization } from '../db/models'
import { campaignRepository } from '../repositories/campaignRepository'
import { clientRepository } from '../repositories/clientRepository'
import { influencerRepository } from '../repositories/influencerRepository'
import { organizationRepository } from '../repositories/organizationRepository'

export type InfluenceService = {
  getOrganizations: () => Promise<Organization[]>
  getInfluencers: () => Promise<Influencer[]>
  getCampaigns: () => Promise<Campaign[]>
  getClients: () => Promise<Client[]>
}

export const influenceService: InfluenceService = {
  getOrganizations: async () => organizationRepository.list(),
  getInfluencers: async () => influencerRepository.list(),
  getCampaigns: async () => campaignRepository.list(),
  getClients: async () => clientRepository.list(),
}

import type { Organization } from '../db/models'

export type OrganizationRepository = {
  list: () => Promise<Organization[]>
  getById: (id: string) => Promise<Organization | null>
}

export const organizationRepository: OrganizationRepository = {
  list: async () => [],
  getById: async () => null,
}

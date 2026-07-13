import type { Client } from '../db/models'

export type ClientRepository = {
  list: () => Promise<Client[]>
  getById: (id: string) => Promise<Client | null>
}

export const clientRepository: ClientRepository = {
  list: async () => [],
  getById: async () => null,
}

export type Organization = {
  id: string
  name: string
  slug: string
  createdAt: string
}

export type Influencer = {
  id: string
  organizationId: string
  name: string
  handle: string
  platform: string
  followers: string
  engagement: string
  category: string
  country: string
  status: 'active' | 'review' | 'paused'
  profileImage: string
}

export type Campaign = {
  id: string
  organizationId: string
  name: string
  status: 'draft' | 'active' | 'completed'
}

export type Client = {
  id: string
  organizationId: string
  name: string
  industry: string
  status: 'active' | 'prospect'
}

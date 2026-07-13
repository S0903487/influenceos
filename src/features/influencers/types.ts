export type Platform = 'Instagram' | 'TikTok' | 'YouTube'

export type InfluencerStatus = 'Active' | 'Review' | 'Paused' | 'Booked'

export type Influencer = {
  id: string
  fullName: string
  username: string
  platform: Platform
  category: string
  country: string
  language: string
  followers: number
  engagementRate: number
  averageViews: number
  averageLikes: number
  averageComments: number
  email: string
  phone: string
  pricePost: number
  priceStory: number
  verified: boolean
  brandSafe: boolean
  status: InfluencerStatus
  notes: string
  tags: string[]
  profileImage: string
}

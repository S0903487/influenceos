import type { Influencer } from '../types'

const countries = ['Pakistan', 'India', 'UAE', 'UK', 'USA'] as const
const categories = ['Fashion', 'Beauty', 'Gaming', 'Fitness', 'Food', 'Travel', 'Technology', 'Finance', 'Education', 'Comedy', 'Lifestyle'] as const
const platforms = ['Instagram', 'TikTok', 'YouTube'] as const
const names = [
  'Amina',
  'Rohan',
  'Layla',
  'Nadia',
  'Mateo',
  'Sana',
  'Dev',
  'Mina',
  'Owen',
  'Jasmine',
  'Arjun',
  'Leah',
  'Hassan',
  'Ella',
  'Niko',
  'Priya',
  'Zara',
  'Chris',
  'Sofia',
  'Malik',
  'Danish',
  'Ibraheem',
  'Tara',
  'Adeel',
  'Neha',
  'Liam',
  'Sara',
  'Mila',
  'Noah',
]

const profileImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80',
]

export const mockInfluencers: Influencer[] = Array.from({ length: 100 }, (_, index) => {
  const platform = platforms[index % platforms.length]
  const category = categories[index % categories.length]
  const country = countries[index % countries.length]
  const name = names[index % names.length]
  const followerBase = 1000 + index * 48000
  const engagementRate = Number((3.2 + (index % 17) * 0.35 + (index % 3) * 0.1).toFixed(1))
  const averageViews = Math.round(followerBase * (0.18 + (index % 5) * 0.03))
  const averageLikes = Math.round(averageViews * (0.14 + (index % 6) * 0.01))
  const averageComments = Math.round(averageLikes * 0.025)

  return {
    id: `inf-${String(index + 1).padStart(3, '0')}`,
    fullName: `${name} ${['Khan', 'Ali', 'Rao', 'Patel', 'Brooks', 'Hughes', 'Nguyen', 'Reed', 'Sharma', 'Malik'][index % 10]}`,
    username: `@${name.toLowerCase()}${index + 1}`,
    platform,
    category,
    country,
    language: country === 'Pakistan' ? 'Urdu' : country === 'India' ? 'English' : country === 'UAE' ? 'Arabic' : 'English',
    followers: followerBase,
    engagementRate,
    averageViews,
    averageLikes,
    averageComments,
    email: `${name.toLowerCase()}${index + 1}@creatorstudio.app`,
    phone: `+${(index % 9) + 1} ${String(100 + index).slice(-3)} 555 ${String(1000 + index).slice(-4)}`,
    pricePost: 1800 + (index % 12) * 250,
    priceStory: 800 + (index % 10) * 120,
    verified: index % 3 !== 0,
    brandSafe: true,
    status: index % 5 === 0 ? 'Review' : index % 7 === 0 ? 'Paused' : 'Active',
    notes: `${category} creators with strong performance in ${country}.`,
    tags: [category.toLowerCase(), country.toLowerCase(), platform.toLowerCase()],
    profileImage: profileImages[index % profileImages.length],
  }
})

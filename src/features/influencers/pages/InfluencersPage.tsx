import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import PageShell from '../../../components/shared/PageShell'
import { AddInfluencerModal } from '../components/AddInfluencerModal'
import { InfluencerCard } from '../components/InfluencerCard'
import { InfluencerFilters } from '../components/InfluencerFilters'
import { InfluencerTable } from '../components/InfluencerTable'
import { mockInfluencers } from '../data/mockInfluencers'
import type { Influencer, Platform } from '../types'

function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>(mockInfluencers)
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState<'All' | Platform>('All')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'followers-desc' | 'followers-asc'>('followers-desc')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const visibleInfluencers = useMemo(() => {
    const filtered = influencers.filter((influencer) => {
      const haystack = `${influencer.fullName} ${influencer.username} ${influencer.category}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())
      const matchesPlatform = platform === 'All' || influencer.platform === platform
      const matchesCategory = category === 'All' || influencer.category === category

      return matchesQuery && matchesPlatform && matchesCategory
    })

    return filtered.sort((left, right) => {
      return sort === 'followers-desc' ? right.followers - left.followers : left.followers - right.followers
    })
  }, [category, influencers, platform, query, sort])

  const statsData = useMemo(() => {
    const totalInfluencers = influencers.length
    const instagramInfluencers = influencers.filter((item) => item.platform === 'Instagram').length
    const tikTokInfluencers = influencers.filter((item) => item.platform === 'TikTok').length
    const averageEngagement =
      influencers.length > 0
        ? (influencers.reduce((sum, item) => sum + item.engagementRate, 0) / influencers.length).toFixed(1)
        : '0.0'
    const totalReach = influencers.reduce((sum, item) => sum + item.followers, 0)
    const categoryCounts = influencers.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1
      return acc
    }, {})
    const topCategory = Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'Diverse'

    return [
      { label: 'Total Influencers', value: totalInfluencers.toLocaleString() },
      { label: 'Instagram Influencers', value: instagramInfluencers.toString() },
      { label: 'TikTok Influencers', value: tikTokInfluencers.toString() },
      { label: 'Average Engagement', value: `${averageEngagement}%` },
      { label: 'Total Reach', value: totalReach.toLocaleString() },
      { label: 'Top Category', value: topCategory },
    ]
  }, [influencers])

  const handleAddInfluencer = (nextInfluencer: Influencer) => {
    setInfluencers((current) => [nextInfluencer, ...current])
    setIsModalOpen(false)
  }

  return (
    <PageShell
      title="Influencer CRM"
      description="Manage creators, shortlist talent, and keep every relationship organized in one place."
      eyebrow="Creator operations"
      action="Mock data"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statsData.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Creator roster</h2>
              <p className="text-sm text-slate-400">Search, filter, and review your curated creator list.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Plus size={16} />
              Add Influencer
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex w-full items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 lg:max-w-md">
              <span className="text-slate-500">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or niche"
                className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <div className="w-full lg:max-w-xs">
              <InfluencerFilters
                platform={platform}
                category={category}
                sort={sort}
                onPlatformChange={setPlatform}
                onCategoryChange={setCategory}
                onSortChange={setSort}
              />
            </div>
          </div>

          <div className="mt-6 hidden lg:block">
            <InfluencerTable influencers={visibleInfluencers} />
          </div>

          <div className="mt-6 grid gap-4 lg:hidden">
            {visibleInfluencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        </div>
      </div>

      <AddInfluencerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddInfluencer} />
    </PageShell>
  )
}

export default InfluencersPage

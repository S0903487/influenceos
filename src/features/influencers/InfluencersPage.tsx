import { useMemo, useState } from 'react'
import PageShell from '../../components/shared/PageShell'
import InfluencerCard from './InfluencerCard'
import InfluencerFilters from './InfluencerFilters'
import InfluencerTable from './InfluencerTable'
import { influencers } from './mockData'

function InfluencersPage() {
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState('All')
  const [status, setStatus] = useState('All')

  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      const matchesQuery = `${influencer.name} ${influencer.handle} ${influencer.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesPlatform = platform === 'All' || influencer.platform === platform
      const matchesStatus = status === 'All' || influencer.status === status

      return matchesQuery && matchesPlatform && matchesStatus
    })
  }, [platform, query, status])

  return (
    <PageShell
      title="Influencer roster"
      description="Track creator performance, discover new opportunities, and keep every partnership in one elegant workspace."
      eyebrow="Creator operations"
      action="84 active"
    >
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <InfluencerFilters
          platform={platform}
          status={status}
          onPlatformChange={setPlatform}
          onStatusChange={setStatus}
        />

        <div className="space-y-6">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
            <span className="text-slate-500">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, handle, or niche"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <div className="hidden lg:block">
            <InfluencerTable influencers={filteredInfluencers} />
          </div>

          <div className="grid gap-4 lg:hidden">
            {filteredInfluencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default InfluencersPage

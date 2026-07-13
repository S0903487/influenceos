import type { Influencer } from '../types'

type InfluencerCardProps = {
  influencer: Influencer
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
      <div className="flex items-center gap-3">
        <img src={influencer.profileImage} alt={influencer.fullName} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-white">{influencer.fullName}</h3>
          <p className="text-sm text-slate-400">{influencer.username}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div>
          <p className="text-slate-500">Platform</p>
          <p>{influencer.platform}</p>
        </div>
        <div>
          <p className="text-slate-500">Followers</p>
          <p>{influencer.followers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Engagement</p>
          <p>{influencer.engagementRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-slate-500">Category</p>
          <p>{influencer.category}</p>
        </div>
      </div>
    </article>
  )
}

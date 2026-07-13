type Influencer = {
  id: string
  name: string
  handle: string
  platform: string
  followers: string
  engagement: string
  category: string
  country: string
  status: string
  profileImage: string
}

type InfluencerCardProps = {
  influencer: Influencer
}

function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
      <div className="flex items-center gap-3">
        <img src={influencer.profileImage} alt={influencer.name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <h2 className="font-semibold text-white">{influencer.name}</h2>
          <p className="text-sm text-slate-400">{influencer.handle}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div>
          <p className="text-slate-500">Platform</p>
          <p>{influencer.platform}</p>
        </div>
        <div>
          <p className="text-slate-500">Followers</p>
          <p>{influencer.followers}</p>
        </div>
        <div>
          <p className="text-slate-500">Engagement</p>
          <p>{influencer.engagement}</p>
        </div>
        <div>
          <p className="text-slate-500">Category</p>
          <p>{influencer.category}</p>
        </div>
        <div>
          <p className="text-slate-500">Country</p>
          <p>{influencer.country}</p>
        </div>
        <div>
          <p className="text-slate-500">Status</p>
          <p>{influencer.status}</p>
        </div>
      </div>
    </article>
  )
}

export default InfluencerCard

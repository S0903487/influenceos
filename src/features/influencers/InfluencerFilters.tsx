type InfluencerFiltersProps = {
  platform: string
  status: string
  onPlatformChange: (value: string) => void
  onStatusChange: (value: string) => void
}

function InfluencerFilters({
  platform,
  status,
  onPlatformChange,
  onStatusChange,
}: InfluencerFiltersProps) {
  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
      <h2 className="text-lg font-semibold text-white">Filters</h2>
      <div className="mt-4 space-y-4">
        <label className="block text-sm text-slate-400">
          <span className="mb-2 block">Platform</span>
          <select
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
          >
            <option>All</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>YouTube</option>
            <option>Twitter</option>
          </select>
        </label>

        <label className="block text-sm text-slate-400">
          <span className="mb-2 block">Status</span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
          >
            <option>All</option>
            <option>Active</option>
            <option>Review</option>
            <option>Paused</option>
          </select>
        </label>
      </div>
    </aside>
  )
}

export default InfluencerFilters

import type { Platform } from '../types'

type InfluencerFiltersProps = {
  platform: 'All' | Platform
  category: string
  sort: 'followers-desc' | 'followers-asc'
  onPlatformChange: (value: 'All' | Platform) => void
  onCategoryChange: (value: string) => void
  onSortChange: (value: 'followers-desc' | 'followers-asc') => void
}

export function InfluencerFilters({
  platform,
  category,
  sort,
  onPlatformChange,
  onCategoryChange,
  onSortChange,
}: InfluencerFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <label className="text-sm text-slate-400">
        <span className="mb-2 block">Platform</span>
        <select
          value={platform}
          onChange={(event) => onPlatformChange(event.target.value as 'All' | Platform)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
        >
          <option value="All">All</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
        </select>
      </label>

      <label className="text-sm text-slate-400">
        <span className="mb-2 block">Category</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
        >
          <option value="All">All</option>
          <option value="Fashion">Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Gaming">Gaming</option>
          <option value="Fitness">Fitness</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Comedy">Comedy</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </label>

      <label className="text-sm text-slate-400 sm:col-span-2 lg:col-span-1 xl:col-span-2">
        <span className="mb-2 block">Sort by followers</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as 'followers-desc' | 'followers-asc')}
          className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
        >
          <option value="followers-desc">Highest first</option>
          <option value="followers-asc">Lowest first</option>
        </select>
      </label>
    </div>
  )
}

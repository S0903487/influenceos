import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Influencer, Platform } from '../types'

type AddInfluencerModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (influencer: Influencer) => void
}

const defaultForm = {
  fullName: '',
  username: '',
  platform: 'Instagram' as Platform,
  category: 'Lifestyle',
  country: 'USA',
  language: 'English',
  email: '',
  phone: '',
  notes: '',
  status: 'Active' as Influencer['status'],
}

export function AddInfluencerModal({ isOpen, onClose, onAdd }: AddInfluencerModalProps) {
  const [form, setForm] = useState(defaultForm)

  const newInfluencer = useMemo<Influencer>(() => {
    const safeUsername = form.username.trim() || `@${form.fullName.replace(/\s+/g, '').toLowerCase()}`
    return {
      id: `new-${Date.now()}`,
      fullName: form.fullName.trim() || 'New Creator',
      username: safeUsername,
      platform: form.platform,
      category: form.category,
      country: form.country,
      language: form.language,
      followers: 25000,
      engagementRate: 5.8,
      averageViews: 42000,
      averageLikes: 1800,
      averageComments: 120,
      email: form.email.trim() || 'creator@influenceos.app',
      phone: form.phone.trim() || '+1 555 0100',
      pricePost: 2500,
      priceStory: 1200,
      verified: true,
      brandSafe: true,
      status: form.status,
      notes: form.notes.trim() || 'Added from the CRM workspace.',
      tags: ['New Lead'],
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    }
  }, [form])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd(newInfluencer)
    setForm(defaultForm)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Quick capture</p>
            <h2 className="text-xl font-semibold text-white">Add influencer</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-700 p-2 text-slate-300">
            <X size={16} />
          </button>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Full name</span>
            <input
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
              required
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Username</span>
            <input
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
              required
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Platform</span>
            <select
              value={form.platform}
              onChange={(event) => setForm((current) => ({ ...current, platform: event.target.value as Platform }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
            </select>
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Category</span>
            <input
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Country</span>
            <input
              value={form.country}
              onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Email</span>
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Status</span>
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as Influencer['status'] }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Review">Review</option>
              <option value="Paused">Paused</option>
              <option value="Booked">Booked</option>
            </select>
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Phone</span>
            <input
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400 md:col-span-2">
            <span className="mb-2 block">Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>

          <div className="flex justify-end gap-3 md:col-span-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">
              Save influencer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

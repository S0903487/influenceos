import { useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import type { ClientStatus, CreateClientInput } from '../types'

type AddClientModalProps = {
  isOpen: boolean
  isSubmitting: boolean
  errorMessage: string | null
  onClose: () => void
  onSubmit: (data: CreateClientInput) => void
}

const defaultForm: CreateClientInput = {
  name: '',
  contactEmail: '',
  industry: '',
  status: 'prospect',
}

export function AddClientModal({ isOpen, isSubmitting, errorMessage, onClose, onSubmit }: AddClientModalProps) {
  const [form, setForm] = useState<CreateClientInput>(defaultForm)

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">New account</p>
            <h2 className="text-xl font-semibold text-white">Add client</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-700 p-2 text-slate-300">
            <X size={16} />
          </button>
        </div>

        {errorMessage && (
          <p className="mt-4 rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300">{errorMessage}</p>
        )}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Client name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
              required
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Contact email</span>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Industry</span>
            <input
              value={form.industry}
              onChange={(event) => setForm((current) => ({ ...current, industry: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            />
          </label>
          <label className="text-sm text-slate-400">
            <span className="mb-2 block">Status</span>
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as ClientStatus }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="prospect">Prospect</option>
              <option value="active">Active</option>
            </select>
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
            >
              {isSubmitting ? 'Saving…' : 'Save client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

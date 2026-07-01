'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Star, Upload } from 'lucide-react'
import {
  MAX_FEATURED_VIDEOS,
  portfolioFilters,
  videoAspectRatioOptions,
  type PortfolioCategory,
  type PortfolioItem,
  type VideoAspectRatio,
} from '@/data/site'

const emptyForm = {
  title: '',
  subtitle: '',
  youtubeUrl: '',
  thumbnail: '',
  category: 'ai-trailers' as PortfolioCategory,
  duration: '',
  resolution: '4K',
  featured: false,
  aspectRatio: '16:9' as VideoAspectRatio,
}

const VideosAdmin = () => {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const featuredCount = items.filter((item) => item.featured).length

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/portfolio')
      const data = await response.json()
      setItems(data)
    } catch {
      setError('Failed to load videos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  const openCreate = () => {
    resetForm()
    setShowForm(true)
  }

  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      subtitle: item.subtitle,
      youtubeUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
      thumbnail: item.thumbnail || '',
      category: item.category,
      duration: item.duration === '—' ? '' : item.duration,
      resolution: item.resolution,
      featured: item.featured,
      aspectRatio: item.aspectRatio ?? '16:9',
    })
    setShowForm(true)
    setError(null)
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const body = new FormData()
      body.append('file', file)
      const response = await fetch('/api/portfolio/upload', { method: 'POST', body })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Upload failed')
      setForm((current) => ({ ...current, thumbnail: data.url }))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        ...form,
        duration: form.duration || '—',
      }

      const response = await fetch(editingId ? `/api/portfolio/${editingId}` : '/api/portfolio', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Save failed')

      await loadItems()
      resetForm()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this video?')) return

    const response = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      setError('Failed to delete video')
      return
    }
    await loadItems()
  }

  const toggleFeatured = async (item: PortfolioItem) => {
    const response = await fetch(`/api/portfolio/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !item.featured }),
    })

    const data = await response.json()
    if (!response.ok) {
      setError(data.error || 'Failed to update featured status')
      return
    }

    await loadItems()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Videos</h1>
          <p className="admin-page-subtitle">
            Manage ad creatives, thumbnails, and homepage featured videos ({featuredCount}/
            {MAX_FEATURED_VIDEOS} featured).
          </p>
        </div>
        <button type="button" onClick={openCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          Add Video
        </button>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card admin-form">
          <h2 className="admin-card-title">{editingId ? 'Edit Video' : 'New Video'}</h2>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Title</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            <label className="admin-field">
              <span>Category</span>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as PortfolioCategory })
                }
              >
                {portfolioFilters
                  .filter((filter) => filter.id !== 'all')
                  .map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.label}
                    </option>
                  ))}
              </select>
            </label>

            <label className="admin-field admin-field-full">
              <span>Description</span>
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Short description under the title"
              />
            </label>

            <label className="admin-field admin-field-full">
              <span>YouTube URL</span>
              <input
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </label>

            <label className="admin-field">
              <span>Duration</span>
              <input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="0:29"
              />
            </label>

            <label className="admin-field">
              <span>Resolution</span>
              <input
                value={form.resolution}
                onChange={(e) => setForm({ ...form, resolution: e.target.value })}
                placeholder="4K"
              />
            </label>

            <label className="admin-field">
              <span>Video Format</span>
              <select
                value={form.aspectRatio}
                onChange={(e) =>
                  setForm({ ...form, aspectRatio: e.target.value as VideoAspectRatio })
                }
              >
                {videoAspectRatioOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="admin-field admin-field-full">
              <span>Thumbnail</span>
              <div className="admin-upload-row">
                <label className="admin-upload-btn">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleUpload(file)
                    }}
                  />
                </label>
                {form.thumbnail ? (
                  <div className="admin-thumb-preview">
                    <Image src={form.thumbnail} alt="Thumbnail preview" fill className="object-cover" />
                  </div>
                ) : null}
              </div>
            </div>

            <label className="admin-checkbox admin-field-full">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span>Show on homepage (max {MAX_FEATURED_VIDEOS})</span>
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="button" onClick={resetForm} className="admin-btn admin-btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Video'}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        {loading ? (
          <p className="admin-empty">Loading videos...</p>
        ) : items.length === 0 ? (
          <p className="admin-empty">No videos yet. Add your first creative.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Video</th>
                  <th>Category</th>
                  <th>Homepage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-video-cell">
                        <div className="admin-video-thumb">
                          {item.thumbnail ? (
                            <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                          ) : (
                            <Image
                              src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="admin-video-title">{item.title}</p>
                          <p className="admin-video-subtitle">{item.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-tag">{item.badge}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => toggleFeatured(item)}
                        className={`admin-star-btn ${item.featured ? 'admin-star-btn-active' : ''}`}
                        aria-label={item.featured ? 'Remove from homepage' : 'Add to homepage'}
                      >
                        <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="admin-icon-btn"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="admin-icon-btn admin-icon-btn-danger"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideosAdmin

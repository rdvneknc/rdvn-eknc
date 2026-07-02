'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { GripVertical, ImagePlus, Plus, Pencil, Trash2, Star, Upload } from 'lucide-react'
import {
  isPromoVisualItem,
  MAX_FEATURED_VIDEOS,
  sortPortfolioByDisplayOrder,
  videoAspectRatioOptions,
  videoCategories,
  type PortfolioCategory,
  type PortfolioItem,
  type VideoAspectRatio,
} from '@/data/site'
import { reorderById } from '@/lib/reorder-items'

type FormMode = 'video' | 'promo'

const emptyVideoForm = {
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

const emptyPromoForm = {
  thumbnail: '',
  aspectRatio: '1:1' as VideoAspectRatio,
}

const VideosAdmin = () => {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<FormMode>('video')
  const [videoForm, setVideoForm] = useState(emptyVideoForm)
  const [promoForm, setPromoForm] = useState(emptyPromoForm)
  const [showForm, setShowForm] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [reordering, setReordering] = useState(false)

  const featuredCount = items.filter((item) => item.featured).length
  const sortedItems = useMemo(() => sortPortfolioByDisplayOrder(items), [items])

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
    setVideoForm(emptyVideoForm)
    setPromoForm(emptyPromoForm)
    setEditingId(null)
    setShowForm(false)
    setError(null)
    setFormMode('video')
  }

  const openCreateVideo = () => {
    resetForm()
    setFormMode('video')
    setShowForm(true)
  }

  const openCreatePromo = () => {
    resetForm()
    setFormMode('promo')
    setShowForm(true)
  }

  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id)
    setError(null)
    setShowForm(true)

    if (isPromoVisualItem(item)) {
      setFormMode('promo')
      setPromoForm({
        thumbnail: item.thumbnail || '',
        aspectRatio: item.aspectRatio ?? '1:1',
      })
      return
    }

    setFormMode('video')
    setVideoForm({
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
  }

  const handleUpload = async (file: File, target: FormMode) => {
    setUploading(true)
    setError(null)
    try {
      const body = new FormData()
      body.append('file', file)
      const response = await fetch('/api/portfolio/upload', { method: 'POST', body })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Upload failed')

      if (target === 'promo') {
        setPromoForm((current) => ({ ...current, thumbnail: data.url }))
      } else {
        setVideoForm((current) => ({ ...current, thumbnail: data.url }))
      }
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
      const payload =
        formMode === 'promo'
          ? {
              title: '',
              subtitle: '',
              youtubeUrl: '',
              thumbnail: promoForm.thumbnail,
              category: 'promo-visuals',
              duration: '—',
              resolution: '—',
              featured: false,
              aspectRatio: promoForm.aspectRatio,
            }
          : {
              ...videoForm,
              duration: videoForm.duration || '—',
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

  const handleDelete = async (item: PortfolioItem) => {
    const label = isPromoVisualItem(item) ? 'promo visual' : 'video'
    if (!window.confirm(`Delete this ${label}?`)) return

    const response = await fetch(`/api/portfolio/${item.id}`, { method: 'DELETE' })
    if (!response.ok) {
      setError('Failed to delete item')
      return
    }
    await loadItems()
  }

  const toggleFeatured = async (item: PortfolioItem) => {
    if (isPromoVisualItem(item)) return

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

  const persistOrder = async (orderedItems: PortfolioItem[]) => {
    setReordering(true)
    setError(null)

    const previousItems = items
    setItems(orderedItems)

    try {
      const response = await fetch('/api/portfolio/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: orderedItems.map((item) => item.id) }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to save order')
      setItems(data)
    } catch (reorderError) {
      setItems(previousItems)
      setError(reorderError instanceof Error ? reorderError.message : 'Failed to save order')
    } finally {
      setReordering(false)
      setDragId(null)
      setOverId(null)
    }
  }

  const handleDropOnItem = (targetId: string) => {
    if (!dragId || dragId === targetId || reordering) return
    const nextItems = reorderById(sortedItems, dragId, targetId)
    void persistOrder(nextItems)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Videos</h1>
          <p className="admin-page-subtitle">
            Manage ad creatives, thumbnails, and homepage featured videos ({featuredCount}/
            {MAX_FEATURED_VIDEOS} featured). Drag rows to change the order on the site.
          </p>
        </div>
        <div className="admin-header-actions">
          <button type="button" onClick={openCreatePromo} className="admin-btn admin-btn-ghost">
            <ImagePlus size={16} />
            Add Promo Visual
          </button>
          <button type="button" onClick={openCreateVideo} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            Add Video
          </button>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card admin-form">
          <h2 className="admin-card-title">
            {formMode === 'promo'
              ? editingId
                ? 'Edit Promo Visual'
                : 'New Promo Visual'
              : editingId
                ? 'Edit Video'
                : 'New Video'}
          </h2>

          {formMode === 'promo' ? (
            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Image Size</span>
                <select
                  value={promoForm.aspectRatio}
                  onChange={(e) =>
                    setPromoForm({
                      ...promoForm,
                      aspectRatio: e.target.value as VideoAspectRatio,
                    })
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
                <span>Image</span>
                <div className="admin-upload-row">
                  <label className="admin-upload-btn">
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      required={!promoForm.thumbnail}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleUpload(file, 'promo')
                      }}
                    />
                  </label>
                  {promoForm.thumbnail ? (
                    <div className="admin-thumb-preview admin-thumb-preview--promo">
                      <Image
                        src={promoForm.thumbnail}
                        alt="Promo visual preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Title</span>
                <input
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  required
                />
              </label>

              <label className="admin-field">
                <span>Category</span>
                <select
                  value={videoForm.category}
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, category: e.target.value as PortfolioCategory })
                  }
                >
                  {videoCategories.map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin-field admin-field-full">
                <span>Description</span>
                <input
                  value={videoForm.subtitle}
                  onChange={(e) => setVideoForm({ ...videoForm, subtitle: e.target.value })}
                  placeholder="Short description under the title"
                />
              </label>

              <label className="admin-field admin-field-full">
                <span>YouTube URL</span>
                <input
                  value={videoForm.youtubeUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </label>

              <label className="admin-field">
                <span>Duration</span>
                <input
                  value={videoForm.duration}
                  onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                  placeholder="0:29"
                />
              </label>

              <label className="admin-field">
                <span>Resolution</span>
                <input
                  value={videoForm.resolution}
                  onChange={(e) => setVideoForm({ ...videoForm, resolution: e.target.value })}
                  placeholder="4K"
                />
              </label>

              <label className="admin-field">
                <span>Video Format</span>
                <select
                  value={videoForm.aspectRatio}
                  onChange={(e) =>
                    setVideoForm({
                      ...videoForm,
                      aspectRatio: e.target.value as VideoAspectRatio,
                    })
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
                        if (file) handleUpload(file, 'video')
                      }}
                    />
                  </label>
                  {videoForm.thumbnail ? (
                    <div className="admin-thumb-preview">
                      <Image
                        src={videoForm.thumbnail}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <label className="admin-checkbox admin-field-full">
                <input
                  type="checkbox"
                  checked={videoForm.featured}
                  onChange={(e) => setVideoForm({ ...videoForm, featured: e.target.checked })}
                />
                <span>Show on homepage (max {MAX_FEATURED_VIDEOS})</span>
              </label>
            </div>
          )}

          <div className="admin-form-actions">
            <button type="button" onClick={resetForm} className="admin-btn admin-btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || (formMode === 'promo' && !promoForm.thumbnail)}
              className="admin-btn admin-btn-primary"
            >
              {saving
                ? 'Saving...'
                : editingId
                  ? 'Save Changes'
                  : formMode === 'promo'
                    ? 'Create Promo Visual'
                    : 'Create Video'}
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
                  <th className="admin-table-col-drag" aria-label="Reorder" />
                  <th>Item</th>
                  <th>Category</th>
                  <th>Homepage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item) => {
                  const isPromo = isPromoVisualItem(item)
                  const thumb =
                    item.thumbnail ??
                    (item.videoId
                      ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                      : '')
                  const isDragging = dragId === item.id
                  const isDropTarget = overId === item.id && dragId !== item.id

                  return (
                    <tr
                      key={item.id}
                      className={`admin-table-row ${isDragging ? 'admin-table-row--dragging' : ''} ${
                        isDropTarget ? 'admin-table-row--over' : ''
                      }`}
                      onDragOver={(event) => {
                        event.preventDefault()
                        if (dragId && dragId !== item.id) {
                          setOverId(item.id)
                        }
                      }}
                      onDragLeave={() => {
                        if (overId === item.id) setOverId(null)
                      }}
                      onDrop={(event) => {
                        event.preventDefault()
                        handleDropOnItem(item.id)
                      }}
                    >
                      <td className="admin-table-col-drag">
                        <div
                          role="button"
                          tabIndex={0}
                          className="admin-drag-handle"
                          draggable={!reordering}
                          aria-label="Drag to reorder"
                          onDragStart={() => setDragId(item.id)}
                          onDragEnd={() => {
                            setDragId(null)
                            setOverId(null)
                          }}
                        >
                          <GripVertical size={16} />
                        </div>
                      </td>
                      <td>
                        <div className="admin-video-cell">
                          <div
                            className={`admin-video-thumb ${isPromo ? 'admin-video-thumb--promo' : ''}`}
                          >
                            {thumb ? (
                              <Image src={thumb} alt={item.title || 'Promo visual'} fill className="object-cover" />
                            ) : null}
                          </div>
                          <div>
                            {isPromo ? (
                              <>
                                <p className="admin-video-title">Promo Visual</p>
                                <p className="admin-video-subtitle">
                                  {videoAspectRatioOptions.find((option) => option.value === item.aspectRatio)
                                    ?.label ?? item.aspectRatio}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="admin-video-title">{item.title}</p>
                                <p className="admin-video-subtitle">{item.subtitle}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-tag">{item.badge}</span>
                      </td>
                      <td>
                        {isPromo ? (
                          <span className="admin-muted">—</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleFeatured(item)}
                            className={`admin-star-btn ${item.featured ? 'admin-star-btn-active' : ''}`}
                            aria-label={item.featured ? 'Remove from homepage' : 'Add to homepage'}
                          >
                            <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
                          </button>
                        )}
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
                            onClick={() => handleDelete(item)}
                            className="admin-icon-btn admin-icon-btn-danger"
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideosAdmin

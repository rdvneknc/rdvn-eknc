'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Check, Reply } from 'lucide-react'
import type { ContactMessage } from '@/lib/db'

const MessagesAdmin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [saving, setSaving] = useState(false)

  const selected = messages.find((message) => message.id === selectedId) || null

  const loadMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
      if (!selectedId && data.length > 0) {
        setSelectedId(data[0].id)
        setReply(data[0].reply || '')
      }
    } catch {
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectMessage = (message: ContactMessage) => {
    setSelectedId(message.id)
    setReply(message.reply || '')
    if (!message.read) {
      fetch(`/api/messages/${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      }).then(() => loadMessages())
    }
  }

  const saveReply = async () => {
    if (!selected) return
    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/messages/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply, read: true }),
      })

      if (!response.ok) throw new Error('Failed to save reply')
      await loadMessages()
    } catch {
      setError('Failed to save reply')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return
    const response = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      setError('Failed to delete message')
      return
    }
    if (selectedId === id) {
      setSelectedId(null)
      setReply('')
    }
    await loadMessages()
  }

  const openMailto = () => {
    if (!selected) return
    const body = reply
      ? `${reply}\n\n---\nOriginal message:\n${selected.message}`
      : selected.message
    window.location.href = `mailto:${selected.email}?subject=${encodeURIComponent(
      `Re: ${selected.subject || 'Your message'}`
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Messages</h1>
          <p className="admin-page-subtitle">
            Contact form submissions from your website. Read, reply, and track conversations.
          </p>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <div className="admin-messages-layout">
        <div className="admin-card admin-messages-list">
          {loading ? (
            <p className="admin-empty">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="admin-empty">No messages yet.</p>
          ) : (
            messages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => selectMessage(message)}
                className={`admin-message-item ${
                  selectedId === message.id ? 'admin-message-item-active' : ''
                } ${!message.read ? 'admin-message-item-unread' : ''}`}
              >
                <div className="admin-message-item-top">
                  <strong>
                    {message.firstName} {message.lastName}
                  </strong>
                  <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{message.subject || 'No subject'}</p>
                <span className="admin-message-preview">{message.message}</span>
              </button>
            ))
          )}
        </div>

        <div className="admin-card admin-message-detail">
          {selected ? (
            <>
              <div className="admin-message-detail-header">
                <div>
                  <h2>
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <a href={`mailto:${selected.email}`} className="admin-message-email">
                    <Mail size={14} />
                    {selected.email}
                  </a>
                </div>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    onClick={() =>
                      fetch(`/api/messages/${selected.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ read: true }),
                      }).then(() => loadMessages())
                    }
                    className="admin-icon-btn"
                    aria-label="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selected.id)}
                    className="admin-icon-btn admin-icon-btn-danger"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="admin-message-meta">
                <span>{selected.subject || 'No subject'}</span>
                <span>{new Date(selected.createdAt).toLocaleString()}</span>
              </div>

              <div className="admin-message-body">{selected.message}</div>

              <label className="admin-field admin-field-full">
                <span>Your Reply</span>
                <textarea
                  rows={6}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply here. Save it in the panel or open your email client to send."
                />
              </label>

              <div className="admin-form-actions">
                <button type="button" onClick={saveReply} disabled={saving} className="admin-btn admin-btn-primary">
                  <Reply size={16} />
                  {saving ? 'Saving...' : 'Save Reply'}
                </button>
                <button type="button" onClick={openMailto} className="admin-btn admin-btn-ghost">
                  Open in Email
                </button>
              </div>

              {selected.reply && selected.repliedAt ? (
                <p className="admin-reply-note">
                  Last saved reply: {new Date(selected.repliedAt).toLocaleString()}
                </p>
              ) : null}
            </>
          ) : (
            <p className="admin-empty">Select a message to read and reply.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessagesAdmin

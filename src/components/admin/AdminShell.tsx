'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Film, LogOut, Mail, ExternalLink } from 'lucide-react'

interface AdminShellProps {
  children: React.ReactNode
  unreadCount?: number
}

const AdminShell = ({ children, unreadCount = 0 }: AdminShellProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin/videos', label: 'Videos', icon: Film },
    { href: '/admin/messages', label: 'Messages', icon: Mail, badge: unreadCount },
  ]

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <p className="admin-sidebar-label">Admin Panel</p>
          <h1 className="admin-sidebar-title">Ridvan Ekinci</h1>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${active ? 'admin-nav-link-active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge ? <span className="admin-nav-badge">{item.badge}</span> : null}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-footer-link" target="_blank">
            <ExternalLink size={16} />
            View Site
          </Link>
          <button type="button" onClick={handleLogout} className="admin-footer-link">
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  )
}

export default AdminShell

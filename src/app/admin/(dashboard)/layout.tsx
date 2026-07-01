import AdminShell from '@/components/admin/AdminShell'
import { getUnreadCount } from '@/lib/messages'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const unreadCount = await getUnreadCount()

  return <AdminShell unreadCount={unreadCount}>{children}</AdminShell>
}

import { AuthProvider } from '@/contexts/auth-context'
import { DashboardSidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <main className="lg:pl-72">
          <div className="p-6 pt-16 lg:pt-6">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}

'use client'

import { WelcomeSection, StatsCards, ProgressSection, AchievementsSection } from '@/components/dashboard/stats'
import { RecentLessons } from '@/components/dashboard/recent-lessons'
import { DailyGoals } from '@/components/dashboard/daily-goals'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <WelcomeSection />
      <StatsCards />
      <ProgressSection />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLessons />
        </div>
        <div>
          <DailyGoals />
        </div>
      </div>
      <AchievementsSection />
    </div>
  )
}

import { DashboardLayout } from "@/components/dashboard-layout"
import { ForksDashboard } from "@/components/forks-dashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <ForksDashboard />
    </DashboardLayout>
  )
}

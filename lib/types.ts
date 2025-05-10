export type ForkStatus = "launched" | "scheduled" | "unscheduled"

export interface Fork {
  id: string
  name: string
  description: string
  chain: string
  status: ForkStatus
  stablecoin: string
  governanceToken: string | null
  website: string
  docs: string
  launchDate?: string
}

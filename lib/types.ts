export type ForkStatus = "launched" | "scheduled" | "unscheduled"

export interface ChainConfig {
  chain: string
  collaterals: string[]
}

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
  twitter?: string
  logoUrl?: string
  launchDate?: string
  hidden?: boolean
  // New rewards property
  rewards?: {
    title: string
    url: string
  }
  // Existing fields for expanded card
  collaterals?: string[]
  longDescription?: string
  liquidationReserve?: string
  minimumDebt?: string
  borrowingFee?: string
  redemptionFee?: string
  multiChain?: {
    chains: ChainConfig[]
    defaultChain: string
  }
}

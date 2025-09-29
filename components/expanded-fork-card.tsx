"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { XIcon } from "@/components/icons/x-icon"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { Fork } from "@/lib/types"

interface ExpandedForkCardProps {
  fork: Fork
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedChain?: string
  onChainChange?: (string) => void
}

export function ExpandedForkCard({ fork, open, onOpenChange, selectedChain, onChainChange }: ExpandedForkCardProps) {
  const statusColor = {
    launched: "bg-green-500/10 text-green-700 hover:bg-green-500/20",
    scheduled: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    unscheduled: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
  }

  const getCurrentChainConfig = () => {
    if (!fork.multiChain) return { chain: fork.chain, collaterals: fork.collaterals || [] }

    const currentChain = selectedChain || fork.multiChain.defaultChain
    const chainConfig = fork.multiChain.chains.find((c) => c.chain === currentChain)
    return chainConfig || fork.multiChain.chains[0]
  }

  const currentConfig = getCurrentChainConfig()

  const getDisplayStatus = () => {
    if (fork.multiChain) {
      const currentChain = selectedChain || fork.multiChain.defaultChain
      const chainConfig = fork.multiChain.chains.find((c) => c.chain === currentChain)
      return chainConfig?.status || fork.status
    }
    return fork.status
  }

  const displayStatus = getDisplayStatus()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 p-6">
          <DialogHeader className="pb-2 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={`font-normal text-xs h-6 ${statusColor[displayStatus]}`}>
                <span className="ml-1">{displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}</span>
              </Badge>
              <div className="flex gap-2">
                {fork.rewards && (
                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 text-purple-800 hover:bg-purple-500/20 text-xs h-6 cursor-pointer"
                    onClick={() => window.open(fork.rewards?.url, "_blank")}
                  >
                    <span>{fork.rewards.title}</span>
                  </Badge>
                )}
                {fork.multiChain ? (
                  <div className="flex bg-muted rounded-md p-0.5">
                    {fork.multiChain.chains.map((chainConfig) => (
                      <Button
                        key={chainConfig.chain}
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-3 text-xs rounded-sm ${
                          (selectedChain || fork.multiChain.defaultChain) === chainConfig.chain
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => onChainChange && onChainChange(chainConfig.chain)}
                      >
                        {chainConfig.chain}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs h-6">
                    {fork.chain}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={fork.logoUrl || "/placeholder.svg?height=48&width=48&query=Protocol%20Logo"}
                  alt={`${fork.name} logo`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <DialogTitle className="text-xl">{fork.name}</DialogTitle>
            </div>
            <DialogDescription className="text-sm">{fork.longDescription || fork.description}</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Stablecoin</h3>
                <p className="text-base font-medium">{fork.stablecoin || "–"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Governance Token</h3>
                <p className="text-base font-medium">{fork.governanceToken || "–"}</p>
              </div>
            </div>

            {currentConfig.collaterals && currentConfig.collaterals.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground/70 mb-2">
                  Supported Collaterals {fork.multiChain && `(${currentConfig.chain})`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentConfig.collaterals.map((collateral) => (
                    <Badge key={collateral} variant="secondary">
                      {collateral}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {fork.minimumDebt && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Minimum Debt</h3>
                  <p className="text-sm">{fork.minimumDebt}</p>
                </div>
              )}
              {fork.liquidationReserve && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Liquidation Reserve</h3>
                  <p className="text-sm">{fork.liquidationReserve}</p>
                </div>
              )}
              {fork.borrowingFee && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Borrowing Fee</h3>
                  <p className="text-sm">{fork.borrowingFee}</p>
                </div>
              )}
              {fork.redemptionFee && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Redemption Fee</h3>
                  <p className="text-sm">{fork.redemptionFee}</p>
                </div>
              )}
              {displayStatus === "scheduled" && fork.launchDate && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Launch Date</h3>
                  <p className="text-sm">{fork.launchDate}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-wrap gap-3">
            {fork.website && (
              <Button asChild>
                <Link href={fork.website} target="_blank" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Link>
              </Button>
            )}
            {fork.docs && (
              <Button variant="outline" asChild>
                <Link href={fork.docs} target="_blank" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </Button>
            )}
            {fork.rewards && (
              <Button
                variant="outline"
                className="bg-purple-500/10 text-purple-800 hover:bg-purple-500/20 border-purple-500/20"
                asChild
              >
                <Link href={fork.rewards.url} target="_blank">
                  {fork.rewards.title}
                </Link>
              </Button>
            )}
            {fork.twitter && (
              <Button variant="outline" size="icon" asChild>
                <Link href={fork.twitter} target="_blank">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

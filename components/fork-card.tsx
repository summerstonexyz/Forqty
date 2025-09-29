"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Check, Clock, ExternalLink, CalendarPlus, Maximize2, Layers } from "lucide-react"
import { XIcon } from "@/components/icons/x-icon"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, createGoogleCalendarUrl } from "@/lib/utils"
import type { Fork } from "@/lib/types"
import { ExpandedForkCard } from "./expanded-fork-card"

export function ForkCard({ fork }: { fork: Fork }) {
  const [expandedOpen, setExpandedOpen] = useState(false)
  const [selectedChain, setSelectedChain] = useState(fork.multiChain ? fork.multiChain.defaultChain : fork.chain)

  const getCurrentChainConfig = () => {
    if (!fork.multiChain) return { chain: fork.chain, collaterals: fork.collaterals || [] }

    const chainConfig = fork.multiChain.chains.find((c) => c.chain === selectedChain)
    return chainConfig || fork.multiChain.chains[0]
  }

  const currentConfig = getCurrentChainConfig()

  const getDisplayStatus = () => {
    if (fork.multiChain) {
      const chainConfig = fork.multiChain.chains.find((c) => c.chain === selectedChain)
      return chainConfig?.status || fork.status
    }
    return fork.status
  }

  const displayStatus = getDisplayStatus()

  const statusIcon = {
    launched: <Check className="h-3 w-3 md:h-4 md:w-4 text-green-700" />,
    scheduled: <Calendar className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />,
    unscheduled: <Clock className="h-3 w-3 md:h-4 md:w-4 text-yellow-600" />,
  }

  const statusText = {
    launched: "Launched",
    scheduled: "Scheduled",
    unscheduled: "Unscheduled",
  }

  const statusColor = {
    launched: "bg-green-500/10 text-green-700 hover:bg-green-500/20",
    scheduled: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    unscheduled: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
  }

  // Check if the launch date is a specific date (not just "Coming soon" or similar)
  // Only show calendar option for scheduled forks (not launched ones)
  const hasSpecificLaunchDate =
    fork.status === "scheduled" &&
    fork.launchDate &&
    !fork.launchDate.toLowerCase().includes("soon") &&
    !fork.launchDate.toLowerCase().includes("coming")

  // Create Google Calendar URL if there's a specific launch date
  const calendarUrl = hasSpecificLaunchDate
    ? createGoogleCalendarUrl({
        title: `${fork.name} Launch`,
        description: `${fork.name} (${fork.stablecoin}) launches on ${fork.chain}. Visit ${fork.website} for more information.`,
        location: fork.website,
        startDate: fork.launchDate!, // Use the actual launch date from the fork data
      })
    : null

  // Check if the fork has collaterals
  const hasCollaterals = currentConfig.collaterals && currentConfig.collaterals.length > 0
  const collateralCount = hasCollaterals ? currentConfig.collaterals.length : 0

  return (
    <>
      <Card className="flex flex-col h-[280px] md:h-[300px] overflow-hidden">
        <CardHeader className="pb-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn("font-normal text-[10px] md:text-xs h-5 md:h-6", statusColor[displayStatus])}
            >
              {statusIcon[displayStatus]}
              <span className="ml-1">{statusText[displayStatus]}</span>
            </Badge>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 md:h-6 md:w-6 rounded-full"
                      onClick={() => setExpandedOpen(true)}
                    >
                      <Maximize2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">View details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {fork.multiChain ? (
                <div className="flex bg-muted rounded-md p-0.5">
                  {fork.multiChain.chains.map((chainConfig) => (
                    <Button
                      key={chainConfig.chain}
                      variant="ghost"
                      size="sm"
                      className={`h-5 md:h-6 px-2 text-[10px] md:text-xs rounded-sm ${
                        selectedChain === chainConfig.chain
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setSelectedChain(chainConfig.chain)}
                    >
                      {chainConfig.chain}
                    </Button>
                  ))}
                </div>
              ) : (
                <Badge variant="outline" className="text-[10px] md:text-xs h-5 md:h-6">
                  {fork.chain}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <Image
                  src={fork.logoUrl || "/placeholder.svg?height=40&width=40&query=Protocol%20Logo"}
                  alt={`${fork.name} logo`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <CardTitle className="text-base md:text-lg">{fork.name}</CardTitle>
            </div>
            {fork.rewards && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="bg-purple-500/10 text-purple-800 hover:bg-purple-500/20 text-[10px] md:text-xs h-5 md:h-6 cursor-pointer"
                      onClick={() => window.open(fork.rewards?.url, "_blank")}
                    >
                      <span>{fork.rewards.title}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Learn about {fork.name}'s rewards program</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <CardDescription className="text-xs md:text-sm line-clamp-2">{fork.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="grid gap-3 md:gap-4 h-full">
            {/* First row: Stablecoin and Governance Token */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Left column: Stablecoin */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground md:text-xs">Stablecoin</p>
                <p className="text-xs font-medium md:text-sm">{fork.stablecoin || "–"}</p>
              </div>

              {/* Right column: Governance Token */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground md:text-xs">Governance Token</p>
                <p className="text-xs font-medium md:text-sm">{fork.governanceToken || "–"}</p>
              </div>
            </div>

            {/* Second row: Collaterals and Rewards/Launch Date */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Left column: Collaterals */}
              <div>
                <p className="text-[10px] font-medium text-foreground/70 md:text-xs">Collaterals</p>
                {hasCollaterals ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setExpandedOpen(true)}
                          className="flex items-center text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors md:text-sm h-6 py-1"
                          aria-label={`View ${collateralCount} supported collaterals`}
                        >
                          <Layers className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />
                          <span>{collateralCount}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">View {collateralCount} supported collaterals</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="text-xs font-medium md:text-sm">-</p>
                )}
              </div>

              {/* Right column: Rewards or Launch Date */}
              <div>
                {fork.status === "scheduled" && fork.launchDate ? (
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground md:text-xs">Launch Date</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium md:text-sm">{fork.launchDate}</p>
                      {hasSpecificLaunchDate && calendarUrl && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={calendarUrl} target="_blank" className="inline-flex">
                                <CalendarPlus className="h-3.5 w-3.5 text-blue-500 hover:text-blue-600 transition-colors" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Add to Google Calendar</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <div className="mt-auto">
          <Separator />
          <CardFooter className="pt-3 md:pt-4 flex justify-between gap-2 min-h-[44px] md:min-h-[48px]">
            {fork.website && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2 md:h-8 hover:bg-background/80 transition-colors flex-1"
                      asChild
                    >
                      <Link href={fork.website} target="_blank" className="flex items-center justify-center">
                        <ExternalLink className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
                        <span>Website</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Visit {fork.name} website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {fork.twitter && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2 md:h-8 hover:bg-background/80 transition-colors flex-1"
                      asChild
                    >
                      <Link href={fork.twitter} target="_blank" className="flex items-center justify-center">
                        <XIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span className="sr-only">X (Twitter)</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Follow on X (Twitter)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {fork.docs && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2 md:h-8 hover:bg-background/80 transition-colors flex-1"
                      asChild
                    >
                      <Link href={fork.docs} target="_blank" className="flex items-center justify-center">
                        <ExternalLink className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
                        <span>Docs</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">View documentation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardFooter>
        </div>
      </Card>

      <ExpandedForkCard
        fork={fork}
        open={expandedOpen}
        onOpenChange={setExpandedOpen}
        selectedChain={selectedChain}
        onChainChange={setSelectedChain}
      />
    </>
  )
}

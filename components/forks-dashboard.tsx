"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ChevronDown, Filter, Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForkCard } from "@/components/fork-card"
import { forksData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ForksDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chainFilter, setChainFilter] = useState<string[]>([])

  // Filter out hidden forks
  const visibleForks = forksData.filter((fork) => !fork.hidden)

  const chains = [...new Set(visibleForks.map((fork) => fork.chain))]

  const filteredForks = visibleForks.filter((fork) => {
    const matchesSearch =
      fork.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fork.stablecoin.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChain = chainFilter.length === 0 || chainFilter.includes(fork.chain)
    return matchesSearch && matchesChain
  })

  const launchedForks = filteredForks.filter((fork) => fork.status === "launched")
  const scheduledForks = filteredForks.filter((fork) => fork.status === "scheduled")
  const unscheduledForks = filteredForks.filter((fork) => fork.status === "unscheduled")

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 md:text-3xl">
            <Image
              src="/liquity-fork-logo.png"
              alt="Forqty Logo"
              width={28}
              height={28}
              className="rounded-full md:h-8 md:w-8"
            />
            Forqty
          </h1>
          <p className="text-sm text-muted-foreground">Track all Liquity V2 forks across different blockchains</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="h-8 text-xs w-full md:w-auto" asChild>
            <Link href="https://docs.liquity.org/v2-documentation/friendly-fork-program" target="_blank">
              <ArrowUpRight className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              Fork Program
            </Link>
          </Button>
        </div>
      </div>

      {/* Liquity Information Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-lg md:text-xl">About Liquity V2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs md:text-sm">
            Liquity v2 is a decentralized borrowing protocol that lets users deposit ETH or LSTs as collateral, and mint
            the stablecoin BOLD. Liquity V2 is published under a Business Source License (BUSL), which means that while
            the codebase is source available, any commercial deployment needs to be approved by Liquity AG.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs px-3 md:h-8 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
            asChild
          >
            <Link href="https://liquity.org" target="_blank" className="flex items-center">
              <ExternalLink className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
              <span>Visit Liquity</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs px-3 md:h-8 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
            asChild
          >
            <Link href="https://docs.liquity.org" target="_blank" className="flex items-center">
              <ExternalLink className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
              <span>Documentation</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground md:h-4 md:w-4" />
            <Input
              type="search"
              placeholder="Search forks..."
              className="pl-8 h-9 text-sm md:h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto h-9 text-sm md:h-10">
              <Filter className="mr-1 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" />
              Filter
              <ChevronDown className="ml-1 h-3.5 w-3.5 md:ml-2 md:h-4 md:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2 font-medium text-sm">Chains</div>
            {chains.map((chain) => (
              <DropdownMenuCheckboxItem
                key={chain}
                checked={chainFilter.includes(chain)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setChainFilter([...chainFilter, chain])
                  } else {
                    setChainFilter(chainFilter.filter((c) => c !== chain))
                  }
                }}
                className="text-sm"
              >
                {chain}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-3 md:gap-4">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="h-9 w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All Forks
              </TabsTrigger>
              <TabsTrigger value="launched" className="text-xs md:text-sm">
                Launched
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="text-xs md:text-sm">
                Scheduled
              </TabsTrigger>
              <TabsTrigger value="unscheduled" className="text-xs md:text-sm">
                Unscheduled
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-1 text-xs text-muted-foreground md:text-sm">
              <span>Total:</span>
              <span className="font-medium">{filteredForks.length} forks</span>
            </div>
          </div>

          <TabsContent value="all" className="mt-3 md:mt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {filteredForks.map((fork) => (
                <ForkCard key={fork.id} fork={fork} />
              ))}
              {filteredForks.length === 0 && (
                <div className="col-span-full flex h-[150px] md:h-[200px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-xs font-medium md:text-sm">No forks found</p>
                    <p className="text-[10px] text-muted-foreground md:text-xs">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="launched" className="mt-3 md:mt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {launchedForks.map((fork) => (
                <ForkCard key={fork.id} fork={fork} />
              ))}
              {launchedForks.length === 0 && (
                <div className="col-span-full flex h-[150px] md:h-[200px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-xs font-medium md:text-sm">No launched forks found</p>
                    <p className="text-[10px] text-muted-foreground md:text-xs">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-3 md:mt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {scheduledForks.map((fork) => (
                <ForkCard key={fork.id} fork={fork} />
              ))}
              {scheduledForks.length === 0 && (
                <div className="col-span-full flex h-[150px] md:h-[200px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-xs font-medium md:text-sm">No scheduled forks found</p>
                    <p className="text-[10px] text-muted-foreground md:text-xs">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unscheduled" className="mt-3 md:mt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {unscheduledForks.map((fork) => (
                <ForkCard key={fork.id} fork={fork} />
              ))}
              {unscheduledForks.length === 0 && (
                <div className="col-span-full flex h-[150px] md:h-[200px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-xs font-medium md:text-sm">No unscheduled forks found</p>
                    <p className="text-[10px] text-muted-foreground md:text-xs">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

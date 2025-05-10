import Link from "next/link"
import { Calendar, Check, Clock, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Fork } from "@/lib/types"

export function ForkCard({ fork }: { fork: Fork }) {
  const statusIcon = {
    launched: <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500" />,
    scheduled: <Calendar className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />,
    unscheduled: <Clock className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />,
  }

  const statusText = {
    launched: "Launched",
    scheduled: "Scheduled",
    unscheduled: "Unscheduled",
  }

  const statusColor = {
    launched: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    scheduled: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    unscheduled: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  }

  return (
    <Card className="flex flex-col h-[280px] md:h-[300px] overflow-hidden">
      <CardHeader className="pb-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn("font-normal text-[10px] md:text-xs h-5 md:h-6", statusColor[fork.status])}
          >
            {statusIcon[fork.status]}
            <span className="ml-1">{statusText[fork.status]}</span>
          </Badge>
          <Badge variant="outline" className="text-[10px] md:text-xs h-5 md:h-6">
            {fork.chain}
          </Badge>
        </div>
        <CardTitle className="text-base md:text-lg">{fork.name}</CardTitle>
        <CardDescription className="text-xs md:text-sm line-clamp-2">{fork.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="grid gap-3 md:gap-4 h-full">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground md:text-xs">Stablecoin</p>
              <p className="text-xs font-medium md:text-sm">{fork.stablecoin}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground md:text-xs">Governance Token</p>
              <p className="text-xs font-medium md:text-sm">{fork.governanceToken || "None"}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium text-muted-foreground md:text-xs">
              {fork.status === "scheduled" ? "Launch Date" : "Status"}
            </p>
            <p className="text-xs font-medium md:text-sm">
              {fork.status === "scheduled" ? fork.launchDate : statusText[fork.status]}
            </p>
          </div>
        </div>
      </CardContent>
      <div className="mt-auto">
        <Separator />
        <CardFooter className="pt-3 md:pt-4 flex justify-between gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-3 md:h-8 hover:bg-background/80 transition-colors flex-1"
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-3 md:h-8 hover:bg-background/80 transition-colors flex-1"
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
        </CardFooter>
      </div>
    </Card>
  )
}

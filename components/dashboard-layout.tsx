"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Moon, Sun, Github, Globe } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { XIcon } from "@/components/icons/x-icon"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-3 md:gap-4 md:px-6">
        <div className="flex items-center gap-2">
          <Image src="/liquity-fork-logo.png" alt="Forqty Logo" width={28} height={28} className="rounded-full" />
          <span className="text-lg font-bold md:text-xl">Forqty</span>
          <span className="rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-medium text-white md:px-2 md:text-xs">
            Dashboard
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:h-[1.2rem] md:w-[1.2rem]" />
                <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:h-[1.2rem] md:w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8 text-xs md:h-9 md:text-sm" asChild>
            <Link href="https://liquity.org" target="_blank">
              <ExternalLink className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Liquity.org</span>
              <span className="sm:hidden">Liquity</span>
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-3 md:p-6">{children}</main>
      <footer className="border-t bg-muted/40 py-4 md:py-6">
        <div className="container mx-auto px-3 md:px-4">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground max-w-3xl mx-auto md:text-xs">
              This website is not affiliated with, endorsed by, or officially representing any of the projects
              mentioned. The content is provided for informational purposes only and does not constitute financial,
              investment, or legal advice. Users should conduct their own research and exercise independent judgment.
            </p>

            <div className="flex items-center justify-center gap-4 mt-4 mb-3">
              <Link
                href="https://summerstone.xyz"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Summerstone Website"
              >
                <Globe className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Website</span>
              </Link>

              <Link
                href="https://github.com/summerstonexyz"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Summerstone GitHub"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">GitHub</span>
              </Link>

              <Link
                href="https://x.com/summerstonexyz"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Summerstone X"
              >
                <XIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
            </div>

            <p className="text-[10px] text-muted-foreground mt-2 md:text-xs">
              © 2025 Summerstone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

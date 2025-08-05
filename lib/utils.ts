import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createGoogleCalendarUrl(event: {
  title: string
  description: string
  location: string
  startDate: string
  endDate?: string
}) {
  const { title, description, location, startDate, endDate } = event

  // Format dates for Google Calendar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = endDate ? formatDate(endDate) : formattedStartDate

  // Build the URL
  const baseUrl = "https://calendar.google.com/calendar/render"
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
    dates: `${formattedStartDate}/${formattedEndDate}`,
  })

  return `${baseUrl}?${params.toString()}`
}

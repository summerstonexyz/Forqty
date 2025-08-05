/**
 * Privacy-focused utilities for data handling
 */

/**
 * Anonymizes an IP address by removing the last octet
 * Example: 192.168.1.1 -> 192.168.1.0
 */
export function anonymizeIp(ip: string): string {
  if (!ip) return ""
  const parts = ip.split(".")
  if (parts.length === 4) {
    parts[3] = "0"
    return parts.join(".")
  }
  return ip
}

/**
 * Creates a non-tracking URL by removing UTM parameters and other tracking
 */
export function createPrivacyUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)

    // List of tracking parameters to remove
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "msclkid",
      "ref",
      "referrer",
      "source",
    ]

    // Remove tracking parameters
    trackingParams.forEach((param) => {
      parsedUrl.searchParams.delete(param)
    })

    return parsedUrl.toString()
  } catch (e) {
    return url
  }
}

/**
 * Safely stores data in localStorage with expiration
 */
export function setPrivacyStorage(key: string, value: any, expirationDays = 30): void {
  try {
    const item = {
      value,
      expiry: new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000,
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (e) {
    console.error("Error setting privacy storage", e)
  }
}

/**
 * Retrieves data from localStorage with expiration check
 */
export function getPrivacyStorage(key: string): any {
  try {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date().getTime()

    // Check if expired
    if (now > item.expiry) {
      localStorage.removeItem(key)
      return null
    }

    return item.value
  } catch (e) {
    console.error("Error getting privacy storage", e)
    return null
  }
}

/**
 * Creates a privacy-friendly unique identifier that's not persistent
 * and doesn't use fingerprinting techniques
 */
export function createSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

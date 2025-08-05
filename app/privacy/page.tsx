import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 14, 2025</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            At Forqty, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            <strong>Personal Data:</strong> We minimize the collection of personal data. We do not require registration
            to use our dashboard.
          </p>
          <p>
            <strong>Usage Data:</strong> If you opt-in to analytics cookies, we collect anonymous usage data such as
            pages visited and time spent on the site.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To analyze usage patterns and improve our website (only with your consent)</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>Cookies Policy</h2>
          <p>
            We use cookies to enhance your browsing experience. You can choose which cookies to accept through our
            Cookie Consent banner:
          </p>
          <ul>
            <li>
              <strong>Necessary Cookies:</strong> Required for the website to function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes
            </li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            We prioritize local storage over server storage where possible. Any data we collect is stored securely and
            protected against unauthorized access.
          </p>

          <h2>Your Data Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we have about you</li>
            <li>Request correction of your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing your personal information</li>
            <li>Request transfer of your personal information</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <a href="mailto:privacy@summerstone.xyz">privacy@summerstone.xyz</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

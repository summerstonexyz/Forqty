Forqty is a comprehensive dashboard for tracking all Liquity V2 forks across different blockchains. The platform provides up-to-date information on launched, scheduled, and unscheduled Liquity V2 forks, making it easier for users to discover and compare different implementations.

# Features
- Comprehensive Fork Tracking: Monitor all Liquity V2 forks across multiple blockchains
- Status Categorization: Filter forks by launched, scheduled, and unscheduled status
- Detailed Information: Access key details for each fork, including:
  - Stablecoin name
  - Governance token
  - Chain information
  - Launch dates (for scheduled forks)
  - Official links (website, documentation, social media)
  - Search & Filter: Easily find specific forks using the search function or filter by blockchain
  - Responsive Design: Optimized for both desktop and mobile viewing
# Technologies
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Icons: Lucide React

# Getting Started
Prerequisites:
- Node.js 18.x or higher
- npm or yarn
# Installation
Clone the repository:
``` bash
git clone https://github.com/yourusername/forqty.git
cd forqty
```
Install dependencies:
  ```bash
npm install
# or
yarn install
```
Run the development server:
``` bash
npm run dev
# or
yarn dev
```
Open on Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project structure
```
forqty/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── dashboard-layout.tsx  # Main layout wrapper
│   ├── forks-dashboard.tsx   # Dashboard component
│   ├── fork-card.tsx         # Individual fork card
│   └── ui/                   # UI components from shadcn
├── lib/                  # Utility functions and data
│   ├── data.ts           # Fork data
│   └── types.ts          # TypeScript types
└── public/               # Static assets
└── logos/            # Protocol logos
```

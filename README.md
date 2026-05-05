# Blended Finance Strategic Scorecard Dashboard

An interactive decision-support platform for blended finance and global expansion analysis. Built on top of a multi-step Excel-based strategic scorecard framework, this dashboard transforms static spreadsheet data into a dynamic, searchable, and filterable web application system.

## What It Does

The platform helps analysts and investment professionals:

- **Analyze country/project opportunities** across a structured 5-step framework
- **Diagnose financing barriers** and identify the appropriate blended finance instrument
- **Recommend global expansion strategies** based on contextual dimensions
- **Explore a reference library** of blended finance tools and expansion models

## Key Technologies

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19) |
| Routing | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Overview dashboard with KPI cards and analytics charts |
| `/cases` | Searchable, filterable case explorer table with detail drawer |
| `/tools` | Blended finance tools reference library (accordion) |
| `/expansion` | Global expansion options reference library (accordion) |
| `/recommend` | Rule-based recommendation engine |

## Project Structure

```
src/
├── types/index.ts          # TypeScript interfaces for all entities
├── data/mockData.ts        # Mock datasets for all 5 scorecard steps
├── utils/
│   ├── recommendations.ts  # Rule-based recommendation logic
│   └── excelMapper.ts      # Excel ingestion stubs (ready for xlsx parser)
├── components/
│   ├── AppNav.tsx           # Top navigation bar
│   └── ui/
│       ├── KpiCard.tsx      # KPI metric card
│       ├── Badge.tsx        # Color-coded status/type badges
│       ├── ChartCard.tsx    # Chart wrapper card
│       ├── FilterBar.tsx    # Search + multi-filter bar
│       ├── CaseTable.tsx    # Sortable data table
│       ├── DetailDrawer.tsx # Slide-in case detail panel
│       ├── ReferenceCard.tsx # Expandable accordion reference card
│       ├── RecommendationPanel.tsx # Interactive recommendation UI
│       ├── LoadingSkeleton.tsx
│       └── EmptyState.tsx
└── routes/
    ├── __root.tsx          # Root layout + navigation
    ├── index.tsx           # Overview page
    ├── cases.tsx           # Case explorer
    ├── tools.tsx           # BF tools reference
    ├── expansion.tsx       # Expansion options reference
    └── recommend.tsx       # Recommendation engine
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Production build
npm run build
```

Or with Netlify CLI (recommended — includes full platform emulation):

```bash
netlify dev
```

## Excel Integration

The `src/utils/excelMapper.ts` file contains stub mapper functions ready to connect a live Excel parser. To wire up real data:

1. Install an xlsx parser: `npm install xlsx` or `npm install exceljs`
2. In the mapper file, replace stub implementations with actual sheet parsing
3. Pass parsed data to the same TypeScript interfaces used by the UI

The mock data in `src/data/mockData.ts` mirrors the exact field structure expected by the mapper functions.

# Femme Connection Data Intelligence Hub

A comprehensive data intelligence platform built with React, TypeScript, Tailwind CSS, and Recharts.

## 🎯 Key Features

### ✅ Interactive Filtering System
- **Date Range Filters**: Today, 7D, 30D, 90D, MTD, YTD with real-time data updates
- **Channel Filters**: All Channels, Organic, Paid Social, Email, Google Ads, Direct
- **Comparison Modes**: vs. Prior Period, vs. Prior Year
- **Live Data Updates**: All metrics, charts, and tables update instantly when filters change

### 📊 MVP Dashboards (Phase 1)

1. **Strategy Dashboard** (`/`) - Command center with KPIs, charts, priorities
2. **E-commerce Dashboard** (`/ecommerce`) - Shopify + GA4 revenue intelligence
3. **Marketing Dashboard** (`/marketing`) - Multi-channel performance (Meta, TikTok, Instagram)
4. **Email Dashboard** (`/email`) - Klaviyo flows, campaigns, segmentation
5. **Competitor Intelligence** (`/competitor`) - Market benchmarking & competitive analysis
6. **GTM Strategy** (`/gtm`) - Campaign planning, content calendar, strategic initiatives

### 🚀 Phase 2 Dashboards (NEW)

7. **Influencer Hub** (`/influencer`) - Creator partnerships, EMV tracking, campaign performance
8. **Google Ads** (`/google-ads`) - Search, Shopping, Performance Max, keyword analysis

## Design System

### Color Palette
- **Pink**: `#ff99b9` (Primary accent, CTAs, highlights)
- **Green**: `#1b443a` (Primary brand color, headers, data emphasis)
- **Terra**: `#e2745d` (Secondary accent, alerts)
- **Buff**: `#e6d1c4` (Tertiary accent, backgrounds)
- **Off-white**: `#faf8f5` (Page background)
- **Surface**: `#f3efe9` (Card backgrounds)

### Typography
- **Serif**: Cormorant Garamond (Headings, large numbers)
- **Sans**: DM Sans (Body text, UI elements)
- **Mono**: DM Mono (Labels, tags, technical text)

### Components
All reusable UI components are in `/src/app/components/ui/`:
- **Card.tsx**: Card variants, MetricCard, AIInsightCard, Tags, Section Headers
- **Filters.tsx**: FilterBar, StatGrid, ChartContainer

## Interactive Data System

The app uses React Context (`FilterContext`) to manage global filter state. When users click filter buttons:

- **Date Range Changes**: Data multiplies based on period (7D = 23% of 30D baseline, 90D = 3x baseline)
- **Channel Changes**: Data filters to show channel-specific performance
- **Real-time Updates**: All metrics, charts, tables, and AI insights update instantly
- **Persistent State**: Filter selections persist across dashboard navigation

## Dashboard Pages

1. **Strategy Dashboard** (`/`) - Command center with KPIs, charts, priorities
2. **E-commerce Dashboard** (`/ecommerce`) - Shopify + GA4 revenue intelligence
3. **Marketing Dashboard** (`/marketing`) - Multi-channel performance (Meta, TikTok, Instagram)
4. **Email Dashboard** (`/email`) - Klaviyo flows, campaigns, segmentation
5. **Competitor Intelligence** (`/competitor`) - Market benchmarking & competitive analysis
6. **GTM Strategy** (`/gtm`) - Campaign planning, content calendar, strategic initiatives

## Features

- ✅ Responsive layout optimized for 1680×1050 desktop
- ✅ React Router for multi-page navigation
- ✅ Recharts for data visualization
- ✅ Custom design tokens in CSS variables
- ✅ Reusable component library
- ✅ AI insight cards throughout
- ✅ Cohesive Femme Connection brand identity

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS v4
- React Router 7
- Recharts
- Lucide React (icons)
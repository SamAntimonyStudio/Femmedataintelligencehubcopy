import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "./ui/Card";
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Instagram, Hash, Users, Heart, MessageCircle, Share2, Video, Image as ImageIcon, Sparkles, Calendar, Clock, Target, Play } from "lucide-react";
import { useState } from "react";

interface SocialIntelligenceTabProps {
  setShowSocialModal: (show: boolean) => void;
}

export default function SocialIntelligenceTab({ setShowSocialModal }: SocialIntelligenceTabProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"instagram" | "tiktok" | "facebook" | "pinterest">("instagram");

  // Overall Social Performance Overview
  const competitorSocialOverview = [
    {
      brand: "Zimmermann",
      instagram: { followers: "542K", engagement: "4.2%", posts: "18/mo" },
      tiktok: { followers: "124K", engagement: "8.4%", videos: "12/mo" },
      facebook: { followers: "286K", engagement: "2.1%", posts: "8/mo" },
      pinterest: { followers: "84K", viewers: "1.2M/mo", pins: "45/mo" },
      totalReach: "2.8M"
    },
    {
      brand: "Blue Illusion",
      instagram: { followers: "94K", engagement: "5.8%", posts: "24/mo" },
      tiktok: { followers: "8K", engagement: "6.2%", videos: "4/mo" },
      facebook: { followers: "156K", engagement: "3.4%", posts: "20/mo" },
      pinterest: { followers: "42K", viewers: "680K/mo", pins: "60/mo" },
      totalReach: "1.4M"
    },
    {
      brand: "Decjuba",
      instagram: { followers: "186K", engagement: "3.8%", posts: "22/mo" },
      tiktok: { followers: "42K", engagement: "12.4%", videos: "24/mo" },
      facebook: { followers: "124K", engagement: "2.8%", posts: "16/mo" },
      pinterest: { followers: "28K", viewers: "420K/mo", pins: "38/mo" },
      totalReach: "1.8M"
    },
    {
      brand: "Zara",
      instagram: { followers: "3.2M", engagement: "2.4%", posts: "28/mo" },
      tiktok: { followers: "1.8M", engagement: "14.2%", videos: "32/mo" },
      facebook: { followers: "1.4M", engagement: "1.2%", posts: "12/mo" },
      pinterest: { followers: "420K", viewers: "8.4M/mo", pins: "120/mo" },
      totalReach: "18.2M"
    },
    {
      brand: "H&M",
      instagram: { followers: "4.1M", engagement: "1.8%", posts: "32/mo" },
      tiktok: { followers: "2.4M", engagement: "16.8%", videos: "42/mo" },
      facebook: { followers: "2.8M", engagement: "0.9%", posts: "18/mo" },
      pinterest: { followers: "680K", viewers: "12.4M/mo", pins: "180/mo" },
      totalReach: "24.8M"
    },
    {
      brand: "St Frock",
      instagram: { followers: "48K", engagement: "4.6%", posts: "16/mo" },
      tiktok: { followers: "12K", engagement: "9.2%", videos: "8/mo" },
      facebook: { followers: "68K", engagement: "2.4%", posts: "12/mo" },
      pinterest: { followers: "18K", viewers: "240K/mo", pins: "24/mo" },
      totalReach: "640K"
    },
    {
      brand: "Femme Connection",
      instagram: { followers: "32K", engagement: "3.2%", posts: "12/mo" },
      tiktok: { followers: "2K", engagement: "4.8%", videos: "3/mo" },
      facebook: { followers: "52K", engagement: "1.8%", posts: "8/mo" },
      pinterest: { followers: "8K", viewers: "120K/mo", pins: "12/mo" },
      totalReach: "380K"
    },
  ];

  // Instagram Deep Dive Data
  const instagramMetrics = {
    contentMix: [
      { brand: "Zimmermann", reels: 45, feed: 35, stories: 20, carousel: 15 },
      { brand: "Zara", reels: 52, feed: 28, stories: 20, carousel: 10 },
      { brand: "H&M", reels: 58, feed: 22, stories: 20, carousel: 8 },
      { brand: "Blue Illusion", reels: 32, feed: 48, stories: 20, carousel: 18 },
      { brand: "Decjuba", reels: 48, feed: 32, stories: 20, carousel: 12 },
      { brand: "Femme Connection", reels: 24, feed: 56, stories: 20, carousel: 8 },
    ],
    hashtagPerformance: [
      { tag: "#fashion", usage: "92%", avgReach: "42K", avgEngagement: "3.2%" },
      { tag: "#style", usage: "86%", avgReach: "38K", avgEngagement: "3.4%" },
      { tag: "#ootd", usage: "68%", avgReach: "52K", avgEngagement: "4.2%" },
      { tag: "#australianfashion", usage: "48%", avgReach: "18K", avgEngagement: "5.8%" },
      { tag: "#sustainablefashion", usage: "34%", avgReach: "24K", avgEngagement: "6.2%" },
    ],
    postingTimes: [
      { hour: "6am", engagement: 2.1 },
      { hour: "9am", engagement: 3.8 },
      { hour: "12pm", engagement: 4.2 },
      { hour: "3pm", engagement: 3.4 },
      { hour: "6pm", engagement: 5.8 },
      { hour: "9pm", engagement: 4.6 },
    ],
    topPerformingContent: [
      { brand: "Zimmermann", type: "Reel: Runway BTS", views: "284K", engagement: "8.4%", theme: "Behind-the-Scenes" },
      { brand: "Blue Illusion", type: "Carousel: Styling Guide", likes: "4.2K", engagement: "6.8%", theme: "Educational" },
      { brand: "Decjuba", type: "Reel: Customer UGC", views: "156K", engagement: "12.4%", theme: "User-Generated" },
      { brand: "Zara", type: "Reel: Trend Showcase", views: "842K", engagement: "4.2%", theme: "Product Focus" },
    ],
  };

  // TikTok Deep Dive Data
  const tiktokMetrics = {
    contentThemes: [
      { theme: "Get Ready With Me", usage: "42%", avgViews: "186K", avgEngagement: "14.2%" },
      { theme: "Styling Tips", usage: "32%", avgViews: "124K", avgEngagement: "12.8%" },
      { theme: "Trend Participation", usage: "28%", avgViews: "284K", avgEngagement: "18.4%" },
      { theme: "Behind-the-Scenes", usage: "22%", avgViews: "94K", avgEngagement: "10.2%" },
      { theme: "Product Hauls", usage: "18%", avgViews: "142K", avgEngagement: "13.6%" },
    ],
    viralPerformance: [
      { brand: "H&M", video: "Corporate Core Trend", views: "2.4M", likes: "340K", shares: "28K", saves: "42K" },
      { brand: "Zara", video: "Quiet Luxury Haul", views: "1.8M", likes: "256K", shares: "18K", saves: "38K" },
      { brand: "Decjuba", video: "Winter Wardrobe GRWM", views: "420K", likes: "52K", shares: "4.2K", saves: "8.4K" },
    ],
    soundStrategy: [
      { brand: "Zara", trendingSounds: 18, originalAudio: 4, musicLibrary: 10 },
      { brand: "H&M", trendingSounds: 24, originalAudio: 2, musicLibrary: 16 },
      { brand: "Decjuba", trendingSounds: 12, originalAudio: 6, musicLibrary: 6 },
      { brand: "Femme Connection", trendingSounds: 2, originalAudio: 0, musicLibrary: 1 },
    ],
    avgVideoDuration: [
      { brand: "Zara", duration: "18s", completionRate: "72%" },
      { brand: "H&M", duration: "22s", completionRate: "68%" },
      { brand: "Decjuba", duration: "28s", completionRate: "58%" },
      { brand: "Zimmermann", duration: "24s", completionRate: "64%" },
      { brand: "Femme Connection", duration: "42s", completionRate: "38%" },
    ],
  };

  // Facebook Deep Dive Data
  const facebookMetrics = {
    postTypes: [
      { type: "Video", share: 38, avgEngagement: "2.8%", avgReach: "24K" },
      { type: "Image", share: 42, avgEngagement: "2.1%", avgReach: "18K" },
      { type: "Link Post", share: 12, avgEngagement: "1.4%", avgReach: "12K" },
      { type: "Album", share: 8, avgEngagement: "3.2%", avgReach: "28K" },
    ],
    audienceDemographics: [
      { brand: "Blue Illusion", age: "45-65", female: "86%", male: "14%", topLocation: "Australia" },
      { brand: "Zimmermann", age: "28-45", female: "92%", male: "8%", topLocation: "USA/AU" },
      { brand: "Zara", age: "18-35", female: "78%", male: "22%", topLocation: "Global" },
      { brand: "Femme Connection", age: "32-52", female: "88%", male: "12%", topLocation: "Australia" },
    ],
    engagementByDayOfWeek: [
      { day: "Mon", engagement: 2.1 },
      { day: "Tue", engagement: 2.4 },
      { day: "Wed", engagement: 2.8 },
      { day: "Thu", engagement: 3.2 },
      { day: "Fri", engagement: 2.6 },
      { day: "Sat", engagement: 2.2 },
      { day: "Sun", engagement: 1.8 },
    ],
  };

  // Pinterest Deep Dive Data
  const pinterestMetrics = {
    boardStrategy: [
      { brand: "Zimmermann", boards: 24, pinsPerBoard: 142, topBoard: "Spring/Summer Collection", boardFollowers: "12K" },
      { brand: "Zara", boards: 42, pinsPerBoard: 286, topBoard: "Trend Edit", boardFollowers: "84K" },
      { brand: "Blue Illusion", boards: 18, pinsPerBoard: 94, topBoard: "Timeless Style", boardFollowers: "8K" },
      { brand: "Femme Connection", boards: 8, pinsPerBoard: 28, topBoard: "New Arrivals", boardFollowers: "1.2K" },
    ],
    pinPerformance: [
      { type: "Product Pin", usage: "52%", avgSaves: "284", avgClicks: "420", ctr: "3.2%" },
      { type: "Idea Pin", usage: "28%", avgSaves: "186", avgClicks: "240", ctr: "2.8%" },
      { type: "Video Pin", usage: "12%", avgSaves: "142", avgClicks: "320", ctr: "4.2%" },
      { type: "Carousel Pin", usage: "8%", avgSaves: "94", avgClicks: "180", ctr: "2.4%" },
    ],
    trafficSources: [
      { brand: "Zara", search: "42%", home: "38%", related: "20%" },
      { brand: "H&M", search: "38%", home: "42%", related: "20%" },
      { brand: "Zimmermann", search: "48%", home: "32%", related: "20%" },
      { brand: "Femme Connection", search: "24%", home: "56%", related: "20%" },
    ],
  };

  // Cross-Platform Engagement Comparison (Radar Chart)
  const crossPlatformData = [
    { platform: "Instagram", zimmermann: 4.2, zara: 2.4, hm: 1.8, femme: 3.2 },
    { platform: "TikTok", zimmermann: 8.4, zara: 14.2, hm: 16.8, femme: 4.8 },
    { platform: "Facebook", zimmermann: 2.1, zara: 1.2, hm: 0.9, femme: 1.8 },
    { platform: "Pinterest", zimmermann: 5.2, zara: 4.8, hm: 3.6, femme: 2.4 },
  ];

  // Influencer & UGC Strategy
  const influencerStrategy = [
    { brand: "Zimmermann", microInfluencers: 42, macroInfluencers: 8, ugcCampaigns: 6, avgEngagement: "8.4%", brandedHashtag: "#ZimmermannStyle" },
    { brand: "Blue Illusion", microInfluencers: 18, macroInfluencers: 2, ugcCampaigns: 4, avgEngagement: "6.8%", brandedHashtag: "#BlueIllusionStyle" },
    { brand: "Decjuba", microInfluencers: 28, macroInfluencers: 4, ugcCampaigns: 8, avgEngagement: "12.4%", brandedHashtag: "#DecjubaStyle" },
    { brand: "Zara", microInfluencers: 84, macroInfluencers: 24, ugcCampaigns: 12, avgEngagement: "6.2%", brandedHashtag: "#ZaraStyle" },
    { brand: "H&M", microInfluencers: 124, macroInfluencers: 32, ugcCampaigns: 18, avgEngagement: "8.8%", brandedHashtag: "#HMStyle" },
    { brand: "Femme Connection", microInfluencers: 4, macroInfluencers: 0, ugcCampaigns: 1, avgEngagement: "4.2%", brandedHashtag: "#FemmeStyle" },
  ];

  // Content Performance by Theme (across all platforms)
  const contentThemePerformance = [
    { theme: "Behind-the-Scenes", avgEngagement: "8.4%", platforms: "IG Reels, TikTok", topBrand: "Zimmermann" },
    { theme: "User-Generated Content", avgEngagement: "12.4%", platforms: "IG, TikTok, FB", topBrand: "Decjuba" },
    { theme: "Styling Tips/How-To", avgEngagement: "10.2%", platforms: "IG Carousel, TikTok, Pinterest", topBrand: "Blue Illusion" },
    { theme: "Product Focus", avgEngagement: "4.2%", platforms: "IG Feed, FB, Pinterest", topBrand: "Zara" },
    { theme: "Trend Participation", avgEngagement: "18.4%", platforms: "TikTok, IG Reels", topBrand: "H&M" },
    { theme: "Emotional Storytelling", avgEngagement: "6.8%", platforms: "FB, IG Feed", topBrand: "Blue Illusion" },
  ];

  return (
    <>
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          label="Total Social Reach"
          value="50.0M"
          change="Across all platforms"
          changeType="neutral"
        />
        <MetricCard
          label="Avg Engagement Rate"
          value="5.8%"
          change="vs FC 2.9%"
          changeType="neutral"
        />
        <MetricCard
          label="Content Velocity"
          value="124 posts/mo"
          change="Industry average"
          changeType="neutral"
        />
        <MetricCard
          label="UGC Mentions"
          value="8.4K/mo"
          change="vs FC 240/mo"
          changeType="neutral"
        />
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Social Performance Gap Analysis"
          content="FC total reach of 380K represents 1.5% of competitor collective reach (25.6M avg per brand). Critical platform gaps: TikTok 2K followers vs industry leader H&M 2.4M (-99.9%), Instagram 32K vs Zara 3.2M (-99%), Pinterest 8K vs H&M 680K (-98.8%). Engagement rate at 2.9% below industry 5.8% suggests content-market fit issues. Post frequency 35/month vs competitor avg 98/month limits algorithm visibility. Blue Illusion (similar demographic) achieves 5.8% IG engagement with 24 posts/mo through educational carousels and emotional storytelling - proven playbook for mature audience. Decjuba's UGC strategy drives 12.4% TikTok engagement vs FC 4.8%."
          cta={{ label: "View Social Report", onClick: () => setShowSocialModal(true) }}
        />
        <AIInsightCard
          title="Platform Strategy & Content Recommendations"
          content="TikTok represents highest ROI opportunity: platform avg 12.8% engagement vs FC 4.8%. Competitors posting 8-42 videos/mo vs FC 3/mo. Critical: video duration 42s vs optimal 18-24s drives 38% completion rate vs industry 64-72%. Instagram Reels at 24% of content vs competitor 45-58% - algorithm prioritizes video. Pinterest severely underutilized: 12 pins/mo vs Zara 120/mo, missing 8.4M monthly viewers. Recommendation: TikTok-first strategy with 20 videos/mo (GRWM, styling tips, trend participation), increase IG Reels to 50% of content, reduce video length to 18-22s, implement branded hashtag campaign for UGC, scale Pinterest to 60 pins/mo, partner with 12-18 micro-influencers."
          variant="accent"
          cta={{ label: "View Strategy Guide", onClick: () => setShowSocialModal(true) }}
        />
      </div>

      {/* Competitor Social Overview Table */}
      <Card>
        <CardTitle>Competitor Social Media Overview</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Cross-platform presence · Follower counts · Engagement rates · Content frequency</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 pr-8 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>INSTAGRAM</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>TIKTOK</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>FACEBOOK</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>PINTEREST</th>
                <th className="pb-3 pl-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>TOTAL REACH</th>
              </tr>
            </thead>
            <tbody>
              {competitorSocialOverview.map((comp, idx) => (
                <tr key={idx} className={`border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors ${comp.brand === "Femme Connection" ? 'bg-[var(--pink-light)]' : ''}`}>
                  <td className="py-4 pr-8">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{comp.brand}</div>
                      {comp.brand === "Femme Connection" && <Tag variant="pink" size="xs">FC</Tag>}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-[13px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.instagram.followers}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{comp.instagram.engagement} eng · {comp.instagram.posts}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-[13px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.tiktok.followers}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{comp.tiktok.engagement} eng · {comp.tiktok.videos}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-[13px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.facebook.followers}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{comp.facebook.engagement} eng · {comp.facebook.posts}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-[13px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.pinterest.followers}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{comp.pinterest.viewers} · {comp.pinterest.pins}</div>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.totalReach}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Platform Selector Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-color)]">
        <button
          onClick={() => setSelectedPlatform("instagram")}
          className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
            selectedPlatform === "instagram"
              ? "border-[#E4405F] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            INSTAGRAM
          </div>
        </button>
        <button
          onClick={() => setSelectedPlatform("tiktok")}
          className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
            selectedPlatform === "tiktok"
              ? "border-[#000000] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            TIKTOK
          </div>
        </button>
        <button
          onClick={() => setSelectedPlatform("facebook")}
          className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
            selectedPlatform === "facebook"
              ? "border-[var(--buff-dark)] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            FACEBOOK
          </div>
        </button>
        <button
          onClick={() => setSelectedPlatform("pinterest")}
          className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
            selectedPlatform === "pinterest"
              ? "border-[#E60023] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            PINTEREST
          </div>
        </button>
      </div>

      {/* INSTAGRAM DEEP DIVE */}
      {selectedPlatform === "instagram" && (
        <>
          {/* Instagram Content Mix */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardTitle>Instagram Content Mix Breakdown</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Reels vs Feed vs Stories vs Carousel · % of total content</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={instagramMetrics.contentMix}>
                  <CartesianGrid key="grid-ig-content" strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key="xaxis-ig-content" dataKey="brand" stroke="var(--text-tertiary)" style={{ fontSize: '10px' }} angle={-45} textAnchor="end" height={80} />
                  <YAxis key="yaxis-ig-content" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: '% of Content', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
                  <Tooltip key="tooltip-ig-content" />
                  <Legend key="legend-ig-content" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar key="bar-ig-reels" dataKey="reels" fill="#E4405F" name="Reels" />
                  <Bar key="bar-ig-feed" dataKey="feed" fill="var(--terra)" name="Feed Posts" />
                  <Bar key="bar-ig-carousel" dataKey="carousel" fill="var(--buff-dark)" name="Carousel" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardTitle>Optimal Posting Time Analysis</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Average engagement rate by hour of day</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={instagramMetrics.postingTimes}>
                  <CartesianGrid key="grid-ig-time" strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key="xaxis-ig-time" dataKey="hour" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
                  <YAxis key="yaxis-ig-time" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
                  <Tooltip key="tooltip-ig-time" />
                  <Line key="line-ig-engagement" type="monotone" dataKey="engagement" stroke="#E4405F" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="text-[11px] text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Peak engagement window:</span> 6pm (5.8% avg engagement). Secondary peak at 12pm (4.2%). Avoid posting before 9am or after 9pm.
                </div>
              </div>
            </Card>
          </div>

          {/* Hashtag Performance */}
          <Card>
            <CardTitle>Hashtag Strategy & Performance</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing hashtags · Usage frequency · Reach & engagement metrics</p>
            <div className="grid grid-cols-5 gap-4">
              {instagramMetrics.hashtagPerformance.map((tag, idx) => (
                <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4 hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-[#E4405F]" />
                    <div className="text-[14px] font-medium text-[var(--text-primary)]">{tag.tag}</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>USAGE</div>
                      <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{tag.usage}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG REACH</div>
                      <div className="text-[14px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{tag.avgReach}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ENGAGEMENT</div>
                      <div className={`text-[14px] font-bold ${parseFloat(tag.avgEngagement) > 5 ? 'text-[var(--green)]' : 'text-[var(--text-primary)]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                        {tag.avgEngagement}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--pink)] flex-shrink-0 mt-1" />
                <div>
                  <div className="text-[13px] font-medium text-[var(--pink-dark)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    HASHTAG STRATEGY INSIGHT · FEMME CONNECTION
                  </div>
                  <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                    Niche hashtags (#australianfashion, #sustainablefashion) drive 2-3x higher engagement (5.8-6.2%) vs generic (#fashion 3.2%) despite lower reach. Competitors using 15-25 hashtag mix per post with 60% niche, 40% broad. <span className="font-medium text-[var(--pink-dark)]">Recommendation: implement branded hashtag #FemmeStyle for UGC aggregation, use 20 hashtags per post (12 niche + 8 broad), test location-based tags (#melbournestyle, #sydneyfashion) for local engagement lift.</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Top Performing Instagram Content */}
          <Card>
            <CardTitle>Top Performing Instagram Content</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Benchmark examples · Content themes · Performance metrics</p>
            <div className="space-y-4">
              {instagramMetrics.topPerformingContent.map((content, idx) => (
                <div key={idx} className="border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-strong)] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[16px] font-medium text-[var(--text-primary)] mb-1">{content.brand}</div>
                      <div className="text-[13px] text-[var(--text-secondary)]">{content.type}</div>
                    </div>
                    <Tag variant="green" size="sm">{content.theme}</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {content.views ? "VIEWS" : "LIKES"}
                      </div>
                      <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>
                        {content.views || content.likes}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ENGAGEMENT</div>
                      <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{content.engagement}</div>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-[var(--green)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* TIKTOK DEEP DIVE */}
      {selectedPlatform === "tiktok" && (
        <>
          {/* TikTok Content Themes */}
          <Card>
            <CardTitle>TikTok Content Theme Performance</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Theme usage · Average views · Engagement benchmarks</p>
            <div className="space-y-3">
              {tiktokMetrics.contentThemes.map((theme, idx) => (
                <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4 hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[15px] font-medium text-[var(--text-primary)]">{theme.theme}</div>
                    <Tag variant="default" size="sm">{theme.usage} usage</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG VIEWS</div>
                      <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{theme.avgViews}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ENGAGEMENT</div>
                      <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{theme.avgEngagement}</div>
                    </div>
                    <div className="flex items-center justify-end">
                      {parseFloat(theme.avgEngagement) > 15 && <TrendingUp className="w-5 h-5 text-[var(--green)]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-lg)]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[var(--green)]" />
                  <div className="text-[12px] font-medium text-[var(--green-dark)]" style={{ fontFamily: "var(--font-mono)" }}>HIGHEST PERFORMING THEME</div>
                </div>
                <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                  <span className="font-medium">Trend Participation (18.4% engagement):</span> Participating in trending sounds, challenges, and cultural moments drives 3x engagement vs product-only content. H&M's "Corporate Core" trend video reached 2.4M views.
                </div>
              </div>

              <div className="p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[var(--pink)]" />
                  <div className="text-[12px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-mono)" }}>FC OPPORTUNITY</div>
                </div>
                <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                  FC posting 3 videos/mo, none in trend participation category. Recommendation: dedicate 40% of TikTok content to trending sounds/challenges within 24-48hrs of trend emergence for maximum visibility.
                </div>
              </div>
            </div>
          </Card>

          {/* Viral Performance Examples */}
          <Card>
            <CardTitle>Viral Content Performance Examples</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing videos · Engagement breakdown · Viral mechanics</p>
            <div className="grid grid-cols-3 gap-6">
              {tiktokMetrics.viralPerformance.map((viral, idx) => (
                <div key={idx} className="border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-strong)] transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-5 h-5 text-[#000000]" />
                    <div className="text-[15px] font-medium text-[var(--text-primary)]">{viral.brand}</div>
                  </div>
                  <div className="text-[13px] text-[var(--text-secondary)] mb-4 font-medium">{viral.video}</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] text-[var(--text-tertiary)]">Views</div>
                      <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{viral.views}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-[var(--terra)]" />
                        <div className="text-[11px] text-[var(--text-tertiary)]">Likes</div>
                      </div>
                      <div className="text-[14px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{viral.likes}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-[var(--buff-dark)]" />
                        <div className="text-[11px] text-[var(--text-tertiary)]">Shares</div>
                      </div>
                      <div className="text-[14px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{viral.shares}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] text-[var(--text-tertiary)]">Saves</div>
                      <div className="text-[14px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{viral.saves}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sound Strategy & Video Duration */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardTitle>Sound Strategy Breakdown</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Trending sounds vs Original audio vs Music library</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={tiktokMetrics.soundStrategy} layout="vertical">
                  <CartesianGrid key="grid-tiktok-sound" strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key="xaxis-tiktok-sound" type="number" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
                  <YAxis key="yaxis-tiktok-sound" type="category" dataKey="brand" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} width={120} />
                  <Tooltip key="tooltip-tiktok-sound" />
                  <Legend key="legend-tiktok-sound" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar key="bar-trending-sounds" dataKey="trendingSounds" fill="#000000" name="Trending Sounds" />
                  <Bar key="bar-original-audio" dataKey="originalAudio" fill="var(--pink)" name="Original Audio" />
                  <Bar key="bar-music-library" dataKey="musicLibrary" fill="var(--terra)" name="Music Library" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardTitle>Video Duration & Completion Rate</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Average video length · Watch-through completion %</p>
              <div className="space-y-4 mt-6">
                {tiktokMetrics.avgVideoDuration.map((video, idx) => (
                  <div key={idx} className={`border rounded-[var(--radius-md)] p-4 ${video.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{video.brand}</div>
                      <div className="flex items-center gap-3">
                        <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{video.duration}</div>
                        <div className={`text-[14px] font-bold ${parseFloat(video.completionRate) > 60 ? 'text-[var(--green)]' : 'text-[var(--terra)]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {video.completionRate}
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${parseFloat(video.completionRate) > 60 ? 'bg-[var(--green)]' : 'bg-[var(--terra)]'}`}
                        style={{ width: video.completionRate }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="text-[11px] text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Optimal duration: 18-24 seconds</span> achieves 64-72% completion. FC's 42s videos at 38% completion suggests hook/pacing issues.
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* FACEBOOK DEEP DIVE */}
      {selectedPlatform === "facebook" && (
        <>
          {/* Post Type Performance */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardTitle>Facebook Post Type Performance</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Content format breakdown · Engagement & reach metrics</p>
              <div className="space-y-3">
                {facebookMetrics.postTypes.map((type, idx) => (
                  <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {type.type === "Video" && <Video className="w-4 h-4 text-[var(--buff-dark)]" />}
                        {type.type === "Image" && <ImageIcon className="w-4 h-4 text-[var(--buff-dark)]" />}
                        {type.type === "Link Post" && <Share2 className="w-4 h-4 text-[var(--buff-dark)]" />}
                        {type.type === "Album" && <ImageIcon className="w-4 h-4 text-[var(--buff-dark)]" />}
                        <div className="text-[14px] font-medium text-[var(--text-primary)]">{type.type}</div>
                      </div>
                      <Tag variant="default" size="sm">{type.share}% share</Tag>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG ENGAGEMENT</div>
                        <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{type.avgEngagement}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG REACH</div>
                        <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{type.avgReach}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardTitle>Engagement by Day of Week</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Optimal posting schedule analysis</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={facebookMetrics.engagementByDayOfWeek}>
                  <CartesianGrid key="grid-fb-day" strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key="xaxis-fb-day" dataKey="day" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
                  <YAxis key="yaxis-fb-day" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
                  <Tooltip key="tooltip-fb-day" />
                  <Bar key="bar-fb-engagement-day" dataKey="engagement" fill="var(--buff-dark)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="text-[11px] text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Peak day: Thursday</span> (3.2% engagement). Lowest: Sunday (1.8%). Schedule posts Tuesday-Thursday for optimal reach.
                </div>
              </div>
            </Card>
          </div>

          {/* Audience Demographics */}
          <Card>
            <CardTitle>Facebook Audience Demographics Comparison</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Age ranges · Gender split · Geographic concentration</p>
            <div className="grid grid-cols-4 gap-4">
              {facebookMetrics.audienceDemographics.map((demo, idx) => (
                <div key={idx} className={`border rounded-[var(--radius-lg)] p-5 ${demo.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                  <div className="text-[15px] font-medium text-[var(--text-primary)] mb-4">{demo.brand}</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AGE RANGE</div>
                      <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{demo.age}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>GENDER SPLIT</div>
                      <div className="flex items-center gap-2">
                        <div className="text-[14px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{demo.female} F</div>
                        <div className="text-[14px] font-bold text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>{demo.male} M</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>TOP LOCATION</div>
                      <div className="text-[13px] text-[var(--text-secondary)]">{demo.topLocation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--pink)] flex-shrink-0 mt-1" />
                <div>
                  <div className="text-[13px] font-medium text-[var(--pink-dark)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    DEMOGRAPHIC TARGETING INSIGHT · FEMME CONNECTION
                  </div>
                  <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                    FC demographic (32-52, 88% female, Australia) closely aligns with Blue Illusion (45-65, 86% female) who achieves 3.4% Facebook engagement vs FC 1.8%. Blue Illusion posts 20/mo (video 38%, albums 18%) vs FC 8/mo. Mature demographic prefers Facebook for brand discovery and community engagement. <span className="font-medium text-[var(--pink-dark)]">Recommendation: increase posting frequency to 18/mo, shift to 40% video content (styling tips, fabric quality showcases), create Facebook-exclusive offers for this high-value demographic, build community through Facebook Groups.</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* PINTEREST DEEP DIVE */}
      {selectedPlatform === "pinterest" && (
        <>
          {/* Board Strategy */}
          <Card>
            <CardTitle>Pinterest Board Strategy Comparison</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Board count · Pins per board · Top performing boards · Follower engagement</p>
            <div className="grid grid-cols-4 gap-4">
              {pinterestMetrics.boardStrategy.map((board, idx) => (
                <div key={idx} className={`border rounded-[var(--radius-lg)] p-5 ${board.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                  <div className="text-[15px] font-medium text-[var(--text-primary)] mb-4">{board.brand}</div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>BOARDS</div>
                        <div className="text-[20px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{board.boards}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>PINS/BOARD</div>
                        <div className="text-[20px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{board.pinsPerBoard}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>TOP BOARD</div>
                      <div className="text-[12px] text-[var(--text-secondary)] mb-1">{board.topBoard}</div>
                      <div className="text-[13px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{board.boardFollowers} followers</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pin Type Performance */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardTitle>Pin Type Performance Analysis</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Format breakdown · Saves · Clicks · CTR benchmarks</p>
              <div className="space-y-3">
                {pinterestMetrics.pinPerformance.map((pin, idx) => (
                  <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{pin.type}</div>
                      <Tag variant="default" size="sm">{pin.usage} usage</Tag>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG SAVES</div>
                        <div className="text-[16px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{pin.avgSaves}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG CLICKS</div>
                        <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{pin.avgClicks}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CTR</div>
                        <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{pin.ctr}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardTitle>Pinterest Traffic Source Distribution</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Where pins are discovered · Search vs Home feed vs Related pins</p>
              <div className="space-y-4">
                {pinterestMetrics.trafficSources.map((traffic, idx) => (
                  <div key={idx} className={`border rounded-[var(--radius-md)] p-4 ${traffic.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-3">{traffic.brand}</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>SEARCH</div>
                        <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{traffic.search}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>HOME FEED</div>
                        <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{traffic.home}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>RELATED</div>
                        <div className="text-[18px] font-bold text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>{traffic.related}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="text-[11px] text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">FC heavy home feed reliance (56%)</span> vs competitors' 38-42% suggests weak search optimization. Increase search traffic through keyword-rich pin descriptions and board titles.
                </div>
              </div>
            </Card>
          </div>

          {/* Pinterest Strategy Insights */}
          <div className="mt-6 p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[var(--pink)] flex-shrink-0 mt-1" />
              <div>
                <div className="text-[13px] font-medium text-[var(--pink-dark)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  PINTEREST GROWTH STRATEGY · FEMME CONNECTION
                </div>
                <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                  Pinterest represents FC's largest untapped opportunity: 8K followers vs Zara 420K, 12 pins/mo vs Zara 120/mo. Pinterest drives 24% of Zara's web traffic and 18% of Zimmermann's. Platform users in "shopping mode" with high purchase intent (avg 35% higher AOV vs social traffic). FC's 8 boards insufficient for SEO discoverability vs competitor 18-42 boards. <span className="font-medium text-[var(--pink-dark)]">Recommendation: create 20 seasonal/category boards (Spring Dresses, Office Looks, Weekend Style, Sustainable Fashion, Color Edit: Earth Tones, etc.), increase to 60 pins/mo (2/day), implement Product Pins with direct shop links, optimize all pin descriptions with 5-8 keywords, create Idea Pins showing styling transformations, focus boards on lifestyle themes not just product categories.</span> Target: 120K monthly viewers within 6 months.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cross-Platform Performance & Content Themes (Always Visible) */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Influencer & UGC Strategy Comparison</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Micro/macro influencer partnerships · UGC campaigns · Branded hashtag performance</p>
          <div className="space-y-3">
            {influencerStrategy.map((strategy, idx) => (
              <div key={idx} className={`border rounded-[var(--radius-md)] p-4 ${strategy.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{strategy.brand}</div>
                  <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.brandedHashtag}</div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>MICRO</div>
                    <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.microInfluencers}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>MACRO</div>
                    <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.macroInfluencers}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>UGC</div>
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.ugcCampaigns}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ENG</div>
                    <div className="text-[16px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.avgEngagement}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Content Theme Performance (All Platforms)</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Cross-platform content strategy · Engagement by theme</p>
          <div className="space-y-3">
            {contentThemePerformance.map((theme, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{theme.theme}</div>
                  <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{theme.avgEngagement}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-[var(--text-tertiary)]">{theme.platforms}</div>
                  <Tag variant="default" size="xs">{theme.topBrand}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

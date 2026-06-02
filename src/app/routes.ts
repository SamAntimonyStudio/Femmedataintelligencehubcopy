import { createBrowserRouter, redirect } from "react-router";
import Layout from "./components/Layout";
import StrategyDashboard from "./pages/StrategyDashboard";
import RNDDashboard from "./pages/RNDDashboard";
import EcommerceDashboard from "./pages/EcommerceDashboard";
import MarketingDashboard from "./pages/MarketingDashboard";
import EmailDashboard from "./pages/EmailDashboard";
import CompetitorIntelligence from "./pages/CompetitorIntelligence";
import CustomerIntelligence from "./pages/CustomerIntelligence";
import GTMStrategy from "./pages/GTMStrategy";
import InfluencerHub from "./pages/InfluencerHub";
import GoogleAds from "./pages/GoogleAds";
import YotpoLoyalty from "./pages/YotpoLoyalty";
import CampaignPlanning from "./pages/CampaignPlanning";
import ContentStudio from "./pages/ContentStudio";
import GoogleReport from "./pages/reports/GoogleReport";
import KlaviyoReport from "./pages/reports/KlaviyoReport";
import MetaReport from "./pages/reports/MetaReport";
import SocialReport from "./pages/reports/SocialReport";
import YotpoReport from "./pages/reports/YotpoReport";
import InfluencerReport from "./pages/reports/InfluencerReport";
import GTMReport from "./pages/reports/GTMReport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: StrategyDashboard },
      { path: "rnd", Component: RNDDashboard },
      { path: "gtm", Component: GTMStrategy },
      { path: "campaign-planning", Component: CampaignPlanning },
      { path: "ecommerce", Component: EcommerceDashboard },
      { path: "marketing", Component: MarketingDashboard },
      { path: "email", Component: EmailDashboard },
      { path: "yotpo-loyalty", Component: YotpoLoyalty },
      { path: "google-ads", Component: GoogleAds },
      { path: "content-studio", Component: ContentStudio },
      { path: "influencer", Component: InfluencerHub },
      { path: "competitor", Component: CompetitorIntelligence },
      { path: "computer-intelligence", loader: () => redirect("/competitor") },
      { path: "customer-intelligence", Component: CustomerIntelligence },
      { path: "reports/google", Component: GoogleReport },
      { path: "reports/klaviyo", Component: KlaviyoReport },
      { path: "reports/meta", Component: MetaReport },
      { path: "reports/social", Component: SocialReport },
      { path: "reports/yotpo", Component: YotpoReport },
      { path: "reports/influencer", Component: InfluencerReport },
      { path: "reports/gtm", Component: GTMReport },
    ],
  },
]);
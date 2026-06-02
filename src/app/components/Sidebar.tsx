import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Target,
  FlaskConical,
  ShoppingBag,
  Megaphone,
  Mail,
  Search,
  PenTool,
  Users,
  Calendar,
  Crosshair,
  Heart,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react";
import melPhoto from "../../imports/1759909171679.jpeg";
import femmeLogo from "../../imports/01/91ececdecbb3848d6d05449255d0c40b634b984b.png";

const navigationGroups = [
  {
    title: "STRATEGY",
    items: [
      { name: "Command Center", path: "/", icon: LayoutDashboard, label: "Homepage" },
      { name: "Go-To-Market", path: "/gtm", icon: Target },
      { name: "R&D", path: "/rnd", icon: FlaskConical, label: "Research & Development" },
      { name: "Campaign Planning", path: "/campaign-planning", icon: Calendar },
    ],
  },
  {
    title: "CHANNELS",
    items: [
      { name: "E-commerce", path: "/ecommerce", icon: ShoppingBag },
      { name: "Marketing", path: "/marketing", icon: Megaphone },
      { name: "Email / CRM", path: "/email", icon: Mail },
      { name: "Google Ads", path: "/google-ads", icon: Search },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { name: "Content Studio", path: "/content-studio", icon: PenTool },
      { name: "Influencer Hub", path: "/influencer", icon: Users },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "Competitors", path: "/competitor", icon: Crosshair },
      { name: "Customers", path: "/customer-intelligence", icon: Database },
      { name: "Loyalty", path: "/yotpo-loyalty", icon: Heart },
    ],
  },
  {
    title: "REPORTING",
    items: [
      { name: "Google", path: "/reports/google", icon: Search, label: "Google Ads Report" },
      { name: "Klaviyo", path: "/reports/klaviyo", icon: Mail, label: "Email/CRM Report" },
      { name: "Meta", path: "/reports/meta", icon: Target, label: "Meta Ads Report" },
      { name: "Yotpo", path: "/reports/yotpo", icon: Heart, label: "Loyalty Report" },
      { name: "Social", path: "/reports/social", icon: Users, label: "Social Media Report" },
      { name: "Influencer", path: "/reports/influencer", icon: Users, label: "Influencer Report" },
      { name: "GTM", path: "/reports/gtm", icon: FileText, label: "Go-To-Market Report" },
    ],
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-[#0f1a17] flex flex-col transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? "w-[240px]" : "w-[80px]"
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <img
              src={femmeLogo}
              alt="Femme Connection"
              className="h-[50px] w-auto object-contain"
            />
          ) : (
            <div className="text-[var(--pink)] font-serif text-[1.5rem] font-bold">
              FC
            </div>
          )}
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? "mt-6" : ""}>
            {isExpanded && (
              <div
                className="px-6 mb-2 text-[10px] uppercase tracking-wider text-[var(--pink)] font-mono"
              >
                {group.title}
              </div>
            )}
            <div className="space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group
                      ${
                        isActive
                          ? "bg-[var(--pink)]/10 text-white"
                          : "text-white/50 hover:text-white/70 hover:bg-white/5"
                      }
                    `}
                    title={!isExpanded ? item.name : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--pink)] rounded-r-full" />
                    )}
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-[var(--pink)]" : ""
                      }`}
                    />
                    {isExpanded && (
                      <span className="text-[13px] font-medium truncate">
                        {item.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* System Section */}
        <div className="mt-6 border-t border-white/8 pt-6">
          {isExpanded && (
            <div className="px-6 mb-2 text-[10px] uppercase tracking-wider text-[var(--pink)] font-mono">
              SYSTEM
            </div>
          )}
          <div className="space-y-1 px-3">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-white/50 hover:text-white/70 hover:bg-white/5"
              title={!isExpanded ? "Settings" : undefined}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {isExpanded && (
                <span className="text-[13px] font-medium">Settings</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-white/8 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0 ring-2 ring-[var(--pink)]/30">
            <img
              src={melPhoto}
              alt="Mel"
              className="w-full h-full object-cover"
            />
          </div>
          {isExpanded && (
            <div className="flex-1 min-w-0">
              <div className="text-white text-[13px] font-medium truncate">
                Mel
              </div>
              <div className="text-white/40 text-[11px] truncate">
                Marketing Manager
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[var(--pink)] rounded-full flex items-center justify-center hover:bg-[var(--pink-dark)] transition-colors shadow-lg"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>
    </div>
  );
}

import { Card, CardTitle, Tag } from "../components/ui/Card";
import PageHeader from "../components/PageHeader";
import { User, Bell, Plug, Shield, Database } from "lucide-react";

const integrations = [
  { name: "Shopify", status: "Connected", url: "https://shopify.com" },
  { name: "Klaviyo", status: "Connected", url: "https://klaviyo.com" },
  { name: "Google Ads", status: "Connected", url: "https://ads.google.com" },
  { name: "Meta Business", status: "Connected", url: "https://business.facebook.com" },
  { name: "Yotpo", status: "Connected", url: "https://yotpo.com" },
  { name: "Sprout Social", status: "Not connected", url: "https://sproutsocial.com" },
];

const notifications = [
  { label: "Weekly performance digest", on: true },
  { label: "Campaign milestone alerts", on: true },
  { label: "Anomaly & spend-spike warnings", on: true },
  { label: "Competitor activity updates", on: false },
];

export default function Settings() {
  return (
    <div>
      <PageHeader
        label="SYSTEM"
        title="Settings"
        description="Manage your workspace profile, data integrations, and notification preferences for the Femme Data Intelligence Hub."
        backgroundGradient="green"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[var(--green)]" />
            <CardTitle className="mb-0">Account</CardTitle>
          </div>
          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Workspace</span>
              <span className="font-medium">Femme Connection</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Plan</span>
              <span className="font-medium">Intelligence Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Owner</span>
              <span className="font-medium">Mel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Region</span>
              <span className="font-medium">Australia (AEST)</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[var(--green)]" />
            <CardTitle className="mb-0">Notifications</CardTitle>
          </div>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.label} className="flex items-center justify-between text-[14px]">
                <span className="text-[var(--text-secondary)]">{n.label}</span>
                <Tag variant={n.on ? "green" : "buff"}>{n.on ? "On" : "Off"}</Tag>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Plug className="w-5 h-5 text-[var(--green)]" />
          <CardTitle className="mb-0">Data Integrations</CardTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((i) => (
            <a
              key={i.name}
              href={i.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors"
            >
              <span className="font-medium text-[14px]">{i.name}</span>
              <Tag variant={i.status === "Connected" ? "green" : "terra"}>{i.status}</Tag>
            </a>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[var(--green)]" />
            <CardTitle className="mb-0">Security</CardTitle>
          </div>
          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Two-factor authentication</span>
              <Tag variant="green">Enabled</Tag>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Single sign-on</span>
              <Tag variant="buff">Not configured</Tag>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-[var(--green)]" />
            <CardTitle className="mb-0">Data & Privacy</CardTitle>
          </div>
          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Data retention</span>
              <span className="font-medium">24 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Export format</span>
              <span className="font-medium">CSV, JSON</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

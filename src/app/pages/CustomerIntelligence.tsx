import { useState } from "react";
import { Card, CardTitle, MetricCard } from "../components/ui/Card";
import PageHeader from "../components/PageHeader";
import { Search, Filter, Download, Users, TrendingUp, Heart, ShoppingBag, Award, Mail, Gift, UserPlus } from "lucide-react";
import { sampleCustomers, customerStats, rfmSegments, Customer } from "../data/customerData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, LineChart, Line } from "recharts";
import { Tooltip } from "../components/ui/Tooltip";
import { CustomerProfileModal } from "../components/CustomerProfileModal";

export default function CustomerIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter customers based on search and filters
  const filteredCustomers = sampleCustomers.filter(customer => {
    const matchesSearch = searchQuery === "" ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === "all" || customer.membershipTier === selectedTier;
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  // Membership tier breakdown for chart
  const tierData = [
    { name: "VIP", value: customerStats.membershipBreakdown.vip, color: "var(--pink)" },
    { name: "Gold", value: customerStats.membershipBreakdown.gold, color: "var(--terra)" },
    { name: "Silver", value: customerStats.membershipBreakdown.silver, color: "var(--buff-dark)" },
    { name: "Bronze", value: customerStats.membershipBreakdown.bronze, color: "var(--green-mid)" },
    { name: "Non-member", value: customerStats.membershipBreakdown.nonMember, color: "var(--text-tertiary)" },
  ];

  // Segment distribution data
  const segmentData = rfmSegments.map(seg => ({
    name: seg.name,
    value: seg.count,
    color: seg.color
  }));

  // Activity trend data (mock 30-day trend)
  const activityTrendData = [
    { day: "Day 1", active: 12100, atRisk: 9650, churned: 8020 },
    { day: "Day 5", active: 12280, atRisk: 9720, churned: 8035 },
    { day: "Day 10", active: 12350, atRisk: 9780, churned: 8042 },
    { day: "Day 15", active: 12420, atRisk: 9810, churned: 8048 },
    { day: "Day 20", active: 12390, atRisk: 9795, churned: 8050 },
    { day: "Day 25", active: 12440, atRisk: 9820, churned: 8051 },
    { day: "Day 30", active: 12456, atRisk: 9834, churned: 8052 },
  ];

  // Purchase rate data
  const purchaseRateData = [
    { segment: "Champions", rate: 85, avgDays: 12 },
    { segment: "Loyal", rate: 72, avgDays: 18 },
    { segment: "Potential", rate: 58, avgDays: 24 },
    { segment: "New", rate: 45, avgDays: 30 },
    { segment: "At Risk", rate: 28, avgDays: 68 },
    { segment: "Hibernating", rate: 12, avgDays: 142 },
  ];

  // Sentiment data (mock)
  const sentimentData = [
    { name: "Positive", value: 72, color: "var(--green)" },
    { name: "Neutral", value: 21, color: "var(--buff-dark)" },
    { name: "Negative", value: 7, color: "var(--terra)" },
  ];

  const tierBadgeColors: Record<string, { bg: string; text: string }> = {
    "VIP": { bg: "var(--pink-light)", text: "var(--pink)" },
    "Gold": { bg: "var(--terra-light)", text: "var(--terra)" },
    "Silver": { bg: "var(--buff)", text: "var(--buff-dark)" },
    "Bronze": { bg: "var(--green-light)", text: "var(--green-mid)" },
    "Non-member": { bg: "var(--surface)", text: "var(--text-tertiary)" },
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    "Active": { bg: "var(--green-light)", text: "var(--green)" },
    "At Risk": { bg: "var(--terra-light)", text: "var(--terra)" },
    "Churned": { bg: "var(--text-tertiary)", text: "white" },
    "New": { bg: "var(--pink-light)", text: "var(--pink)" },
  };

  return (
    <div>
      <PageHeader
        label="Intelligence · Customer Database"
        title="Customer Intelligence"
        description="360° customer profiling, journey tracking, relationship management, and support integration. Comprehensive view across all customer touchpoints and data sources."
        backgroundGradient="pink"
        stats={[
          { label: "Total Customers", value: customerStats.totalCustomers.toLocaleString() },
          { label: "Active Members", value: customerStats.totalMembers.toLocaleString() },
          { label: "Avg CLV", value: `$${customerStats.averageCLV.toLocaleString()}` },
          { label: "VIP Tier", value: `${((customerStats.membershipBreakdown.vip / customerStats.totalMembers) * 100).toFixed(1)}%` },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* Meta Reporting Widgets */}
        <div className="grid grid-cols-4 gap-6">
          {/* Sentiment Analysis Widget */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Sentiment Analysis</CardTitle>
            </div>
            <div className="mb-4">
              <div className="text-[28px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                72%
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">Positive sentiment</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {sentimentData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--text-secondary)]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Overview Widget */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[var(--green)]" />
              <CardTitle>Activity Overview</CardTitle>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[var(--text-secondary)]">Active (30d)</span>
                  <span className="text-[14px] font-semibold text-[var(--green)]">{customerStats.activeCustomers30d.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--green)]" style={{ width: `${(customerStats.activeCustomers30d / customerStats.totalCustomers) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[var(--text-secondary)]">At Risk</span>
                  <span className="text-[14px] font-semibold text-[var(--terra)]">{customerStats.atRiskCustomers.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--terra)]" style={{ width: `${(customerStats.atRiskCustomers / customerStats.totalCustomers) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[var(--text-secondary)]">Churned</span>
                  <span className="text-[14px] font-semibold text-[var(--text-tertiary)]">{customerStats.churnedCustomers.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--text-tertiary)]" style={{ width: `${(customerStats.churnedCustomers / customerStats.totalCustomers) * 100}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <div className="text-[11px] text-[var(--text-secondary)]">Trend (30 days)</div>
              <div className="text-[13px] font-medium text-[var(--green)] mt-1">+2.8% Active</div>
            </div>
          </Card>

          {/* Purchase Rate Analysis Widget */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-[var(--terra)]" />
              <CardTitle>Purchase Rates</CardTitle>
            </div>
            <div className="mb-4">
              <div className="text-[28px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                64%
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">Repeat purchase rate</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-secondary)]">Avg Frequency</span>
                <span className="font-medium text-[var(--text-primary)]">3.2 orders/year</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-secondary)]">Avg Time Between</span>
                <span className="font-medium text-[var(--text-primary)]">42 days</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-secondary)]">90-day Retention</span>
                <span className="font-medium text-[var(--green)]">78%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <div className="text-[11px] text-[var(--text-secondary)]">Champions purchase every</div>
              <div className="text-[13px] font-medium text-[var(--pink)] mt-1">12 days avg</div>
            </div>
          </Card>

          {/* Segment Distribution Widget */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[var(--buff-dark)]" />
              <CardTitle>RFM Segments</CardTitle>
            </div>
            <div className="mb-4">
              <div className="text-[28px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {rfmSegments.length}
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">Active segments</div>
            </div>
            <div className="space-y-2">
              {rfmSegments.slice(0, 4).map((segment, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <Tooltip
                    content={
                      <div className="max-w-xs">
                        <div className="font-semibold mb-1">{segment.name}</div>
                        <div className="mb-1">{segment.description}</div>
                        <div className="text-[10px] opacity-80">Logic: {segment.logic}</div>
                      </div>
                    }
                  >
                    <div className="flex items-center gap-2 cursor-help">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="text-[var(--text-secondary)]">{segment.name}</span>
                    </div>
                  </Tooltip>
                  <span className="font-medium text-[var(--text-primary)]">{segment.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <div className="text-[11px] text-[var(--text-secondary)]">Top segment</div>
              <div className="text-[13px] font-medium text-[var(--pink)] mt-1">New Customers (15.6K)</div>
            </div>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search by name, email, or customer ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
              />
            </div>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2.5 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            >
              <option value="all">All Tiers</option>
              <option value="VIP">VIP</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
              <option value="Non-member">Non-member</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="At Risk">At Risk</option>
              <option value="Churned">Churned</option>
              <option value="New">New</option>
            </select>

            {/* Advanced Search Button */}
            <button className="px-4 py-2.5 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced
            </button>

            {/* Export Button */}
            <button className="px-4 py-2.5 bg-[var(--green)] text-white rounded-[var(--radius-md)] text-[14px] font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
            <div className="text-[13px] text-[var(--text-secondary)]">
              Showing <span className="font-medium text-[var(--text-primary)]">{filteredCustomers.length}</span> of <span className="font-medium text-[var(--text-primary)]">{sampleCustomers.length}</span> customers
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-[var(--radius-md)] transition-colors ${
                  viewMode === "list"
                    ? "bg-[var(--pink)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-[var(--radius-md)] transition-colors ${
                  viewMode === "card"
                    ? "bg-[var(--pink)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                }`}
              >
                Card View
              </button>
            </div>
          </div>
        </Card>

        {/* Customer Table */}
        <Card>
          <CardTitle className="mb-6">Customer Database</CardTitle>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Tier</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Orders</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">CLV</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">RFM</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Last Purchase</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => {
                  const tierStyle = tierBadgeColors[customer.membershipTier];
                  const statusStyle = statusColors[customer.status];

                  return (
                    <tr key={customer.id} className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-[14px] font-medium text-[var(--text-primary)]">{customer.name}</div>
                          <div className="text-[12px] text-[var(--text-secondary)]">{customer.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className="inline-flex px-2 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: tierStyle.bg, color: tierStyle.text }}
                        >
                          {customer.membershipTier}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-[14px] font-medium text-[var(--text-primary)]">{customer.totalOrders}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-[14px] font-medium text-[var(--green)]">${customer.clv.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="text-[13px] font-mono text-[var(--text-primary)]">
                            {customer.rfmScore.recency}{customer.rfmScore.frequency}{customer.rfmScore.monetary}
                          </div>
                          <Tooltip
                            content={
                              <div className="max-w-xs">
                                <div className="font-semibold mb-1">{customer.rfmScore.segment}</div>
                                <div className="mb-1">{rfmSegments.find(s => s.name === customer.rfmScore.segment)?.description}</div>
                                <div className="text-[10px] opacity-80">Logic: {rfmSegments.find(s => s.name === customer.rfmScore.segment)?.logic}</div>
                              </div>
                            }
                          >
                            <div className="text-[11px] text-[var(--text-secondary)] cursor-help">{customer.rfmScore.segment}</div>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-[13px] text-[var(--text-secondary)]">{customer.lastPurchaseDate}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className="inline-flex px-2 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                        >
                          {customer.status}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] text-[12px] font-medium hover:opacity-90 transition-opacity"
                          >
                            View Profile
                          </button>
                          <button className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--pink)] transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--green)] transition-colors">
                            <Gift className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Customer Profile Modal */}
      <CustomerProfileModal
        show={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
}

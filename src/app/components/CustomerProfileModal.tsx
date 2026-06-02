import { useState } from "react";
import { X, User, ShoppingBag, TrendingUp, BarChart3, Headphones, Zap, Mail, Gift, Edit, Calendar, Phone, MapPin, Award, Package } from "lucide-react";
import { Customer, SupportTicket, sampleSupportTickets } from "../data/customerData";
import { SupportTicketModal } from "./SupportTicketModal";
import { CreateSupportTicketModal } from "./CreateSupportTicketModal";
import { EmailComposerModal } from "./EmailComposerModal";
import { DiscountCodeModal } from "./DiscountCodeModal";

interface CustomerProfileModalProps {
  show: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export function CustomerProfileModal({ show, onClose, customer }: CustomerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "purchases" | "journey" | "rfm" | "support" | "actions">("overview");
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  if (!show || !customer) return null;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: User },
    { id: "purchases" as const, label: "Purchase History", icon: ShoppingBag },
    { id: "journey" as const, label: "Journey", icon: TrendingUp },
    { id: "rfm" as const, label: "RFM Analysis", icon: BarChart3 },
    { id: "support" as const, label: "Support", icon: Headphones },
    { id: "actions" as const, label: "Actions", icon: Zap },
  ];

  const tierColors: Record<string, { bg: string; text: string }> = {
    "VIP": { bg: "var(--pink-light)", text: "var(--pink)" },
    "Gold": { bg: "var(--terra-light)", text: "var(--terra)" },
    "Silver": { bg: "var(--buff)", text: "var(--buff-dark)" },
    "Bronze": { bg: "var(--green-light)", text: "var(--green-mid)" },
    "Non-member": { bg: "var(--surface)", text: "var(--text-tertiary)" },
  };

  const tierStyle = tierColors[customer.membershipTier];

  // Mock purchase history
  const mockPurchases = [
    { date: "2026-04-22", orderId: "ORD-48912", items: ["Silk Midi Dress", "Leather Tote"], total: 425, discount: "WELCOME15" },
    { date: "2026-03-15", orderId: "ORD-47856", items: ["Cashmere Cardigan", "Linen Trousers"], total: 398, discount: null },
    { date: "2026-02-08", orderId: "ORD-46234", items: ["Wool Coat"], total: 385, discount: null },
    { date: "2026-01-12", orderId: "ORD-44892", items: ["Knitwear Set", "Accessories"], total: 312, discount: "NEWYEAR10" },
  ];

  // Mock journey events
  const mockJourneyEvents = [
    { date: "2026-04-22", type: "Purchase", details: "Silk Midi Dress ($245)", source: "Direct" },
    { date: "2026-04-20", type: "Cart Add", details: "Silk Midi Dress", source: "Instagram" },
    { date: "2026-04-20", type: "Page View", details: "Dresses Collection Page", source: "Instagram Ad" },
    { date: "2026-04-19", type: "Ad Click", details: "Meta Campaign: Spring Collection", source: "Meta" },
    { date: "2026-03-15", type: "Purchase", details: "Cashmere Cardigan ($198)", source: "Direct" },
    { date: "2026-03-14", type: "Discount Used", details: "Code: LOYAL10 (10% off)", source: "Email" },
    { date: "2026-03-10", type: "Tier Upgrade", details: "Silver → Gold", source: "Loyalty" },
  ];

  // Get customer's support tickets
  const customerTickets = sampleSupportTickets.filter(ticket => ticket.customerId === customer.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="border-b border-[var(--border-color)] p-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-[24px] font-bold" style={{ fontFamily: "var(--font-serif)" }}>
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Customer Info */}
            <div>
              <h2 className="text-[24px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                {customer.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="px-2 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider"
                  style={{ backgroundColor: tierStyle.bg, color: tierStyle.text, fontFamily: "var(--font-mono)" }}
                >
                  {customer.membershipTier}
                </div>
                <span className="text-[13px] text-[var(--text-secondary)]">ID: {customer.id}</span>
                <span className="text-[13px] text-[var(--text-secondary)]">Member since {customer.memberSince}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-[12px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {customer.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {customer.location}
                </div>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-[var(--border-color)] px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[var(--pink)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--pink)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Total Orders
                  </div>
                  <div className="text-[24px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {customer.totalOrders}
                  </div>
                </div>
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Total Spend
                  </div>
                  <div className="text-[24px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${customer.totalSpend.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Avg Order Value
                  </div>
                  <div className="text-[24px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${customer.averageOrderValue}
                  </div>
                </div>
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    CLV
                  </div>
                  <div className="text-[24px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${customer.clv.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Membership Progress */}
              <div className="p-5 border border-[var(--border-color)] rounded-[var(--radius-lg)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">Membership Status</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">Points Balance: {customer.pointsBalance.toLocaleString()} pts</p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-[13px] font-medium"
                    style={{ backgroundColor: tierStyle.bg, color: tierStyle.text }}
                  >
                    {customer.membershipTier} Tier
                  </div>
                </div>
                <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    style={{ width: `${Math.min((customer.pointsBalance / 15000) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-[var(--text-secondary)]">
                  <span>0 pts</span>
                  <span>Next tier at 15,000 pts</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">Email</div>
                          <div className="text-[13px] text-[var(--text-primary)]">{customer.email}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">Phone</div>
                          <div className="text-[13px] text-[var(--text-primary)]">{customer.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">Location</div>
                          <div className="text-[13px] text-[var(--text-primary)]">{customer.location}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">Birthday</div>
                          <div className="text-[13px] text-[var(--text-primary)]">{customer.birthday}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-3">Preferences</h3>
                    <div>
                      <div className="text-[12px] text-[var(--text-tertiary)] mb-2">Preferred Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {customer.preferredCategories.map((cat, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 bg-[var(--pink-light)] text-[var(--pink)] rounded-full text-[11px] font-medium"
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-[12px] text-[var(--text-tertiary)] mb-2">Last Purchase</div>
                      <div className="text-[13px] text-[var(--text-primary)]">{customer.lastPurchaseDate}</div>
                    </div>
                    <div className="mt-4">
                      <div className="text-[12px] text-[var(--text-tertiary)] mb-2">Customer Status</div>
                      <div className="text-[13px] font-medium text-[var(--green)]">{customer.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase History Tab */}
          {activeTab === "purchases" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Purchase History</h3>
                <div className="text-[13px] text-[var(--text-secondary)]">
                  {mockPurchases.length} orders • ${customer.totalSpend.toLocaleString()} total
                </div>
              </div>

              {mockPurchases.map((purchase, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{purchase.orderId}</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{purchase.date}</div>
                    </div>
                    <div className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      ${purchase.total}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {purchase.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="px-2 py-1 bg-[var(--surface)] text-[var(--text-primary)] rounded text-[12px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {purchase.discount && (
                    <div className="flex items-center gap-2 text-[12px]">
                      <Gift className="w-3.5 h-3.5 text-[var(--terra)]" />
                      <span className="text-[var(--text-secondary)]">Discount code used:</span>
                      <span className="font-medium text-[var(--terra)]">{purchase.discount}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Journey Tracking Tab */}
          {activeTab === "journey" && (
            <div className="space-y-4">
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-4">Customer Journey Timeline</h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />

                {/* Events */}
                <div className="space-y-6">
                  {mockJourneyEvents.map((event, idx) => (
                    <div key={idx} className="relative flex gap-4 pl-14">
                      {/* Timeline dot */}
                      <div className="absolute left-4 w-5 h-5 rounded-full bg-[var(--pink)] border-4 border-white" />

                      {/* Event card */}
                      <div className="flex-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-[14px] font-medium text-[var(--text-primary)]">{event.type}</div>
                            <div className="text-[13px] text-[var(--text-secondary)]">{event.details}</div>
                          </div>
                          <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                            {event.date}
                          </div>
                        </div>
                        <div className="text-[11px] text-[var(--text-tertiary)]">Source: {event.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RFM Analysis Tab */}
          {activeTab === "rfm" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">RFM Score Analysis</h3>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Recency, Frequency, Monetary value scoring (1-5 scale, 5 being best)
                </p>
              </div>

              {/* RFM Scores */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 border-2 border-[var(--green)] rounded-[var(--radius-lg)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Recency
                  </div>
                  <div className="text-[36px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {customer.rfmScore.recency}
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)] mt-1">
                    Last purchase: {customer.lastPurchaseDate}
                  </div>
                </div>
                <div className="p-5 border-2 border-[var(--terra)] rounded-[var(--radius-lg)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Frequency
                  </div>
                  <div className="text-[36px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {customer.rfmScore.frequency}
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)] mt-1">
                    {customer.totalOrders} orders total
                  </div>
                </div>
                <div className="p-5 border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Monetary
                  </div>
                  <div className="text-[36px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {customer.rfmScore.monetary}
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)] mt-1">
                    ${customer.totalSpend.toLocaleString()} spent
                  </div>
                </div>
              </div>

              {/* Segment Badge */}
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-[var(--radius-lg)] border border-[var(--pink-light)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] text-[var(--text-secondary)] mb-1">Customer Segment</div>
                    <div className="text-[28px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {customer.rfmScore.segment}
                    </div>
                    <p className="text-[13px] text-[var(--text-primary)] mt-2">
                      {customer.rfmScore.segment === "Champions" && "Your best customers - recent, frequent, high-value purchasers"}
                      {customer.rfmScore.segment === "Loyal Customers" && "Consistent shoppers with good spending habits"}
                      {customer.rfmScore.segment === "Potential Loyalists" && "Recent customers with potential to become loyal"}
                    </p>
                  </div>
                  <Award className="w-20 h-20 text-[var(--pink)]" />
                </div>
              </div>
            </div>
          )}

          {/* Support History Tab */}
          {activeTab === "support" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Support Ticket History</h3>
                <button
                  onClick={() => setShowCreateTicket(true)}
                  className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] text-[13px] font-medium hover:opacity-90 transition-opacity"
                >
                  Create Ticket
                </button>
              </div>

              {customerTickets.length === 0 ? (
                <div className="text-center py-12">
                  <Headphones className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-3" />
                  <div className="text-[14px] text-[var(--text-secondary)]">No support tickets found</div>
                </div>
              ) : (
                customerTickets.map((ticket, idx) => {
                  const statusColors: Record<string, { bg: string; text: string }> = {
                    Open: { bg: "var(--blue-light)", text: "var(--blue)" },
                    "In Progress": { bg: "var(--terra-light)", text: "var(--terra)" },
                    "Waiting on Customer": { bg: "var(--buff)", text: "var(--buff-dark)" },
                    Resolved: { bg: "var(--green-light)", text: "var(--green)" },
                    Closed: { bg: "var(--surface)", text: "var(--text-secondary)" },
                  };

                  const priorityColors = {
                    Low: { bg: "var(--surface)", text: "var(--text-secondary)" },
                    Medium: { bg: "var(--blue-light)", text: "var(--blue)" },
                    High: { bg: "var(--terra-light)", text: "var(--terra)" },
                    Urgent: { bg: "var(--pink-light)", text: "var(--pink)" },
                  };

                  const statusColor = statusColors[ticket.status];
                  const priorityColor = priorityColors[ticket.priority];

                  return (
                    <div
                      key={idx}
                      className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowTicketModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{ticket.subject}</div>
                          <div className="text-[12px] text-[var(--text-secondary)]">
                            #{ticket.id} • {ticket.issueType} • Created {ticket.createdDate}
                          </div>
                          {ticket.assignedTo && (
                            <div className="text-[11px] text-[var(--text-tertiary)] mt-1">
                              Assigned to: {ticket.assignedTo}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <div
                            className="px-2 py-1 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                          >
                            {ticket.status}
                          </div>
                          <div
                            className="px-2 py-1 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: priorityColor.bg, color: priorityColor.text }}
                          >
                            {ticket.priority}
                          </div>
                        </div>
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)] line-clamp-2 mb-2">
                        {ticket.description}
                      </div>
                      <div className="text-[12px] text-[var(--pink)] hover:underline">View Full Details →</div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Actions Tab */}
          {activeTab === "actions" && (
            <div className="space-y-4">
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-4">Customer Actions</h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowEmailComposer(true)}
                  className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--pink)] hover:bg-[var(--pink-light)] transition-all group text-left"
                >
                  <Mail className="w-8 h-8 text-[var(--pink)] mb-3" />
                  <div className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Send Custom Email</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Compose and send personalized email with templates</div>
                </button>

                <button
                  onClick={() => setShowDiscountModal(true)}
                  className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--green)] hover:bg-[var(--green-light)] transition-all group text-left"
                >
                  <Gift className="w-8 h-8 text-[var(--green)] mb-3" />
                  <div className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Add Discount Code</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Create and assign discount code to customer</div>
                </button>

                <button className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--terra)] hover:bg-[var(--terra-light)] transition-all group text-left">
                  <Calendar className="w-8 h-8 text-[var(--terra)] mb-3" />
                  <div className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Send Birthday Gift</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Auto-send birthday discount via Shopify/Yotpo</div>
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-2">Birthday: {customer.birthday}</div>
                </button>

                <button className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--buff-dark)] hover:bg-[var(--buff)] transition-all group text-left">
                  <Award className="w-8 h-8 text-[var(--buff-dark)] mb-3" />
                  <div className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Update Membership</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Manually adjust tier or add bonus points</div>
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-2">Current: {customer.membershipTier}</div>
                </button>

                <button className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--text-primary)] hover:bg-[var(--surface)] transition-all group text-left col-span-2">
                  <Edit className="w-8 h-8 text-[var(--text-primary)] mb-3" />
                  <div className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Add Internal Notes</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Add private notes about customer preferences, interactions, or special requests</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border-color)] p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium">
            Save Changes
          </button>
        </div>
      </div>

      {/* Support Ticket Modals */}
      <CreateSupportTicketModal
        show={showCreateTicket}
        onClose={() => setShowCreateTicket(false)}
        customerName={customer.name}
        customerId={customer.id}
        customerEmail={customer.email}
        onCreateTicket={(ticket) => {
          console.log("Created ticket:", ticket);
          // In real app, this would save to backend
        }}
      />

      {selectedTicket && (
        <SupportTicketModal
          show={showTicketModal}
          onClose={() => {
            setShowTicketModal(false);
            setSelectedTicket(null);
          }}
          ticket={selectedTicket}
          onUpdate={(updatedTicket) => {
            console.log("Updated ticket:", updatedTicket);
            // In real app, this would save to backend
          }}
        />
      )}

      {/* Email Composer Modal */}
      <EmailComposerModal
        show={showEmailComposer}
        onClose={() => setShowEmailComposer(false)}
        customerName={customer.name}
        customerEmail={customer.email}
        onSend={(email) => {
          console.log("Sending email:", email);
          // In real app, this would send via email service
        }}
      />

      {/* Discount Code Modal */}
      <DiscountCodeModal
        show={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        customerName={customer.name}
        customerId={customer.id}
        onCreateDiscount={(discount) => {
          console.log("Created discount:", discount);
          // In real app, this would save to backend and send to Shopify/Yotpo
        }}
      />
    </div>
  );
}

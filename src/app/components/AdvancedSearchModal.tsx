import { X, Search, Calendar, DollarSign, TrendingUp, Award, MapPin } from "lucide-react";
import { useState } from "react";

interface AdvancedSearchModalProps {
  show: boolean;
  onClose: () => void;
  onSearch?: (filters: any) => void;
}

export function AdvancedSearchModal({ show, onClose, onSearch }: AdvancedSearchModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [membershipTiers, setMembershipTiers] = useState<string[]>([]);
  const [customerStatus, setCustomerStatus] = useState<string[]>([]);
  const [rfmSegments, setRfmSegments] = useState<string[]>([]);
  const [joinDateFrom, setJoinDateFrom] = useState("");
  const [joinDateTo, setJoinDateTo] = useState("");
  const [lastPurchaseFrom, setLastPurchaseFrom] = useState("");
  const [lastPurchaseTo, setLastPurchaseTo] = useState("");
  const [clvMin, setClvMin] = useState("");
  const [clvMax, setClvMax] = useState("");
  const [totalSpendMin, setTotalSpendMin] = useState("");
  const [totalSpendMax, setTotalSpendMax] = useState("");
  const [ordersMin, setOrdersMin] = useState("");
  const [ordersMax, setOrdersMax] = useState("");
  const [location, setLocation] = useState("");

  if (!show) return null;

  const handleTierToggle = (tier: string) => {
    setMembershipTiers(prev =>
      prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
    );
  };

  const handleStatusToggle = (status: string) => {
    setCustomerStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleSegmentToggle = (segment: string) => {
    setRfmSegments(prev =>
      prev.includes(segment) ? prev.filter(s => s !== segment) : [...prev, segment]
    );
  };

  const handleSearch = () => {
    const filters = {
      customerName,
      customerEmail,
      membershipTiers,
      customerStatus,
      rfmSegments,
      joinDateFrom,
      joinDateTo,
      lastPurchaseFrom,
      lastPurchaseTo,
      clvMin: clvMin ? parseFloat(clvMin) : null,
      clvMax: clvMax ? parseFloat(clvMax) : null,
      totalSpendMin: totalSpendMin ? parseFloat(totalSpendMin) : null,
      totalSpendMax: totalSpendMax ? parseFloat(totalSpendMax) : null,
      ordersMin: ordersMin ? parseInt(ordersMin) : null,
      ordersMax: ordersMax ? parseInt(ordersMax) : null,
      location,
    };

    if (onSearch) {
      onSearch(filters);
    }

    onClose();
  };

  const handleReset = () => {
    setCustomerName("");
    setCustomerEmail("");
    setMembershipTiers([]);
    setCustomerStatus([]);
    setRfmSegments([]);
    setJoinDateFrom("");
    setJoinDateTo("");
    setLastPurchaseFrom("");
    setLastPurchaseTo("");
    setClvMin("");
    setClvMax("");
    setTotalSpendMin("");
    setTotalSpendMax("");
    setOrdersMin("");
    setOrdersMax("");
    setLocation("");
  };

  const tiers = ["VIP", "Gold", "Silver", "Bronze", "Non-member"];
  const statuses = ["Active", "At Risk", "Churned", "New"];
  const segments = ["Champions", "Loyal Customers", "Potential Loyalists", "New Customers", "At Risk", "Can't Lose Them", "Hibernating", "Lost Customers"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-2xl">Advanced Customer Search</h2>
              <p className="text-gray-600 mt-1">Filter customers using multiple criteria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-sm mb-3 text-gray-500">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Search by email..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Membership Tier */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Membership Tier
              </h3>
              <div className="flex flex-wrap gap-2">
                {tiers.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => handleTierToggle(tier)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      membershipTiers.includes(tier)
                        ? "border-purple-600 bg-purple-50 text-purple-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Status */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Customer Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusToggle(status)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      customerStatus.includes(status)
                        ? "border-purple-600 bg-purple-50 text-purple-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* RFM Segments */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700">RFM Segments</h3>
              <div className="flex flex-wrap gap-2">
                {segments.map((segment) => (
                  <button
                    key={segment}
                    onClick={() => handleSegmentToggle(segment)}
                    className={`px-3 py-1.5 rounded-lg border-2 text-sm transition-all ${
                      rfmSegments.includes(segment)
                        ? "border-purple-600 bg-purple-50 text-purple-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {segment}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Ranges */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Ranges
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Join Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={joinDateFrom}
                      onChange={(e) => setJoinDateFrom(e.target.value)}
                      placeholder="From"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="date"
                      value={joinDateTo}
                      onChange={(e) => setJoinDateTo(e.target.value)}
                      placeholder="To"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Last Purchase Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={lastPurchaseFrom}
                      onChange={(e) => setLastPurchaseFrom(e.target.value)}
                      placeholder="From"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="date"
                      value={lastPurchaseTo}
                      onChange={(e) => setLastPurchaseTo(e.target.value)}
                      placeholder="To"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Value Ranges */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Value Ranges
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Customer Lifetime Value</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={clvMin}
                      onChange={(e) => setClvMin(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="number"
                      value={clvMax}
                      onChange={(e) => setClvMax(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Total Spend</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={totalSpendMin}
                      onChange={(e) => setTotalSpendMin(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="number"
                      value={totalSpendMax}
                      onChange={(e) => setTotalSpendMax(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Total Orders</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={ordersMin}
                      onChange={(e) => setOrdersMin(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="number"
                      value={ordersMax}
                      onChange={(e) => setOrdersMax(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm mb-3 text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </h3>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Sydney, Melbourne, Brisbane..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleReset}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

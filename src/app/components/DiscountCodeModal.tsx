import { X, Gift, Calendar, Percent, DollarSign, Tag, Users } from "lucide-react";
import { useState } from "react";

interface DiscountCodeModalProps {
  show: boolean;
  onClose: () => void;
  customerName: string;
  customerId: string;
  onCreateDiscount?: (discount: any) => void;
}

export function DiscountCodeModal({ show, onClose, customerName, customerId, onCreateDiscount }: DiscountCodeModalProps) {
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [code, setCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [usageLimit, setUsageLimit] = useState("1");
  const [reason, setReason] = useState("");

  if (!show) return null;

  const generateCode = () => {
    const randomCode = `FEMME${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setCode(randomCode);
  };

  const handleCreate = () => {
    if (!code.trim() || !discountValue || !expiryDate) {
      return;
    }

    const discount = {
      code,
      type: discountType,
      value: parseFloat(discountValue),
      customerId,
      customerName,
      expiryDate,
      minPurchase: minPurchase ? parseFloat(minPurchase) : null,
      usageLimit: parseInt(usageLimit),
      reason,
      createdAt: new Date().toISOString().split("T")[0],
      used: 0,
    };

    if (onCreateDiscount) {
      onCreateDiscount(discount);
    }

    // Reset form
    setDiscountType("percentage");
    setDiscountValue("");
    setCode("");
    setExpiryDate("");
    setMinPurchase("");
    setUsageLimit("1");
    setReason("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Create Discount Code</h2>
            <p className="text-gray-600 mt-1">For customer: {customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Discount Type */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Discount Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDiscountType("percentage")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  discountType === "percentage"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Percent className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-medium">Percentage Off</div>
                <div className="text-xs text-gray-500 mt-1">e.g., 15% off</div>
              </button>
              <button
                onClick={() => setDiscountType("fixed")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  discountType === "fixed"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <DollarSign className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-medium">Fixed Amount</div>
                <div className="text-xs text-gray-500 mt-1">e.g., $20 off</div>
              </button>
            </div>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Discount Value <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {discountType === "percentage" ? "%" : "$"}
              </div>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "percentage" ? "15" : "20"}
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Discount Code */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Discount Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="WELCOME15"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                />
              </div>
              <button
                onClick={generateCode}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Usage Limit</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  min="1"
                  placeholder="1"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Minimum Purchase */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Minimum Purchase Amount (Optional)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value)}
                placeholder="50"
                min="0"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Reason for Discount (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Apology for delayed shipping, Birthday gift, VIP reward..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Preview */}
          {code && discountValue && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900">Discount Preview</div>
                  <div className="text-sm text-gray-700 mt-1">
                    Code <span className="font-mono font-bold">{code}</span> gives{" "}
                    <span className="font-bold">
                      {discountType === "percentage" ? `${discountValue}%` : `$${discountValue}`}
                    </span>{" "}
                    off
                    {minPurchase && ` on orders over $${minPurchase}`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Valid until {expiryDate} • Can be used {usageLimit} time{parseInt(usageLimit) !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!code.trim() || !discountValue || !expiryDate}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Discount
          </button>
        </div>
      </div>
    </div>
  );
}

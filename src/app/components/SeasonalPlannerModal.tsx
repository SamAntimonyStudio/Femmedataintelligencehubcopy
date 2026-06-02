import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";

interface SeasonalPlannerModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: SeasonalItemData) => void;
}

export interface SeasonalItemData {
  itemName: string;
  category: string;
  season: string;
  images: string[];
  influences: string;
  notes: string;
}

export function SeasonalPlannerModal({ show, onClose, onSubmit }: SeasonalPlannerModalProps) {
  const [formData, setFormData] = useState<SeasonalItemData>({
    itemName: "",
    category: "",
    season: "",
    images: [],
    influences: "",
    notes: ""
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  if (!show) return null;

  const categories = [
    "Dresses",
    "Knitwear",
    "Outerwear",
    "Bottoms",
    "Accessories",
    "Tops",
    "Footwear"
  ];

  const seasons = [
    "Spring/Summer 2027 (Sept 2026 - Jan 2027)",
    "Autumn/Winter 2027 (April - July 2027)",
    "Spring/Summer 2028 (Sept 2027 - Jan 2028)",
    "Autumn/Winter 2028 (April - July 2028)"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imagePreviews = fileArray.map(file => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...imagePreviews]);
      setFormData({
        ...formData,
        images: [...formData.images, ...fileArray.map(f => f.name)]
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreview(newPreviews);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      itemName: "",
      category: "",
      season: "",
      images: [],
      influences: "",
      notes: ""
    });
    setImagePreview([]);
    onClose();
  };

  const isFormValid = formData.itemName && formData.category && formData.season;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              Add Seasonal Item
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">Plan new product for upcoming season</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
              Item Name *
            </label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              placeholder="e.g., Linen Wide-Leg Trousers"
              className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
              required
            />
          </div>

          {/* Category & Season */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
                required
              >
                <option value="">Select category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                Season *
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
                required
              >
                <option value="">Select season...</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
              Reference Images
            </label>
            <p className="text-[12px] text-[var(--text-secondary)] mb-3">
              Upload inspiration images, mood boards, or competitor references
            </p>

            <div className="border-2 border-dashed border-[var(--border-color)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--pink)] transition-colors">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-[var(--text-tertiary)] mb-2" />
                <span className="text-[14px] text-[var(--text-primary)] font-medium mb-1">
                  Click to upload images
                </span>
                <span className="text-[12px] text-[var(--text-tertiary)]">
                  PNG, JPG, WEBP up to 10MB each
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {imagePreview.map((preview, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-[var(--radius-md)] border border-[var(--border-color)]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--pink)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Influences */}
          <div>
            <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
              Design Influences
            </label>
            <p className="text-[12px] text-[var(--text-secondary)] mb-3">
              Describe where the inspiration comes from (brands, trends, locations, etc.)
            </p>
            <textarea
              value={formData.influences}
              onChange={(e) => setFormData({ ...formData, influences: e.target.value })}
              placeholder="e.g., Inspired by Sézane's relaxed silhouettes and earth-tone palette. European summer aesthetic with focus on natural fabrics and timeless cuts. References: Mediterranean coastal style, minimalist Scandinavian design."
              rows={4}
              className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all resize-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Target price point $95-$125. Consider sustainable linen suppliers. High demand based on competitor analysis showing 340% YoY growth in linen category."
              rows={3}
              className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[15px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium flex items-center justify-center gap-2 transition-opacity ${
                isFormValid
                  ? 'bg-[var(--pink)] text-white hover:opacity-90'
                  : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
              }`}
            >
              <Plus className="w-5 h-5" />
              Add to Seasonal Planner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  type: "tool" | "product" | "affiliate" | "post" | null;
  initialData: any;
}

export function AdminModal({ isOpen, onClose, onSave, type, initialData }: AdminModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (initialData) {
        // Prepare tags for input display
        let tagsVal = "";
        if (initialData.tags) {
          tagsVal = Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : initialData.tags;
        }
        setFormData({
          ...initialData,
          tags: tagsVal,
        });
      } else {
        // Set default values based on type
        if (type === "tool") {
          setFormData({ status: "live", tags: "", icon: "⚡" });
        } else if (type === "product") {
          setFormData({ price: 0, status: "active", tags: "", rating: 5 });
        } else if (type === "affiliate") {
          setFormData({ logo_url: "🔗", featured: false });
        } else if (type === "post") {
          setFormData({ published: true, category: "Article" });
        }
      }
    }
  }, [isOpen, initialData, type]);

  if (!isOpen || !type) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: fieldType } = e.target;
    
    if (fieldType === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev: any) => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (url: string, fieldName = "image_url") => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format tags from comma-separated string to array
    const formattedData = { ...formData };
    if (typeof formattedData.tags === "string") {
      formattedData.tags = formattedData.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0);
    }

    // Convert numbers
    if (formattedData.price !== undefined) {
      formattedData.price = Number(formattedData.price);
    }
    if (formattedData.rating !== undefined) {
      formattedData.rating = Number(formattedData.rating);
    }

    // Strict schema whitelisting to prevent database errors (like missing columns)
    const allowedColumns: Record<string, string[]> = {
      tool: ["id", "name", "tagline", "description", "status", "tags", "href", "icon", "image_url", "featured"],
      product: ["id", "title", "description", "price", "currency", "image_url", "purchase_url", "category", "featured", "status", "tags", "rating", "badge"],
      affiliate: ["id", "name", "description", "url", "category", "logo_url", "image_url", "recommendation", "featured", "discount"],
      post: ["id", "title", "slug", "excerpt", "content", "image_url", "category", "published", "published_at"]
    };

    const columns = allowedColumns[type];
    const cleanedData: any = {};
    for (const key of Object.keys(formattedData)) {
      if (columns.includes(key)) {
        cleanedData[key] = formattedData[key];
      }
    }

    try {
      const method = initialData?.id ? "PUT" : "POST";
      const endpoint = `/api/admin/${type === "affiliate" ? "affiliates" : type + "s"}`;
      
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const result = await res.json();
      if (result.success) {
        onSave();
        onClose();
      } else {
        setError(result.error || "Save failed");
      }
    } catch {
      setError("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border-4 border-black bg-[#f4f1ea] p-6 shadow-gumroad-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
          <h2 className="font-heading text-2xl font-black text-black">
            {initialData?.id ? "Edit" : "Add New"} {type.toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border-2 border-black bg-white p-1 text-black shadow-gumroad-sm hover:scale-105 transition-transform"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border-2 border-black bg-red-100 p-3 font-bold text-red-700 shadow-gumroad-sm">
              {error}
            </div>
          )}

          {/* Render inputs based on type */}
          {type === "tool" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Name *</label>
                  <input required name="name" value={formData.name || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Tagline</label>
                  <input name="tagline" value={formData.tagline || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Description *</label>
                <textarea required name="description" value={formData.description || ""} onChange={handleChange} rows={3} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none resize-none" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Status</label>
                  <select name="status" value={formData.status || "live"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none">
                    <option value="live">Live</option>
                    <option value="beta">Beta</option>
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Emoji Icon</label>
                  <input name="icon" value={formData.icon || "⚡"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">URL (href)</label>
                  <input name="href" value={formData.href || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Tags (comma-separated)</label>
                <input name="tags" value={formData.tags || ""} onChange={handleChange} placeholder="e.g. AI, Content, Automation" className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
              </div>

              <div className="flex gap-4">
                <ImageUploader label="Cover Image" value={formData.image_url} onChange={(url) => handleImageChange(url, "image_url")} />
                <div className="flex items-center mt-8">
                  <label className="flex items-center gap-2 cursor-pointer font-black text-black text-sm">
                    <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleChange} className="h-5 w-5 border-2 border-black rounded" />
                    Featured Tool
                  </label>
                </div>
              </div>
            </>
          )}

          {type === "product" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Title *</label>
                  <input required name="title" value={formData.title || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Purchase URL (Gumroad/Stripe)</label>
                  <input name="purchase_url" value={formData.purchase_url || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Description *</label>
                <textarea required name="description" value={formData.description || ""} onChange={handleChange} rows={3} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none resize-none" />
              </div>

              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Price ($) *</label>
                  <input type="number" step="0.01" required name="price" value={formData.price ?? 0} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" step="0.1" name="rating" value={formData.rating ?? 5} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Badge (e.g. Popular)</label>
                  <input name="badge" value={formData.badge || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Status</label>
                  <select name="status" value={formData.status || "active"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Category</label>
                  <input name="category" value={formData.category || "Templates"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Tags (comma-separated)</label>
                  <input name="tags" value={formData.tags || ""} onChange={handleChange} placeholder="e.g. Notion, Guide, PDF" className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div className="flex gap-4">
                <ImageUploader label="Cover Image" value={formData.image_url} onChange={(url) => handleImageChange(url, "image_url")} />
                <div className="flex items-center mt-8">
                  <label className="flex items-center gap-2 cursor-pointer font-black text-black text-sm">
                    <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleChange} className="h-5 w-5 border-2 border-black rounded" />
                    Featured Product
                  </label>
                </div>
              </div>
            </>
          )}

          {type === "affiliate" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Name *</label>
                  <input required name="name" value={formData.name || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Affiliate Link URL *</label>
                  <input required name="url" value={formData.url || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Short Description *</label>
                <textarea required name="description" value={formData.description || ""} onChange={handleChange} rows={2} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Why I Recommend It (Quote Box) *</label>
                <textarea required name="recommendation" value={formData.recommendation || ""} onChange={handleChange} rows={2} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none resize-none" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Category</label>
                  <input name="category" value={formData.category || "Recommendations"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Discount Tag (e.g. Free Tier)</label>
                  <input name="discount" value={formData.discount || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Emoji Icon / Logo (if no upload)</label>
                  <input name="logo_url" value={formData.logo_url || "🔗"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div className="flex gap-4">
                <ImageUploader label="Custom Logo Upload" value={formData.image_url} onChange={(url) => handleImageChange(url, "image_url")} />
                <div className="flex items-center mt-8">
                  <label className="flex items-center gap-2 cursor-pointer font-black text-black text-sm">
                    <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleChange} className="h-5 w-5 border-2 border-black rounded" />
                    Featured Recommendation
                  </label>
                </div>
              </div>
            </>
          )}

          {type === "post" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Title *</label>
                  <input required name="title" value={formData.title || ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Category</label>
                  <input name="category" value={formData.category || "Article"} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Slug (auto-generated if empty)</label>
                  <input name="slug" value={formData.slug || ""} onChange={handleChange} placeholder="e.g. how-i-build-ai-tools" className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Published At Date</label>
                  <input type="date" name="published_at" value={formData.published_at ? formData.published_at.substring(0,10) : ""} onChange={handleChange} className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Excerpt *</label>
                <textarea required name="excerpt" value={formData.excerpt || ""} onChange={handleChange} rows={2} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1">Content (Markdown / Text) *</label>
                <textarea required name="content" value={formData.content || ""} onChange={handleChange} rows={6} className="w-full rounded-xl border-2 border-black bg-white p-3 font-bold text-black focus:outline-none" />
              </div>

              <div className="flex gap-4">
                <ImageUploader label="Cover Image" value={formData.image_url} onChange={(url) => handleImageChange(url, "image_url")} />
                <div className="flex items-center mt-8">
                  <label className="flex items-center gap-2 cursor-pointer font-black text-black text-sm">
                    <input type="checkbox" name="published" checked={!!formData.published} onChange={handleChange} className="h-5 w-5 border-2 border-black rounded" />
                    Published
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 border-t-3 border-black pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-gumroad bg-white px-5 py-2 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-gumroad bg-[#ffc700] hover:bg-[#ff9f0a] px-6 py-2 text-xs gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

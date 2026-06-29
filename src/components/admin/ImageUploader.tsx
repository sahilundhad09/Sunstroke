"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Upload Image" }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-black text-black">{label}</label>
      
      {value ? (
        <div className="relative inline-block rounded-xl border-3 border-black bg-white p-2 shadow-gumroad-sm">
          <div className="relative h-32 w-32 overflow-hidden rounded-lg">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full border-2 border-black bg-white p-1 text-black shadow-gumroad-sm transition-transform hover:scale-110"
          >
            <X className="h-3 w-3 stroke-[3]" />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-xl border-3 border-dashed border-black bg-white transition-all hover:bg-zinc-50 shadow-gumroad-sm">
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-black" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-black stroke-[2.5] mb-1" />
              <span className="text-[10px] font-mono font-black uppercase text-black">Upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={loading}
          />
        </label>
      )}
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
}

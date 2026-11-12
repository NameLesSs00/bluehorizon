"use client";

interface ProjectInitialPhotosFieldProps {
  initialImages: File[];
  setInitialImages: (files: File[]) => void;
}

export default function ProjectInitialPhotosField({
  initialImages,
  setInitialImages,
}: ProjectInitialPhotosFieldProps) {
  return (
    <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#145C4B]">
        Optional Initial Render Photos (Multiple)
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          setInitialImages(files);
        }}
        className="mt-2 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F473A] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#145C4B]"
      />
      {initialImages.length > 0 && (
        <p className="mt-1 text-[11px] text-[#145C4B]">
          {initialImages.length} image(s) selected
        </p>
      )}
    </div>
  );
}


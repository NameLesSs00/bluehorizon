"use client";

interface RentalLocationInitialMediaProps {
  initialImages: File[];
  setInitialImages: (files: File[]) => void;
  initialVideo: File | null;
  setInitialVideo: (file: File | null) => void;
}

export default function RentalLocationInitialMedia({
  initialImages,
  setInitialImages,
  initialVideo,
  setInitialVideo,
}: RentalLocationInitialMediaProps) {
  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Initial Media (Optional)
      </p>

      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Upload Photos
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setInitialImages(Array.from(e.target.files));
            }
          }}
          className="mt-1 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2B5FA6] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#1B3A6B]"
        />
        {initialImages.length > 0 && (
          <p className="mt-1 text-[11px] text-[#2B5FA6]">
            {initialImages.length} photo(s) selected
          </p>
        )}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Upload Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            setInitialVideo(e.target.files?.[0] || null);
          }}
          className="mt-1 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2B5FA6] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#1B3A6B]"
        />
        {initialVideo && (
          <p className="mt-1 text-[11px] text-[#2B5FA6]">
            Selected video: {initialVideo.name}
          </p>
        )}
      </div>
    </div>
  );
}


import Link from "next/link";

export default function AdminNotFoundView() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F3F5F3] px-4 text-center">
      <div className="max-w-md rounded-2xl border border-[#E6EAE7] bg-white p-10 shadow-sm">
        <p
          className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Error 404
        </p>
        <h1
          className="mt-2 text-[32px] font-semibold leading-tight text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Page Not Found
        </h1>
        <p
          className="mt-3 text-[14px] leading-relaxed text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#0F473A] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}


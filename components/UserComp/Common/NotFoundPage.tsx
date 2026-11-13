import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F0F3FA] px-4 py-16 text-center">
      <div className="flex max-w-lg flex-col items-center">
        <span
          className="text-[80px] font-semibold leading-none tracking-[-0.04em] text-[#2B5FA6]/20 sm:text-[110px]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          404
        </span>

        <p
          className="mt-2 text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          PAGE NOT FOUND
        </p>

        <h1
          className="mt-3 text-[28px] font-normal leading-[1.2] tracking-[-0.03em] text-[#202326] sm:text-[36px]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          We couldn’t find that page.
        </h1>

        <p
          className="mt-3 max-w-sm text-[15px] leading-[1.65] text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          The link you followed may be broken, or the page may have been removed.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#2B5FA6] px-8 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}


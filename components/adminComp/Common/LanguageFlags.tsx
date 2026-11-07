export function FlagUK({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="uk-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagGermany({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#D00" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

export function FlagEgypt({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
      <rect width="3" height="0.666" y="0" fill="#CE1126" />
      <rect width="3" height="0.666" y="0.666" fill="#FFF" />
      <rect width="3" height="0.666" y="1.333" fill="#000" />
      <circle cx="1.5" cy="1" r="0.16" fill="#C09A35" />
    </svg>
  );
}

export const UkFlag = FlagUK;
export const GermanyFlag = FlagGermany;
export const EgyptFlag = FlagEgypt;


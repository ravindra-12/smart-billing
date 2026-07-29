export default function PlayStoreIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 2.8 14.1 13 3.6 21.2a1.8 1.8 0 0 1-.6-1.4V4.2c0-.55.18-1.03.5-1.4Z" fill="#00A0FF" />
      <path d="m14.1 13 3.15-3.08 3.7 2.08c1.05.59 1.05 1.45 0 2.04l-3.7 2.08L14.1 13Z" fill="#FFD800" />
      <path d="m3.5 2.8 10.6 10.2 3.15-3.08L5.1 2.2c-.57-.32-1.16-.1-1.6.6Z" fill="#00D639" />
      <path d="m3.6 21.2 10.5-8.2 3.15 3.12L5.1 21.8c-.57.32-1.15.1-1.5-.6Z" fill="#F33F4F" />
    </svg>
  );
}

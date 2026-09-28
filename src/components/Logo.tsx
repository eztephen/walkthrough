export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg className="size-[30px] shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0F5257" />
        <path d="M8 16.5 14.5 10 24 19.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10.5" cy="22" r="2.2" fill="#7FD6CE" />
      </svg>
      <span className="text-[1.08rem] leading-tight font-extrabold tracking-[-0.035em]">
        Walkthrough
        <small className="block text-[0.58rem] font-semibold tracking-[0.17em] text-ink-faint uppercase">
          Inspection reports
        </small>
      </span>
    </div>
  );
}

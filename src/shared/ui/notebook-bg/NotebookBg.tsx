import { useTheme } from "@/shared/config";

export function NotebookBg() {
  const { theme } = useTheme();

  if (theme === "crayon") {
    return (
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="soft-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.15" fill="#7866d5" opacity="0.11" />
            </pattern>
            <linearGradient id="corner-ribbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ee5f8b" stopOpacity="0.14" />
              <stop offset="1" stopColor="#f39142" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#soft-dots)" />
          <path d="M0 0H360C285 72 258 145 168 174C104 195 52 177 0 218Z" fill="url(#corner-ribbon)" />
          <path
            d="M1440 900H1110C1172 824 1214 780 1302 764C1359 754 1407 774 1440 804Z"
            fill="#4898cf"
            opacity="0.055"
          />
        </svg>
        <div className="absolute top-[12%] left-[6%] w-[24rem] h-[24rem] rounded-full bg-brand-pink opacity-[0.05] blur-[7rem]" />
        <div className="absolute top-[38%] right-[6%] w-[26rem] h-[26rem] rounded-full bg-brand-sky opacity-[0.06] blur-[8rem]" />
        <div className="absolute bottom-[10%] left-[32%] w-[28rem] h-[28rem] rounded-full bg-brand-lavender opacity-[0.04] blur-[8rem]" />
      </div>
    );
  }

  /* original & classic — no special background pattern, just subtle ambient blobs */
  return null;
}

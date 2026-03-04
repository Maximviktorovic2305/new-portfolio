import { useTheme } from "@/shared/config";

export function NotebookBg() {
  const { theme } = useTheme();

  if (theme === "crayon") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8a8070" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-[10%] left-[5%] w-[20rem] h-[20rem] rounded-full bg-brand-pink opacity-[0.04] blur-[5rem]" />
        <div className="absolute top-[40%] right-[10%] w-[18rem] h-[18rem] rounded-full bg-brand-sky opacity-[0.05] blur-[5rem]" />
        <div className="absolute bottom-[15%] left-[30%] w-[22rem] h-[22rem] rounded-full bg-brand-yellow opacity-[0.04] blur-[5rem]" />
      </div>
    );
  }

  /* original & classic — no special background pattern, just subtle ambient blobs */
  return null;
}

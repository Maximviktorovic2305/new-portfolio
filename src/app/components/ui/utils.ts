/**
 * Bridge: re-exports cn from shared/lib so shadcn components
 * keep their relative import `from "./utils"`.
 * The single source of truth is @/shared/lib/utils.
 */
export { cn } from "@/shared/lib/utils";

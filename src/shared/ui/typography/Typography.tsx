import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

const typographyVariants = cva("", {
  variants: {
    type: {
      h1: "text-[2.5rem] sm:text-[3rem] md:text-[4rem] leading-[1.1]",
      h2: "text-[2.5rem] sm:text-[3rem] leading-[1.1]",
      h3: "text-[1.15rem] leading-[1.2]",
      h4: "text-[1rem] leading-[1.2]",
      p1: "text-[1.1rem] leading-relaxed",
      p2: "text-[1rem] leading-relaxed",
      p3: "text-[0.95rem] leading-relaxed",
      p4: "text-[0.85rem] leading-relaxed",
      p5: "text-[0.75rem] leading-relaxed",
      label: "text-[0.8rem] uppercase tracking-[0.15em]",
      caption: "text-[0.7rem] uppercase tracking-wider",
    },
  },
  defaultVariants: {
    type: "p2",
  },
});

type Props = ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & { asChild?: boolean };

const tagByType: Record<string, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p1: "p",
  p2: "p",
  p3: "p",
  p4: "p",
  p5: "p",
  label: "span",
  caption: "span",
};

export function Typography({
  className,
  type,
  asChild = false,
  ...props
}: Props) {
  const defaultTag = (type && tagByType[type]) || "p";
  const Comp = asChild ? Slot : defaultTag;

  return (
    <Comp
      className={cn(typographyVariants({ type, className }))}
      {...props}
    />
  );
}

export { typographyVariants };

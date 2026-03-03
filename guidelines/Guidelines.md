import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center py-3 px-3 uppercase cursor-pointer font-medium justify-center gap-2 whitespace-nowrap rounded-(--radius-3) text-base max-sm:text-sm transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-body hover:bg-primary-hovered",
      },
      width: {
        sm: "w-full max-w-[10.875rem]",
        md: "w-full max-w-[21.5rem]",
        full: "w-full min-w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      width: "full",
    },
  },
);

function Button({
  className,
  variant,
  width,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          width,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };

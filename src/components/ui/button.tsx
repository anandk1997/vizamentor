import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md active:shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[color-mix(in_oklab,var(--primary),#000_10%)]",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[var(--border)] bg-[--bg] text-[--fg] hover:bg-[color-mix(in_oklab,var(--bg),#000_5%)]",
        secondary:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_oklab,var(--accent),#000_10%)]",
        ghost:
          "bg-transparent text-[--fg] hover:bg-[color-mix(in_oklab,var(--bg),#000_6%)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

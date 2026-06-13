import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        glass: "bg-white/10 text-white hover:bg-white/20 backdrop-blur",
        solid: "bg-white text-black hover:bg-white/90",
        ghost: "text-white/80 hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5 text-sm",
        icon: "h-12 w-12",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "glass", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };

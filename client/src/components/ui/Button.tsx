// ============================================
// Button Component
// Reusable button with variants
// ============================================

import { components } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary: components.buttonPrimary,
  secondary: components.buttonSecondary,
  ghost: components.buttonGhost,
  danger: components.buttonDanger,
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

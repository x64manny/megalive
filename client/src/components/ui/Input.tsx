// ============================================
// Input Component
// Reusable form input
// ============================================

import { components, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={cn(typography.label, "block mb-1.5")}>
          {label}
        </label>
      )}
      <input id={id} className={cn(components.input, className)} {...props} />
    </div>
  );
}

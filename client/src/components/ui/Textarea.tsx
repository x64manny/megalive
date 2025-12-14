// ============================================
// Textarea Component
// Reusable form textarea
// ============================================

import { components, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={cn(typography.label, "block mb-1.5")}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(components.textarea, className)}
        {...props}
      />
    </div>
  );
}

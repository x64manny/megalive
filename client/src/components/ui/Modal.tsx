// ============================================
// Modal Component
// Reusable modal dialog
// ============================================

import { layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={layout.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn(layout.modalContent, "p-5", className)}>
        {title && <h2 className={cn(typography.h3, "mb-1")}>{title}</h2>}
        {description && (
          <p className={cn(typography.bodySmall, "text-zinc-500 mb-5")}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

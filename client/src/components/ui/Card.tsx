// ============================================
// Card Component
// Reusable card container
// ============================================

import { components } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({
  children,
  className,
  onClick,
  interactive = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        interactive ? components.cardInteractive : components.card,
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-5 border-b border-zinc-800/60", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

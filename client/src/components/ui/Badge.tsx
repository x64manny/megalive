// ============================================
// Badge Component
// Tags and status indicators
// ============================================

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-zinc-800 text-zinc-400',
  primary: 'bg-violet-900/30 text-violet-200 border border-violet-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/50',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/50',
};

export function Badge({ children, variant = 'default', className, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded text-xs font-medium',
        variantStyles[variant],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
}

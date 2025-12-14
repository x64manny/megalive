// ============================================
// Loading Spinner Component
// ============================================

import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
    </div>
  );
}

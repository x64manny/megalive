// ============================================
// TournamentsView Component
// User's active tournaments page
// ============================================

import { Swords } from "lucide-react";

export function TournamentsView() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-zinc-500">
      <Swords className="w-12 h-12 mb-3 text-zinc-700" />
      <h3 className="text-base font-medium text-zinc-400 mb-1">
        No Active Matches
      </h3>
      <p className="text-sm text-zinc-600">
        Join a community to start competing.
      </p>
    </div>
  );
}

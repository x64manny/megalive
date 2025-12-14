// ============================================
// BracketMatch Component
// Single match in tournament bracket
// ============================================

import type { BracketMatch as BracketMatchType } from "@/types";

interface BracketMatchProps {
  match: BracketMatchType;
}

export function BracketMatch({ match }: BracketMatchProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800/60 rounded-lg p-1.5 w-44 flex flex-col gap-0.5 relative">
      {/* Player 1 */}
      <div
        className={`flex justify-between items-center px-2 py-1 rounded text-sm ${
          match.winner === 1 ? "bg-zinc-800 text-zinc-200" : "text-zinc-500"
        }`}
      >
        <span className="truncate font-medium text-xs">
          {match.p1 || "TBD"}
        </span>
        <span className="font-mono text-[11px]">{match.s1}</span>
      </div>

      {/* Player 2 */}
      <div
        className={`flex justify-between items-center px-2 py-1 rounded text-sm ${
          match.winner === 2 ? "bg-zinc-800 text-zinc-200" : "text-zinc-500"
        }`}
      >
        <span className="truncate font-medium text-xs">
          {match.p2 || "TBD"}
        </span>
        <span className="font-mono text-[11px]">{match.s2}</span>
      </div>
    </div>
  );
}

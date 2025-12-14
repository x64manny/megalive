// ============================================
// TournamentBracket Component
// Displays tournament bracket with AI Shoutcaster
// ============================================

import { Button } from "@/components/ui";
import { useShoutcast } from "@/hooks";
import type { BracketRound } from "@/types";
import { Mic } from "lucide-react";
import { BracketMatch } from "./BracketMatch";

// Mock bracket data for visual demo
const MOCK_BRACKET: BracketRound[] = [
  {
    round: 1,
    matches: [
      { id: 1, p1: "Liquid.Serral", p2: "Reynor", s1: 2, s2: 1, winner: 1 },
      { id: 2, p1: "Maru", p2: "Dark", s1: 0, s2: 2, winner: 2 },
      { id: 3, p1: "Clem", p2: "Hero", s1: 2, s2: 0, winner: 1 },
      { id: 4, p1: "Oliveira", p2: "Solar", s1: 1, s2: 2, winner: 2 },
    ],
  },
  {
    round: 2,
    matches: [
      { id: 5, p1: "Liquid.Serral", p2: "Dark", s1: 3, s2: 2, winner: 1 },
      { id: 6, p1: "Clem", p2: "Solar", s1: 1, s2: 3, winner: 2 },
    ],
  },
  {
    round: 3,
    matches: [
      { id: 7, p1: "Liquid.Serral", p2: "Solar", s1: 4, s2: 1, winner: 1 },
    ],
  },
];

interface TournamentBracketProps {
  bracket?: BracketRound[];
}

export function TournamentBracket({
  bracket = MOCK_BRACKET,
}: TournamentBracketProps) {
  const { data: shoutcast, loading: loadingCast, generate } = useShoutcast();

  const handleGenerateShoutcast = () => {
    const bracketState = JSON.stringify(
      bracket.map((r) => ({
        round: r.round,
        matches: r.matches.map(
          (m) => `${m.p1} vs ${m.p2} (Score: ${m.s1}-${m.s2})`
        ),
      }))
    );
    generate(bracketState);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* AI Caster Control */}
      <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
        <Button
          size="sm"
          onClick={handleGenerateShoutcast}
          isLoading={loadingCast}
          leftIcon={<Mic className="w-3.5 h-3.5" />}
        >
          AI Commentary
        </Button>

        <div className="flex-1">
          {shoutcast ? (
            <p className="text-sm text-zinc-400">{shoutcast}</p>
          ) : (
            <p className="text-xs text-zinc-600">Generate live commentary</p>
          )}
        </div>
      </div>

      {/* Bracket Visualization */}
      <div className="flex gap-6 overflow-x-auto p-3 items-center bg-zinc-950/50 rounded-lg border border-zinc-800/40">
        {bracket.map((round, rIndex) => (
          <div
            key={rIndex}
            className="flex flex-col justify-around h-full gap-6 min-w-[180px]"
          >
            <div className="text-center text-[10px] uppercase tracking-wider text-zinc-600 font-medium mb-1">
              {rIndex === bracket.length - 1 ? "Finals" : `Round ${rIndex + 1}`}
            </div>
            <div className="flex flex-col justify-around gap-6 flex-grow">
              {round.matches.map((m) => (
                <BracketMatch key={m.id} match={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

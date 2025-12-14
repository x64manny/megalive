// ============================================
// Header Component
// Main content area header
// ============================================

import { Button } from "@/components/ui";
import type { Community, ViewState } from "@/types";
import { ChevronRight, Plus } from "lucide-react";

interface HeaderProps {
  view: ViewState;
  selectedCommunity: Community | null;
  onBack?: () => void;
  onCreateClick?: () => void;
}

const VIEW_TITLES: Record<ViewState, string> = {
  explore: "Discover Communities",
  community: "",
  profile: "Player Profile",
  tournaments: "Active Tournaments",
  chat: "MegaBot Assistant",
};

export function Header({
  view,
  selectedCommunity,
  onBack,
  onCreateClick,
}: HeaderProps) {
  const title =
    view === "community" && selectedCommunity
      ? selectedCommunity.name
      : VIEW_TITLES[view];

  return (
    <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {view === "community" && selectedCommunity && onBack && (
          <button
            onClick={onBack}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 -ml-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-zinc-100">{title}</h1>
      </div>

      <div className="flex gap-3">
        {view === "explore" && onCreateClick && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateClick}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Space
          </Button>
        )}
      </div>
    </header>
  );
}

// ============================================
// ExploreView Component
// Discover communities page
// ============================================

import { CommunityCard } from "@/components/community";
import type { Community } from "@/types";
import { Plus } from "lucide-react";

interface ExploreViewProps {
  communities: Community[];
  onCommunityClick: (community: Community) => void;
  onCreateClick: () => void;
}

const FILTER_TAGS = ["All", "FPS", "MOBA", "RTS", "Fighting", "Sports"];

export function ExploreView({
  communities,
  onCommunityClick,
  onCreateClick,
}: ExploreViewProps) {
  return (
    <div className="space-y-6">
      {/* Featured Banner */}
      <div className="h-52 rounded-xl bg-zinc-900 border border-zinc-800/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-600/5" />
        <div className="absolute bottom-0 left-0 p-6">
          <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-[11px] font-medium border border-red-500/20 mb-3 inline-block uppercase tracking-wide">
            Live
          </span>
          <h2 className="text-2xl font-semibold mb-1 text-zinc-100">
            MegaLive Winter Major
          </h2>
          <p className="text-zinc-400 text-sm max-w-md">
            The biggest event of the season. 4,000+ players competing for the
            championship.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_TAGS.map((tag, i) => (
          <button
            key={tag}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-zinc-800 text-zinc-100"
                : "bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onClick={onCommunityClick}
          />
        ))}

        {/* Create New Placeholder */}
        <button
          onClick={onCreateClick}
          className="border border-dashed border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/30 transition-colors min-h-[180px]"
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">Create Space</span>
        </button>
      </div>
    </div>
  );
}

// ============================================
// CommunityCard Component
// Community preview card for grid display
// ============================================

import { Card } from "@/components/ui";
import type { Community } from "@/types";
import { Gamepad2 } from "lucide-react";

interface CommunityCardProps {
  community: Community;
  onClick: (community: Community) => void;
}

export function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <Card interactive onClick={() => onClick(community)} className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-400">
          {community.name.substring(0, 2).toUpperCase()}
        </div>
        <span className="text-[11px] text-zinc-500">
          {community.members} members
        </span>
      </div>

      <h3 className="font-medium text-zinc-100 mb-1 truncate">
        {community.name}
      </h3>

      <p className="text-zinc-500 text-sm mb-3 line-clamp-2 min-h-[40px]">
        {community.description}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <Gamepad2 className="w-3 h-3" />
        {community.game}
      </div>
    </Card>
  );
}

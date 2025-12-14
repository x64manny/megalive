// ============================================
// CommunityView Component
// Community detail page with tournaments
// ============================================

import { TournamentBracket } from "@/components/tournament";
import { Badge, Button, Card } from "@/components/ui";
import type { Community } from "@/types";
import { Medal, Trophy } from "lucide-react";

interface CommunityViewProps {
  community: Community;
}

export function CommunityView({ community }: CommunityViewProps) {
  return (
    <div>
      {/* Banner */}
      <div className="h-40 rounded-xl bg-zinc-900 border border-zinc-800/60 mb-6 relative">
        <div className="absolute -bottom-8 left-6 flex items-end gap-4">
          <div className="w-16 h-16 rounded-xl bg-zinc-800 border-4 border-zinc-950 flex items-center justify-center text-xl font-semibold text-zinc-400">
            {community.name.substring(0, 1)}
          </div>
          <div className="mb-1">
            <h2 className="text-xl font-semibold text-zinc-100">
              {community.name}
            </h2>
            <p className="text-zinc-500 text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {community.members} members
            </p>
          </div>
        </div>
        <div className="absolute bottom-3 right-4">
          <Button size="sm">Join Space</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 mb-6 border-b border-zinc-800/60 flex gap-6">
        <button className="pb-2.5 border-b-2 border-violet-500 text-zinc-100 text-sm font-medium">
          Overview
        </button>
        <button className="pb-2.5 border-b-2 border-transparent text-zinc-500 hover:text-zinc-400 text-sm font-medium transition-colors">
          Tournaments
        </button>
        <button className="pb-2.5 border-b-2 border-transparent text-zinc-500 hover:text-zinc-400 text-sm font-medium transition-colors">
          Leaderboard
        </button>
        <button className="pb-2.5 border-b-2 border-transparent text-zinc-500 hover:text-zinc-400 text-sm font-medium transition-colors">
          Chat
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Live Tournament Preview */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Monthly Cup
              </h3>
              <Badge
                variant="danger"
                className="text-[10px] uppercase tracking-wide"
              >
                Live
              </Badge>
            </div>
            <TournamentBracket />
          </Card>

          {/* Announcements Feed */}
          <Card className="p-5">
            <h3 className="text-sm font-medium text-zinc-300 mb-4">
              Announcements
            </h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-zinc-300">
                        Admin
                      </span>
                      <span className="text-zinc-600 text-xs">2h ago</span>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      Registrations for the weekend bracket are now open. Check
                      in 30 min before start.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide mb-3">
              About
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              {community.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {community.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide mb-3">
              Admins
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-zinc-700" />
              <span className="text-sm text-zinc-300">Nova</span>
              <Medal className="w-3 h-3 text-amber-500 ml-auto" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

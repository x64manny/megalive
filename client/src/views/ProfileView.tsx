// ============================================
// ProfileView Component
// User profile page with AI bio generator
// ============================================

import { Card } from "@/components/ui";
import { useAuth } from "@/contexts";
import { generateGamerBio } from "@/services/gemini";
import { Activity, Bot, LogOut, Sparkles, User } from "lucide-react";
import { useState } from "react";

export function ProfileView() {
  const { user, signOut } = useAuth();
  const [bio, setBio] = useState("");
  const [generatingBio, setGeneratingBio] = useState(false);

  const handleGenerateBio = async () => {
    setGeneratingBio(true);
    try {
      const result = await generateGamerBio("Valorant", "Duelist", "Radiant");
      setBio(result);
    } catch (error) {
      console.error("Failed to generate bio:", error);
    } finally {
      setGeneratingBio(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto pt-8">
      {/* Avatar */}
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-4 flex items-center justify-center border border-zinc-700">
          <User className="w-10 h-10 text-zinc-500" />
        </div>
        <h2 className="text-xl font-semibold mb-1 text-zinc-100">Gamer_01</h2>
        <p className="text-zinc-500 text-sm mb-6">
          {user?.uid.substring(0, 8)}...
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 text-center">
          <div className="text-xl font-semibold text-zinc-100">12</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-wide">
            Tournaments
          </div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-semibold text-emerald-500">85%</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-wide">
            Win Rate
          </div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-semibold text-amber-500">3</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-wide">
            Trophies
          </div>
        </Card>
      </div>

      {/* AI Bio Generator */}
      <Card className="p-5 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Bot className="w-4 h-4 text-zinc-500" /> Gamer Bio
          </h3>
          <button
            onClick={handleGenerateBio}
            disabled={generatingBio}
            className="text-xs text-zinc-400 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {generatingBio ? (
              <Activity className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            {bio ? "Regenerate" : "Generate"}
          </button>
        </div>
        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50 min-h-[60px]">
          {bio ? (
            <p className="text-zinc-300 text-sm">{bio}</p>
          ) : (
            <p className="text-zinc-600 text-sm">
              Generate your unique gamer persona...
            </p>
          )}
        </div>
      </Card>

      {/* Sign Out */}
      <button
        onClick={signOut}
        className="text-zinc-500 hover:text-red-400 text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
      >
        <LogOut className="w-4 h-4" /> Sign Out
      </button>
    </div>
  );
}

// ============================================
// Sidebar Component
// Main navigation sidebar
// ============================================

import type { ViewState } from "@/types";
import { Gamepad2, MessageCircle, Search, Swords, User } from "lucide-react";
import React from "react";

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
  disabled = false,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
        isActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {icon}
      <span className="hidden lg:block text-sm font-medium">{label}</span>
    </button>
  );
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-20 lg:w-64 border-r border-zinc-800/50 flex flex-col bg-zinc-900">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
          <Gamepad2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-lg tracking-tight hidden lg:block text-white">
          MegaLive
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavItem
          icon={<Search className="w-5 h-5" />}
          label="Explore"
          isActive={currentView === "explore"}
          onClick={() => onNavigate("explore")}
        />

        <NavItem
          icon={<Swords className="w-5 h-5" />}
          label="My Matches"
          isActive={currentView === "tournaments"}
          onClick={() => onNavigate("tournaments")}
        />

        <NavItem
          icon={<MessageCircle className="w-5 h-5" />}
          label="Ask MegaBot"
          isActive={currentView === "chat"}
          onClick={() => onNavigate("chat")}
        />

        {/* Spaces Section */}
        <div className="pt-6 pb-2 px-4 hidden lg:block">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            Your Spaces
          </p>
        </div>

        {/* Mock joined community */}
        <NavItem
          icon={
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-400">
              V
            </div>
          }
          label="Valorant Pro"
          isActive={false}
          onClick={() => {}}
          disabled
        />
      </nav>

      {/* User Profile Button */}
      <div className="p-4 border-t border-zinc-800/50">
        <button
          onClick={() => onNavigate("profile")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-zinc-200">Gamer_01</span>
            <span className="text-[11px] text-zinc-500">Online</span>
          </div>
        </button>
      </div>
    </aside>
  );
}

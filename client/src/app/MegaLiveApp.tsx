// ============================================
// MegaLive App - Main Application Component
// ============================================

import { CreateCommunityModal } from "@/components/community";
import { Header, Sidebar } from "@/components/layout";
import { LoadingSpinner } from "@/components/ui";
import { useAuth } from "@/contexts";
import { useCommunities } from "@/hooks";
import type { Community, ViewState } from "@/types";
import {
  ChatView,
  CommunityView,
  ExploreView,
  ProfileView,
  TournamentsView,
} from "@/views";
import { useState } from "react";

export function MegaLiveApp() {
  const { user, loading: authLoading } = useAuth();
  const { communities } = useCommunities();

  const [view, setView] = useState<ViewState>("explore");
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    if (newView !== "community") {
      setSelectedCommunity(null);
    }
  };

  const handleCommunityClick = (community: Community) => {
    setSelectedCommunity(community);
    setView("community");
  };

  const handleBack = () => {
    setView("explore");
    setSelectedCommunity(null);
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar currentView={view} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-zinc-950">
        {/* Header */}
        <Header
          view={view}
          selectedCommunity={selectedCommunity}
          onBack={handleBack}
          onCreateClick={() => setShowCreateModal(true)}
        />

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {view === "explore" && (
            <ExploreView
              communities={communities}
              onCommunityClick={handleCommunityClick}
              onCreateClick={() => setShowCreateModal(true)}
            />
          )}

          {view === "community" && selectedCommunity && (
            <CommunityView community={selectedCommunity} />
          )}

          {view === "profile" && <ProfileView />}

          {view === "tournaments" && <TournamentsView />}

          {view === "chat" && <ChatView />}
        </div>
      </main>

      {/* Modals */}
      {user && (
        <CreateCommunityModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          userId={user.uid}
        />
      )}
    </div>
  );
}

// ============================================
// MegaLive Type Definitions
// ============================================

// --- View States ---
export type ViewState =
  | "explore"
  | "community"
  | "profile"
  | "tournaments"
  | "chat";

// --- User & Auth ---
export interface UserProfile {
  uid: string;
  username: string;
  rank: string;
  mainGame: string;
  avatarColor: string;
  bio?: string;
}

// --- Communities (The Base) ---
export interface Community {
  id: string;
  name: string;
  description: string;
  game: string;
  members: number;
  ownerId: string;
  themeColor: string;
  tags: string[];
  createdAt?: Date;
}

export interface CreateCommunityInput {
  name: string;
  game: string;
  description: string;
  tags: string[];
}

// --- Tournaments (The Arena) ---
export type TournamentFormat = "Single Elim" | "Double Elim";
export type TournamentStatus = "Registration" | "Live" | "Completed";

export interface Tournament {
  id: string;
  name: string;
  game: string;
  format: TournamentFormat;
  status: TournamentStatus;
  participants: number;
  maxParticipants: number;
  communityId: string;
}

export interface BracketMatch {
  id: number;
  p1: string;
  p2: string;
  s1: number;
  s2: number;
  winner: 1 | 2 | null;
}

export interface BracketRound {
  round: number;
  matches: BracketMatch[];
}

// --- Firebase User (from auth) ---
export interface FirebaseUser {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  isAnonymous: boolean;
}

// --- Component Props ---
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

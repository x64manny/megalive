// ============================================
// MegaLive Design System
// Design tokens, patterns, and utilities
// ============================================

/**
 * COLOR PALETTE
 * Primary: Violet (accent color for CTAs and highlights)
 * Neutral: Zinc (all UI surfaces and text)
 */
export const colors = {
  // Backgrounds
  bg: {
    primary: "bg-zinc-950", // Main app background
    secondary: "bg-zinc-900", // Cards, elevated surfaces
    tertiary: "bg-zinc-800", // Hover states, active items
    input: "bg-zinc-950", // Form inputs
    overlay: "bg-zinc-950/80", // Modal overlays
  },

  // Borders
  border: {
    default: "border-zinc-800/60",
    subtle: "border-zinc-800/40",
    strong: "border-zinc-700",
  },

  // Text
  text: {
    primary: "text-zinc-100", // Headings, important text
    secondary: "text-zinc-300", // Body text
    tertiary: "text-zinc-400", // Supporting text
    muted: "text-zinc-500", // Labels, captions
    disabled: "text-zinc-600", // Placeholder, disabled
  },

  // Accent (use sparingly)
  accent: {
    primary: "bg-violet-600",
    hover: "hover:bg-violet-500",
    text: "text-violet-500",
  },

  // Status
  status: {
    success: "text-emerald-500",
    warning: "text-amber-500",
    error: "text-red-400",
    live: "text-red-400",
  },
} as const;

/**
 * TYPOGRAPHY
 * Font: System sans-serif (antialiased)
 * Weights: 400 (normal), 500 (medium), 600 (semibold)
 */
export const typography = {
  // Headings
  h1: "text-2xl font-semibold text-zinc-100",
  h2: "text-xl font-semibold text-zinc-100",
  h3: "text-lg font-semibold text-zinc-100",
  h4: "text-base font-medium text-zinc-100",

  // Body
  body: "text-sm text-zinc-300",
  bodySmall: "text-xs text-zinc-400",

  // Labels
  label: "text-xs font-medium text-zinc-500",
  labelUppercase:
    "text-[11px] font-medium text-zinc-500 uppercase tracking-wide",

  // Interactive
  link: "text-sm text-zinc-400 hover:text-zinc-300 transition-colors",
} as const;

/**
 * SPACING
 * Base unit: 4px
 * Common values: 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px)
 */
export const spacing = {
  // Component internal padding
  card: "p-4", // Standard card padding
  cardLarge: "p-5", // Large card padding
  modal: "p-5", // Modal padding
  input: "px-3 py-2", // Form input padding
  button: {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-5 py-2.5",
  },

  // Gaps
  stack: "space-y-4", // Vertical stack
  stackTight: "space-y-2",
  stackLoose: "space-y-6",
  inline: "gap-2", // Horizontal items
  inlineLoose: "gap-3",
  grid: "gap-4", // Grid gaps
  gridLoose: "gap-6",

  // Sections
  section: "mb-6",
  sectionLarge: "mb-8",
} as const;

/**
 * BORDER RADIUS
 * Consistent rounded corners
 */
export const radius = {
  sm: "rounded", // 4px - badges, tags
  md: "rounded-lg", // 8px - buttons, inputs, cards
  lg: "rounded-xl", // 12px - large cards, modals
  full: "rounded-full", // Pills, avatars
} as const;

/**
 * SHADOWS
 * Minimal shadow usage - prefer borders
 */
export const shadows = {
  none: "shadow-none",
  // Only use for dropdowns/popovers if needed
} as const;

/**
 * TRANSITIONS
 * Consistent animation timing
 */
export const transitions = {
  fast: "transition-colors duration-150",
  default: "transition-colors",
  slow: "transition-all duration-300",
} as const;

/**
 * COMPONENT STYLES
 * Pre-composed class combinations for common patterns
 */
export const components = {
  // Cards
  card: "bg-zinc-900 border border-zinc-800/60 rounded-xl",
  cardInteractive:
    "bg-zinc-900 border border-zinc-800/60 rounded-xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-colors cursor-pointer",

  // Buttons
  buttonPrimary:
    "bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  buttonSecondary:
    "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  buttonGhost:
    "bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium rounded-lg transition-colors",
  buttonDanger:
    "bg-red-600/90 hover:bg-red-600 text-white font-medium rounded-lg transition-colors",

  // Inputs
  input:
    "w-full bg-zinc-950 border border-zinc-800/60 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none transition-colors",
  textarea:
    "w-full bg-zinc-950 border border-zinc-800/60 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none transition-colors resize-none",

  // Badges
  badge: "px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400",
  badgeLive:
    "px-2 py-0.5 text-[10px] uppercase tracking-wide rounded bg-red-500/10 text-red-400 border border-red-500/20",

  // Avatar
  avatar: "rounded-full bg-zinc-800 flex items-center justify-center",
  avatarSizes: {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  },

  // Icon containers
  iconBox: "rounded-lg bg-zinc-800 flex items-center justify-center",
  iconBoxSizes: {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  },

  // Tabs
  tabActive:
    "pb-2.5 border-b-2 border-violet-500 text-zinc-100 text-sm font-medium",
  tabInactive:
    "pb-2.5 border-b-2 border-transparent text-zinc-500 hover:text-zinc-400 text-sm font-medium transition-colors",

  // Nav items
  navItem: "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
  navItemActive: "bg-zinc-800 text-white",
  navItemInactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50",

  // Dividers
  divider: "border-t border-zinc-800/60",
  dividerVertical: "border-l border-zinc-800/60",
} as const;

/**
 * LAYOUT
 * Common layout patterns
 */
export const layout = {
  // Page containers
  page: "p-8 max-w-7xl mx-auto",
  pageNarrow: "max-w-2xl mx-auto",

  // Sidebar
  sidebar: "w-20 lg:w-64 border-r border-zinc-800/50 flex flex-col bg-zinc-900",

  // Header
  header:
    "sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50 px-8 py-4",

  // Modal
  modalOverlay:
    "fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  modalContent:
    "bg-zinc-900 border border-zinc-800/60 rounded-xl w-full max-w-md",

  // Grid layouts
  gridCols2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  gridCols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  gridCols4:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
} as const;

/**
 * ICON SIZES
 * Consistent icon sizing
 */
export const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
} as const;

// ============================================
// DESIGN GUIDELINES
// ============================================

/**
 * PRINCIPLES
 *
 * 1. MINIMAL & CLEAN
 *    - No gradients
 *    - No textures or noise overlays
 *    - No decorative shadows
 *    - Subtle borders instead of shadows for elevation
 *
 * 2. DARK FIRST
 *    - zinc-950 as primary background
 *    - zinc-900 for elevated surfaces
 *    - zinc-800 for interactive/hover states
 *
 * 3. TYPOGRAPHY HIERARCHY
 *    - Use font-weight for emphasis (medium, semibold)
 *    - Avoid font-bold except for special cases
 *    - Keep text sizes small and refined (text-sm, text-xs)
 *
 * 4. COLOR RESTRAINT
 *    - Violet only for primary actions and active states
 *    - Avoid colored text except for status indicators
 *    - Use opacity for subtle color variations
 *
 * 5. SPACING CONSISTENCY
 *    - Use 4px base unit (Tailwind default)
 *    - Consistent padding within component types
 *    - Tighter spacing = more professional feel
 *
 * 6. INTERACTIONS
 *    - Subtle hover states (color shift, not size)
 *    - Fast transitions (150-200ms)
 *    - No bouncy/spring animations
 */

/**
 * DO's
 * - Use border-zinc-800/60 for subtle borders
 * - Use text-zinc-100 for headings
 * - Use text-zinc-400/500 for secondary text
 * - Use rounded-lg or rounded-xl for components
 * - Use transition-colors for hover effects
 *
 * DON'Ts
 * - Don't use gradients (bg-gradient-*)
 * - Don't use shadows (shadow-*)
 * - Don't use glow effects (shadow-*-500/20)
 * - Don't use large rounded corners (rounded-3xl)
 * - Don't use uppercase for most labels
 * - Don't use emoji in UI text
 */

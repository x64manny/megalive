# Product Requirements Document (PRD): MegaLive.app

| **Version** | 1.0        |
| ----------- | ---------- |
| **Status**  | Draft      |
| **Date**    | 2025-12-13 |

---

## 1. Executive Summary

MegaLive.app is a comprehensive web application designed to serve as a centralized hub for gamer communities. It functions as a hybrid of community management (Discord), tournament organization (Challonge), and professional networking (LinkedIn) for gamers. The platform allows users to create customizable community spaces, organize bracket-based tournaments, and build individual "Gamer IDs."

---

## 2. Technical Architecture

| Component                | Technology                             |
| ------------------------ | -------------------------------------- |
| **Frontend Framework**   | React (Vite)                           |
| **Language**             | TypeScript                             |
| **Styling Engine**       | Tailwind CSS v4 (Oxide Engine)         |
| **Backend / BaaS**       | Firebase (Google Cloud)                |
| **AI / LLM Integration** | Google Gemini API (`gemini-2.5-flash`) |

### Styling Specifics

- Usage of native CSS variables for dynamic theming (community branding) instead of JS-based configuration.

### Backend Details

- **Auth:** Firebase Authentication (Anonymous & Custom Token flows)
- **Database:** Cloud Firestore (NoSQL)
- **Hosting:** Firebase Hosting / Vercel

---

## 3. User Personas

### 🎮 The Organizer

Creates communities, manages member roles, sets up tournament brackets, and creates events. Needs powerful administrative tools.

### ⚔️ The Competitor

Joins communities to compete. Needs a persistent profile, match history tracking, and easy bracket navigation.

---

## 4. Core Functional Modules

### 4.1. Module A: Authentication & Gamer ID (User Profile)

**Goal:** Create a persistent identity for the user.

**Auth:** Support for Anonymous login (MVP) upgradable to permanent accounts via Email/Social.

**Profile Data:**

- UID, Username, Avatar URL
- Main Game (e.g., Valorant, SC2)
- Rank/MMR

#### 🤖 AI Feature: "Gamer Identity" Generator

| Attribute      | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| **Trigger**    | User clicks "Generate Bio" in profile settings               |
| **Input**      | Main Game + Rank + Stats                                     |
| **Processing** | Gemini API generates a slang-heavy, immersive 2-sentence bio |
| **Output**     | Text string saved to Firestore                               |

---

### 4.2. Module B: The Base (Communities)

**Goal:** Allow users to group together under specific banners.

**Creation Wizard:** Users can create a "Space."

- **Required Fields:** Name, Primary Game, Description

#### 🤖 AI Feature: "Community Architect"

| Attribute      | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **Trigger**    | Button inside Creation Wizard                              |
| **Input**      | Community Name + Game                                      |
| **Processing** | Gemini generates a high-energy description (max 180 chars) |

#### 🤖 AI Feature: "Auto-Tagger"

| Attribute      | Description                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Trigger**    | On "Game" field blur or manual click                                                            |
| **Processing** | Gemini analyzes the game title and returns 4 relevant tags (e.g., "FPS", "Tactical", "Esports") |

**Discovery:** A grid view of public communities filterable by tags.

#### Roles

| Role       | Permissions                    |
| ---------- | ------------------------------ |
| **Owner**  | Full delete permissions        |
| **Admin**  | Can manage tournaments         |
| **Member** | Read-only/Participation rights |

---

### 4.3. Module C: The Arena (Tournaments)

**Goal:** Visualize and manage competitive play.

**Bracket Types:**

- Single Elimination
- Double Elimination

**Visualization:** Responsive, scrollable bracket tree (CSS/Flexbox based).

**Match Management:**

- Clicking a match opens a "Match Detail" modal
- Admins or Participants report scores
- Winner advances automatically in the visual bracket

#### 🤖 AI Feature: "Esports Shoutcaster"

| Attribute      | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| **Trigger**    | "Live Commentary" button on the bracket view                     |
| **Input**      | JSON dump of the current bracket state (Winners, Losers, Scores) |
| **Processing** | Gemini analyzes match deltas to find upsets or close games       |
| **Output**     | A dramatic, professional esports-style textual recap             |

---

### 4.4. Module D: Data Persistence (Firestore Schema)

**Collections Structure:**

```
/artifacts/{appId}/public/data/communities/{communityId}
/artifacts/{appId}/public/data/tournaments/{tournamentId}
/artifacts/{appId}/users/{userId}/profile
```

**Security Rules:**

- ✅ Public data is readable by all
- 🔒 Write access restricted to authenticated users
- 🔐 Community updates restricted to `ownerId`

---

## 5. UI/UX Specifications

### Theme

**"Dark Mode" Default** (`bg-zinc-950`)

### Color Palette

| Category      | Colors                                         |
| ------------- | ---------------------------------------------- |
| **Primary**   | Violet/Fuchsia gradients (Cyberpunk aesthetic) |
| **Secondary** | Zinc/Slate grays                               |
| **Status**    | Emerald (Win/Online), Red (Live/Loss)          |

### Tailwind 4 Implementation

- Use `@theme` block in CSS for font definitions
- Use dynamic style injection for Community Theme colors:
  ```jsx
  <div style={{ "--primary": communityColor }}>
  ```

### Density

High information density. Minimize padding compared to standard SaaS; maximize data visibility (like a HUD).

---

## 6. Non-Functional Requirements

| Requirement        | Specification                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Performance**    | Bracket rendering must handle up to 64 participants without UI lag                                         |
| **Responsiveness** | Sidebar must collapse on mobile. Brackets must remain scrollable on touch devices                          |
| **Error Handling** | Gemini API calls must implement retry logic (exponential backoff) and fail gracefully if quota is exceeded |

---

## 7. Roadmap

| Phase                       | Features                                                                    |
| --------------------------- | --------------------------------------------------------------------------- |
| **Phase 1 (MVP - Current)** | Auth, Community Creation + AI, Manual Bracket Visualization + AI Commentary |
| **Phase 2**                 | Interactive Bracket Logic (Click to Advance), User-to-User Invites          |
| **Phase 3**                 | Real-time chat (Firestore listeners), Payment integration for prize pools   |

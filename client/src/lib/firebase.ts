// ============================================
// Firebase Configuration & Initialization
// ============================================

import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// Extend Window interface for global Firebase config
declare global {
  const __firebase_config: string | undefined;
  const __app_id: string | undefined;
  const __initial_auth_token: string | undefined;
}

// Firebase configuration - supports both hosted environment and local dev
const getFirebaseConfig = () => {
  // Check if running in hosted environment with injected config
  if (typeof __firebase_config !== "undefined" && __firebase_config) {
    return JSON.parse(__firebase_config);
  }

  // Fallback for local development - use environment variables or defaults
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
    authDomain:
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
      "demo-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
      "demo-project.appspot.com",
    messagingSenderId:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  };
};

const firebaseConfig = getFirebaseConfig();

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// App ID for multi-tenant data isolation
export const appId: string =
  typeof __app_id !== "undefined" && __app_id ? __app_id : "megalive-mvp";

// Collection paths
export const COLLECTIONS = {
  communities: `artifacts/${appId}/public/data/communities`,
  tournaments: `artifacts/${appId}/public/data/tournaments`,
  users: `artifacts/${appId}/users`,
} as const;

export default app;

// ============================================
// Community Service - Firestore Operations
// ============================================

import { COLLECTIONS, db } from "@/lib/firebase";
import type { Community, CreateCommunityInput } from "@/types";
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Create a new community
 */
export async function createCommunity(
  input: CreateCommunityInput,
  userId: string
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.communities), {
    name: input.name,
    game: input.game,
    description: input.description,
    ownerId: userId,
    members: 1,
    themeColor: "violet",
    tags: input.tags.length > 0 ? input.tags : ["New", "Competitive"],
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Subscribe to communities list
 */
export function subscribeToCommunities(
  callback: (communities: Community[]) => void,
  onError?: (error: Error) => void
): () => void {
  const q = query(collection(db, COLLECTIONS.communities));

  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const communities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      callback(communities);
    },
    (error) => {
      console.error("Firestore error:", error);
      onError?.(error);
    }
  );
}

// ============================================
// useAI Hook
// AI feature state management
// ============================================

import {
  generateCommunityDescription,
  generateCommunityTags,
  generateGamerBio,
  generateShoutcast,
} from "@/services/gemini";
import { useCallback, useState } from "react";

interface UseAIReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  generate: (...args: any[]) => Promise<void>;
  reset: () => void;
}

function useAIFeature<T>(
  apiCall: (...args: any[]) => Promise<T>
): UseAIReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall(...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "AI generation failed");
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, generate, reset };
}

/**
 * Hook for Gamer Identity Generator
 */
export function useGamerBio() {
  return useAIFeature(generateGamerBio);
}

/**
 * Hook for Community Architect
 */
export function useCommunityDescription() {
  return useAIFeature(generateCommunityDescription);
}

/**
 * Hook for Auto-Tagger
 */
export function useCommunityTags() {
  return useAIFeature(generateCommunityTags);
}

/**
 * Hook for Esports Shoutcaster
 */
export function useShoutcast() {
  return useAIFeature(generateShoutcast);
}

// ============================================
// useCommunities Hook
// Real-time community data subscription
// ============================================

import { useAuth } from "@/contexts";
import { subscribeToCommunities } from "@/services/communities";
import type { Community } from "@/types";
import { useEffect, useState } from "react";

export function useCommunities() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setCommunities([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToCommunities(
      (data) => {
        setCommunities(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { communities, loading, error };
}

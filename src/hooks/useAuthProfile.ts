import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AuthProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  provider: string;
  createdAt: string;
}

export function useAuthProfile() {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const meta = user.user_metadata ?? {};
      setProfile({
        id: user.id,
        email: user.email ?? "",
        fullName: meta.full_name ?? meta.name ?? meta.preferred_username ?? "",
        avatarUrl: meta.avatar_url ?? meta.picture ?? null,
        provider: user.app_metadata?.provider ?? "email",
        createdAt: user.created_at,
      });
      setLoading(false);
    };

    fetchProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { profile, loading };
}

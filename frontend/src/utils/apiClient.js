import { supabase } from "../services/supabaseClient";

export async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
    "X-User-Id": session.user.id,
  };
}

export async function apiCall(endpoint, options = {}) {
  const headers = await getAuthHeaders();

  return fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

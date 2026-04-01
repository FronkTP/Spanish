import { supabase } from "./supabaseClient";

export default function Auth() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_REDIRECT_URL,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <div>
      <div>
        <div>
          <h1>Welcome</h1>
          <p>Sign in to save your progress</p>
        </div>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
}

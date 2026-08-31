import { supabase } from "./services/supabaseClient";

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

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("/api/users/guest");
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("guestSession", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (error) {
      console.error("Guest login error:", error);
      alert("Failed to proceed as guest");
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>Welcome</h1>
          <p>Sign in to save your progress</p>
        </div>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleGuestLogin}>Continue as guest</button>
      </div>
    </div>
  );
}

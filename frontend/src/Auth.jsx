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
      const response = await fetch("/api/guest-user");
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
    <div className="min-h-screen flex flex-col bg-background-light">
      <header className="w-full bg-white shadow-xs border-b-2 border-primary">
        <div className="max-w-7xl mx-auto flex justify-between px-4 py-3">
          <div className="text-2xl text-primary font-bold">Spanish</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-background-dark mb-6">
            Master Spanish <br/>
            <span className="text-primary">One Word at a Time</span>
          </h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Build your vocabulary, practice listening, and track your progress with our immersive learning platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="px-8 py-4 border border-primary bg-primary text-white rounded-xl shadow-xs hover:bg-primary/90 text-lg font-medium transition-colors"
            >
              Login with Google
            </button>
            <button
              onClick={handleGuestLogin}
              className="px-8 py-4 border border-gray-700 bg-white text-background-dark rounded-xl shadow-xs hover:bg-gray-50 text-lg font-medium transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          <div className="p-6 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Words</h3>
            <p className="text-text-muted">Learn 5 new carefully selected words every day to steadily build your vocabulary.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Practice</h3>
            <p className="text-text-muted">Master what you've learned through listening exercises, flashcards, and typing practice.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-text-muted">Watch your vocabulary grow and see how close you are to mastering 1000 common words.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

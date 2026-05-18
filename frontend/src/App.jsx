import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Table from "./pages/Table";
import Progress from "./pages/Progress";
import TextAnalyzer from "./pages/TextAnalyzer";
import NotFound from "./pages/NotFound";
import Auth from "./Auth";
import PracticeLayout from "./pages/practice/PracticeLayout";
import Practice from "./pages/practice/Practice";
import ListeningPractice from "./pages/practice/ListeningPractice";
import FlashcardPractice from "./pages/practice/FlashcardPractice";
import TypingPractice from "./pages/practice/TypingPractice";
import { supabase } from "./services/supabaseClient";
import { apiCall } from "./utils/apiClient";
import "./App.css";

function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    const guestUser = localStorage.getItem("guestSession");
    if (guestUser) {
      setSession(JSON.parse(guestUser));
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

    const isGuest = !session.access_token;
    if (isGuest) return;

    const syncUser = async () => {
      try {
        await apiCall("/users/sync", {
          method: "POST",
          body: JSON.stringify({
            email: session.user.email,
            fullName:
              session.user.user_metadata?.full_name ??
              null,
            avatarUrl: session.user.user_metadata?.avatar_url ?? null,
          }),
        });
      } catch (error) {
        console.error("Failed to sync user profile:", error);
      }
    };

    syncUser();
  }, [session]);

  return session ? (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Table />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/practice" element={<PracticeLayout />}>
            <Route index element={<Practice />} />
            <Route path="listening" element={<ListeningPractice />} />
            <Route path="flashcard" element={<FlashcardPractice />} />
            <Route path="typing" element={<TypingPractice />} />
          </Route>
          <Route path="/analyze" element={<TextAnalyzer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Auth />
  );
}

export default App;

import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Table from "./pages/Table";
import Progress from "./pages/Progress";
import PracticeLayout from "./pages/practice/PracticeLayout";
import Practice from "./pages/practice/Practice";
import ListeningPractice from "./pages/practice/ListeningPractice";
import FlashcardPractice from "./pages/practice/FlashcardPractice";
import TypingPractice from "./pages/practice/TypingPractice";
import TextAnalyzer from "./pages/TextAnalyzer";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import { supabase } from "./services/supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
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

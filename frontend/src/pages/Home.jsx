import { useState, useEffect } from "react";
import WordCard from "../components/WordCard";
import { apiCall } from "../utils/apiClient";

export default function Home() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    apiCall("/words/daily")
      .then((response) => response.json())
      .then((json) => setWords(json))
      .catch((err) => console.error("Failed to fetch words:", err));
    setCurrentIndex(0);
  }, []);

  const changeStatus = (wordId, newStatus) => {
    setWords((prevWords) => {
      return prevWords.map((w) =>
        w.id === wordId ? { ...w, status: newStatus } : w,
      );
    });

    apiCall(`/words/${wordId}/status`, {
      method: "POST",
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("Failed to update word status:", err));
  };

  const currentWord = words[Math.min(currentIndex, words.length - 1)];

  const prevWord = () => {
    if (!words || words.length === 0) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextWord = () => {
    if (!words || words.length === 0) return;
    setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-2 text-4xl font-bold">!Bienvenido¡</h1>
      <h2 className="mb-6 text-xl text-text-muted">
        Let’s learn Spanish one word at a time.
      </h2>
      {!words || words.length === 0 ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <WordCard
          word={currentWord}
          prevWord={prevWord}
          nextWord={nextWord}
          changeStatus={changeStatus}
        />
      )}
    </div>
  );
}

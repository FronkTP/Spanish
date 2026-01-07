import { useState, useEffect } from "react";
import WordList from "../components/WordList";

export default function Home() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("/api/words/daily")
      .then((response) => response.json())
      .then((json) => setWords(json));
  }, []);

  return (
    <main>
      <h1>Home page</h1>
      <WordList words={words} />
    </main>
  );
}

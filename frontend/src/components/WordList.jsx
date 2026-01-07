import { useState, useEffect } from "react";
import WordCard from "./WordCard";

export default function WordList({ words }) {
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setWordList(words);
    setCurrentIndex(0);
  }, [words]);

  const currentWord = wordList[Math.min(currentIndex, wordList.length - 1)];

  const changeStatus = (wordId, newStatus) => {
    setWordList((prevWordList) => {
      return prevWordList.map((w) =>
        w.id === wordId ? { ...w, status: newStatus } : w
      );
    });

    fetch(`/api/words/${wordId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const prevWord = () => {
    if (!words || words.length === 0) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextWord = () => {
    if (!words || words.length === 0) return;
    setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
  };

  return (
    <>
      {/* <p>{words && JSON.stringify(words)}</p> */}
      {!wordList || wordList.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <WordCard
          word={currentWord}
          prevWord={prevWord}
          nextWord={nextWord}
          changeStatus={changeStatus}
        />
      )}
    </>
  );
}

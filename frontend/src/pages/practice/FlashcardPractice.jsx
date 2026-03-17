import { useState, useEffect } from "react";
import Flashcard from "../../components/Flashcard";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function FlashcardPractice() {
  const [word, setWord] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  const loadQuestion = () => {
    fetch("/api/practice/flashcard")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          setWord(json.practice.wordMetadata);
        }
      });
  };

  useEffect(() => loadQuestion(), []);

  const handleMarkIncorrect = () => {
    fetch("/api/practice/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordId: word.id,
        practiceMode: "flashcard",
        outcome: "incorrect",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsFlipped(false);
        loadQuestion();
      });
  };

  const handleMarkCorrect = () => {
    fetch("/api/practice/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordId: word.id,
        practiceMode: "flashcard",
        outcome: "correct",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsFlipped(false);
        loadQuestion();
      });
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Flashcard
        word={word}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
      <div className="w-full max-w-[36em] flex gap-4 items-center">
        {isFlipped && (
          <div className="w-full flex gap-3 justify-center transition-opacity">
            <button
              onClick={handleMarkIncorrect}
              className="min-w-1/4 flex px-5 py-2 justify-center border border-primary bg-background-light text-primary rounded-xl shadow-xs hover:bg-primary/5"
            >
              <XMarkIcon className="size-6" />
            </button>
            <button
              onClick={handleMarkCorrect}
              className="min-w-1/4 flex px-5 py-2 justify-center border border-accent bg-background-light text-accent rounded-xl shadow-xs hover:bg-amber-50"
            >
              <CheckIcon className="size-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import PracticeSummary from "../../components/PracticeSummary";

export default function TypingPractice() {
  const [word, setWord] = useState({});
  const [typedWord, setTypedWord] = useState("");
  const [countedWordId, setCountedWordId] = useState(null);
  const [showIsCorrect, setShowIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const loadQuestion = () => {
    setTypedWord("");
    fetch("/api/practice/typing")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          setWord(json.practice.wordMetadata);
        }
      });
    setShowIsCorrect(false);
  };

  useEffect(() => loadQuestion(), []);

  useEffect(() => {
    setShowIsCorrect(false);
  }, [word.id]);

  const checkAnswer = (e) => {
    e.preventDefault();

    const outcome =
      word.spanish === typedWord.toLowerCase().trim() ? "correct" : "incorrect";
    setShowIsCorrect(true);
    if (countedWordId !== word.id) {
      setTotal((prev) => prev + 1);
      if (outcome === "correct") {
        setScore((prev) => prev + 1);
      }
      setCountedWordId(word.id);
    }

    fetch("/api/practice/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordId: word.id,
        practiceMode: "typing",
        outcome,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  const nextQuestion = () => {
    loadQuestion();
    setShowIsCorrect(false);
  };

  const finishSession = () => {
    setIsFinished(true);
  };

  const restartSession = () => {
    setScore(0);
    setTotal(0);
    setCountedWordId(null);
    setTypedWord("");
    setShowIsCorrect(false);
    setIsFinished(false);
    loadQuestion();
  };

  return (
    <>
      {!isFinished ? (
        <div>
          <p className="text-right">
            Score: {score} / {total}
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="max-w-3xl flex flex-col gap-6">
              <form onSubmit={checkAnswer}>
                <div className="flex flex-col justify-center items-stretch mb-6 p-6 bg-white rounded-xl shadow-xs border border-gray-100">
                  <p className="mb-2 text-xs text-text-subtle text-center uppercase">
                    Translation
                  </p>
                  <h1 className="w-full mb-6 text-center first-letter:uppercase text-4xl font-extrabold wrap-break-word">
                    {Array.isArray(word.english)
                      ? word.english.join(", ")
                      : word.english}
                  </h1>
                  <div className="w-full flex justify-center items-center gap-4 p-4 text-xl text-center rounded-xl border-2 border-gray-800 focus-within:ring-primary focus-within:border-primary">
                    <input
                      type="text"
                      value={typedWord}
                      placeholder="Type the word..."
                      onChange={(e) => {
                        setShowIsCorrect(false);
                        setTypedWord(e.target.value);
                      }}
                      className="w-full outline-none bg-transparent"
                    />
                    <div>
                      {showIsCorrect ? (
                        word.spanish === typedWord.toLowerCase().trim() ? (
                          <CheckCircleIcon className="size-6 text-emerald-600" />
                        ) : (
                          <XCircleIcon className="size-6 text-primary" />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-2 bg-primary text-background-light rounded-xl shadow-xs hover:bg-red-800"
                >
                  Check answer
                </button>
              </form>
              <div className="w-full flex gap-3">
                {total > 0 && (
                  <button
                    onClick={() => finishSession()}
                    className="w-full px-5 py-2 border border-gray-700 bg-background-light rounded-xl shadow-xs hover:bg-gray-100"
                  >
                    Finish this Session
                  </button>
                )}
                {showIsCorrect && (
                  <button
                    onClick={() => nextQuestion()}
                    className="w-full px-5 py-2 border border-primary bg-background-light text-primary rounded-xl shadow-xs hover:bg-primary/5"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PracticeSummary
          mode={"Typing"}
          score={score}
          total={total}
          onPracticeAgain={restartSession}
        />
      )}
    </>
  );
}

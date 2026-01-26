import { useState, useEffect, useRef } from "react";
import {
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import PracticeSummary from "../../components/PracticeSummary";

export default function ListeningPractice() {
  const [practice, setPractice] = useState({ choices: [], correctChoice: "" });
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showIsCorrect, setShowIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const loadQuestion = () => {
    setPractice({ choices: [], correctChoice: "" });
    setSelectedChoice(null);
    setShowIsCorrect(false);

    fetch("/api/practice/listening")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          setPractice(json.practice);
        }
      });
    setShowIsCorrect(false);
  };

  useEffect(() => loadQuestion(), []);

  const audioRef = useRef(null);

  useEffect(() => {
    const src = practice?.wordMetadata?.audio;
    if (!src || !audioRef.current) return;

    const tryPlay = async () => {
      try {
        audioRef.current.load();
        await audioRef.current.play();
      } catch (err) {
        // Ignore silently
      }
    };

    tryPlay(); 
  }, [practice?.wordMetadata?.audio]);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const handleChoiceSelect = (choice) => {
    if (showIsCorrect) return;

    setSelectedChoice(choice);
    setShowIsCorrect(true);
    setTotal((prev) => prev + 1);
    const outcome = choice === practice.correctChoice ? "correct" : "incorrect";
    if (choice === practice.correctChoice) {
      console.log("correct");
      setScore((prev) => prev + 1);
    }
    // fetch("/api/practice/attempt", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     wordId: practice.wordMetadata.id,
    //     practiceMode: "listening",
    //     outcome,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  };

  const nextQuestion = () => {
    loadQuestion();
    setSelectedChoice(null);
    setShowIsCorrect(false);
  };

  const finishSession = () => {
    setIsFinished(true);
  };

  return (
    <>
      {!isFinished ? (
        <div>
          <pre className="max-w-full overflow-x-auto text-xs text-gray-500">
            {/* {practice ? JSON.stringify(practice, null, 2) : ""} */}
          </pre>
          <p className="text-right">
            Score: {score} / {total}
          </p>
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h1 className="mb-4 text-4xl font-bold text-center">
              Listen and choose the correct word
            </h1>
            <div className="text-center">
              <div className="relative size-36 flex items-center justify-center">
                <div className="absolute size-32 scale-150 rounded-full bg-primary/10"></div>
                <div className="absolute size-32 scale-125 rounded-full bg-primary/10"></div>
                <button
                  onClick={playAudio}
                  className="relative size-32 flex justify-center items-center rounded-full text-background-light bg-primary hover:bg-red-800"
                  aria-label="play audio"
                >
                  <PlayIcon className="size-20" />
                </button>
              </div>
              <p className="mt-8">Click to play audio</p>
            </div>
            {/* 3 choices */}
            <div className="w-full flex flex-col gap-4">
              {practice.choices.map((choice, index) => {
                const isSelected = choice === selectedChoice;
                const isCorrect = choice === practice.correctChoice;

                return (
                  <button
                    key={choice}
                    onClick={() => handleChoiceSelect(choice)}
                    disabled={showIsCorrect}
                    className="flex w-full items-center gap-4 rounded-xl border bg-white px-6 py-4 text-left text-lg font-semibold shadow-sm hover:bg-gray-50"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">{choice}</div>
                    <div className="text-black">
                      {showIsCorrect && isCorrect && (
                        <CheckCircleIcon className="size-6 text-emerald-600" />
                      )}
                      {showIsCorrect && isSelected && !isCorrect && (
                        <XCircleIcon className="size-6 text-primary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="w-full flex gap-3">
              {total > 0 && (
                <button
                  onClick={() => finishSession()}
                  className="w-full px-5 py-2 border border-gray-700 bg-background-light text-gray-700 rounded-xl shadow-sm hover:bg-gray-100"
                >
                  Finish this Session
                </button>
              )}
              {showIsCorrect && (
                <button
                  onClick={() => nextQuestion()}
                  className="w-full px-5 py-2 bg-primary text-background-light rounded-xl shadow-sm hover:bg-red-800"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>

          <audio
            ref={audioRef}
            src={practice?.wordMetadata?.audio}
            preload="none"
          />
        </div>
      ) : (
        <PracticeSummary mode={"Listening"} score={score} total={total} />
      )}
    </>
  );
}

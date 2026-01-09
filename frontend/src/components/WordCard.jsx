import { useState, useEffect, useRef } from "react";

export default function WordCard({
  word = {},
  prevWord,
  nextWord,
  changeStatus,
}) {
  const {
    id,
    spanish = "",
    english = "",
    pos = "",
    audio = "",
    conjugations,
    example_sentences = [],
    original_english = "",
    status = "",
  } = word;

  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => setShowDetails(false), [word]);

  const audioRef = useRef(null);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  console.log(word.conjugations);

  return (
    <div>
      <div>
        <div>
          <div>
            <p>Word of the Day</p>
            <div>
              <h1>{spanish}</h1>

              <button onClick={playAudio} aria-label="play pronunciation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <span>{pos}</span>
              <span>
                <span>{status}</span>
              </span>
            </div>
          </div>

          <div>
            <button aria-label="bookmark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      {!showDetails && (
        <button
          onClick={() => {
            if (status === "new" && changeStatus) {
              changeStatus(id, "learning");
            }
            setShowDetails(true);
          }}
          className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
        >
          Reveal translation
        </button>
      )}

        {/* <p>
          {original_english ||
            (Array.isArray(english) ? english.join(", ") : english)}
        </p> */}
        <p>{Array.isArray(english) ? english.join(", ") : english}</p>

        {example_sentences.length > 0 && (
          <div>
            <h3>Example(s)</h3>
            <div>
              {example_sentences.map((s) => (
                <div key={s.spanish} className="mb-3">
                  <p>{s.spanish}</p>
                  <p>{s.english}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {false && (
          <div>
            <h3>Conjugation Table</h3>
            <p>{JSON.stringify(conjugations)}</p>
          </div>
        )}

        <div>
          <button onClick={() => changeStatus && changeStatus(id, "known")}>
            Mark as Known
          </button>
          <button onClick={prevWord}>Previous Word</button>
          <button onClick={nextWord}>Next Word</button>
        </div>

        <audio ref={audioRef} src={audio} preload="none" />
      </div>
    </div>
  );
}

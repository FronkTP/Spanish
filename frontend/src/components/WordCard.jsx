import { useState, useEffect, useRef } from "react";
import {
  BookmarkIcon,
  SpeakerWaveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

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
  useEffect(() => setShowDetails(false), [id]);

  const audioRef = useRef(null);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const STATUS_CLASSES = {
    known: {
      badge: "bg-green-50 text-green-800",
      dot: "bg-green-500",
    },
    learning: {
      badge: "bg-blue-50 text-blue-800",
      dot: "bg-blue-500",
    },
    new: {
      badge: "bg-orange-50 text-orange-800",
      dot: "bg-orange-500",
    },
  };

  const statusClasses = STATUS_CLASSES[status] ?? STATUS_CLASSES.new;

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase">5 Words of the Day</p>
          <div className="flex items-center gap-8">
            <h1 className="first-letter:uppercase mt-2 text-5xl sm:text-6xl font-extrabold text-background-dark">
              {spanish}
            </h1>

            <button
              onClick={playAudio}
              aria-label="play pronunciation"
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-primary hover:bg-red-100 translate-y-2"
            >
              <SpeakerWaveIcon className="size-6" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="uppercase inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-yellow-50 text-yellow-800">
              {pos}
            </span>
            <span
              className={`uppercase inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${statusClasses.badge}`}
            >
              <span
                className={`relative inline-flex rounded-full h-2 w-2 mr-2 ${statusClasses.dot}`}
              />
              <span>{status}</span>
            </span>
          </div>
        </div>

        <div className="flex items-start">
          <button
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="bookmark"
          >
            <BookmarkIcon className="size-6" />
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
      <div
        className={
          "transition-all duration-300 ease-out " +
          (showDetails
            ? "max-h-[800px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none")
        }
      >
        <p className="mt-6 text-lg text-gray-700">
          {Array.isArray(english) ? english.join(", ") : english}
        </p>
        {example_sentences.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs text-gray-500 uppercase">Example(s)</h3>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded p-4">
              {example_sentences.map((s) => (
                <div key={s.spanish} className="mb-3">
                  <p className="text-gray-800">{s.spanish}</p>
                  <p className="text-gray-500 text-sm">{s.english}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {false && (
          <div className="mt-6">
            <h3 className="text-xs text-gray-500 uppercase">
              Conjugation Table
            </h3>
            <p>{JSON.stringify(conjugations)}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4 items-center justify-end">
        <button
          onClick={() => changeStatus && changeStatus(id, "known")}
          className="px-4 py-2 rounded border border-primary bg-background-light text-primary hover:bg-red-50"
        >
          I Know This
        </button>
        <button
          onClick={prevWord}
          className="px-4 py-2 rounded border border-primary bg-background-light text-primary hover:bg-red-50"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          onClick={() => {
            nextWord();
            if (status === "new" && changeStatus) {
              changeStatus(id, "learning");
            }
          }}
          className="px-5 py-2 bg-primary text-background-light rounded shadow hover:bg-red-800"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <audio ref={audioRef} src={audio} preload="none" />
    </div>
  );
}

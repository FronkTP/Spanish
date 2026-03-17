import { useRef, useEffect, useState } from "react";
import { SpeakerWaveIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
// plan:
// card component
// keep score and xp
// button to finish the session (maybe we do 10 each session?)
// front: spanish, pos, audio
// back: spanish, english, pos, audio, example sentence
// show button to mark as correct or wrong after isFlipped, then click 1 of those button to go to next word

export default function Flashcard({ word, isFlipped, setIsFlipped }) {
  const {
    id,
    spanish,
    english,
    pos,
    audio,
    conjugations,
    example_sentences,
    original_english,
    status,
  } = word;

  const audioRef = useRef(null);
  const backBodyRef = useRef(null);
  const [isBackBodyOverflowing, setIsBackBodyOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (backBodyRef.current) {
        const isOverflowing =
          backBodyRef.current.scrollHeight > backBodyRef.current.clientHeight;
        setIsBackBodyOverflowing(isOverflowing);
      }
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    if (backBodyRef.current) {
      observer.observe(backBodyRef.current);
    }
    return () => observer.disconnect();
  }, [id]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div
      className="w-full max-w-3xl min-h-80 h-[calc(100dvh-240px)] max-h-[96em] p-6 bg-white rounded-xl shadow-xs border border-gray-100 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-3d ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-xl backface-hidden">
          <div className="relative h-full min-w-0 flex flex-col">
            <div className="absolute top-0 right-0 flex justify-end">
              <ArrowPathIcon className="size-6 text-gray-500" />
            </div>
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <div className="flex items-center gap-8">
                <h1 className="w-full text-center first-letter:uppercase text-5xl sm:text-6xl font-extrabold text-primary wrap-break-word">
                  {spanish}
                </h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio();
                  }}
                  aria-label="play pronunciation"
                  disabled={audio === null}
                  className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary ${
                    audio === null
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/15"
                  } translate-y-2`}
                  title={`${
                    audio === null ? "Audio not available for this word" : ""
                  }`}
                >
                  <SpeakerWaveIcon className="size-6" />
                </button>
              </div>

              <p className="uppercase px-2.5 py-1 rounded-sm text-lg font-medium bg-yellow-50 text-yellow-800">
                {pos}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-xl transform-[rotateY(180deg)] backface-hidden">
          <div
            className={`relative h-full min-h-0 min-w-0 flex flex-col ${
              isBackBodyOverflowing ? "" : "justify-center"
            }`}
          >
            <div className="absolute top-0 right-0 flex justify-end">
              <ArrowPathIcon className="size-6 text-gray-500" />
            </div>
            <div className="w-full flex shrink-0 justify-center items-center pb-4 gap-8">
              <h1 className="text-center first-letter:uppercase text-5xl sm:text-6xl font-extrabold text-primary wrap-break-word">
                {spanish}
              </h1>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio();
                }}
                aria-label="play pronunciation"
                disabled={audio === null}
                className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary ${
                  audio === null
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/15"
                } translate-y-2`}
                title={`${
                  audio === null ? "Audio not available for this word" : ""
                }`}
              >
                <SpeakerWaveIcon className="size-6" />
              </button>
            </div>
            <div
              ref={backBodyRef}
              className={`overflow-y-auto flex flex-col items-center gap-6 ${
                isBackBodyOverflowing
                  ? "min-h-0 flex-1 justify-start"
                  : "justify-center"
              }`}
            >
              <p className="w-full pr-1 text-center first-letter:uppercase text-2xl text-gray-700 wrap-break-word">
                {Array.isArray(english) ? english.join(", ") : english}
              </p>
              {example_sentences && example_sentences.length > 0 && (
                <div className="w-full">
                  <h3 className="text-xs text-gray-500 uppercase">
                    Example(s)
                  </h3>
                  <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
                    {example_sentences.map((s) => (
                      <div key={s.spanish} className="mb-3">
                        <p className="text-gray-800">{s.spanish}</p>
                        <p className="text-gray-500 text-sm">{s.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={audio} />
    </div>
  );
}

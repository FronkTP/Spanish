import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
// plan:
// card component
// keep score and xp
// button to finish the session (maybe we do 10 each session?)
// front: spanish, pos, audio
// back: spanish, english, pos, audio, example sentence
// show button to mark as correct or wrong after isFlipped, then click 1 of those button to go to next word

export default function Flashcard({ word }) {
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

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-[36em] h-80 p-6 bg-white rounded-xl shadow-xs border border-gray-100 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-3d ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 frounded-xl backface-hidden">
          <div className="relative h-full min-w-0 flex flex-col">
            <div className="absolute top-0 right-0 flex justify-end">
              <ArrowPathIcon className="size-6 text-gray-500 cursor-pointer" />
            </div>
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <h1 className="w-full text-center first-letter:uppercase text-5xl sm:text-6xl font-extrabold text-primary wrap-break-word">
                {spanish}
              </h1>
              <p className="uppercase px-2.5 py-1 rounded-sm text-lg font-medium bg-yellow-50 text-yellow-800">
                {pos}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 frounded-xl transform-[rotateY(180deg)] backface-hidden">
          <div className="relative h-full min-w-0 flex flex-col">
            <div className="absolute top-0 right-0 flex justify-end">
              <ArrowPathIcon className="size-6 text-gray-500 cursor-pointer" />
            </div>
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <h1 className="w-full text-center first-letter:uppercase text-5xl sm:text-6xl font-extrabold text-primary wrap-break-word">
                {spanish}
              </h1>
              <p className="w-full text-center first-letter:uppercase text-2xl text-gray-700 wrap-break-word">
                {english}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

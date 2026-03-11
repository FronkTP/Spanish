import { useState, useEffect } from "react";
import Flashcard from "../../components/Flashcard";
import {
  CheckIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function FlashcardPractice() {
  const [word, setWord] = useState({});
  useEffect(() => {
    fetch("/api/practice/flashcard")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          setWord(json.practice.wordMetadata);
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Flashcard word={word} />
      <div className="w-[36em] flex gap-4 items-center justify-between">
        <button className="px-4 py-2 rounded-full border border-gray-500 bg-background-light text-gray-500 hover:bg-gray-50">
          <ChevronLeftIcon className="size-4" />
        </button>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-primary bg-background-light text-primary rounded-full shadow-xs hover:bg-primary/5">
            <XMarkIcon className="size-8" />
          </button>
          <button className="px-5 py-2 border border-accent bg-background-light text-accent rounded-full shadow-xs hover:bg-amber-50">
            <CheckIcon className="size-8" />
          </button>
        </div>
        <button className="px-4 py-2 rounded-full border border-gray-500 bg-background-light text-gray-500 hover:bg-gray-50">
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

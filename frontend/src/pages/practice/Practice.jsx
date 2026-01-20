import { PracticeModeCard } from "../../components/PracticeModeCard";
import { ArrowPathIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function Practice() {
  return (
    <div>
      <h1 className="mb-4 text-5xl font-extrabold text-center text-text-dark">Practice</h1>
      <p className="mb-6 text-xl text-center text-text-dark">
        Choose your preferred practice mode to begin your session.
      </p>
      <div className="flex flex-col gap-6">
        <PracticeModeCard
          path="/practice/listening"
          title="Listening"
          subtitle="Listen to the word audio and pick the correct choice"
          color="primary"
          Icon={SpeakerWaveIcon}
        />
        <PracticeModeCard
          path="/practice/flashcard"
          title="Flashcard"
          subtitle="Test your memory with active recall flashcards"
          color="accent"
          Icon={ArrowPathIcon}
        />
      </div>
    </div>
  );
}

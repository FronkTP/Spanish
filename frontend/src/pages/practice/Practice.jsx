import { PracticeModeCard } from "../../components/PracticeModeCard";
import { ArrowPathIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function Practice() {
  return (
    <main className="p-6 bg-background-light">
      <h1 className="mb-4 text-5xl font-extrabold text-center">Practice</h1>
      <p className="text-xl text-center">
        Choose your preferred practice mode to begin your session
      </p>
      <div className="mt-6 flex flex-col gap-6">
        <PracticeModeCard
          path="/practice/listening"
          title="Listening"
          subtitle="Listen to the word audio and pick the correct choice"
          color="bg-primary"
          Icon={SpeakerWaveIcon}
        />
        <PracticeModeCard
          path="/practice/flashcard"
          title="Flashcard"
          subtitle="Test your memory with active recall flashcards"
          color="bg-accent"
          Icon={ArrowPathIcon}
        />
      </div>
    </main>
  );
}

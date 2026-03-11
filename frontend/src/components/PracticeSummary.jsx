import {
  TrophyIcon,
  CheckIcon,
  RectangleStackIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

export default function PracticeSummary({ mode, score, total }) {
  const xpGained = Math.round((score / total) * 50);
  const accuracy = Math.round((score / total) * 100);

  return (
    <div className="max-w-xl mx-auto my-6 p-6 text-center bg-white rounded-xl shadow-xs border border-gray-100">
      <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
        <span role="img" aria-label="trophy">
          <TrophyIcon className="size-8 text-primary" />
        </span>
      </div>

      <h2 className="text-2xl font-bold">¡Buen trabajo!</h2>
      <p className="mt-1 text-sm text-gray-500">
        You&apos;ve completed your {mode} practice.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-background-light px-4 py-5">
          <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <CheckIcon className="size-4" />
          </div>
          <div className="text-lg font-semibold">{accuracy} %</div>
          <div className="text-xs uppercase text-gray-500">Accuracy</div>
        </div>

        <div className="rounded-xl border bg-background-light px-4 py-5">
          <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <RectangleStackIcon className="size-4" />
          </div>
          <div className="text-lg font-semibold">{total}</div>
          <div className="text-xs uppercase text-gray-500">Questions</div>
        </div>

        <div className="rounded-xl border bg-background-light px-4 py-5">
          <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <BoltIcon className="size-4" />
          </div>
          <div className="text-lg font-semibold">+{xpGained} XP</div>
          <div className="text-xs uppercase text-gray-500">Gained</div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        <button className="w-full px-5 py-2 bg-primary text-background-light rounded-xl shadow-xs hover:bg-red-800">
          Practice Again
        </button>
        <div className="w-full flex gap-3">
          <button className="w-full px-5 py-2 border border-gray-700 bg-background-light text-gray-700 rounded-xl shadow-xs hover:bg-gray-100">
            Go Home
          </button>
          <button className="w-full px-5 py-2 border border-gray-700 bg-background-light text-gray-700 rounded-xl shadow-xs hover:bg-gray-100">
            My Progress
          </button>
        </div>
      </div>
    </div>
  );
}

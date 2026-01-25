import { Link } from "react-router-dom";
import {
  GlobeEuropeAfricaIcon,
  ArrowTrendingUpIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

export default function ComingSoon() {
  return (
    <div className="min-h-[calc(100vh-106px)] max-w-5xl w-full flex flex-col items-center justify-center m-auto px-4">
      <h1 className="mb-2 text-4xl font-bold text-center">
        !Próximamente¡
      </h1>
      <p className="text-xl text-gray-600 text-center">Coming Soon</p>

      <p className="mt-10 text-xs font-semibold tracking-[0.2em] text-gray-400">
        YOU CAN BROWSE OTHER PAGES FOR NOW
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <Link to="/">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-accent flex items-center justify-center mb-4">
              <GlobeEuropeAfricaIcon className="size-6" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Daily Word</h3>
            <p className="text-sm text-gray-500">
              Expand your vocabulary every day
            </p>
          </div>
        </Link>
        <Link to="/progress">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-accent flex items-center justify-center mb-4">
              <ArrowTrendingUpIcon className="size-6" />
            </div>
            <h3 className="text-lg font-semibold mb-1">My Progress</h3>
            <p className="text-sm text-gray-500">
              Review your learning journey
            </p>
          </div>
        </Link>
        <Link to="/practice/listening">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-accent flex items-center justify-center mb-4">
              <SpeakerWaveIcon className="size-6" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Listening Quiz</h3>
            <p className="text-sm text-gray-500">
              Test your knowledge with listening quiz
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

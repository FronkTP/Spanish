import { useState, useEffect } from "react";
import { BookOpenIcon, FireIcon, StarIcon } from "@heroicons/react/24/outline";
import { iconMap } from "../constants/achievementIconMap";
import { AchievementBadge } from "../components/AchievementBadge";

export default function Progress() {
  const [progressObj, setProgressObj] = useState({});

  useEffect(() => {
    fetch("/api/progress")
      .then((response) => response.json())
      .then((json) => {
        setProgressObj(json);
        console.log(json);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-5xl font-extrabold text-center">
        My Learning Progress
      </h1>
      {/* Stats */}
      {/* <h1>{progressObj && JSON.stringify(progressObj)}</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full px-6 md:p-6 rounded-xl border border-gray-100 bg-white shadow-xs divide-y divide-accent/50 md:divide-y-0 md:divide-x">
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="text-primary">
            <FireIcon className="size-8" />
          </div>
          <div>
            <p className="text-4xl text-primary font-extrabold">
              {progressObj.streak ?? 0}
            </p>
            <p className="text-sm uppercase tracking-tight text-primary">
              daily grind
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="text-accent">
            <BookOpenIcon className="size-8" />
          </div>
          <div>
            <p className="text-4xl text-accent font-extrabold">
              {progressObj.wordKnown ?? 0}%
            </p>
            <p className="text-sm uppercase tracking-tight text-accent">
              vocabulary mastered
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="text-primary">
            <StarIcon className="size-8" />
          </div>
          <div>
            <p className="text-4xl text-primary font-extrabold">
              {progressObj.xp ?? 0}
            </p>
            <p className="text-sm uppercase tracking-tight text-primary">
              xp gained
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Weekly Activity */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-6">
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">M</span>
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">T</span>
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">W</span>
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">T</span>
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="flex flex-col items-center text-xs col-start-2 sm:col-start-auto">
              <span className="mb-2">F</span>
              <div className="w-8 h-8 rounded-md bg-accent text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">S</span>
              <div className="w-8 h-8 rounded-md border border-dashed border-primary/50 bg-gray-200 flex items-center justify-center opacity-60">
                &nbsp;
              </div>
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="mb-2">S</span>
              <div className="w-8 h-8 rounded-md border border-dashed border-primary/50 bg-gray-200 flex items-center justify-center opacity-60">
                &nbsp;
              </div>
            </div>
          </div>

          <div className="bg-background-light p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-semibold">Weekly Goal</div>
              <div className="text-sm font-bold text-accent">71%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-3 bg-accent" style={{ width: "71%" }} />
            </div>
            <p className="text-xs mt-3">Hit your target 5/7 days this week!</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {progressObj?.achievement?.map((a) => {
              const Icon = iconMap[a.iconTitle] ?? iconMap.MinusCircleIcon;
              return (
                <AchievementBadge key={a.title} title={a.title} Icon={Icon} />
              );
            })}
            <div className="text-sm font-semibold text-gray-500 col-span-2">
              Keep practising to unlock more achievements...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

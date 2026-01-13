import { useState, useEffect } from "react";

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
    <main className="p-6 bg-background-light">
      <h1 className="mb-6 text-4xl font-extrabold text-center">
        My Learning Progress
      </h1>
      {/* Stats */}
      <h1>{progressObj && JSON.stringify(progressObj)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full px-6 md:p-6 rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-accent/50 md:divide-y-0 md:divide-x">
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
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
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
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
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {progressObj?.achievement?.map((a) => (
              <div key={a.title} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-accent/20 ring-2 ring-accent flex items-center justify-center shadow-sm">
                  {a.icon}
                </div>
                <div className="text-xs text-center font-semibold">
                  {a.title}
                </div>
              </div>
            ))}
            <div className="text-sm font-semibold text-gray-500 col-span-2">
              Keep practising to unlock more achievements...
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

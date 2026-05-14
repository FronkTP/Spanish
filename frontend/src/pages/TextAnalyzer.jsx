import { useMemo, useState } from "react";
import { apiCall } from "../utils/apiClient";

const TW_COLORS = {
  gray200: "oklch(92.8% 0.006 264.531)",
  sky700: "oklch(50% 0.134 242.749)",
};

const DIFFICULTY_STYLES = {
  easy: {
    label: "Easy",
    textClass: "text-emerald-600",
    bgClass: "bg-emerald-600",
    meter: 34,
  },
  medium: {
    label: "Medium",
    textClass: "text-accent",
    bgClass: "bg-accent",
    meter: 62,
  },
  hard: {
    label: "Hard",
    textClass: "text-primary",
    bgClass: "bg-primary",
    meter: 86,
  },
  default: {
    label: "Not analyzed",
    textClass: "text-text-muted",
    bgClass: "bg-gray-600",
    meter: 0,
  },
};

const BUCKET_VISUALS = [
  { key: "known", label: "Known", color: "var(--color-primary)" },
  { key: "learning", label: "Learning", color: "var(--color-accent)" },
  { key: "new", label: "New", color: TW_COLORS.sky700 },
  { key: "unknown", label: "Not in Word List", color: TW_COLORS.gray200 },
];

const MAX_TEXT_LENGTH = 500;

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const [statsObj, setStatsObj] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const totals = statsObj?.totals;
  const buckets = statsObj?.buckets;
  const difficulty = statsObj?.analysis?.difficulty;
  const hasAnalysis = Boolean(totals && buckets);

  const difficultyMeta =
    DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.default;
  const recognitionRate = buckets?.recognized?.percentage ?? 0;
  const characterCount = text.length;
  const textUsagePercentage = Math.min(
    100,
    (characterCount / MAX_TEXT_LENGTH) * 100,
  );

  const chartData = useMemo(
    () =>
      BUCKET_VISUALS.map((bucketVisual) => {
        const bucket = buckets?.[bucketVisual.key];
        return {
          ...bucketVisual,
          count: bucket?.count ?? 0,
          percentage: bucket?.percentage ?? 0,
        };
      }),
    [buckets],
  );

  const chartBackground = useMemo(() => {
    if (!totals?.totalWords) {
      return `conic-gradient(${TW_COLORS.gray200} 0% 100%)`;
    }

    let cursor = 0;
    const stops = chartData
      .filter((segment) => segment.percentage > 0)
      .map((segment) => {
        const start = cursor;
        cursor = Math.min(100, cursor + segment.percentage);
        return `${segment.color} ${start}% ${cursor}%`;
      });

    if (stops.length === 0) {
      return `conic-gradient(${TW_COLORS.gray200} 0% 100%)`;
    }

    if (cursor < 100) {
      stops.push(`${TW_COLORS.gray200} ${cursor}% 100%`);
    }

    return `conic-gradient(${stops.join(", ")})`;
  }, [chartData, totals?.totalWords]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim().length <= 0) {
      setErr("The text should not be empty.");
      setStatsObj({});
      return;
    } else if (text.length > MAX_TEXT_LENGTH) {
      setErr(`The text is over the ${MAX_TEXT_LENGTH} characters limit.`);
      setStatsObj({});
      return;
    }

    setErr("");
    setLoading(true);

    try {
      const response = await apiCall("/analyze", {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json?.error || "Failed to analyze text.");
      }

      setStatsObj(json);
    } catch (error) {
      setStatsObj({});
      setErr(error.message || "Failed to analyze text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-6 text-5xl font-extrabold text-center">
        Text Analysis
      </h1>
      <h2 className="mb-6 text-xl text-center text-text-muted">
        Understand how well you know this text.
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          maxLength={MAX_TEXT_LENGTH}
          placeholder="Paste the text here..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full h-40 p-4 rounded-xl border border-gray-100 bg-white shadow-xs"
        ></textarea>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full flex flex-1 gap-3 items-center sm:min-w-0">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  characterCount >= MAX_TEXT_LENGTH ? "bg-primary" : "bg-accent"
                }`}
                style={{ width: `${textUsagePercentage}%` }}
                role="progressbar"
                aria-label="Text character limit usage"
                aria-valuemin={0}
                aria-valuemax={MAX_TEXT_LENGTH}
                aria-valuenow={characterCount}
              />
            </div>
            <p className="mb-2 flex items-center justify-between text-sm font-medium text-text-muted">
              {characterCount}/{MAX_TEXT_LENGTH}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-primary text-background-light rounded-xl shadow-xs hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>
        </div>
      </form>

      {err && <p className="mt-3 text-sm text-primary">{err}</p>}

      {hasAnalysis && (
        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
          <div className="space-y-4">
            <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-semibold mb-4">Text Difficulty</h2>
              <p
                className={`mt-2 text-4xl font-bold ${difficultyMeta.textClass}`}
              >
                {difficultyMeta.label}
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${difficultyMeta.bgClass}`}
                  style={{ width: `${difficultyMeta.meter}%` }}
                />
              </div>
            </article>

            <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-semibold mb-4">Recognition Rate</h2>
              <p className="mt-3 text-4xl font-extrabold">{recognitionRate}%</p>
            </article>
          </div>

          <article className="flex items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
            <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[220px_1fr]">
              <div
                className="relative mx-auto h-52 w-52 rounded-full shadow-sm"
                style={{ background: chartBackground }}
                aria-label="Vocabulary breakdown donut chart"
              >
                <div className="absolute inset-8 rounded-full bg-white" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <p className="text-4xl font-extrabold">
                      {totals.uniqueWords}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-faint">
                      Words
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Vocabulary Breakdown
                </h2>
                <ul className="space-y-3">
                  {chartData.map((segment) => (
                    <li
                      key={segment.key}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: segment.color }}
                          aria-hidden="true"
                        />
                        <p className="text-base font-semibold">
                          {segment.label}
                        </p>
                      </div>
                      <p className="text-base font-semibold text-text-muted">
                        {segment.percentage}%
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}

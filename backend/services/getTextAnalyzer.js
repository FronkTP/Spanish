import { supabase } from "../db/supabaseServerClient.js";

function buildWordStatusMap(baseWords) {
  const returnMap = new Map();

  if (!baseWords || baseWords.length === 0) return returnMap;

  for (const word of baseWords) {
    const root = word.spanish?.trim().toLowerCase();
    if (root) {
      returnMap.set(root, word.status);
    }

    const allForms =
      word.conjugations?.flatMap((conjugation) => conjugation.cjfs) || [];

    for (const form of allForms) {
      if (form && form !== "-") {
        const individualWords = form.split(/\s+/);

        for (const subWord of individualWords) {
          const cleaned = subWord.trim().toLowerCase();
          if (cleaned) {
            returnMap.set(cleaned, word.status);
          }
        }
      }
    }
  }

  return returnMap;
}

export async function getTextAnalyzer(userId, text) {
  const { data: baseWords, error: baseWordsErr } = await supabase
    .from("words")
    .select(
      `
        *,
        user_words (
            status
        )
    `,
    )
    .eq("user_words.user_id", userId);

  if (baseWordsErr) throw baseWordsErr;

  const normalizedWords = (baseWords ?? []).map((word) => ({
    ...word,
    status: word.user_words?.[0]?.status ?? "new",
  }));

  const expandedWords = buildWordStatusMap(normalizedWords);

  const textArray = text
    .toLowerCase()
    .replaceAll(/[^\p{L}]+/gu, " ")
    .split(/\s+/);

  const normalizedTextArray = textArray.filter((i) => i);

  const totalWords = normalizedTextArray.length;
  const uniqueWords = new Set(normalizedTextArray).size;

  const knownWords = [];
  const learningWords = [];
  const newWords = [];
  const unknownWords = [];

  for (const userWord of normalizedTextArray) {
    const status = expandedWords.get(userWord) ?? "unknown";

    if (status === "known") {
      knownWords.push(userWord);
      continue;
    }

    if (status === "learning") {
      learningWords.push(userWord);
      continue;
    }

    if (status === "new") {
      newWords.push(userWord);
      continue;
    }

    if (status === "unknown") {
      unknownWords.push(userWord);
      continue;
    }
  }

  const knownCount = knownWords.length;
  const learningCount = learningWords.length;
  const newCount = newWords.length;
  const unknownCount = unknownWords.length;

  const recognizedCount = knownCount + learningCount;
  const inAppCount = knownCount + learningCount + newCount;

  const toPercentage = (value) =>
    totalWords === 0 ? 0 : Number(Math.round((value / totalWords) * 100));

  let difficulty = "";
  const recognitionRate = toPercentage(recognizedCount);
  if (recognitionRate < 40) difficulty = "hard";
  else if (recognitionRate < 70) difficulty = "medium";
  else difficulty = "easy";

  return {
    totals: {
      totalWords,
      uniqueWords,
      dictionarySize: expandedWords.size,
    },
    buckets: {
      known: { count: knownCount, percentage: toPercentage(knownCount) },
      learning: { count: learningCount, percentage: toPercentage(learningCount) },
      new: { count: newCount, percentage: toPercentage(newCount) },
      unknown: { count: unknownCount, percentage: toPercentage(unknownCount) },
      inApp: { count: inAppCount, percentage: toPercentage(inAppCount) },
      recognized: { count: recognizedCount, percentage: recognitionRate },
    },
    words: {
      known: [...new Set(knownWords)],
      learning: [...new Set(learningWords)],
      new: [...new Set(newWords)],
      unknown: [...new Set(unknownWords)],
    },
    analysis: {
      difficulty,
    },
  };
}

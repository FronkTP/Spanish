import { supabase } from "../db/supabaseServerClient.js";
import { injectWordsTable } from "./injectWordsTable.js";

const API_KEY = process.env.SPANISH_API_KEY;
const BASE_URL = "https://dictionaryapi.com/api/v3/references/spanish/json";

async function enrichWordsFromApi() {
  // Get only words that still need API data
  const { data: words, error } = await supabase
    .from("words")
    .select("id, spanish")
    .is("english", null);

  if (error) {
    console.error("Error fetching words:", error);
    process.exit(1);
  }

  console.log(`Found ${words.length} words needing enrichment`);

  for (const row of words) {
    const term = row.spanish;
    const normalized = term
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
    const url = `${BASE_URL}/${normalized}?key=${API_KEY}`;

    try {
      if (term.trim().length <= 2) {
        console.log(`Skipped, ${term} is too short`);
        continue;
      }

      console.log(`Fetching: ${term}`);

      const res = await fetch(url);
      if (!res.ok) {
        console.error(`HTTP error for ${term}:`, res.status, res.statusText);
        continue;
      }

      const json = await res.json();

      if (!Array.isArray(json) || json.length === 0) {
        console.warn(`No entries for ${term}, marking as empty definitions`);
        await supabase.from("words").update({ english: [] }).eq("id", row.id);
        continue;
      }

      // Prefer exact match on headword; fallback to first entry
      const lower = term.toLowerCase();
      const entry =
        json.find(
          (e) =>
            e.meta?.lang === "es" &&
            (e.hwi?.hw?.toLowerCase() === lower ||
              e.meta?.id?.toLowerCase() === lower),
        ) ||
        json.find((e) => e.meta?.lang === "es") ||
        json.find(
          (e) =>
            e.hwi?.hw?.toLowerCase() === lower ||
            e.meta?.id?.toLowerCase() === lower,
        ) ||
        json[0];

      const payload = injectWordsTable(entry);

      const { error: updateError } = await supabase
        .from("words")
        .update(payload)
        .eq("id", row.id);

      if (updateError) {
        console.error(`Update error for ${term}:`, updateError);
      } else {
        console.log(`Updated: ${term}`);
      }
    } catch (err) {
      console.error(`Error processing ${term}:`, err);
    }
  }

  console.log("Enrichment complete");
}

enrichWordsFromApi()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });

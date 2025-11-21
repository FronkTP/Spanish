import { parse } from "csv-parse";
import fs from "fs";
import { supabase } from "./db/supabase.js";

const csvPath = "../data/1000-most-common-spanish-words.csv";

let counter = 0;

fs.createReadStream(csvPath)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (csvRow) {
    if (counter == 0) {
      insertData(csvRow);
      counter += 1;
    }
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

async function insertData(row) {
  const [rankStr, rawArticle, spanish, original_english, original_pos] = row;
  const rank = parseInt(rankStr);
  const article = rawArticle.trim() == "" ? null : rawArticle.trim();
  const { error } = await supabase.from("words").insert([
    {
      rank: rank,
      article: article,
      spanish: spanish.trim(),
      original_english: original_english.trim(),
      original_pos: original_pos.trim(),
    },
  ]);
  console.log(rank, article, spanish, original_english, original_pos);

  if (error) {
    throw new Error(error.message);
  }
}

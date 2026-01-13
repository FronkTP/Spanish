import { parse } from "csv-parse";
import fs from "fs";
import { supabase } from "../db/supabase.js";

const csvPath = "../data/1000-most-common-spanish-words.csv";

async function insertData() {
  const bufferedRows = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (csvRow) {
        const [rank, article, spanish, original_english, original_pos] = csvRow;
        bufferedRows.push({
          rank: parseInt(rank),
          article: article.trim() == "" ? null : article.trim(),
          spanish: spanish.trim(),
          original_english: original_english.trim(),
          original_pos: original_pos.trim(),
        });
      })
      .on("end", async function () {
        await insertAllRows(bufferedRows);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function insertAllRows(array) {
  const { error } = await supabase
    .from("words")
    .upsert(array, { onConflict: "spanish" });

  console.log("Insert " + array.length + " rows.");

  if (error) {
    throw new Error(error.message);
  }
}

insertData()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Insert failed: ", err.message);
    process.exit(1);
  });

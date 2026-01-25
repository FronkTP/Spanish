import { supabase } from "../../db/supabase.js";

function generateWrongWord(correct) {
  const letterMap = {
    a: ["e", "i", "o", "u"],
    e: ["a", "i", "o", "u"],
    i: ["a", "e", "o", "u", "y"],
    o: ["a", "e", "i", "u"],
    u: ["a", "e", "i", "o"],

    b: ["v"],
    c: ["k"],
    g: ["j", "k"],
    j: ["g"],
    k: ["c"],
    l: ["r"],
    r: ["l"],
    s: ["z"],
    v: ["b"],
    y: ["i"],
    z: ["s"],
  };

  const correctLetters = correct.split("");

  const validIndexes = correctLetters
    .map((l, i) => (letterMap[l] ? i : null))
    .filter((i) => i !== null);

  const wrongLetters = [...correctLetters];

  if (validIndexes.length === 0) {
    const randomFixedIndex = Math.floor(Math.random() * wrongLetters.length);
    wrongLetters[randomFixedIndex] =
      wrongLetters[randomFixedIndex] === "a" ? "e" : "a";
    return wrongLetters.join("");
  }

  const randomIndex = Math.floor(Math.random() * validIndexes.length);
  const originalLetter = wrongLetters[validIndexes[randomIndex]];
  const possibleLetters = letterMap[originalLetter];

  const newLetter =
    possibleLetters[Math.floor(Math.random() * possibleLetters.length)];

  wrongLetters[validIndexes[randomIndex]] = newLetter;

  return wrongLetters.join("");
}

function generateWrongChoices(correct) {
  const wrongChoice = new Set();
  let count = 0;

  while (wrongChoice.size < 2 && count <= 20) {
    const choice = generateWrongWord(correct);
    choice !== correct && wrongChoice.add(choice);
    count += 1;
  }

  return Array.from(wrongChoice);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function getListeningPractice(userId) {
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

  const { data: listeningWord, error: listeningWordErr } = await supabase
    .from("user_words")
    .select(
      `
        status, 
        last_seen,
        words!inner (
          *
        )
    `,
    )
    .eq("user_id", userId)
    .lt("last_seen", sixHoursAgo.toISOString())
    .order("last_seen", { ascending: true })
    .not("words.audio", "is", null)
    .limit(1);

  if (listeningWordErr) throw listeningWordErr;

  if (listeningWord.length === 0) {
    return {
      status: "empty",
      message: "Learn some more words first.",
      practice: null,
    };
  }

  const correctChoice = listeningWord[0].words?.spanish;
  const wrongChoices = generateWrongChoices(correctChoice);
  const allChoices = [correctChoice, ...wrongChoices];

  shuffleArray(allChoices);

  const returnObj = {
    status: "ok",
    practice: {
      choices: allChoices,
      correctChoice: correctChoice,
      wordMetadata: listeningWord[0].words,
    },
  };

  return returnObj;
}

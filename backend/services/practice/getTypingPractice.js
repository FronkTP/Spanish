import { supabase } from "../../db/supabaseServerClient.js";

export async function getTypingPractice(userId) {
    const { data: word, error: wordErr } = await supabase
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
        .eq("word_id", '1771')
    // .eq("user_id", userId)
    // .order("last_seen", { ascending: true })
    // .limit(1);

    if (wordErr) throw wordErr;

    if (word.length === 0) {
        return {
            status: "empty",
            message: "Learn some words first.",
            practice: null,
        };
    }

    const returnObj = {
        status: "ok",
        practice: {
            wordMetadata: word[0].words,
        },
    };

    return returnObj;
}

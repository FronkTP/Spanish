import { supabase } from "../db/supabase.js";

export async function updateWordStatus(req, res) {
  try {
    const wordId = Number(req.params.word_id);
    // check if word_id is nan and not positive, send res.status error

    const status = req.body.status;
    // check if status in known, learning, new, else send res.status error

    // call supabase to get date from word id
    // if get 0 rows, res status error

    // if worddetailerr, send error

    // call supabase to check how many rows returned from the current user id and word id
    // if wordstatuserr, send error
    // if 0 row, insert -> create a row in users_word, with current user_id, word_id, status, last seen
    // if 1 row, update -> edit the status of the correct user id and word id, and edit the last seen
    // can i use upsert?

    // send back success response
    // res.json(something);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
}

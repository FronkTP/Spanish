task
Phase 0
[x] create 3 sql tables: words, users, users_words
CREATE TABLE words (
id SERIAL PRIMARY KEY,
spanish TEXT NOT NULL,
english TEXT[],
pos TEXT,
audio TEXT,
example_sentences JSONB,
conjugations JSONB,
ADD CONSTRAINT unique_spanish UNIQUE (spanish)
);
ALTER TABLE words
ADD rank INT,
ADD original_english TEXT,
ADD original_pos TEXT,
ADD article TEXT

CREATE TABLE users (
id UUID PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_words (
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
word_id INT REFERENCES words(id) ON DELETE CASCADE,
status TEXT,
last_seen TIMESTAMPTZ,
xp INT DEFAULT 0,
PRIMARY KEY (user_id, word_id),
);
ALTER TABLE user_words
ADD streak INT,
ADD last_actilast_activity_date DATE,

CREATE TABLE daily_words (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
word_ids INTEGER[],
date DATE NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW(),
CONSTRAINT unique_user_words UNIQUE (user_id, date)
);

CREATE TABLE daily_activity (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
activity_date DATE NOT NULL,
CONSTRAINT unique_user_activity_date UNIQUE (user_id, activity_date)
);

[?] populate words table by calling the dictionary api
Write dictionary ingestion function:
For each Spanish word in words table
Call dictionary API once
Extract:
‣ audio
‣ example sentences
‣ conjugations (JSON)
‣ part of speech (if needed)
Save these into words.audio, words.example_sentences, words.conjugations.
[] Add a new boolean column:
is_enriched (optional but helps track which rows are updated).

Phase 1
[x] GET /words/daily
[x] PUT /word/:id/status

1. main page
   1. list 5 random words daily, users can mark ‘already known’ or ‘learning (idk the wording)’
   2. maybe known will come up 20% of the time and learning as 80% (future can be algo similiar to anki)
   3. each word shows 1. word, part of speech, audio button, translation english, example sentences

frontend

1. main page
   call api to get data then show it on screen using react component for each word
2. progress page
   call api to get progress stats

ui tasks
[] wording of status

backend
routes

1. get 5 random words from the database
   get random 5 words from sql -> save in array -> send to frontend when this api called
2. update status
3. get progress

Phase 2

1. activity/exercise/practice page
   1. audio multiple choice
   2. flashcard
   3. typing translation
2. improve practice page
   1. create and use the real streak, weekly activity
   2. loading state of progress frontend
3. upgrade progress page
   1. create table and function for daily activity (could expand into graph, heatmap, leaderboard between users)
4. upgrade xp function???


Phase future
[] GET /words?search=&status=&page=1

1. table page
   1. contains all words
   2. table with pagination (50 words per page)
   3. columns: word, translation, pos, status, audio, status, extend icon
   4. in the extension: example sentences, if verb conjugation table
   5. stretch goal: search bar, filter options: by each column (pos, status), sort by each columns
2. multiplayer mode (user joins room, see same list of words, who select all correct translate choices faster win)

frontend

1. table page
   call api to get words data on each page then show in table on the current page

backend

1. get all words,
   - search
   - filter by pos, status
   - sorting
     have different function to receive query, param, filter option while using sql query to do it

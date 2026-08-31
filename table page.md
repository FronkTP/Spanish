# ✅ **Table Page TODO List (Clear, Practical, Sequenced)**

---

# **📌 1. Backend – Core API Endpoints**

### **1.2 Words Table (paginated list)**

Create `/api/words` that supports:
/words?page=1&limit=50

- `?page=1`
- `?limit=50`
- `?search=...`
- `?status=learning`
- `?pos=noun`
- `?sort=spanish_asc`

This endpoint should:

- Let SQL handle filtering, searching, ordering
- Return `results[]` + `total_count`
Perfect. That answer (“yes”) is the correct product choice for what you’re building.
Let’s **design `/words` cleanly and completely**, the way a senior backend engineer would.

---

## 1. What `/words` is responsible for (lock this in)

`/words` is **not** a learning endpoint.

Its job is:

> “Give the user a browsable, pageable view of the vocabulary universe, enriched with their personal learning status.”

Think:

* Library
* Index
* Control panel

Not:

* Review logic
* Daily selection
* Spaced repetition

---

## 2. Inputs: what `/words` accepts

Conceptually, this endpoint accepts **optional controls**:

### Required

* User identity (from request context)

### Optional query controls

* Page number
* Page size (default 50)
* Search text
* Status filter (known / learning / unseen)
* Part of speech filter
* Sort key
* Sort direction

Important senior rule:

> Every control must be optional and composable.

No parameter should *force* another to exist.

---

## 3. Output: what `/words` returns

The response should be **predictable and boring**.

Conceptually:

* A list of word records (for the current page)
* Metadata about pagination

Each word record already includes:

* Word data (Spanish, English, POS, audio, etc.)
* User-specific status (or “unseen”)

The frontend should never have to:

* Guess status
* Infer pagination
* Merge datasets

---

## 4. Core data model (this prevents bugs)

Internally, `/words` always works with **this mental join**:

> Words
> LEFT JOIN user_words
> ON (word_id AND user_id)

Why left join?

* Because unseen words must appear
* Because absence of a row is meaningful

This one design choice:

* Enables “unseen” filtering
* Simplifies frontend logic
* Avoids special cases

---

## 5. Filtering logic (important order)

Think of filtering as **progressive narrowing**.

### Step 1: Scope to user

Everything is already user-scoped via the join.

### Step 2: Search

Search applies to:

* Spanish text
* English translations
* Possibly example sentences (later)

This happens **before pagination**.

### Step 3: Filters

Examples:

* Status filter (known / learning / unseen)
* Part of speech filter

Key idea:

> “Unseen” is not a value — it’s the absence of a relationship.

So filtering unseen means:

* user_words row does not exist

---

## 6. Sorting (do not overcomplicate)

Sorting should be:

* One column at a time
* One direction at a time

Examples:

* Alphabetical by Spanish
* By part of speech
* By status

Senior advice:

> Sorting by derived or JSON fields is Phase 2. Skip it now.

---

## 7. Pagination (non-negotiable)

Pagination is **mandatory**, even for small datasets.

Conceptually:

* Page number → offset
* Page size → limit

The database:

* Selects only what’s needed
* Never returns everything

This ensures:

* Performance
* Predictability
* Scalability

---

## 8. Status handling (subtle but critical)

Each word returned must include **exactly one of**:

* known
* learning
* unseen

Even though “unseen” isn’t stored explicitly.

Why?

* Frontend rendering
* Filter dropdowns
* Consistent UX

Backend decides the label.
Frontend displays it.

---

## 9. What `/words` must NOT do

This endpoint must NOT:

* Modify user progress
* Create user_words rows
* Track last_seen
* Trigger learning logic

If you’re tempted to do any of that, stop — wrong endpoint.

---

## 10. Edge cases (handled by design, not hacks)

* New user → sees full word list as unseen
* User with partial progress → mixed list
* Filters + search + pagination → still works

This happens naturally because of the left join + composable filters.

---

## 11. Final mental summary (this is your checklist)

Before implementing `/words`, you should be able to say:

* I always join words with user_words (left join)
* I apply search and filters before pagination
* I return one flat list, not nested structures
* I label unseen explicitly
* I never mutate data in this endpoint

If all five are true, your design is solid.

### **1.3 Update word status**

Create:

- PATCH `/api/user-words/:wordId`

  - body: `{ status: "learning" }`
  - update or create row in `user_words`

---

# **📌 2. Frontend – React Pages**

### **2.2 Words Table Page**

Component tasks:

- Fetch paginated results from backend
- Display 50 rows per page
- Columns:

  - Spanish
  - English
  - POS
  - Status
  - Audio
  - Expand toggle (for sentences)

- Add:

  - Pagination component
  - Search input
  - Filters (pos, status)
  - Sorting UI (optional for Phase 1)

---

# **📌 3. Frontend State & API Layer**

### **3.1 Create a fetch wrapper**

(e.g. simple `api.js` that wraps your fetch calls)

### **3.2 Build hooks**

- `useDailyWords()`
- `useWordsTable()`
- `useUpdateWordStatus()`

---

# **📌 4. Database Enhancements (Optional but recommended)**

### **4.1 Add composite PK to user_words**

Already done: `(user_id, word_id)`

### **4.2 Add indexes**

Later when you have:

- search
- ordering
- filtering

---

# **📌 5. Testing & Verification**

- Test daily words endpoint manually in Postman
- Test words table pagination
- Test status updates: learning → known
- Check DB to confirm rows update correctly
- Verify CSV values look clean (no undefined, no extra whitespace)

---

# **📌 ⚡ Final Deliverable for Phase 1**

You should end Phase 1 with a working prototype of:

### ✔ Words Table page

### ✔ Fully populated database

### ✔ Working backend APIs

### ✔ Basic user-word interaction

### ✔ Basic UI with searching + filtering + pagination

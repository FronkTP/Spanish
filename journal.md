22/06/26
make sense of the current user data flow

20/05/26
create api path for fetching user detail
try to use that in frontend

18/05/26
standardise import order
create profile menu panel

14/05/26
set up login including guest login which uses test user row

13/05/26
add empty practice state to frontend practice pages
try to set up login to add row to supabase user table

17/04/26
try to make the font colour consistent across all pages (wip)

16/04/26
refine frontend v1 of text analyzer

12/04/26
finish frontend v1 of text analyzer: difficulty + % understood + chart

01/04/26
finish backend of text analyzer

30/03/26
continue doing text analyzer

26/03/26
create text analyzer

21/03/26
set up google oauth sign in functionality and page

17/03/26
finish flashcard module both backend and frontend
start the typing spanish given english module

12/03/26
refine the flashcard ui and buttons

11/03/26
finish set up the flashcard get api and flashcard component

02/03/26
migrate tailwind to v4

01/03/26
try to set up flashcard ui

26/01/26
auto play audio on the listening practice page

25/01/26
complete the frontend of listening practice page
create practice summary component

22/01/26
almost complete the frontend of listening practice page
create recordPracticeAttempt for frontend to send back to backend to update data

20/01/26
refactor progress page to use achivementbadge component
refactor the icons from svg to import
finish the frontend of practice select mode page
create not found page and coming soon component
style the header and navigation bar

18/01/26
finish the backend of getlisteningpractice

17/01/26
start creating the getlisteningpractice structure

15/01/26
set up api route of the practice on the backend

14/01/26
start creating backend for progress page

13/01/26
refactor the code by puting wordlist logic into home page and removing wordlist component

11/01/26
frontend mock for progress page (not fetching data)

09/01/26
finish frontend for home page

07/01/26
almost complete frontend for wordlist and wordcard, just the wording and navbar

06/01/26
refactor getdailywords so that user see same word the same date (this took 2 hours)
start creating frontend for wordlist and wordcard

05/01/26
create wordcard and wordlist to render the daily words

04/01/26
start creating frontend home page

03/01/26
finish the update status function and test the api route on frontend

01/01/26
form logic of the update status function
try fetch on frontend

31/12/25
try to make sense of how and what api route will be created

24/12/25
write getDailyWords function for /words/daily route

23/12/25
skip the short words (<=2 letters) then populate the database, got some null and some wrong data but will deal with it later

10/12/25
able to populate the table from api but encounter some problems esp in short words when it get the wrong item in array

04/12/25
try to populate the words table from api

20/11/25 - 24/11/25
design the database structure for my Spanish vocabulary app, created the words, users, and user_words tables in Supabase. Then I built a Node.js import script that reads my 1000-word CSV file, normalizes and trims the values, converts empty fields to null, and inserts the entire dataset into Supabase. Finally, I ensured the script runs once, logs results, and exits safely.

24/11/25
insert data into the words table

21/11/25
phase 0: create 3 tables and test populate words table with the csv

20/11/25
plan the execution so i have idea of what to do next

15/11/25
try to write getRandomWords

14/11/25
starting creating the structure

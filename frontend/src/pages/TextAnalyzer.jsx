import { useState } from "react";

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const [statsObj, setStatsObj] = useState({});
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length <= 0) {
      setErr("The text should not be empty.");
      setStatsObj({});
      return;
    } else if (text.length > 500) {
      setErr("The text is over the 500 characters limit.");
      setStatsObj({});
      return;
    }

    setErr("");
    fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setStatsObj(json);
        console.log(json);
      });
  };

  return (
    <div>
      <h1>TextAnalyzer page</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          maxLength={500}
          placeholder="Paste the text here..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button type="submit">check</button>
      </form>
      <p>{err}</p>
      <p>{JSON.stringify(statsObj, null, 2)}</p>
    </div>
  );
}

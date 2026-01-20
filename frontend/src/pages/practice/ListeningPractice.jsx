import { useState, useEffect, useRef } from "react";

export default function ListeningPractice() {
  const [practice, setPractice] = useState({});

  useEffect(() => {
    fetch("/api/practice/listening")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          setPractice(json.practice);
        }
      });
  }, []);

  const audioRef = useRef(null);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div>
      <h1>Listening Practice page</h1>
      {practice && JSON.stringify(practice)}
      <div>
        {/* audio button */}
        <button onClick={playAudio}>play me</button>
        {/* 3 choices */}
        <div>
          <div></div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={practice?.wordMetadata?.audio}
        preload="none"
      />
    </div>
  );
}

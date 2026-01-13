export function injectWordsTable(data) {
  const audio_file = data.hwi?.prs?.[0].sound?.audio ?? "";
  const audio = audio_file
    ? `https://media.merriam-webster.com/audio/prons/es/me/mp3/${audio_file[0]}/${audio_file}.mp3`
    : null;
  const pos = data.fl ?? null;
  const english = [...new Set(data.shortdef)] ?? [];
  const example_sentences = [];

  if (Array.isArray(data.def)) {
    for (let definitionBlock of data.def) {
      if (!Array.isArray(definitionBlock.sseq)) continue;

      for (let sense_item of definitionBlock.sseq) {
        const definitionDetails = sense_item?.[0]?.[1]?.dt;
        if (!Array.isArray(definitionDetails)) continue;

        for (let detail of definitionDetails) {
          if (detail[0] === "vis" && Array.isArray(detail[1])) {
            for (let example of detail[1]) {
              example_sentences.push({
                spanish: example.t,
                english: example.tr,
              });
            }
          }
        }
      }
    }
  }
  const conjugations = data.suppl?.cjts ?? null;
  return {
    english,
    pos,
    audio,
    example_sentences,
    conjugations,
  };
}

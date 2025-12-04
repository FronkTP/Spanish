function injectWordsTable(data) {
  // const data = response[0];
  // const uuid = data.meta?.uuid ?? null;
  const audio_file = data.hwi?.prs?.[0].sound?.audio ?? "";
  const audio = audio_file
    ? `https://media.merriam-webster.com/audio/prons/es/me/mp3/p/${audio_file}.mp3`
    : null;
  const pos = data.fl ?? null;
  const english = data.shortdef ?? [];
  const example_sentences = [];
  for (let definitionBlock of data.def) {
    for (let sense_item of definitionBlock.sseq) {
      if (sense_item?.[0]?.[1]?.dt) {
        const definitionDetails = sense_item[0][1].dt;
        for (let detail of definitionDetails) {
          if (detail[0] === "vis") {
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

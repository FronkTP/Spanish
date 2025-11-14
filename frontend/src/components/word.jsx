export default function Word({ spanish, english, pos, audio }) {
  return (
    <>
      <h1>{spanish}</h1>
      <h2>{english}</h2>
      <p>{pos}</p>
    </>
  );
}

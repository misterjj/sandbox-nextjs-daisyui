export default function Home() {
  const test = new Array(100).fill(0);

  return (
      <div>
          {test.map((_, i) => <div key={i}>{i}</div>)}
      </div>
  );
}

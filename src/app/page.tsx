export default function Home() {
  const test = new Array(100).fill(0);

    console.log(test)

  return (
      <div>
          {test.map((_, i) => <div key={i}>{i}</div>)}
      </div>
  );
}

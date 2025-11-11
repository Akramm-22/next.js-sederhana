// src/app/page.tsx
type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function Home() {
  // Fetch data langsung di server component
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "no-store", // agar selalu SSR dan tidak cache
  });

  const data: Todos[] = await res.json();

  return (
    <main className="main">
      <title>SSR Demo</title>
      <meta name="description" content="SSR Demo" />
      <link rel="icon" href="/favicon.ico" />

      {data.map((todo) => (
        <div className="container" key={todo.id}>
          <h2 className={`title ${todo.completed ? "isComplete" : ""}`}>
            {todo.title}
          </h2>
        </div>
      ))}
    </main>
  );
}

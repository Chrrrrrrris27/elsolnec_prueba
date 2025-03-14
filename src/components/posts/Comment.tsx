export default function Comment({email, name, body}: {
  email: string;
  name: string;
  body: string;
}) {
  
  return (
    <article>
      <header className="flex gap-1 items-end justify-between flex-wrap">
        <h3 className="text-xl font-medium capitalize sm:flex-2/3">
          {name}
        </h3>
        <span className="text-xs font-light mb-0.5 text-end flex-1 basis-[30%]">
          {email}
        </span>
      </header>
      <main className="my-1">
        <p>
          {body}
        </p>
      </main>
      <hr/>
    </article>
  );
}
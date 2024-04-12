"use client";

interface DebugInterface {
  title?: string;
  children: unknown;
}

export function Debug({ title, children }: DebugInterface) {
  return (
    <div
      className={
        "relative my-4 w-full rounded-md border-2 border-dashed border-zinc-600 bg-zinc-800 p-4 text-left"
      }
    >
      {title && (
        <span
          className={
            "absolute left-2 top-[-8px] bg-zinc-600 px-1 font-mono text-xs font-bold text-green-500"
          }
        >
          {title}
        </span>
      )}
      <pre className={"font-mono text-xs font-light text-green-500 leading-5"}>
        {JSON.stringify(children, null, 4)}
      </pre>
    </div>
  );
}

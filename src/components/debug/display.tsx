export function DebugDisplay({title,children}) {
    return (
        <div className={'relative bg-zinc-800 p-4 border-2 border-dashed border-zinc-600 my-4 w-full'}>
            { title && <span className={'absolute px-1 top-[-8px] left-2 bg-zinc-600 text-green-500 text-xs font-bold font-mono'}>{title}</span> }
            <pre className={'text-green-500 text-xs font-light font-mono'}>{JSON.stringify(children, null, 4)}</pre>
        </div>
    )
}
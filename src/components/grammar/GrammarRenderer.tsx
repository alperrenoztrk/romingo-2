import type { GrammarBlock, GrammarSection, GrammarTable } from "@/data/grammarSections";

function Table({ data }: { data: GrammarTable }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="border border-border bg-muted/60 px-3 py-2 text-left font-bold text-foreground text-xs uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/30"}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-border px-3 py-1.5 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExamplePairs({ pairs }: { pairs: { ro: string; tr: string }[] }) {
  return (
    <div className="space-y-2 rounded-xl border border-flamingo/30 bg-flamingo/5 p-4">
      {pairs.map((p, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          <p className="text-sm font-semibold text-foreground">🇷🇴 {p.ro}</p>
          <p className="text-sm text-muted-foreground">🇹🇷 {p.tr}</p>
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: GrammarBlock, i: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={i} className="text-sm leading-7 text-foreground whitespace-pre-line">
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2)
        return <h2 key={i} className="text-xl font-black text-foreground pt-2">{block.text}</h2>;
      if (block.level === 3)
        return <h3 key={i} className="text-lg font-bold text-foreground pt-1">{block.text}</h3>;
      return <h4 key={i} className="text-base font-bold text-foreground">{block.text}</h4>;
    case "table":
      return <Table key={i} data={block.data} />;
    case "list":
      return (
        <ol key={i} className="list-decimal list-inside space-y-1 text-sm text-foreground pl-1">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div key={i} className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-1">
          <p className="font-bold text-sm text-primary">{block.title}</p>
          <p className="text-sm leading-6 text-foreground whitespace-pre-line">{block.text}</p>
        </div>
      );
    case "warning":
      return (
        <div key={i} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-1">
          <p className="font-bold text-sm text-destructive">⚠️ {block.title}</p>
          <p className="text-sm leading-6 text-foreground whitespace-pre-line">{block.text}</p>
        </div>
      );
    case "example":
      return <ExamplePairs key={i} pairs={block.pairs} />;
    case "divider":
      return <hr key={i} className="border-border" />;
    default:
      return null;
  }
}

export function GrammarSectionCard({ section }: { section: GrammarSection }) {
  return (
    <section id={section.id} className="space-y-4">
      <h2 className="text-xl font-black text-foreground border-b border-border pb-2">
        {section.title}
      </h2>
      {section.content.map(renderBlock)}
    </section>
  );
}

export function GrammarTableOfContents({ sections }: { sections: GrammarSection[] }) {
  return (
    <nav className="space-y-1">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">İçindekiler</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="block text-sm font-semibold text-flamingo hover:text-flamingo/80 transition-colors py-0.5"
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}

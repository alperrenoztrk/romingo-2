import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpenText } from "lucide-react";
import { grammarSections } from "@/data/grammarSections";
import { GrammarSectionCard, GrammarTableOfContents } from "@/components/grammar/GrammarRenderer";

export default function GrammarPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>

        <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
          <header className="space-y-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <BookOpenText className="h-7 w-7 text-flamingo" />
              <h1 className="text-2xl font-black text-foreground">RUMENCE DİL BİLGİSİ</h1>
            </div>
            <p className="text-sm text-muted-foreground font-semibold">
              Gramatica Limbii Române
            </p>
          </header>

          <GrammarTableOfContents sections={grammarSections} />

          <div className="space-y-10">
            {grammarSections.map((section) => (
              <GrammarSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

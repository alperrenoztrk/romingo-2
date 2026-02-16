import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import { Lock, Star, CheckCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  emoji: string;
  status: "completed" | "current" | "locked";
  stars: number;
  level: number;
}

const lessons: Lesson[] = [
  { id: "1", title: "Selamlaşma", emoji: "👋", status: "completed", stars: 3, level: 1 },
  { id: "2", title: "Tanışma", emoji: "🤝", status: "completed", stars: 2, level: 1 },
  { id: "3", title: "Sayılar", emoji: "🔢", status: "completed", stars: 3, level: 1 },
  { id: "4", title: "Renkler", emoji: "🎨", status: "current", stars: 0, level: 2 },
  { id: "5", title: "Yiyecekler", emoji: "🍎", status: "locked", stars: 0, level: 2 },
  { id: "6", title: "İçecekler", emoji: "☕", status: "locked", stars: 0, level: 2 },
  { id: "7", title: "Aile", emoji: "👨‍👩‍👧", status: "locked", stars: 0, level: 3 },
  { id: "8", title: "Hayvanlar", emoji: "🦩", status: "locked", stars: 0, level: 3 },
  { id: "9", title: "Meslekler", emoji: "👩‍⚕️", status: "locked", stars: 0, level: 3 },
  { id: "10", title: "Günler", emoji: "📅", status: "locked", stars: 0, level: 4 },
  { id: "11", title: "Mevsimler", emoji: "🌸", status: "locked", stars: 0, level: 4 },
  { id: "12", title: "Hava Durumu", emoji: "🌤️", status: "locked", stars: 0, level: 4 },
  { id: "13", title: "Alışveriş", emoji: "🛍️", status: "locked", stars: 0, level: 5 },
  { id: "14", title: "Ulaşım", emoji: "🚌", status: "locked", stars: 0, level: 5 },
  { id: "15", title: "Ev ve Odalar", emoji: "🏠", status: "locked", stars: 0, level: 5 },
  { id: "16", title: "Zaman İfadeleri", emoji: "⏰", status: "locked", stars: 0, level: 5 },
  { id: "17", title: "Temel Fiiller", emoji: "🏃", status: "locked", stars: 0, level: 6 },
  { id: "18", title: "Günlük Rutin", emoji: "🗓️", status: "locked", stars: 0, level: 6 },
  { id: "19", title: "Restoran", emoji: "🍽️", status: "locked", stars: 0, level: 6 },
  { id: "20", title: "Yönler ve Konum", emoji: "🧭", status: "locked", stars: 0, level: 6 },
];

const levelColors = [
  "gradient-success",
  "gradient-sky",
  "gradient-hero",
  "gradient-gold",
];

function LessonNode({ lesson, index }: { lesson: Lesson; index: number }) {
  const navigate = useNavigate();
  const isCompleted = lesson.status === "completed";
  const isCurrent = lesson.status === "current";
  const isLocked = lesson.status === "locked";

  const offset = index % 2 === 0 ? -30 : 30;

  const handleClick = () => {
    if (!isLocked) navigate(`/lesson/${lesson.id}`);
  };

  return (
    <div className="flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      <button
        disabled={isLocked}
        onClick={handleClick}
        className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl transition-all
          ${isCompleted ? "bg-success shadow-button-success active:translate-y-1 active:shadow-none" : ""}
          ${isCurrent ? "bg-flamingo shadow-button-primary animate-pulse-glow active:translate-y-1 active:shadow-none" : ""}
          ${isLocked ? "bg-muted cursor-not-allowed opacity-60" : ""}
        `}
      >
        {isLocked ? (
          <Lock className="w-6 h-6 text-muted-foreground" />
        ) : (
          <span>{lesson.emoji}</span>
        )}

        {isCompleted && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-card rounded-full flex items-center justify-center shadow-card">
            <CheckCircle className="w-5 h-5 text-success" fill="hsl(var(--success-light))" />
          </div>
        )}

        {isCurrent && (
          <div className="absolute -bottom-2 bg-card rounded-full px-2 py-0.5 shadow-card">
            <span className="text-[10px] font-extrabold text-flamingo">BAŞLA</span>
          </div>
        )}
      </button>

      <span
        className={`mt-3 text-xs font-bold text-center ${
          isLocked ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {lesson.title}
      </span>

      {isCompleted && (
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className="w-3.5 h-3.5"
              fill={s <= lesson.stars ? "hsl(var(--gold))" : "hsl(var(--muted))"}
              stroke={s <= lesson.stars ? "hsl(var(--gold))" : "hsl(var(--muted))"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LearnPage() {
  const levels = [...new Set(lessons.map((l) => l.level))];

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto">
        <h1 className="text-xl font-black text-foreground text-center mb-2">
          🦩 Türkçe Öğren
        </h1>
        <p className="text-center text-muted-foreground text-sm font-semibold mb-8">
          A1 Seviye • Başlangıç
        </p>

        {levels.map((level) => {
          const levelLessons = lessons.filter((l) => l.level === level);
          return (
            <div key={level} className="mb-8">
              <div
                className={`${levelColors[(level - 1) % levelColors.length]} rounded-2xl px-4 py-2 mb-6 mx-auto w-fit`}
              >
                <span className="text-primary-foreground font-extrabold text-sm">
                  Seviye {level}
                </span>
              </div>

              <div className="flex flex-col items-center gap-6">
                {levelLessons.map((lesson, i) => (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    index={lessons.indexOf(lesson)}
                  />
                ))}
              </div>

              {level < levels.length && (
                <div className="flex justify-center my-4">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

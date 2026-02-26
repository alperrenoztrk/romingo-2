import { useEffect, useState } from "react";
import { Zap, Target, Clock3 } from "lucide-react";
import MascotFace from "@/components/MascotFace";
import type { LessonData } from "../data/lessons";

interface Props {
  lesson: LessonData;
  correctCount: number;
  totalCount: number;
  elapsedSeconds: number;
  stars: number;
  xpEarned: number;
  isPerfectLesson: boolean;
  onContinue: () => void;
  onRetryWrongAnswers?: () => void;
}

function formatDuration(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function LessonComplete({
  lesson,
  correctCount,
  totalCount,
  elapsedSeconds,
  stars,
  xpEarned,
  isPerfectLesson,
  onContinue,
  onRetryWrongAnswers,
}: Props) {
  const percentage = Math.round((correctCount / totalCount) * 100);
  const [animatedXp, setAnimatedXp] = useState(0);

  useEffect(() => {
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      setAnimatedXp((prev) => {
        const step = Math.max(1, Math.ceil(xpEarned / 20));
        const next = prev + step;
        return next >= xpEarned ? xpEarned : next;
      });

      if (frame > 24) {
        window.clearInterval(timer);
      }
    }, 42);

    return () => {
      window.clearInterval(timer);
    };
  }, [xpEarned]);

  return (
    <div className="min-h-screen bg-[#0c1f2f] flex flex-col justify-center px-6 pb-8">
      <div className="w-full max-w-md mx-auto text-center animate-bounce-in">
        <MascotFace mascotId="panda" mascotName="Tebrikler maskotu" className="w-56 h-56 mx-auto mb-4 drop-shadow-2xl" />

        <h1 className="text-4xl font-black text-[#ffd338] mb-2">Mücadeleyi tamamladın!</h1>
        <p className="text-sm font-bold text-white/80 mb-8">{lesson.title} dersi başarıyla bitti.</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-2xl border-2 border-[#ffd338] bg-[#10263b] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#ffd338]">Toplam puan</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[#ffd338]">
              <Zap className="w-4 h-4" fill="currentColor" />
              <span className="text-3xl font-black">{animatedXp}</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#92dd3d] bg-[#10263b] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#92dd3d]">Doğruluk</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[#92dd3d]">
              <Target className="w-4 h-4" />
              <span className="text-3xl font-black">%{percentage}</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#53bef0] bg-[#10263b] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#53bef0]">Kararlı</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[#53bef0]">
              <Clock3 className="w-4 h-4" />
              <span className="text-3xl font-black">{formatDuration(elapsedSeconds)}</span>
            </div>
          </div>
        </div>

        {isPerfectLesson && (
          <p className="mb-4 text-sm font-extrabold text-[#92dd3d]">Süper tur! Ekstra bonus yıldız kazandın ⭐</p>
        )}

        {onRetryWrongAnswers && (
          <button
            onClick={onRetryWrongAnswers}
            className="w-full mb-3 rounded-2xl py-3 font-extrabold text-sm border-2 border-white/30 bg-white/10 text-white active:translate-y-0.5 transition-all"
          >
            Yanlışları Tekrar Dene
          </button>
        )}

        <button
          onClick={onContinue}
          className="w-full rounded-2xl bg-[#53bef0] py-4 text-[#08314b] font-black text-2xl shadow-[0_6px_0_#258ec0] active:translate-y-1 active:shadow-none transition-all"
        >
          PUANI AL
        </button>

        <p className="mt-4 text-xs font-semibold text-white/65">
          Sonuç: {correctCount}/{totalCount} doğru · {stars} yıldız
        </p>
      </div>
    </div>
  );
}

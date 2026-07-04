import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isBirthdayToday, BIRTHDAY_STORAGE_KEY } from "@/lib/birthday";

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF69B4", "#A66CFF"];
const EMOJIS = ["🎈", "🎉", "🎊", "✨", "💖", "🌟"];

function Particle({ index }: { index: number }) {
  const color = COLORS[index % COLORS.length];
  const emoji = EMOJIS[index % EMOJIS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = 3 + Math.random() * 3;
  const size = 16 + Math.random() * 20;

  return (
    <span
      className="fixed pointer-events-none z-50"
      style={{
        left: `${left}%`,
        top: "-10%",
        fontSize: size,
        color,
        animation: `birthday-float ${duration}s ease-in ${delay}s infinite`,
      }}
    >
      {emoji}
    </span>
  );
}

export function BirthdaySplash() {
  const [dismissed, setDismissed] = useState(() => {
    if (!isBirthdayToday()) return true;
    return sessionStorage.getItem(BIRTHDAY_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    if (!dismissed) {
      toast("🎉 Happy Birthday Melvina!", {
        description: "Wishing you the most amazing day! 🎂",
        duration: 5000,
      });
    }
  }, [dismissed]);

  const handleDismiss = () => {
    sessionStorage.setItem(BIRTHDAY_STORAGE_KEY, "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes birthday-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes birthday-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {Array.from({ length: 20 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-rose-600 via-pink-500 to-purple-600 cursor-pointer animate-[fadeIn_0.5s_ease-out]"
        onClick={handleDismiss}
      >
        <div className="text-center px-6 animate-[birthday-pulse_3s_ease-in-out_infinite]">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Happy Birthday<br />Melvina! 🎂
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium mb-8">
            Raising Readers. Building Thinkers. Transforming Education.
          </p>
          <p className="text-white/60 text-sm animate-bounce">
            Tap anywhere to enter
          </p>
        </div>
      </div>
    </>
  );
}

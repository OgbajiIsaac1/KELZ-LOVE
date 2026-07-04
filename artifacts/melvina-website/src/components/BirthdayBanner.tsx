import { isBirthdayToday } from "@/lib/birthday";

export function BirthdayBanner() {
  if (!isBirthdayToday()) return null;

  return (
    <div className="relative z-30 bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 text-white text-center text-sm font-medium py-2 px-4">
      🎉 Happy Birthday Melvina! Wishing you the most amazing day! 🎂
    </div>
  );
}

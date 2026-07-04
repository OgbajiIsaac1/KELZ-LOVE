export function isBirthdayToday(): boolean {
  const now = new Date();
  return now.getMonth() === 6 && now.getDate() === 9;
}

export const BIRTHDAY_STORAGE_KEY = "melvina_birthday_seen";

export const BIRTHDAY_WISHES = [
  'May this new year bring you more laughter, more little adventures, and every beautiful thing your heart hopes for.',
  'Here’s to another year of being wonderfully you—kind, bright, and impossible to forget.',
  'May your cake be sweet, your photos be perfect, and your whole year feel like a celebration.',
  'Today is all about you. Keep shining, keep dreaming, and keep making the world happier just by being in it.',
  'Wishing you warm hugs, loud laughs, and memories that make you smile long after the candles are gone.',
];

export function getRandomBirthdayWish() {
  return BIRTHDAY_WISHES[Math.floor(Math.random() * BIRTHDAY_WISHES.length)];
}

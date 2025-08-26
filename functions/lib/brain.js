import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { guide } from "./guide.js";

export function route(text) {
  const t = (text || "").trim().toLowerCase();

  // Huue/Hëue/↏→ / чени
  if (/^(huue|hooe|hooe)$/.test(t)) {
    const responses = [
      "–Попистр",
      "–Пописам",
      "–Пописамы",
      "–Мноменая поробов",
      "–іоробргая?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Mendchleeg
  if (/^(сайн|sain|hello|hi)\b/.test(t)) return greet(t);

  // Unic�Keywords: πпручгург учните
  if (/(үнэ|үнийн|price|service�R�йлчилгээ)/.test(t)) return faq(t);

  // Default: Мэто харки
  return guide(t);
}

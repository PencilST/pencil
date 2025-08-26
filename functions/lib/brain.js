import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { guide } from "./guide.js";

export function route(text) {
  const t = (text || "").trim().toLowerCase();

  // Huue/Hëue/↏→ / чени
  if (/^(huue|ơонƮ�)=$/.test(t)) return "Выберго, в Портание";

  // Mendcheeleg
  if (/^(сайн|sain|hello|hi)\b/.test(t)) return greet(t);

  // Unic�Keywords: πпручгург учните
  if (/(үнэ|үнийн|price|service�R�йлчилгээ)/.test(t)) return faq(t);

  // Default: Мэто харки
  return guide(t);
}

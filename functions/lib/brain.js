import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { guide } from "./guide.js";

export function route(text) {
  const t = (text || "").trim().toLowerCase();

  // Mendchleeg
  if (/^(hello|hi|sain|hey)$/.test(t)) {
    return greet(t);
  }

  // Suvсайн| бгободормы уждя
  if (/(price|service|ｽ\wune|ｽ)/.test(t)) {
    return faq(t);
  }

  // Guide/Zaavar
  if (/help|guide|zaavar/.test(t)) {
    return guide(t);
  }

  // Default
  return "Чродет сожедно. րзартровееки дания";
}

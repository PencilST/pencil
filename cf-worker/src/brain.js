import { normalize } from "./normalize.js";
import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { swear } from "./swear.js";

export function brain(text) {
  const t = normalize(text);

  // --- Мэндчилгээ ---
  const greetAnswer = greet(t);
  if (greetAnswer) {
    return greetAnswer;
  }

  // --- Swear ---
  const swearAnswer = swear(t);
  if (swearAnswer) {
    return swearAnswer;
  }

  // --- FAQ ---
  const faqAnswer = faq(t);
  if (faqAnswer) {
    return faqAnswer;
  }

  // --- Default fallback ---
  return "🤔 Чиний асуултыг сайн ойлгосонгүй ээ...";
}
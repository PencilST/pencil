import { normalize } from "./normalize.js";
import { greet } from "./greet.js";
import { faq } from "./faq.js";

export function brain(text) {
  const t = normalize(text);

  // --- Мэндчилгээ шалгах ---
  const greetAnswer = greet(t);
  if (greetAnswer) {
    return greetAnswer;
  }

  // --- FAQ шалгах (жишээ нь: клип) ---
  const faqAnswer = faq(t);
  if (faqAnswer) {
    return faqAnswer;
  }

  // --- Хэрэв танигдаагүй бол ---
  return "🤔 Чиний асуултыг сайн ойлгосонгүй ээ...";
}

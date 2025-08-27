import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { normalize } from "./normalize.js";

export function brain(text) {
  const t = normalize(text);

  // Эхлээд greet шалгана
  const greetAnswer = greet(t);
  if (greetAnswer !== "Сайн уу?") {
    return greetAnswer;
  }

  // Дараа нь FAQ шалгана
  const faqAnswer = faq(t);
  if (faqAnswer !== "Энэ талаар би сайн мэдэхгүй байна.") {
    return faqAnswer;
  }

  // Хэрэв аль нь ч биш бол
  return "Энэ талаар би сайн мэдэхгүй байна.";
}

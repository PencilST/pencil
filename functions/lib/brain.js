import { greet } from "./greet.js";
import { faq } from "./faq.js";

export function brain(text) {
  const t = text.toLowerCase().trim();

  // Эхлээд greet руу явуулна
  const greetAnswer = greet(t);
  if (greetAnswer !== "Сайн уу?") {
    return greetAnswer;
  }

  // Дараа нь FAQ-г шалгана
  const faqAnswer = faq(t);
  if (faqAnswer !== "Энэ талаар би сайн мэдэхгүй байна.") {
    return faqAnswer;
  }

  // Хэрэв аль нь ч биш бол default хариу
  return "Энэ талаар би сайн мэдэхгүй байна.";
}

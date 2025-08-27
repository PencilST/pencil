import { greet } from "./greet.js";
import { faq } from "./faq.js";

export function brain(text) {
  const t = text.toLowerCase().trim();

  // Эхлээд мэндчилгээг шалгана
  if (["hi", "hello", "sain", "сайн уу", "hey", "snuu"].some(r => t.includes(r))) {
    return greet(text);
  }

  // Дараа нь FAQ-г шалгана
  const faqAnswer = faq(text);
  if (faqAnswer !== "Энэ талаар би сайн мэдэхгүй байна.") {
    return faqAnswer;
  }

  // Хэрэв аль нь ч биш бол default хариу
  return "Энэ талаар би сайн мэдэхгүй байна.";
}

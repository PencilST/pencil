import { normalize } from "./normalize.js";
import { greet } from "./greet.js";
import { faq } from "./faq.js";

export function brain(text) {
  const t = normalize(text);

  const greetAnswer = greet(t);
  if (greetAnswer) {
    return greetAnswer;
  }

  const faqAnswer = faq(t);
  if (faqAnswer) {
    return faqAnswer;
  }

  return null;
}
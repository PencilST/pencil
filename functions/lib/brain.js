import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { guide } from "./guide.js";

export function route(text) {
  const t = (text || "").trim().toLowerCase();

  // Мэндчилгээ
  if (/^(hello|hi|sain|hey|сайн)$/.test(t)) {
    return greet(t);
  }

  // FAQ (үнэ, үйлчилгээ гэх мэт)
  if (/(price|service|үнэ|үйлчилгээ)/.test(t)) {
    return faq(t);
  }

  // Guide / Заавар
  if (/help|guide|zaavar|заавар/.test(t)) {
    return guide(t);
  }

  // Default fallback
  return "Уучлаарай, таны асуултыг ойлгосонгүй. Илүү тодорхой асуулт асуугаарай.";
}

import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { guide } from "./guide.js";

export function route(text) {
  const t = (text || "").trim().toLowerCase();

  // Мэндчилгээ
  if (/^(сайн|sain|hello|hi)\b/.test(t)) return greet(t);

  // Үйлчилгээ/үнэ/цагийн хуваарь гэх мэт түлхүүрүүд
  if (/(үнэ|үнийн|price|service|үйлчилгээ)/.test(t)) return faq(t);

  // Дефолт: зөвлөгөө
  return guide(t);
}

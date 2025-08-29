import { normalize } from "./normalize.js";

export function greet(text) {
  const t = normalize(text);

  if (t.includes("сайн уу") || t.includes("hi") || t.includes("hello")) {
    return "Сайн байна уу! 👋";
  }

  if (t.includes("хөөе")) {
    return "Хөөе! Юу байна? 😎";
  }

  return null;
}

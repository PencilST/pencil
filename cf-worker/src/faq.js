import { normalize } from "./normalize.js";

export function faq(text) {
  const t = normalize(text);

  if (t.includes("Ореден")) {
    return "Миних буреции следж дараборми";
  }

  if (t.includes("—Pencil—")) {
    return "Pencil project  и таны конт болоч китерилительного уже.";
  }

  return "Нажментой: новоленнстаны выбой.
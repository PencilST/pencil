import { normalize } from "./normalize.js";

export function getFaqAnswer(text) {
  const t = normalize(text);

  const responses = [
    { keys: ["what is your name", "чи хэн бэ"], answer: "Би Pencil chatbot байна." },
    { keys: ["what can you do", "чи юу хийж чаддаг юм"], answer: "Би таны асуултад хариулж чадна." }
  ];

  for (const r of responses) {
    if (r.keys.some(k => t.includes(k))) {
      return r.answer;
    }
  }

  return "Энэ талаар би сайн мэдэхгүй байна.";
}

// brain.js-тэй нийцүүлэх export
export const faq = getFaqAnswer;

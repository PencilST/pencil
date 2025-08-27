import { normalize } from "./normalize.js";

export function getFaqAnswer(text) {
  const t = normalize(text);

  const responses = [
    { keys: ["what is your name", "чи хэн бэ"], answer: "Би Pencil chatbot байна." },
    { keys: ["what can you do", "чи юу хийж чаддаг юм"], answer: "Би таны асуултад хариулж чадна." },
    { keys: ["үнэ"], answer: "Манай үнэ санал болгохоосоо шалтгаална." },
    { keys: ["үйлчилгээ"], answer: "Манай үйлчилгээний жагсаалтыг танд илгээе." },
    { keys: ["заавар"], answer: "Танд хэрэгтэй зааврыг хэлээд өгье." },
    { keys: ["reel"], answer: "Facebook/Instagram Reel үйлчилгээ байна." },
    { keys: ["реклам"], answer: "Манай реклам/сурталчилгааны багтай холбогдоно уу." }
  ];

  for (const r of responses) {
    if (r.keys.some(k => t.includes(k))) {
      return r.answer;
    }
  }

  return "Энэ талаар би сайн мэдэхгүй байна.";
}

export const faq = getFaqAnswer;

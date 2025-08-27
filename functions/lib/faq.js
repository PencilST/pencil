export function getFaqAnswer(text) {
  const t = text.toLowerCase();

  const responses = {
    "what is your name": "Би Харандаа туслах байна.",
    "чи хэн бэ": "Би Харандаа туслах байна.",
    "what can you do": "Би таны асуултад хариулж чадна.",
    "чи юу хийж чаддаг юм": "Би таны асуултад хариулж чадна."
  };

  return responses[t] || "Энэ талаар би сайн мэдэхгүй байна.";
}

// brain.js-тэй нийцүүлэхийн тулд хуучин нэрээр нь alias export хийв
export const faq = getFaqAnswer;

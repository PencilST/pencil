export function getFaqAnswer(text) {
  const t = text.toLowerCase();

  const responses = {
    "what is your name": "Би Pencil chatbot байна.",
    "чи хэн бэ": "Би Pencil chatbot байна.",
    "what can you do": "Би таны асуултад хариулж чадна.",
    "чи юу хийж чаддаг юм": "Би таны асуултад хариулж чадна."
  };

  return responses[t] || "Энэ талаар би сайн мэдэхгүй байна.";
}

// brain.js-д тааруулах export
export const faq = getFaqAnswer;

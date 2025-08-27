export function getFaqAnswer(text) {
  const t = text.toLowerCase().trim();

  // Асуултуудын түлхүүр үгс ба хариултууд
  const responses = [
    { keys: ["what is your name", "чи хэн бэ"], answer: "Би Pencil chatbot байна." },
    { keys: ["what can you do", "чи юу хийж чаддаг юм"], answer: "Би таны асуултад хариулж чадна." }
  ];

  // Хэрэглэгчийн текстэд аль нэг түлхүүр багтсан эсэхийг шалгана
  for (const r of responses) {
    if (r.keys.some(k => t.includes(k))) {
      return r.answer;
    }
  }

  // Хэрэв тохирох асуулт олдохгүй бол
  return "Энэ талаар би сайн мэдэхгүй байна.";
}

// brain.js-д тааруулах export
export const faq = getFaqAnswer;

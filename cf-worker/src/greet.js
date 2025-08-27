let lastCallTime = 0;
let lastWord = "";

export function greet(text) {
  const tr = text.toLowerCase().trim();
  const now = Date.now();

  // "хөөе" гэж хэлсэн бол
  if (tr === "хөөе") {
    lastCallTime = now;
    lastWord = "хөөе";

    const replies = [
      "Яав? 😏",
      "Яасан? 🤨",
      "Юу хэрэгтэй болов?",
      "Тайвшир. Юу болов?",
      "Айн?",
      "Ууртай байгаа юм уу? Яасан?",
      "... ?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  // Хэрэв өмнө нь "хөөе" гэж хэлсэн, 4 секунд өнгөрсөн бол
  if (lastWord === "хөөе" && now - lastCallTime > 4000) {
    lastWord = ""; // reset
    return "Бурхан минь, ямар аймар хүн бэ 😳";
  }

  return null;
}

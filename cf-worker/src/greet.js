// Давтамж хянахын тулд түр санах ой
let callCount = 0;
let lastCallTime = 0;

export function greet(text) {
  const tr = text.toLowerCase().trim();

  if (tr === "хөөе") { // normalize-д орж ирсэн утга
    const now = Date.now();

    // хэрэв 10 секундийн дотор дахин дуудах бол давтамжийг нэмэгдүүлнэ
    if (now - lastCallTime < 10000) {
      callCount++;
    } else {
      callCount = 1; // шинэ давталт эхлэх
    }

    lastCallTime = now;

    // Хэрэв олон удаа дараалан дуудсан бол тусгай хариу өгөх
    if (callCount >= 4) {
      callCount = 0; // reset
      return "Бурхан минь, ямар аймар хүн бэ 😳";
    }

    // Энгийн үед random хариултууд
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

  return null;
}

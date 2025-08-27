// Давтамж хянахын тулд түр санах ой
let callCount = 0;
let lastCallTime = 0;

export function greet(text) {
  const tr = text.toLowerCase().trim();

  // зөвхөн normalize-д орж ирсэн "хөөе"-г шалгана
  if (tr === "хөөе") {
    const now = Date.now();

    // хэрэв 10 секундийн дотор дахин дуудвал давтамж нэмэгдүүлнэ
    if (now - lastCallTime < 10000) {
      callCount++;
    } else {
      callCount = 1; // шинээр тоолол эхлэх
    }

    lastCallTime = now;

    // олон удаа дараалан дуудвал тусгай хариу өгөх
    if (callCount >= 4) {
      callCount = 0; // reset
      return "Бурхан минь, ямар аймар хүн бэ 😳";
    }

    // энгийн үед random хариултууд
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

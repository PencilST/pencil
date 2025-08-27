export function getGreetAnswer(text) {
  const t = text.toLowerCase().trim();

  // Мэндчилгээний түлхүүр үгс
  const responses = ["hello", "hi", "sain", "сайн уу", "hey", "snuu"];

  // Хэрэглэгчийн текстэд дээрх түлхүүр үгсийн аль нэг нь багтсан эсэхийг шалгах
  if (responses.some(r => t.includes(r))) {
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
      greeting = "Өглөөний мэнд!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Өдрийн мэнд!";
    } else if (hour >= 18 && hour < 22) {
      greeting = "Оройн мэнд!";
    } else {
      greeting = "Үдшийн мэнд!";
    }

    return `${greeting} Танд юугаар туслах уу?`;
  }

  // Хэрэв хэрэглэгчийн текстэд мэндчилгээний түлхүүр олдохгүй бол
  return "Сайн уу?";
}

// brain.js-д тааруулах export
export const greet = getGreetAnswer;

import { normalize } from "./normalize.js";

export function getGreetAnswer(text) {
  const t = normalize(text);

  // Мэндчилгээг зөвшөөрөх түлхүүрүүд
  const responses = ["сайн уу", "hi", "hello", "hey"];

  if (responses.includes(t)) {
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

  return "Сайн уу?";
}

// brain.js-тэй нийцүүлэх export
export const greet = getGreetAnswer;

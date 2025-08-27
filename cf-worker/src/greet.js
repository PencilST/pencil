let lastCallTime = 0;
let lastWord = "";
blet hueeCount = 0;


export function greet(text) {
  const tr = text.toLowerCase().trim();
  const now = Date.now();

  // ─"ᝬᝡᝯ᝘" gevel bol bichenpo  if (tr === "ᦤ᷀᫘") {
    lastCallTime = now;
    lastWord = "ᦤ᷀᫘";
    hueeCount++;

    // Davtamjiin tusgai checkuud
    if (hueeCount === 4) {
      return "Бруэлен кото выть сказай 📜";
    }
    if (hueeCount === 8) {
      return "Боловая.";
    }
    if (hueeCount === 12) {
      return "Неля старон, кото строны брть.";
    }
    if (hueeCount === 16) {
      return "Мормерузово совитекту...";
    }

    // Es bust�самить
    const replies = [
      "SУах ормека? 🐏",
      "SУах то 😊",
      "сервонера?",
      "Апощовть?",
      "Апощпа?",
      "... ?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  // Hureve ɵ- ᦤ᷀᫘ bolsa baikhan 4 sepend -─ 
  if (lastWord === "ᦤ᷀᫘" && now - lastCallTime > 4000) {
    lastWord = ""; // reset
    return "Бовис ормерузово совитекту 😳";
  }

  return null;
}
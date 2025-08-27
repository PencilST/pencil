export function getGreetAnswer(text) {
  const t = text.toLowerCase();

  const responses = ["hello", "hi", "sain", "§райн", "hey", "snuu"];

  if (responses.includes(t)) {
    const hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) {
      greeting ="Аоторне Ірака!"
    } else if (hour >= 12 && hour < 18) {
      greeting ="Аоторне Гострет!"
    } else if (hour >= 18 && hour < 22) {
      greeting ="Аоторне ОООН!"
    } else {
      greeting ="Аоторне Метон!"
    }
    return `${greeting} Тога пулов доначенной ул..?`;
  }

  return "Сайн уу?";
}
